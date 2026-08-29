/**
 * Get Users Use Case Interfaces
 *
 * Interface contracts for GetUsersUseCase input/output.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 * Separated for better maintainability and reusability.
 *
 */

import type { NextRequest } from 'next/server';

import type { UserEntity } from '@interfaces';

export type { UserFilters, UserListResponse, UserPagination } from '@interfaces';

export interface GetUsersParams {
  request: NextRequest;
  page?: number;
  limit?: number;
  role?: string;
  isActive?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface EnhancedUserEntity extends UserEntity {
  canBeDeleted: boolean;
  canBeUpdated: boolean;
  isCurrentUser: boolean;
  displayName: string;
}

export interface GetUsersSuccessResponse {
  success: true;
  data: {
    users: EnhancedUserEntity[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    filters: {
      role?: string;
      isActive?: boolean;
      search?: string;
    };
    sorting: {
      sortBy: string;
      sortOrder: string;
    };
  };
  timestamp: string;
}

export interface GetUsersErrorResponse {
  success: false;
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  status: number;
  details?: Record<string, unknown>;
}

export type GetUsersResponse = GetUsersSuccessResponse | GetUsersErrorResponse;
