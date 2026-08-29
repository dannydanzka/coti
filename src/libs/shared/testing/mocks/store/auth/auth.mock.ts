/**
 * Store Auth Mock Data
 *
 * Mock states for auth slice used in Redux testing.
 * Provides different auth states for comprehensive testing.
 */

import type { AuthState } from '@redux';

export const authMockStates = {
  authenticated: {
    error: null,
    isAuthenticated: true,
    isLoading: false,
    user: {
      createdAt: '2024-01-15T00:00:00.000Z',
      deletedAt: null,
      deletedBy: null,
      email: 'admin@coti.mx',
      firstName: 'María',
      id: 'user_admin_1',
      isActive: true,
      lastLoginAt: null,
      lastName: 'García López',
      passwordHash: '',
      role: 'admin',
      updatedAt: '2024-01-15T00:00:00.000Z',
    },
  } as AuthState,
  error: {
    error: 'Error de autenticación',
    isAuthenticated: false,
    isLoading: false,
    user: null,
  } as AuthState,
  initial: {
    error: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
  } as AuthState,
  loading: {
    error: null,
    isAuthenticated: false,
    isLoading: true,
    user: null,
  } as AuthState,
} as const;
