/**
 * Users Memoized Selectors
 *
 * Optimized selectors for users state using createSelector.
 * Provides various data transformations and filtering options.
 * Includes happy path and sad path scenarios for comprehensive state handling.
 */

import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector([selectUsersState], (usersState) => usersState.users);

export const selectUsersServerPagination = createSelector(
  [selectUsersState],
  (usersState) => usersState.serverPagination
);

export const selectUsersLoading = createSelector(
  [(state: RootState) => state.global.activeLoaders],
  (activeLoaders) => Boolean(activeLoaders['LOADER_FOR_users/fetchUsers'])
);

export const selectUsersError = createSelector(
  [(state: RootState) => state.global.notifications],
  (notifications) => {
    const errorNotifications = notifications.filter(
      (n) => n.type === 'error' && n.origin?.startsWith('users/')
    );
    return errorNotifications.length > 0
      ? (errorNotifications[errorNotifications.length - 1]?.message ?? null)
      : null;
  }
);

export const selectSelectedUsers = createSelector(
  [selectUsersState],
  (usersState) => usersState.selectedUsers
);

export const selectActiveUsers = createSelector([selectUsers], (users) =>
  users.filter((user) => user.isActive)
);

export const selectAdminUsers = createSelector([selectUsers], (users) =>
  users.filter((user) => user.role === 'admin' || user.role === 'owner')
);

export const selectRegularUsers = createSelector([selectUsers], (users) =>
  users.filter((user) => user.role === 'participant')
);

export const selectUsersSortedByName = createSelector([selectUsers], (users) =>
  [...users].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.trim();
    const nameB = `${b.firstName} ${b.lastName}`.trim();
    return nameA.localeCompare(nameB);
  })
);

export const selectUsersSortedByCreatedAt = createSelector([selectUsers], (users) =>
  [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
);

export const selectInactiveUsers = createSelector([selectUsers], (users) =>
  users.filter((user) => !user.isActive)
);

export const selectUsersWithoutLogin = createSelector([selectUsers], (users) =>
  users.filter((user) => !user.lastLoginAt)
);

export const selectStaleUsers = createSelector([selectUsers], (users) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return users.filter((user) => {
    if (!user.lastLoginAt) return true;
    return new Date(user.lastLoginAt) < thirtyDaysAgo;
  });
});

export const selectUsersStats = createSelector(
  [
    selectUsers,
    selectActiveUsers,
    selectAdminUsers,
    selectRegularUsers,
    selectUsersServerPagination,
  ],
  (allUsers, activeUsers, adminUsers, regularUsers, serverPagination) => ({
    activationRate: allUsers.length > 0 ? (activeUsers.length / allUsers.length) * 100 : 0,
    active: activeUsers.length,
    admins: adminUsers.length,
    inactive: allUsers.length - activeUsers.length,
    regularUsers: regularUsers.length,
    total: serverPagination.total || allUsers.length,
  })
);

export const selectUsersLoadingState = createSelector(
  [selectUsersLoading, selectUsersError, selectUsers],
  (isLoading, error, users) => ({
    error,
    hasData: users.length > 0,
    hasError: Boolean(error),
    isEmpty: users.length === 0,
    isEmptyState: !isLoading && !error && users.length === 0,
    isErrorState: !isLoading && Boolean(error),
    isLoading,
    isReady: !isLoading && !error && users.length > 0,
  })
);

export const selectUsersByRole = createSelector(
  [
    selectUsers,
    (state: RootState, role: string) => {
      void state;
      return role;
    },
  ],
  (users, role) => users.filter((user) => user.role === role)
);

export const selectUsersSearch = createSelector(
  [
    selectUsers,
    (state: RootState, searchTerm: string) => {
      void state;
      return searchTerm;
    },
  ],
  (users, searchTerm) => {
    if (!searchTerm.trim()) return users;
    const lowercaseSearch = searchTerm.toLowerCase();
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(lowercaseSearch) ||
        user.email.toLowerCase().includes(lowercaseSearch) ||
        user.role.toLowerCase().includes(lowercaseSearch)
      );
    });
  }
);
