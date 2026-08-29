/**
 * ErrorProvider Interfaces
 *
 * Types for centralized error handling system with Error Boundaries.
 * Integrates with notification system for error display.
 */

import type { ErrorCategory, ErrorInfo, ErrorSeverity } from '@error-provider';
import type { ErrorRecoveryAction } from '@components';

export type { ErrorCategory, ErrorInfo, ErrorSeverity };

export interface ErrorContextValue {
  errors: ErrorInfo[];
  reportError: (error: Error, context?: Record<string, unknown>, severity?: ErrorSeverity) => void;
  clearError: (errorId: string) => void;
  clearAllErrors: () => void;
  retryLastAction: () => void;
  addRecoveryAction: (errorId: string, action: ErrorRecoveryAction) => void;
}

export interface ErrorProviderProps {
  children: React.ReactNode;
  enableErrorBoundary?: boolean;
  enableGlobalErrorHandling?: boolean;
  enableErrorReporting?: boolean;
  maxStoredErrors?: number;
  onError?: (error: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface FallbackComponentProps {
  error?: ErrorInfo;
  resetError?: () => void;
  recoveryActions?: ErrorRecoveryAction[];
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error, errorInfo: React.ErrorInfo) => void;
  fallbackComponent?: React.ComponentType<{
    error: ErrorInfo;
    resetError: () => void;
    recoveryActions: ErrorRecoveryAction[];
  }>;
}
