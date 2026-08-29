/**
 * DataTable Component Interfaces
 *
 * Type definitions for the centralized DataTable component.
 */

import type { ChangeEvent, ReactNode } from 'react';

import type { ColumnConfig, UseDataTableReturn } from '@hooks';

/**
 * DataTable component props
 */
export interface DataTableProps<T, TField extends string> {
  /** DataTable hook return value */
  table: UseDataTableReturn<T, TField>;
  /** Custom row renderer (receives item and index) */
  renderRow: (item: T, index: number) => ReactNode;
  /** Empty state message (Spanish) */
  emptyMessage?: string;
  /** Empty state message when filters applied (Spanish) */
  emptyFilteredMessage?: string;
  /** Whether table has active filters */
  hasFilters?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Entity name for pagination info (singular, Spanish) */
  entityName?: string;
  /** Entity name plural (Spanish) */
  entityNamePlural?: string;
  /** Items per page options override */
  itemsPerPageOptions?: readonly number[];
  /** Whether to show pagination */
  showPagination?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * DataTableHeader props
 */
export interface DataTableHeaderProps<T, TField extends string> {
  /** Column configuration */
  columns: ColumnConfig<T, TField>[];
  /** Whether sort is active for display */
  isSortActive: (field: TField) => boolean;
  /** Handler to toggle sort on a field */
  onSort: (field: TField) => void;
  /** Get sort icon for a field */
  getSortIcon: (field: TField) => string;
}

/**
 * DataTablePagination props
 */
export interface DataTablePaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Items displayed per page */
  itemsPerPage: number;
  /** Available items per page options */
  itemsPerPageOptions: readonly number[];
  /** Start index (0-indexed) */
  startIndex: number;
  /** End index (exclusive) */
  endIndex: number;
  /** Total number of items */
  totalItems: number;
  /** Entity name singular */
  entityName: string;
  /** Entity name plural */
  entityNamePlural: string;
  /** Handler to change page */
  onPageChange: (page: number) => void;
  /** Handler for items per page change */
  onItemsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  /** Navigate to previous page */
  onPrevPage: () => void;
  /** Navigate to next page */
  onNextPage: () => void;
  /** Navigate to first page */
  onFirstPage: () => void;
  /** Navigate to last page */
  onLastPage: () => void;
}
