/**
 * useAuth Hook
 *
 * Authentication hook for managing user session.
 * AuthContext handles token lifecycle (localStorage + cookie).
 * User state lives in Redux (single source of truth, like all other entities).
 *
 * All authentication state comes from AuthContext (which reads from Redux).
 * Do NOT use Redux auth selectors directly - use this hook.
 */

'use client';

import { useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider';
import type { UseAuthReturn } from './useAuth.interfaces';

export const useAuth = (): UseAuthReturn => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    login: context.login,
    logout: context.logout,
    signup: context.signup,
    user: context.user,
    userId: context.userId,
  };
};
