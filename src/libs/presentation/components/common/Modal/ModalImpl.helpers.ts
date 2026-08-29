/**
 * Modal Helpers
 *
 * Pure size-token normalization for the unified modal.
 */

import type { ModalSize } from './Modal.interfaces';

export const normalizeSize = (size: ModalSize): 'sm' | 'md' | 'lg' | 'xl' | 'full' => {
  const sizeMap: Record<ModalSize, 'sm' | 'md' | 'lg' | 'xl' | 'full'> = {
    full: 'full',
    large: 'lg',
    lg: 'lg',
    md: 'md',
    medium: 'md',
    sm: 'sm',
    small: 'sm',
    xl: 'xl',
  };
  return sizeMap[size];
};
