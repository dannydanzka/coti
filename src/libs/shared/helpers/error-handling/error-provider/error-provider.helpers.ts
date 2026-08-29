/**
 * ErrorProvider Helper Functions
 *
 * Utility functions for error categorization, logging, and notification.
 * Separated from main ErrorProvider for better maintainability and testability.
 */

import type { ErrorCategory, ErrorInfo, ErrorSeverity } from './error-provider.helpers.interfaces';
import { logError } from '../logger';

/**
 * Generates a unique error ID using timestamp and random string
 */
export const generateErrorId = () =>
  `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Categorizes error based on message content and type
 */
export const categorizeError = (error: Error): ErrorCategory => {
  const message = error.message.toLowerCase();

  if (message.includes('network') || message.includes('fetch')) return 'network';
  if (message.includes('unauthorized') || message.includes('token')) return 'authentication';
  if (message.includes('forbidden') || message.includes('permission')) return 'authorization';
  if (message.includes('validation') || message.includes('invalid')) return 'validation';
  if (error.name === 'TypeError' || error.name === 'ReferenceError') return 'runtime';

  return 'unknown';
};

/**
 * Detects error severity based on message content and error type
 */
export const detectSeverity = (error: Error): ErrorSeverity => {
  const message = error.message.toLowerCase();

  if (message.includes('critical') || message.includes('fatal')) return 'critical';
  if (message.includes('server error') || message.includes('500')) return 'high';
  if (message.includes('warning') || message.includes('deprecated')) return 'low';
  if (error.name === 'TypeError' || error.name === 'ReferenceError') return 'high';

  return 'medium';
};

/**
 * Creates a complete ErrorInfo object with context and metadata
 */
export const createErrorInfo = (
  error: Error,
  context?: Record<string, unknown>,
  severity?: ErrorSeverity
): ErrorInfo => {
  const sessionId = sessionStorage.getItem('sessionId');
  const errorInfo: ErrorInfo = {
    category: categorizeError(error),
    context: {
      ...context,
      sessionId: sessionId !== null ? sessionId : 'unknown',
      url: window.location.href,
      userAgent: navigator.userAgent,
    },
    id: generateErrorId(),
    message: error.message,
    severity: severity || detectSeverity(error),
    timestamp: Date.now(),
  };

  if (error.stack !== undefined) {
    errorInfo.stack = error.stack;
  }

  return errorInfo;
};

/**
 * Sends error notification through the notification system
 */
export const sendErrorNotification = (
  errorInfo: ErrorInfo,
  showError: (message: string, options?: { displayDuration?: number }) => void
) => {
  try {
    const notificationMessage = `${errorInfo.category.charAt(0).toUpperCase() + errorInfo.category.slice(1)} Error: ${errorInfo.message}`;
    showError(notificationMessage, {
      displayDuration: errorInfo.severity === 'critical' ? 0 : 5000,
    });
  } catch (notificationError) {
    logError(notificationError, 'showErrorNotification');
  }
};

/**
 * Logs error information using centralized logger
 */
export const logErrorInDevelopment = (errorInfo: ErrorInfo, error: Error) => {
  logError(error, `ErrorProvider:${errorInfo.severity}:${errorInfo.category}`);
};

/**
 * Detects blank screen condition and reports it as an error
 */
export const detectBlankScreen = (
  reportErrorInternal: (
    error: Error,
    context?: Record<string, unknown>,
    severity?: ErrorSeverity
  ) => void
) => {
  const { body } = document;
  const hasVisibleContent =
    body.offsetHeight > 100 || body.scrollHeight > 100 || body.children.length > 0;

  if (!hasVisibleContent) {
    reportErrorInternal(
      new Error('Blank screen detected - no visible content rendered'),
      {
        bodyHeight: body.offsetHeight,
        childrenCount: body.children.length,
        scrollHeight: body.scrollHeight,
        type: 'blank_screen',
        url: window.location.href,
      },
      'high'
    );
  }
};
