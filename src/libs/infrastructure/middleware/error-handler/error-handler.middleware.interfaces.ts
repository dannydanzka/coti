/**
 * Error Handler Middleware Interfaces
 *
 * Type definitions for error handling middleware.
 */

/**
 * Custom API Error
 */
export interface ApiError {
  details?: Record<string, unknown>;
  message: string;
  name: string;
  statusCode: number;
}

/**
 * Error response format
 */
export interface ErrorResponse {
  data?: unknown;
  details?: Record<string, unknown>;
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  stack?: string;
  statusCode: number;
  success: false;
}

/**
 * Error handler options
 */
export interface ErrorHandlerOptions {
  data?: unknown;
  silent?: boolean;
}
