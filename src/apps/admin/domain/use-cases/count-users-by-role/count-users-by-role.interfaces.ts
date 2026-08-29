/**
 * Count Users By Role Use Case Interfaces
 *
 * Interface contracts for CountUsersByRoleUseCase input/output.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 */

import type { NextRequest } from 'next/server';

import type { UserRole } from '@domain-types';

/**
 * Request parameters for CountUsersByRoleUseCase
 */
export interface CountUsersByRoleParams {
  request: NextRequest;
  activeOnly?: boolean;
}

/**
 * Success response from CountUsersByRoleUseCase
 */
export interface CountUsersByRoleSuccessResponse {
  success: true;
  data: {
    countByRole: Record<UserRole, number>;
    total: number;
    activeOnly: boolean;
  };
  timestamp: string;
}

/**
 * Error response from CountUsersByRoleUseCase
 */
export interface CountUsersByRoleErrorResponse {
  success: false;
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  status: number;
  details?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Complete response type for CountUsersByRoleUseCase
 */
export type CountUsersByRoleResponse =
  CountUsersByRoleSuccessResponse | CountUsersByRoleErrorResponse;
