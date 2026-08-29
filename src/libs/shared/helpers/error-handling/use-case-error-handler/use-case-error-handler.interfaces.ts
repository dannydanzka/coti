/**
 * Use Case Error Handler Interfaces
 *
 * Type definitions for use case error handling.
 */

export interface UseCaseErrorI18n {
  key: string;
  params?: Record<string, unknown>;
}

export interface UseCaseErrorResponse {
  status: number;
  success: false;
  details?: Record<string, unknown>;
  error?: string;
  i18n?: UseCaseErrorI18n;
}

/**
 * Input accepted by use-case error helpers.
 *   - string: legacy fallback text (emits `error` only, no i18n).
 *   - { key, params? }: i18n-aware. Emits `i18n` only — no ES duplication.
 */
/**
 * Internal shape produced by the error helpers after normalising an input.
 * Either `error` (legacy string) or `i18n` (key-based), never both.
 */
export interface NormalizedUseCaseError {
  error?: string;
  i18n?: UseCaseErrorI18n;
}

export type UseCaseErrorInput =
  | string
  | {
      key: string;
      params?: Record<string, unknown>;
    };

export interface UseCaseErrorHandlerOptions {
  customMessage?: string;
  shouldLog?: boolean;
  context?: string;
  details?: Record<string, unknown>;
}
