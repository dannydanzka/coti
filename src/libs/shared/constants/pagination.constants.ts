/**
 * Pagination Constants
 *
 * Constants for pagination and data limiting.
 *
 */

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  DEFAULT_PAGE: 1,
  MAX_LIMIT: 100,
} as const;

/**
 * Standard items per page options for all admin tables
 */
export const ITEMS_PER_PAGE_OPTIONS = [20, 50, 100] as const;
