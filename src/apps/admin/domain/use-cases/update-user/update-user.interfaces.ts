/**
 * Update User Use Case Interfaces
 *
 * Interface contracts for UpdateUserUseCase input/output.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 * Separated for better maintainability and reusability.
 *
 */

import type { NextRequest } from 'next/server';

import type { UserEntity } from '@interfaces';
import type { UserRole } from '@domain-types';

export interface UpdateUserParams {
  request: NextRequest;
  id: string;
  updates: {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: UserRole;
    isActive?: boolean;
  };
  updateType?: 'full' | 'partial';
}

export interface UserChangeDetails {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export interface UpdateUserSuccessResponse {
  success: true;
  data: {
    user: UserEntity;
    changes: UserChangeDetails[];
    updatedBy: string;
  };
  message: string;
  timestamp: string;
}

export interface UpdateUserErrorResponse {
  success: false;
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  status: number;
  details?: {
    field?: string;
    value?: unknown;
    code?: string;
    originalError?: unknown;
  };
}

export type UpdateUserResponse = UpdateUserSuccessResponse | UpdateUserErrorResponse;
