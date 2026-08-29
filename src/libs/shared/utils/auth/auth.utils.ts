/**
 * Auth Infrastructure Utilities
 * Low-level functions for JWT token validation and session management.
 */

import { logError } from '@logger';
import { ROUTES } from '@constants';
import type { UserRole } from '@domain-types';

import type { CurrentUser } from './auth.utils.interfaces';

export type { CurrentUser };

/**
 * Verifies user authentication by validating JWT token.
 * Checks expiration and token structure.
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return false;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const payload = JSON.parse(atob(tokenParts[1] as string));

    if (!payload.exp || !payload.userId) {
      throw new Error('Incomplete or malformed JWT token');
    }

    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch (error) {
    if (process.env['NODE_ENV'] === 'development') {
      logError(error, 'isAuthenticated.tokenValidation');
    }
    return false;
  }
};

/**
 * Logs out user by removing token and all persisted state.
 * Clears authentication data, cookies, and Redux persist cache.
 * Returns the login route for the caller to handle redirection.
 */
export const logout = (): string => {
  if (typeof window === 'undefined') {
    return ROUTES.AUTH.LOGIN;
  }

  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_preferences');

    localStorage.removeItem('persist:dearadry_root');

    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  } catch (error) {
    logError(error, 'logout');
  }

  return ROUTES.AUTH.LOGIN;
};

/**
 * Gets current user data from JWT token.
 * Validates authentication before extracting data.
 */
export const getCurrentUser = (): CurrentUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isAuthenticated()) {
    return null;
  }

  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1] as string));

    if (!payload.userId || !payload.email || !payload.name || !payload.role) {
      throw new Error('Incomplete JWT token: missing required user fields');
    }

    return {
      email: payload.email,
      isActive: payload.isActive ?? true,
      name: payload.name,
      role: payload.role,
      userId: payload.userId,
    };
  } catch (error) {
    logError(error, 'getCurrentUser');
    return null;
  }
};

/**
 * Checks if current user has specific role.
 * Implements role hierarchy: super_admin > admin > manager.
 */
export const hasRole = (role: UserRole): boolean => {
  if (!role) {
    throw new Error('Role is required for verification');
  }

  const user = getCurrentUser();
  if (!user) {
    return false;
  }

  if (!user.isActive) {
    return false;
  }

  switch (role) {
    case 'admin':
      return ['owner', 'admin'].includes(user.role);
    case 'participant':
      return ['owner', 'admin', 'participant'].includes(user.role);
    case 'owner':
      return user.role === 'owner';
    default:
      throw new Error(`Unrecognized role: ${role}`);
  }
};
