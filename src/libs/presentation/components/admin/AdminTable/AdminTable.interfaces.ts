/**
 * AdminTable Component Interfaces
 *
 * Unified table component for admin screens.
 * Supports sorting, custom row highlighting, and responsive design.
 */

import type { ReactNode } from 'react';

export interface AdminTableProps {
  children: ReactNode;
  className?: string;
}

export interface AdminTableRowProps {
  $highlighted?: boolean;
  $processing?: boolean;
  children: ReactNode;
  className?: string;
}

export interface AdminTableHeaderProps {
  $active?: boolean;
  $sortable?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface StyledTableRowProps {
  $highlighted?: boolean;
  $processing?: boolean;
}

export interface StyledTableHeaderProps {
  $active?: boolean;
  $sortable?: boolean;
  $width?: string;
}

export interface StyledTableCellProps {
  $width?: string;
}
