/**
 * ErrorFallback Component Interfaces
 */

import type { ErrorInfo } from '@error-provider';

export interface ErrorRecoveryAction {
  label: string;
  action: () => void;
  type: 'retry' | 'refresh' | 'navigate' | 'custom';
}

export interface ErrorFallbackProps {
  error?: ErrorInfo | null;
  resetError?: () => void;
  recoveryActions?: ErrorRecoveryAction[];
}
