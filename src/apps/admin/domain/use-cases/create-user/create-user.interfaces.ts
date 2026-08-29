/**
 * Create User Use Case Interfaces
 *
 * Interface contracts for CreateUserUseCase input/output.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 * Implements discriminated union response pattern for proper error handling.
 *
 */

import type { NextRequest } from 'next/server';

import type { UserEntity } from '@interfaces';
import type { UserRole } from '@domain-types';

/**
 * Request parameters for CreateUserUseCase
 */
export interface CreateUserParams {
  request: NextRequest;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  isActive?: boolean;
  phone?: string;
  age?: number;
}

/**
 * Success response from CreateUserUseCase
 * Following USE-CASES-STANDARDS discriminated union pattern
 */
export interface CreateUserSuccessResponse {
  data: UserEntity;
  message: string;
  success: true;
  timestamp?: string;
}

/**
 * Error response from CreateUserUseCase
 * Following USE-CASES-STANDARDS discriminated union pattern
 */
export interface CreateUserErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  status: number;
  success: false;
  details?: Record<string, unknown>;
  timestamp?: string;
}

/**
 * Complete response type for CreateUserUseCase
 * Following USE-CASES-STANDARDS discriminated union pattern
 */
export type CreateUserResponse = CreateUserSuccessResponse | CreateUserErrorResponse;

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  isActive?: boolean;
  phone?: string;
  age?: number;
}

/**
 * Validation result for input validation helpers
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  context?: Record<string, unknown>;
}
