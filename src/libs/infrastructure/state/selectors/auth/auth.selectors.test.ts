/**
 * Auth Selectors Tests
 *
 * Essential tests for App Redux auth selectors following Essential Testing Philosophy.
 */

import { authMockStates } from '@mocks/store/auth';
import type { RootState } from '@store';

import {
  selectAuthError,
  selectAuthLoading,
  selectAuthStatus,
  selectCanPerformAdminActions,
  selectCurrentUser,
  selectIsAdmin,
  selectIsAuthenticated,
  selectIsOwner,
  selectUserEmail,
  selectUserRole,
} from './auth.selectors';

const mockSpanishUser = {
  email: 'maria.garcia@coti.mx',
  id: 'user-maria',
  name: 'María García López',
  role: 'participant' as const,
};

const mockSpanishAdmin = {
  email: 'ricardo.admin@coti.mx',
  id: 'admin-ricardo',
  name: 'Ricardo Administrador Pérez',
  role: 'admin' as const,
};

const createMockRootState = (authState: unknown): RootState =>
  ({
    auth: authState,
    global: {} as unknown,
    users: {} as unknown,
  }) as unknown as RootState;

describe('Auth Selectors', () => {
  describe('Authentication State for App Users', () => {
    it('should handle authentication status for Spanish users', () => {
      const authenticatedState = createMockRootState(authMockStates.authenticated);
      const unauthenticatedState = createMockRootState(authMockStates.initial);

      expect(selectIsAuthenticated(authenticatedState)).toBe(true);
      expect(selectIsAuthenticated(unauthenticatedState)).toBe(false);
    });

    it('should handle loading and error states', () => {
      const loadingState = createMockRootState(authMockStates.loading);
      const errorState = createMockRootState({
        ...authMockStates.initial,
        error: 'Credenciales inválidas para App',
      });

      expect(selectAuthLoading(loadingState)).toBe(true);
      expect(selectAuthError(errorState)).toBe('Credenciales inválidas para App');
      expect(selectAuthError(createMockRootState(authMockStates.authenticated))).toBeNull();
    });

    it('should return complete auth status', () => {
      const authenticatedState = createMockRootState(authMockStates.authenticated);
      const errorState = createMockRootState(authMockStates.error);

      expect(selectAuthStatus(authenticatedState)).toEqual({
        hasError: false,
        isAuthenticated: true,
        isLoading: false,
      });

      expect(selectAuthStatus(errorState)).toEqual({
        hasError: true,
        isAuthenticated: false,
        isLoading: false,
      });
    });
  });

  describe('User Information for App Participants', () => {
    it('should return current user data for Spanish participants', () => {
      const userState = createMockRootState({
        ...authMockStates.initial,
        isAuthenticated: true,
        user: mockSpanishUser,
      });

      expect(selectCurrentUser(userState)).toEqual(mockSpanishUser);
      expect(selectUserEmail(userState)).toBe('maria.garcia@coti.mx');
      expect(selectUserRole(userState)).toBe('participant');
      expect(selectCurrentUser(createMockRootState(authMockStates.initial))).toBeNull();
    });
  });

  describe('Role-based Access Control for App', () => {
    it('should validate admin roles for Spanish administrators', () => {
      const userState = createMockRootState({
        ...authMockStates.initial,
        isAuthenticated: true,
        user: mockSpanishUser,
      });

      const adminState = createMockRootState({
        ...authMockStates.initial,
        isAuthenticated: true,
        user: mockSpanishAdmin,
      });

      const ownerState = createMockRootState({
        ...authMockStates.initial,
        isAuthenticated: true,
        user: { ...mockSpanishAdmin, role: 'owner' as const },
      });

      expect(selectIsAdmin(userState)).toBe(false);
      expect(selectIsAdmin(adminState)).toBe(true);
      expect(selectIsOwner(userState)).toBe(false);
      expect(selectIsOwner(ownerState)).toBe(true);
    });

    it('should validate admin action permissions', () => {
      const userState = createMockRootState({
        ...authMockStates.initial,
        isAuthenticated: true,
        user: mockSpanishUser,
      });

      const adminState = createMockRootState({
        ...authMockStates.initial,
        isAuthenticated: true,
        user: mockSpanishAdmin,
      });

      const unauthenticatedState = createMockRootState(authMockStates.initial);

      expect(selectCanPerformAdminActions(userState)).toBe(false);
      expect(selectCanPerformAdminActions(adminState)).toBe(true);
      expect(selectCanPerformAdminActions(unauthenticatedState)).toBe(false);
    });
  });

  describe('Memoization for App Performance', () => {
    it('should maintain stable references for selectAuthStatus', () => {
      const state = createMockRootState(authMockStates.authenticated);
      const result1 = selectAuthStatus(state);
      const result2 = selectAuthStatus(state);

      expect(result1).toBe(result2);
    });
  });
});
