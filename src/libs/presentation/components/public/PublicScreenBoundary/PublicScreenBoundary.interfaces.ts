/**
 * PublicScreenBoundary Interfaces
 */

import type { ReactNode } from 'react';

export interface PublicScreenBoundaryProps {
  children: ReactNode;
  error?: string | null;
  isLoading: boolean;
  onRetry?: () => void;
  retryLabel?: string;
}
