/**
 * Auth Service Interfaces
 *
 * Interface contracts for auth service operations.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 *
 */

import type { UserEntity } from '@interfaces';
import type { UserRole } from '@domain-types';

/**
 * Generic API Response wrapper for auth operations
 */
export interface AuthApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Login API data returned from backend
 */
export interface LoginApiData {
  token: string;
  user?: AuthUserApiData;
}

/**
 * User data as returned by auth API
 */
export interface AuthUserApiData {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  isVerified: boolean;
  lastName: string;
  lastLoginAt: string | null;
  role: UserRole;
  updatedAt: string;
}

/**
 * Login response from service
 */
export interface LoginResponse {
  success: boolean;
  token?: string | undefined;
  user?: UserEntity | undefined;
}
