/**
 * AdminDropdown Interfaces
 *
 * Type definitions for admin dropdown component.
 */

import type { ReactNode } from 'react';

export type DropdownPosition = 'top' | 'bottom';

export interface DropdownOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface AdminDropdownProps {
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  position?: DropdownPosition;
  value: string;
}

export interface DropdownMenuProps {
  $position: DropdownPosition;
}

export interface DropdownItemProps {
  $disabled?: boolean;
  $selected?: boolean;
}

export interface DropdownTriggerProps {
  'data-open'?: boolean;
}
