/**
 * AdminPagination Component Interfaces
 *
 * Unified pagination component for admin screens.
 * Supports page navigation, items per page selection, and info display.
 */

import type { ReactNode } from 'react';

export interface AdminPaginationProps {
  children: ReactNode;
  className?: string;
}

export interface StyledPaginationButtonProps {
  $active?: boolean;
}
