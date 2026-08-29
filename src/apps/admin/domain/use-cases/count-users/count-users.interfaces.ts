/**
 * Count Users Use Case Interfaces
 *
 * Interface contracts for CountUsersUseCase input/output.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 */

import type { NextRequest } from 'next/server';

import type { UserRole } from '@domain-types';

/**
 * Request parameters for CountUsersUseCase
 */
export interface CountUsersParams {
  request: NextRequest;
  role?: string;
  isActive?: string;
  isVerified?: string;
}

/**
 * Success response from CountUsersUseCase
 */
export interface CountUsersSuccessResponse {
  success: true;
  data: {
    count: number;
    filters?: {
      role?: UserRole;
      isActive?: boolean;
      isVerified?: boolean;
    };
  };
  timestamp: string;
}

/**
 * Error response from CountUsersUseCase
 */
export interface CountUsersErrorResponse {
  success: false;
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  status: number;
  details?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Complete response type for CountUsersUseCase
 */
export type CountUsersResponse = CountUsersSuccessResponse | CountUsersErrorResponse;
