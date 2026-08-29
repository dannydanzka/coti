/**
 * API Error Handler Interfaces
 *
 * Type definitions for API error handling.
 */

export interface ApiError {
  message: string;
  status: number;
}

/**
 * i18n metadata attached to error responses.
 */
export interface ApiErrorI18n {
  key: string;
  params?: Record<string, unknown>;
}

/**
 * Error response body returned by API routes.
 *
 * Additive contract (backwards compatible):
 *   - `error`: string (ES fallback) — unchanged from the legacy contract.
 *   - `i18n`: optional `{ key, params? }` — new. Clients that understand i18n
 *     keys use this to localise; legacy clients keep reading `error`.
 */
export interface ApiErrorResponseBody {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success: false;
}

/**
 * Input accepted by `createErrorResponse` / `handleApiError`.
 * A bare string is treated as a legacy fallback text (no i18n key).
 */
/**
 * Internal shape produced by the API error handler before it is serialised
 * into the response body. Kept separate from `ApiErrorResponseBody` because
 * `success` is added at serialisation time.
 */
export interface BuiltErrorBody {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
}

export type ErrorInput =
  | string
  | {
      fallback?: string;
      key: string;
      params?: Record<string, unknown>;
    };
