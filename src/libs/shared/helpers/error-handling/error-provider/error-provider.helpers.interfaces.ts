/**
 * Error Provider Helper Interfaces
 */

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ErrorCategory =
  'network' | 'validation' | 'authentication' | 'authorization' | 'runtime' | 'unknown';

export interface ErrorInfo {
  id: string;
  message: string;
  stack?: string;
  componentStack?: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  timestamp: number;
  context?: Record<string, unknown>;
  userId?: string;
  sessionId?: string;
}
