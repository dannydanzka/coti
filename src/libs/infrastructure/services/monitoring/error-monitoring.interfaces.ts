/**
 * Error Monitoring Service Interfaces
 *
 * Service contracts for error tracking and alerting integration.
 *
 * @context Infrastructure - Monitoring
 */

export interface CriticalErrorData {
  message: string;
  stack?: string | undefined;
  userAgent?: string | undefined;
  url?: string | undefined;
  timestamp: string;
  severity?: number | undefined;
  userId?: string | undefined;
  metadata?: Record<string, unknown> | undefined;
}

export interface ErrorMonitoringResult {
  success: boolean;
  errorId: string;
  message?: string;
}

export interface ErrorAlertPayload {
  errorId: string;
  message: string;
  severity: number;
  timestamp: string;
  url?: string | undefined;
  userAgent?: string | undefined;
}

export interface ErrorMonitoringService {
  captureException(error: CriticalErrorData): Promise<ErrorMonitoringResult>;
  sendAlert(payload: ErrorAlertPayload): Promise<{ success: boolean }>;
  saveToDatabase(error: CriticalErrorData): Promise<{ success: boolean; id: string }>;
}
