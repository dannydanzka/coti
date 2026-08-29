/**
 * useTableSort Hook Interfaces
 *
 * Type definitions for the centralized table sorting hook.
 */

import type { MouseEvent } from 'react';

/**
 * Sort direction type
 */
export type TableSortDirection = 'asc' | 'desc';

/**
 * Options for configuring table sort behavior
 */
export interface UseTableSortOptions<TField extends string> {
  /** Initial sort field */
  defaultField: TField;
  /** Initial sort direction (defaults to 'asc') */
  defaultDirection?: TableSortDirection;
}

/**
 * Return type for useTableSort hook
 * Provides standardized sorting state and handlers
 */
export interface UseTableSortReturn<TField extends string> {
  /** Current sort field */
  sortField: TField;
  /** Current sort direction */
  sortDirection: TableSortDirection;
  /** Set sort field directly (resets direction to 'asc') */
  setSortField: (field: TField) => void;
  /** Toggle sort on a field (same field = toggle direction, different = set to asc) */
  toggleSort: (field: TField) => void;
  /** Handle sort click (reads data-sort-field attribute) */
  handleSortClick: (event: MouseEvent<HTMLElement>) => void;
  /** Create a handler for a specific sort field */
  createSortHandler: (field: TField) => () => void;
  /** Get sort icon for a field ('↕' inactive, '↑' asc, '↓' desc) */
  getSortIcon: (field: TField) => string;
  /** Check if a field is the active sort field */
  isSortActive: (field: TField) => boolean;
  /** Generate a comparator function for sorting arrays */
  getComparator: <T>(
    getFieldValue: (item: T, field: TField) => string | number | boolean | Date | null | undefined
  ) => (a: T, b: T) => number;
}
