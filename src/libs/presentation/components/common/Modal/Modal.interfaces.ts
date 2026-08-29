/**
 * Modal Component Interfaces
 *
 * Unified modal component supporting:
 * - Standard modal with custom content
 * - Confirm modal with icon, message, and action buttons
 */

import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'small' | 'medium' | 'large';
export type ModalVariant = 'default' | 'confirm';
export type ConfirmVariant = 'success' | 'danger' | 'warning' | 'info';

export interface ModalProps {
  cancelText?: string;
  children?: ReactNode;
  confirmVariant?: ConfirmVariant;
  confirmText?: string;
  disableClose?: boolean;
  footer?: ReactNode;
  icon?: ReactNode;
  isOpen: boolean;
  loading?: boolean;
  message?: string;
  noPadding?: boolean;
  onCancel?: () => void;
  onClose: () => void;
  onConfirm?: () => void;
  size?: ModalSize;
  title?: string;
  variant?: ModalVariant;
}

export interface StyledModalContainerProps {
  $isClosing: boolean;
  $size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface StyledModalOverlayProps {
  $isClosing: boolean;
}

export interface StyledModalIconProps {
  $variant: ConfirmVariant;
}
