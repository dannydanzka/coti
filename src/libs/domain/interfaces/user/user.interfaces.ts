/**
 * User Domain Interfaces - Global
 *
 *
 * Shared user interfaces used across multiple contexts.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 * Elevated from admin context to prevent cross-domain imports.
 */

import type { NextRequest } from 'next/server';

import type { UserEntity } from '@entities';
import type { UserRole } from '@domain-types';

export type { UserEntity } from '@entities';

export { getUserFullName, hasCompleteAddress } from '@entities';

/**
 * Request to create a new user (Admin context)
 */
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  isActive?: boolean | undefined;
  phone?: string | undefined;
  age?: number | undefined;
}

/**
 * Request to update an existing user (Admin/Repository context)
 */
export interface UpdateUserRequest {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
  lastLoginAt?: Date | null;
  street?: string | null;
  number?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  phone?: string | null;
  age?: number | null;
  photoUrl?: string | null;
  bio?: string | null;
  deletedAt?: Date | null;
  deletedBy?: string | null;
  passwordHash?: string;
}

/**
 * Params for Create User Use Case (Admin context)
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
 * Params for Update User Use Case (Admin context)
 */
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

/**
 * Request to update user profile (Public context - self update)
 */
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  street: string;
  number: string;
  neighborhood?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  phone?: string;
  age?: number;
  photoUrl?: string;
  bio?: string;
}

/**
 * Params for Update Profile Use Case (Public context)
 */
export interface UpdateProfileParams {
  request: NextRequest;
  userId: string;
  updates: UpdateProfileRequest;
}

/**
 * Response for Update Profile Use Case
 */
export interface UpdateProfileResponse {
  success: boolean;
  data?: {
    user: UserEntity;
  };
  error?: string;
  message?: string;
}

export interface UserChangeDetails {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export interface CreateUserResponse {
  data: UserEntity;
  message: string;
  success: true;
  timestamp?: string;
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
  error: string;
  context?: unknown;
}

type CreateUserResult = CreateUserResponse;
type UpdateUserResponse = UpdateUserSuccessResponse | UpdateUserErrorResponse;
type UpdateUserResult = UpdateUserResponse;
export type { CreateUserResult, UpdateUserResponse, UpdateUserResult };

/**
 * User API Data Transfer Objects
 * Used for API responses - subset of UserEntity (without passwordHash)
 * Includes name fields and basic profile info, excludes sensitive address details
 */
type UserApiData = Pick<
  UserEntity,
  | 'id'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'role'
  | 'isActive'
  | 'createdAt'
  | 'updatedAt'
  | 'lastLoginAt'
  | 'phone'
  | 'city'
  | 'state'
>;

/** Full User API Data (for admin context with full address) */
type UserApiDataFull = Omit<UserEntity, 'passwordHash'>;
export type { UserApiData, UserApiDataFull };
