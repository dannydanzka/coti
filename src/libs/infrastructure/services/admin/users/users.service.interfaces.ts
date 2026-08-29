/**
 * Users Service Interfaces (Admin Context)
 */

import type { UserRole } from '@domain-types';

export interface UserQueryParams {
  isActive?: string;
  limit?: number;
  page?: number;
  role?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ServerPagination {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface GetUsersApiResponse {
  filters: Record<string, unknown>;
  pagination: ServerPagination;
  sorting: { sortBy: string; sortOrder: string };
  users: import('@interfaces').UserApiData[];
}

export interface CountByRoleResponse {
  activeOnly: boolean;
  countByRole: Record<UserRole, number>;
  total: number;
}
