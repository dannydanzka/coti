/**
 * Use Case Error Handler
 *
 * Standardized error handling for use cases.
 * Provides consistent error responses and logging for business logic errors.
 *
 * Accepts either a legacy string (ES fallback) or an i18n-aware object
 * `{ key, params?, fallback? }`. When a key is provided the response includes
 * `i18n: { key, params? }` alongside the ES fallback under `error`, so the
 * client can localise the message.
 */

import { HTTP_STATUS } from '@constants';

import { AppError } from '../app-error';
import { logError } from '../logger';
import type {
  NormalizedUseCaseError,
  UseCaseErrorHandlerOptions,
  UseCaseErrorI18n,
  UseCaseErrorInput,
  UseCaseErrorResponse,
} from './use-case-error-handler.interfaces';
import { translatePrismaError } from '../prisma-errors';

export type {
  UseCaseErrorHandlerOptions,
  UseCaseErrorI18n,
  UseCaseErrorInput,
  UseCaseErrorResponse,
};

const I18N_KEY_PATTERN = /^errors\.[a-zA-Z][\w.]*[a-zA-Z0-9]$/;

const normalizeInput = (input: UseCaseErrorInput): NormalizedUseCaseError => {
  if (typeof input === 'string') {
    return { error: input };
  }
  const { key, params } = input;
  const i18n: UseCaseErrorI18n = { key };
  if (params) i18n.params = params;
  return { i18n };
};

const appErrorToNormalized = (error: AppError): NormalizedUseCaseError => {
  const { message } = error;
  const params = (error.content ?? undefined) as Record<string, unknown> | undefined;
  if (message && I18N_KEY_PATTERN.test(message)) {
    return normalizeInput({ key: message, params });
  }
  return { error: message };
};

const buildResponse = <T extends UseCaseErrorResponse>(
  normalized: NormalizedUseCaseError,
  status: number,
  details?: Record<string, unknown>
): T => {
  const response: UseCaseErrorResponse = {
    status,
    success: false,
  };
  if (normalized.error) response.error = normalized.error;
  if (normalized.i18n) response.i18n = normalized.i18n;
  if (details) response.details = details;
  return response as T;
};

/**
 * Ultra-compact one-line error handler for use cases (similar to handleApiError)
 * Automatically logs error and returns standardized response format.
 * Prisma errors are translated to user-friendly Spanish messages.
 * AppError instances whose message matches an i18n key are lifted into `i18n`.
 */
export const handleUseCaseError = <T extends UseCaseErrorResponse = UseCaseErrorResponse>(
  error: unknown,
  context: string
): T => {
  logError(error, context);

  if (error instanceof AppError) {
    return buildResponse<T>(appErrorToNormalized(error), HTTP_STATUS.BAD_REQUEST);
  }

  if (error instanceof Error) {
    const prismaMessage = translatePrismaError(error);
    if (prismaMessage) {
      return buildResponse<T>({ error: prismaMessage }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
    if (I18N_KEY_PATTERN.test(error.message)) {
      return buildResponse<T>(normalizeInput({ key: error.message }), HTTP_STATUS.BAD_REQUEST);
    }
    return buildResponse<T>({ error: error.message }, HTTP_STATUS.BAD_REQUEST);
  }

  return buildResponse<T>(
    normalizeInput({ key: 'errors.generic.serverError' }),
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
};

/**
 * Creates a validation error response
 * For input validation failures in use cases
 */
/**
 * Resolves an i18n key into `{ error, i18n }` ready to be spread into an
 * error response. The ES fallback comes from the dictionary — no hardcoded
 * strings in use cases.
 *
 * Usage:
 *   return {
 *     ...resolveErrorI18n('errors.bookAdmin.notFound'),
 *     context: { bookId },
 *     status: HTTP_STATUS.NOT_FOUND,
 *     success: false,
 *   };
 */
export const resolveErrorI18n = (
  key: string,
  params?: Record<string, unknown>
): NormalizedUseCaseError => normalizeInput({ key, params });

export const createValidationError = <T extends UseCaseErrorResponse = UseCaseErrorResponse>(
  input: UseCaseErrorInput,
  field?: string,
  value?: unknown
): T =>
  buildResponse<T>(
    normalizeInput(input),
    HTTP_STATUS.BAD_REQUEST,
    field ? { field, value } : undefined
  );

/**
 * Creates an authorization error response
 * For permission/access denied errors in use cases
 */
export const createAuthorizationError = <T extends UseCaseErrorResponse = UseCaseErrorResponse>(
  input: UseCaseErrorInput = 'Acceso denegado',
  reason?: string
): T =>
  buildResponse<T>(
    normalizeInput(input),
    HTTP_STATUS.UNAUTHORIZED,
    reason ? { reason } : undefined
  );

/**
 * Creates a forbidden (403) error response.
 *
 * Úsalo cuando la identidad es válida pero le falta permiso. Es distinto de
 * `createAuthorizationError` (401), que significa "no sé quién eres": el cliente
 * cierra la sesión ante un 401, así que devolver 401 por una regla de permisos
 * expulsa al usuario en lugar de mostrarle el motivo.
 */
export const createForbiddenError = <T extends UseCaseErrorResponse = UseCaseErrorResponse>(
  input: UseCaseErrorInput = 'Acceso denegado',
  reason?: string
): T =>
  buildResponse<T>(normalizeInput(input), HTTP_STATUS.FORBIDDEN, reason ? { reason } : undefined);

/**
 * Creates a not found error response
 * For resource not found errors in use cases
 */
export const createNotFoundError = <T extends UseCaseErrorResponse = UseCaseErrorResponse>(
  resource: string,
  identifier?: string
): T => {
  const message = identifier
    ? `${resource} con ID '${identifier}' no encontrado`
    : `${resource} no encontrado`;

  return buildResponse<T>(
    { error: message },
    HTTP_STATUS.NOT_FOUND,
    identifier ? { identifier, resource } : { resource }
  );
};

/**
 * Creates a business logic error response
 * For domain-specific business rule violations
 */
export const createBusinessLogicError = <T extends UseCaseErrorResponse = UseCaseErrorResponse>(
  input: UseCaseErrorInput,
  code?: string,
  context?: Record<string, unknown>
): T =>
  buildResponse<T>(normalizeInput(input), HTTP_STATUS.UNPROCESSABLE_ENTITY, {
    type: 'business_logic_violation',
    ...(code && { code }),
    ...(context && { context }),
  });
