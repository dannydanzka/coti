/**
 * Auth Slice Interfaces
 *
 * Uses serializable user type for Redux compatibility.
 * Date fields are stored as ISO strings.
 * Aligned with Prisma User model.
 */

import type { UserRole } from '@domain-types';

/**
 * Auth user from JWT token + profile data
 * Used by AuthProvider as single source of truth
 *
 * Required fields: Core identity from JWT
 * Profile fields: null when not loaded, populated from user profile
 */
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  photoUrl: string | null;
  isActive: boolean;

  /** Profile fields - null when not loaded */
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  phone: string | null;
  age: number | null;
  bio: string | null;
}

/**
 * Serializable user for Redux state (Date fields as ISO strings)
 * Exact match with Prisma User model (dates as strings for Redux)
 */
export interface SerializableAuthUser {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;

  street: string | null;
  number: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;

  phone: string | null;
  age: number | null;
  photoUrl: string | null;
  bio: string | null;

  isActive: boolean;
  deletedAt: string | null;
  deletedBy: string | null;

  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

export interface AuthState {
  error: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: SerializableAuthUser | null;
}

/**
 * Login thunk payload
 */
export interface LoginThunkPayload {
  email: string;
  password: string;
}

/**
 * Login thunk result
 */
export interface LoginThunkResult {
  token: string;
  user?: SerializableAuthUser;
}

/**
 * Signup thunk payload
 */
export interface SignupThunkPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

/**
 * Signup thunk result
 */
export interface SignupThunkResult {
  email: string;
  firstName: string;
  lastName: string;
  token?: string | null;
  user?: SerializableAuthUser;
  userId: string;
}
