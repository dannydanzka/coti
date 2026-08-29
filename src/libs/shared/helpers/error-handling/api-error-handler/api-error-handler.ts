/**
 * API Error Handler Utility
 *
 * Centralized error handling for API routes (Next.js).
 * Returns NextResponse with consistent { error, success, i18n? } format.
 *
 * Contract (additive, backwards compatible):
 *   - `error`: ES fallback string (always present). Legacy clients keep reading this.
 *   - `i18n`: `{ key, params? }` — optional i18n metadata for clients that
 *     support key-based localisation.
 *   - `success`: false.
 *
 * `handleApiError` / `createErrorResponse` accept either:
 *   - A string (legacy): treated as fallback text, no i18n key emitted.
 *   - An object `{ key, params?, fallback? }`: emits the i18n key and resolves
 *     the ES fallback from the dictionary when `fallback` is omitted.
 *
 * AppError instances whose `message` matches an i18n key pattern are lifted
 * into the new schema automatically; non-key messages remain as plain fallback.
 */

import { NextResponse } from 'next/server';

import { HTTP_STATUS } from '@constants';
import { resolveI18n } from '@i18n';

import type {
  ApiError,
  ApiErrorI18n,
  ApiErrorResponseBody,
  BuiltErrorBody,
  ErrorInput,
} from './api-error-handler.interfaces';
import { AppError } from '../app-error';
import { logError } from '../logger';
import { translatePrismaError } from '../prisma-errors';

export type { ApiError, ApiErrorI18n, ApiErrorResponseBody, ErrorInput };

const I18N_KEY_PATTERN = /^errors\.[a-zA-Z][\w.]*[a-zA-Z0-9]$/;

const buildBody = (input: ErrorInput): BuiltErrorBody => {
  if (typeof input === 'string') {
    return { error: input };
  }
  const { fallback, key, params } = input;
  const i18n: ApiErrorI18n = { key };
  if (params) i18n.params = params;
  return {
    error: fallback ?? resolveI18n(key, params, 'es'),
    i18n,
  };
};

const appErrorToBody = (error: AppError): BuiltErrorBody => {
  const { message } = error;
  const params = (error.content ?? undefined) as Record<string, unknown> | undefined;

  if (message && I18N_KEY_PATTERN.test(message)) {
    return buildBody({ key: message, params });
  }
  return { error: message || resolveI18n('errors.generic.unknown', undefined, 'es') };
};

export const handleApiError = (error: unknown, context: string): NextResponse => {
  logError(error, context);

  let body: BuiltErrorBody;
  let status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;

  if (error instanceof AppError) {
    body = appErrorToBody(error);
  } else if (error instanceof Error) {
    const prismaTranslated = translatePrismaError(error);
    body = {
      error: (prismaTranslated ?? error.message) || resolveI18n('errors.generic.serverError'),
    };
  } else {
    body = { error: resolveI18n('errors.generic.serverError') };
  }

  if (error && typeof error === 'object' && 'status' in error) {
    const errorStatus = error.status;
    if (typeof errorStatus === 'number') {
      status = errorStatus;
    }
  }

  const responseBody: ApiErrorResponseBody = {
    error: body.error,
    success: false,
  };
  if (body.i18n) responseBody.i18n = body.i18n;

  return NextResponse.json(responseBody, { status });
};

export const createErrorResponse = (
  input: ErrorInput,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): NextResponse => {
  const body = buildBody(input);
  const responseBody: ApiErrorResponseBody = {
    error: body.error,
    success: false,
  };
  if (body.i18n) responseBody.i18n = body.i18n;
  return NextResponse.json(responseBody, { status });
};
