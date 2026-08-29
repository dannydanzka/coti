/**
 * usePagination Hook Interfaces
 *
 * Type definitions for the centralized pagination hook.
 */

import type { ChangeEvent, MouseEvent } from 'react';

/**
 * Options for configuring pagination behavior
 */
export interface UsePaginationOptions {
  /** Default page number (defaults to 1) */
  defaultPage?: number;
  /** Default items per page (defaults to PAGINATION.DEFAULT_LIMIT = 20) */
  defaultLimit?: number;
  /** Dependencies that should reset page to 1 when changed */
  resetDependencies?: unknown[];
}

/**
 * Return type for usePagination hook
 * Provides standardized pagination state and handlers
 */
export interface UsePaginationReturn {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Items displayed per page */
  itemsPerPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Start index for slicing (0-indexed) */
  startIndex: number;
  /** End index for slicing (exclusive) */
  endIndex: number;
  /** Set page directly by number */
  setPage: (page: number) => void;
  /** Set items per page */
  setItemsPerPage: (limit: number) => void;
  /** Navigate to first page */
  goToFirstPage: () => void;
  /** Navigate to last page */
  goToLastPage: () => void;
  /** Navigate to previous page */
  goToPrevPage: () => void;
  /** Navigate to next page */
  goToNextPage: () => void;
  /** Handle page button click (reads data-page attribute) */
  handlePageClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Handle items per page select change */
  handleItemsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  /** Create a handler for a specific page number */
  createPageHandler: (page: number) => () => void;
  /** Paginate an array of items */
  paginate: <T>(items: T[]) => T[];
}
