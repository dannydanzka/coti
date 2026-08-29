/**
 * AdminDetailModal Interfaces
 *
 * Type definitions for detail modal components used in admin screens.
 * Provides consistent styling for displaying detailed information in modals.
 */

import type { ReactNode } from 'react';

export interface DetailSectionProps {
  children: ReactNode;
  className?: string;
}

export interface DetailLabelProps {
  children: ReactNode;
  className?: string;
}

export interface DetailValueProps {
  children: ReactNode;
  className?: string;
  mono?: boolean;
}

export interface DetailRowProps {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}

export interface DetailDividerProps {
  className?: string;
}

export interface DetailAmountProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'large';
}

export interface DetailContentBoxProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'info' | 'warning' | 'error';
}

export interface StyledDetailRowProps {
  $columns?: 2 | 3 | 4;
}

export interface StyledDetailContentBoxProps {
  $variant?: 'default' | 'info' | 'warning' | 'error';
}
