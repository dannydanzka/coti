/**
 * useDataTable Hook Interfaces
 *
 * Type definitions for the centralized data table hook.
 * Composes usePagination and useTableSort.
 */

import type { ReactNode } from 'react';

import type { UsePaginationOptions, UsePaginationReturn } from '../usePagination';
import type { UseTableSortOptions, UseTableSortReturn } from '../useTableSort';

/**
 * Column configuration for DataTable
 */
export interface ColumnConfig<T, TField extends string = string> {
  /** Unique key for the column (matches entity field or custom key) */
  key: TField;
  /** Display label (Spanish) */
  label: string;
  /** Fixed width (e.g., '100px', '20%') */
  width?: string;
  /** Whether column is sortable (default: true if key is valid sort field) */
  sortable?: boolean;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom render function for cell content */
  render?: (item: T, index: number) => ReactNode;
}

/**
 * Options for useDataTable hook
 */
export interface UseDataTableOptions<T, TField extends string> {
  /** Data items to display */
  items: T[];
  /** Column configuration */
  columns: ColumnConfig<T, TField>[];
  /** Pagination options */
  pagination?: UsePaginationOptions;
  /** Sort options (required if any column is sortable) */
  sort?: UseTableSortOptions<TField>;
  /** Custom filter function (applied before sorting/pagination) */
  filterFn?: (item: T) => boolean;
  /** Custom sort value getter for each field */
  getSortValue?: (item: T, field: TField) => string | number | boolean | Date | null | undefined;
}

/**
 * Return type for useDataTable hook
 */
export interface UseDataTableReturn<T, TField extends string> {
  /** Items after filtering */
  filteredItems: T[];
  /** Items after filtering, sorting, and pagination */
  paginatedItems: T[];
  /** Total number of items (after filtering) */
  totalItems: number;
  /** Pagination state and handlers */
  pagination: UsePaginationReturn;
  /** Sorting state and handlers */
  sort: UseTableSortReturn<TField>;
  /** Column configuration (passed through) */
  columns: ColumnConfig<T, TField>[];
}
