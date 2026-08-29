/**
 * Logger Module
 *
 * Centralized logging system with controlled console access.
 * Uses globalThis.console to avoid ESLint conflicts.
 */

import type { LogContext, Logger, LogLevel } from './logger.interfaces';

const isDevelopment = process.env['NODE_ENV'] === 'development';

/**
 * Creates formatted timestamp for logs
 */
const createTimestamp = (): string => new Date().toISOString();

/**
 * Creates formatted context prefix for logs
 */
const createContextPrefix = (context?: LogContext): string => {
  if (!context) return '';
  const contextStr = JSON.stringify(context);
  return ` ${contextStr}`;
};

/**
 * Formats log message with timestamp and context
 */
const formatMessage = (level: LogLevel, message: string, context?: LogContext): string => {
  const timestamp = createTimestamp();
  const contextPrefix = createContextPrefix(context);
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextPrefix}`;
};

/**
 * Application logger with controlled console access
 * Development: logs all levels
 * Production: only error and warn
 */
export const logger: Logger = {
  debug: (message: string, context?: LogContext) => {
    if (isDevelopment) {
      const output = formatMessage('debug', message, context);
      globalThis.console['debug'](output);
    }
  },
  error: (message: string, context?: LogContext) => {
    const output = formatMessage('error', message, context);
    globalThis.console['error'](output);
  },
  info: (message: string, context?: LogContext) => {
    if (isDevelopment) {
      const output = formatMessage('info', message, context);
      globalThis.console['info'](output);
    }
  },
  warn: (message: string, context?: LogContext) => {
    const output = formatMessage('warning', message, context);
    globalThis.console['warn'](output);
  },
};

/**
 * Logs error with optional context - standalone function for middleware use
 *
 * This function is independent from error-handling to avoid circular dependencies.
 * Middleware should import from @logger instead of @helpers.
 */
export const logError = (error: unknown, context?: string): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const logContext = context ? { context, error } : { error };
  logger.error(errorMessage, logContext);
};

/**
 * Logs informational message with optional context.
 */
export const logInfo = (message: string, context?: string): void => {
  const logContext = context ? { context } : undefined;
  logger.info(message, logContext);
};

/**
 * Logs warning message with optional context.
 */
export const logWarning = (message: string, context?: string): void => {
  const logContext = context ? { context } : undefined;
  logger.warn(message, logContext);
};
