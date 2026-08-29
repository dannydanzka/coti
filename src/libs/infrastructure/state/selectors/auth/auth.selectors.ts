/**
 * Auth Redux Selectors
 *
 * Memoized selectors for auth state.
 * Provides optimized access to authentication data.
 */

import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectAuthLoading = createSelector([selectAuthState], (auth) => auth.isLoading);

export const selectAuthError = createSelector([selectAuthState], (auth) => auth.error);

export const selectCurrentUser = createSelector([selectAuthState], (auth) => auth.user);

export const selectAuthStatus = createSelector([selectAuthState], (auth) => ({
  hasError: Boolean(auth.error),
  isAuthenticated: auth.isAuthenticated,
  isLoading: auth.isLoading,
}));

export const selectUserRole = createSelector([selectCurrentUser], (user) => user?.role || null);

export const selectUserEmail = createSelector([selectCurrentUser], (user) => user?.email || null);

export const selectIsAdmin = createSelector(
  [selectUserRole],
  (role) => role === 'admin' || role === 'owner'
);

export const selectIsOwner = createSelector([selectUserRole], (role) => role === 'owner');

export const selectCanPerformAdminActions = createSelector(
  [selectIsAuthenticated, selectIsAdmin],
  (isAuthenticated, isAdmin) => isAuthenticated && isAdmin
);
