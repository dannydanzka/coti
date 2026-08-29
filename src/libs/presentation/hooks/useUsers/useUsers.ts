/**
 * Users Redux Hooks - Context7 Compliant
 *
 * Perfect Redux bridge for user management operations.
 * Provides memoized selectors and actions following useAuth pattern.
 * All operations delegate to Redux thunks exclusively.
 *
 * Composed from specialized hooks for SRP compliance:
 * - useUsersCrud: CRUD operations
 * - useUsersActions: Status toggle and password change
 * - useUsersSelection: Selection and notification operations
 */

import {
  selectSelectedUsers,
  selectUsers,
  selectUsersError,
  selectUsersLoading,
  selectUsersLoadingState,
  selectUsersServerPagination,
  selectUsersStats,
} from '@redux';
import { useAppSelector } from '@hooks/useRedux';

import { useUsersActions } from './useUsersActions';
import { useUsersCrud } from './useUsersCrud';
import { useUsersSelection } from './useUsersSelection';

export const useUsers = () => {
  const crud = useUsersCrud();
  const actions = useUsersActions();
  const selection = useUsersSelection();

  const users = useAppSelector(selectUsers);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const loadingState = useAppSelector(selectUsersLoadingState);
  const serverPagination = useAppSelector(selectUsersServerPagination);
  const stats = useAppSelector(selectUsersStats);

  return {
    ...crud,
    ...actions,
    ...selection,
    deleteUserWithConfirmation: crud.deleteUser,
    error,
    hasData: users.length > 0,
    loading,
    loadingState,
    serverPagination,
    stats,
    toggleUserStatusWithNotification: actions.toggleUserStatus,
    users,
  };
};

export const useUsersState = () => {
  return useAppSelector(selectUsers);
};

export const useUsersLoading = () => {
  return useAppSelector(selectUsersLoading);
};

export const useUsersError = () => {
  return useAppSelector(selectUsersError);
};

export const useSelectedUsers = () => {
  return useAppSelector(selectSelectedUsers);
};
