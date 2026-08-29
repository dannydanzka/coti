/**
 * Base Repository Interfaces
 *
 * Type definitions for base repository utilities and patterns.
 */

export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata: {
    lastUpdated: string;
    [key: string]: unknown;
  };
}

export interface ErrorResponse<T = null> {
  success: false;
  data: T;
  error: string;
  metadata: {
    lastUpdated: string;
  };
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface BaseRepositoryContract<TEntity = unknown, TId = string> {
  findById: (id: TId) => Promise<TEntity | null>;
  findAll: () => Promise<TEntity[]>;
  create: (entity: Partial<TEntity>) => Promise<TEntity>;
  update: (id: TId, updates: Partial<TEntity>) => Promise<TEntity | null>;
  delete: (id: TId) => Promise<boolean>;
}

export interface FilterOptions<T = Record<string, unknown>> {
  filters?: T;
  pagination?: PaginationOptions;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface RepositoryResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
  metadata?: Record<string, unknown>;
}
