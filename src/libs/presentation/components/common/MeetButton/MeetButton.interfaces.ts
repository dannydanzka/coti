/**
 * MeetButton Interfaces
 */

import type { ReactNode } from 'react';

/** Only two skins exist: `primary` (filled) and `outline`. */
export type MeetButtonVariant = 'outline' | 'primary';

/** Two sizes: `medium` (default) and `small` (compact — cards, dense rows). */
export type MeetButtonSize = 'medium' | 'small';

export interface MeetButtonProps {
  children: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: MeetButtonSize;
  type?: 'button' | 'reset' | 'submit';
  variant?: MeetButtonVariant;
  onClick?: () => void;
}
