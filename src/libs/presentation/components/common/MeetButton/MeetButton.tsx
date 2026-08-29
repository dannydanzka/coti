/**
 * MeetButton Component
 *
 * Call-to-action for the meet landing. A skinned, instance-agnostic wrapper over
 * the sovereignty-ui Button (see styled): variants map to landing roles, not to a
 * brand, so a future meet reuses it unchanged. Replaces the library PopButton,
 * which cannot be re-skinned (it does not forward className).
 */

'use client';

import type { MeetButtonProps } from './MeetButton.interfaces';

import { SkinnedButton } from './MeetButton.styled';

export const MeetButton = ({
  children,
  disabled,
  fullWidth,
  onClick,
  size = 'medium',
  type = 'button',
  variant = 'primary',
}: MeetButtonProps) => (
  <SkinnedButton
    $fullWidth={Boolean(fullWidth)}
    $size={size}
    $variant={variant}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    {children}
  </SkinnedButton>
);
