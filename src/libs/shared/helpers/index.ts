/**
 * Shared Utilities
 *
 * Centralized utilities following @helpers pattern for all cross-cutting concerns.
 *
 * Modules with dedicated aliases (NO re-exports here):
 * - @app-error → AppError, createAppError
 * - @api-error → handleApiError, createErrorResponse
 * - @use-case-error → handleUseCaseError, create*Error factories
 * - @logger → logger, logError, logInfo, logWarning
 * - @thunks → createManagedThunk, Notification, PersistentNotification
 */
export * from './color';
export * from './crypto';
export * from './fingerprint';
export * from './function';
export * from './http';
export * from './jwt';
export * from './use-case';
export * from './validation';
