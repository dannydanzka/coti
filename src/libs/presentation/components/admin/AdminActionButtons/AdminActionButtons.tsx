/**
 * AdminActionButtons Components
 *
 * Unified action buttons for admin tables.
 */

'use client';

import { Loader2, Power } from 'lucide-react';

import { BUTTON_SIZE } from '@constants';

import type { ToggleActiveButtonProps } from './AdminActionButtons.interfaces';

import { SpinnerIcon, StyledToggleButton } from './AdminActionButtons.styled';

export const ToggleActiveButton = ({
  isActive,
  isLoading = false,
  onClick,
  shape = 'square',
  size = 'sm',
  title,
}: ToggleActiveButtonProps) => {
  const buttonTitle = title ?? (isActive ? 'Desactivar' : 'Activar');
  const iconSize = size === BUTTON_SIZE.SM ? 14 : 16;

  return (
    <StyledToggleButton
      $isActive={isActive}
      $isLoading={isLoading}
      $shape={shape}
      $size={size}
      title={buttonTitle}
      type='button'
      onClick={isLoading ? undefined : onClick}
    >
      {isLoading ? (
        <SpinnerIcon>
          <Loader2 size={iconSize} />
        </SpinnerIcon>
      ) : (
        <Power size={iconSize} />
      )}
    </StyledToggleButton>
  );
};
