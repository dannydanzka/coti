/**
 * AdminActionButtons Interfaces
 *
 * Unified action buttons for admin tables.
 */

import type { ReactNode } from 'react';

export interface ToggleActiveButtonProps {
  isActive: boolean;
  isLoading?: boolean;
  onClick: () => void;
  title?: string;
  size?: 'sm' | 'md';
  shape?: 'square' | 'circle';
}

export interface ActionButtonProps {
  icon: ReactNode;
  isLoading?: boolean;
  onClick: () => void;
  title: string;
  variant: 'edit' | 'delete' | 'view';
  size?: 'sm' | 'md';
}

export interface StyledToggleButtonProps {
  $isActive: boolean;
  $isLoading: boolean;
  $size: 'sm' | 'md';
  $shape: 'square' | 'circle';
}
