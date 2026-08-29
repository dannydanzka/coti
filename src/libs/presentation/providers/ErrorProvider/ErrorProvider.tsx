/**
 * ErrorProvider Component
 *
 * Centralized error handling system with Error Boundaries and global error catching.
 * Integrates with Redux notification system for error display and reporting.
 * Provides error recovery strategies and detailed error logging.
 *
 */
'use client';

import {
  Component,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ErrorInfo as ReactErrorInfo, FC } from 'react';
import { useDispatch } from 'react-redux';

import {
  categorizeError,
  createErrorInfo,
  detectBlankScreen,
  detectSeverity,
  generateErrorId,
  logErrorInDevelopment,
  sendErrorNotification,
} from '@error-provider';
import { enqueueNotification } from '@redux';
import { logError } from '@logger';
import { noop } from '@helpers';
import type { Notification } from '@thunks';

import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorContextValue,
  ErrorInfo,
  ErrorProviderProps,
  ErrorSeverity,
} from './ErrorProvider.interfaces';
import { ErrorFallback } from '../../components/common/ErrorFallback';
import type { ErrorRecoveryAction } from '../../components/common/ErrorFallback';

const ErrorContext = createContext<ErrorContextValue>({
  addRecoveryAction: noop,
  clearAllErrors: noop,
  clearError: noop,
  errors: [],
  reportError: noop,
  retryLastAction: noop,
});

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, reactErrorInfo: ReactErrorInfo) {
    const errorData: ErrorInfo = {
      category: categorizeError(error),
      context: {
        componentStack: reactErrorInfo.componentStack,
        errorBoundary: true,
      },
      id: generateErrorId(),
      message: error.message,
      severity: detectSeverity(error),
      timestamp: Date.now(),
    };

    if (error.stack !== undefined) {
      errorData.stack = error.stack;
    }

    if (reactErrorInfo.componentStack !== undefined && reactErrorInfo.componentStack !== null) {
      errorData.componentStack = reactErrorInfo.componentStack;
    }

    logError(error, '[ErrorBoundary] Caught error');

    const { onError } = this.props;
    this.setState({ errorInfo: errorData });

    try {
      onError(error, reactErrorInfo);
    } catch (err) {
      logError(err, '[ErrorBoundary] Error handler failed');
    }
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { errorInfo, hasError } = this.state;
    const { children, fallbackComponent } = this.props;

    if (hasError && errorInfo) {
      const FallbackComponent = fallbackComponent || ErrorFallback;

      return (
        <FallbackComponent error={errorInfo} recoveryActions={[]} resetError={this.resetError} />
      );
    }

    return children;
  }
}

const ErrorProvider: FC<ErrorProviderProps> = ({
  children,
  enableErrorBoundary = true,
  enableGlobalErrorHandling = true,
  maxStoredErrors = 50,
  onError = () => {},
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const [, setRecoveryActions] = useState<Map<string, ErrorRecoveryAction[]>>(new Map());

  const showError = useCallback(
    (message: string) => {
      const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const notification: Notification = {
        displayDuration: 5000,
        id,
        message,
        timestamp: Date.now(),
        type: 'error',
      };
      dispatch(enqueueNotification({ notification }));
      return id;
    },
    [dispatch]
  );

  const safeCallErrorHandler = useCallback(
    (errorInfo: ErrorInfo) => {
      if (!onError) return;
      try {
        onError(errorInfo);
      } catch (handlerError) {
        logError(handlerError, '[ErrorProvider] Error handler callback failed');
      }
    },
    [onError]
  );

  const reportErrorInternal = useCallback(
    (error: Error, context?: Record<string, unknown>, severity?: ErrorSeverity) => {
      try {
        const errorInfo = createErrorInfo(error, context, severity);

        setErrors((prev) => {
          const updated = [errorInfo, ...prev];
          return updated.slice(0, maxStoredErrors);
        });

        sendErrorNotification(errorInfo, showError);
        safeCallErrorHandler(errorInfo);
        logErrorInDevelopment(errorInfo, error);
      } catch (reportError) {
        logError(reportError, '[ErrorProvider] Critical failure in error reporting');
      }
    },
    [showError, safeCallErrorHandler, maxStoredErrors]
  );

  useEffect(() => {
    if (!enableGlobalErrorHandling) return undefined;

    const handleError = (event: ErrorEvent) => {
      const error = new Error(event.message);
      error.stack = `${event.filename}:${event.lineno}:${event.colno}`;

      reportErrorInternal(error, {
        colno: event.colno,
        filename: event.filename,
        lineno: event.lineno,
        type: 'javascript',
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

      reportErrorInternal(error, {
        reason: event.reason,
        type: 'unhandled_promise',
      });
    };

    const blankScreenTimer = setTimeout(() => detectBlankScreen(reportErrorInternal), 5000);

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      clearTimeout(blankScreenTimer);
    };
  }, [enableGlobalErrorHandling, reportErrorInternal]);

  const reportError = useCallback(
    (error: Error, context?: Record<string, unknown>, severity?: ErrorSeverity) => {
      reportErrorInternal(error, context, severity);
    },
    [reportErrorInternal]
  );

  const clearError = useCallback((errorId: string) => {
    setErrors((prev) => prev.filter((error) => error.id !== errorId));
    setRecoveryActions((prev) => {
      const updated = new Map(prev);
      updated.delete(errorId);
      return updated;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
    setRecoveryActions(new Map());
  }, []);

  const retryLastAction = useCallback(() => {}, []);

  const addRecoveryAction = useCallback((errorId: string, action: ErrorRecoveryAction) => {
    setRecoveryActions((prev) => {
      const updated = new Map(prev);
      const existing = updated.get(errorId) || [];
      updated.set(errorId, [...existing, action]);
      return updated;
    });
  }, []);

  const handleBoundaryError = useCallback(
    (error: Error, reactErrorInfo: ReactErrorInfo) => {
      reportErrorInternal(
        error,
        {
          componentStack: reactErrorInfo.componentStack,
          errorBoundary: true,
        },
        'high'
      );
    },
    [reportErrorInternal]
  );

  const contextValue = useMemo(
    (): ErrorContextValue => ({
      addRecoveryAction,
      clearAllErrors,
      clearError,
      errors,
      reportError,
      retryLastAction,
    }),
    [addRecoveryAction, clearAllErrors, clearError, errors, reportError, retryLastAction]
  );

  const content = <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;

  if (enableErrorBoundary) {
    return <ErrorBoundary onError={handleBoundaryError}>{content}</ErrorBoundary>;
  }

  return content;
};

const useError = (): ErrorContextValue => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export { ErrorProvider, useError };
