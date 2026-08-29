/**
 * Logger Module Exports
 *
 * Centralized logging system with controlled console access.
 * Use logger from @helpers for application-wide logging.
 *
 * @example
 * import { logger } from '@logger';
 *
 * logger.error('Error occurred', { userId: 123 });
 * logger.warn('Warning message', { context: 'value' });
 * logger.info('Info message'); // Development only
 * logger.debug('Debug data', { step: 1 }); // Development only
 */

export * from './logger';
export type * from './logger.interfaces';
