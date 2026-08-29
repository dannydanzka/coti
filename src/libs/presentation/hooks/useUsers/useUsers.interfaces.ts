/**
 * useUsers Hook Interfaces
 *
 * Type definitions for user management hook operations.
 *
 */

import { createUserAction, updateUserAction } from '@redux';
import type { UserRole } from '@domain-types';

/** Payload accepted by the createUser thunk (kept in sync with the slice action) */
export type CreateUserPayload = Parameters<typeof createUserAction>[0];

/** Data slice of the updateUser thunk payload (kept in sync with the slice action) */
export type UpdateUserData = Parameters<typeof updateUserAction>[0]['data'];

/**
 * Request payload for creating a new user
 */
export interface CreateUserRequest {
  email: string;
  name: string;
  role: UserRole;
}

/**
 * Request payload for updating an existing user
 */
export interface UpdateUserRequest {
  id: string;
  email?: string;
  isActive?: boolean;
  name?: string;
  role?: UserRole;
}
