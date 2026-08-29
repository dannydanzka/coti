/**
 * AppError - Custom Application Error
 *
 * Structured error class for propagating typed error content across layers.
 * Used by handleRequest (HTTP client), thunkHandler (Redux), and use case error handlers.
 */

export class AppError<T = unknown> extends Error {
  public readonly content: T;

  constructor(content: T, message?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.name = 'AppError';
    this.content = content;
  }
}

/**
 * Factory function to create AppError instances.
 * Use this in use cases instead of `new AppError()` to comply with ES6+ no-class pattern.
 */
export const createAppError = <T = unknown>(content: T, message?: string): AppError<T> => {
  return new AppError(content, message);
};
