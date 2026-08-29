/**
 * ModalContainer Styled Interfaces
 */

import type { ModalType } from '@redux';

export interface OverlayProps {
  $isOpen: boolean;
}

export interface ContainerProps {
  $type: ModalType;
}

export interface ButtonProps {
  $variant?: 'primary' | 'secondary';
}
