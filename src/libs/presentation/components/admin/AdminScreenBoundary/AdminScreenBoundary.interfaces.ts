/**
 * AdminScreenBoundary Interfaces
 */

import type { ReactNode } from 'react';

export interface AdminScreenBoundaryProps {
  children: ReactNode;
  error?: string | null;
  errorAction?: ReactNode;
  isLoading: boolean;
  title: string;
}
