import type { TFunction } from 'i18next';

import { AppError } from '../helpers/error-handling/app-error';
import type { ErrorLike } from './getLocalizedError.interfaces';

const I18N_KEY_PATTERN = /^errors\.[a-zA-Z][\w.]*[a-zA-Z0-9]$/;

/**
 * Resolve the i18n params carried by an AppError, stripping the helper fields
 * (`fallback`, `raw`) that handleRequest stores alongside the params.
 */
const extractAppErrorParams = (error: AppError): Record<string, unknown> | undefined => {
  if (!error.content || typeof error.content !== 'object') return undefined;
  const { fallback: _f, raw: _r, ...params } = error.content as Record<string, unknown>;
  return Object.keys(params).length > 0 ? params : undefined;
};

/**
 * Resolve a thrown error (typically an `AppError` from handleRequest) into a
 * human-readable message. handleRequest stores either an ES string OR an i18n
 * key in `.message`, with the ES fallback in `.content.fallback` — so using
 * `err.message` blindly can leak a raw key (e.g. "errors.auth.tokenExpired").
 */
const resolveThrownError = (error: Error, t: TFunction, fallback: string): string => {
  const { message } = error;

  if (message && I18N_KEY_PATTERN.test(message)) {
    const params = error instanceof AppError ? extractAppErrorParams(error) : undefined;
    return t(message, params ?? {});
  }

  if (error instanceof AppError) {
    const content = error.content as { fallback?: unknown } | null;
    if (content && typeof content.fallback === 'string') {
      return content.fallback;
    }
  }

  return message || fallback;
};

/**
 * Resolve a user-facing error message from either:
 *   - a use-case/API error response (`{ error, i18n }`), or
 *   - a thrown `Error` / `AppError` (from handleRequest).
 *
 * Prefers the i18n key (translated via `t`) when present; falls back to the ES
 * text and finally the provided default. Single entry point so features never
 * surface raw i18n keys or generic "error" strings.
 */
export const getLocalizedError = (
  input: ErrorLike | Error | unknown,
  t: TFunction,
  fallback = 'Ha ocurrido un error'
): string => {
  if (!input) return fallback;

  if (input instanceof Error) {
    return resolveThrownError(input, t, fallback);
  }

  if (typeof input !== 'object') return fallback;

  const errorLike = input as ErrorLike;

  if (errorLike.i18n?.key) {
    return t(errorLike.i18n.key, errorLike.i18n.params ?? {});
  }
  return errorLike.error ?? fallback;
};
