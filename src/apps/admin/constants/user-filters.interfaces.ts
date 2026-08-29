/**
 * User Filters Interface
 *
 * Type-safe interface for user table filters.
 */

export interface UserFilterValues extends Record<string, unknown> {
  isActive?: string;
  role?: string;
  searchTerm?: string;
}
