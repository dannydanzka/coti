/**
 * AdminStates Interfaces
 *
 * Type definitions for admin state components (loading, empty, error).
 */

import type { ReactNode } from 'react';

export interface AdminEmptyStateProps {
  action?: ReactNode;
  className?: string;
  icon?: ReactNode;
  message?: string;
  title?: string;
}

export interface AdminErrorStateProps {
  action?: ReactNode;
  className?: string;
  message?: string;
  title?: string;
}

export interface AdminInfoMessageProps {
  children: ReactNode;
  className?: string;
  variant?: 'info' | 'warning' | 'success' | 'error';
}

export interface StyledInfoMessageProps {
  $variant: 'info' | 'warning' | 'success' | 'error';
}
