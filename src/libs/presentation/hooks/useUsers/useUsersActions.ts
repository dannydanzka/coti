/**
 * useUsersActions Hook
 * User status and password actions.
 */
import { useCallback } from 'react';

import { changeUserPasswordAction, toggleUserStatusWithNotificationAction } from '@redux';
import { logError } from '@logger';
import { useAppDispatch } from '@hooks/useRedux';

import { extractErrorMessage } from './useUsers.helpers';

export const useUsersActions = () => {
  const dispatch = useAppDispatch();

  const toggleUserStatus = useCallback(
    (userId: string, currentStatus: boolean) => {
      return dispatch(toggleUserStatusWithNotificationAction({ currentStatus, userId }));
    },
    [dispatch]
  );

  const changeUserPassword = useCallback(
    async (userId?: string, newPassword?: string) => {
      if (!userId || !newPassword) {
        return { error: 'userId and newPassword are required', success: false as const };
      }
      try {
        await dispatch(changeUserPasswordAction({ newPassword, userId })).unwrap();
        return { success: true as const };
      } catch (err) {
        logError(err, 'useUsersActions.changeUserPassword');
        return { error: extractErrorMessage(err), success: false as const };
      }
    },
    [dispatch]
  );

  return {
    changeUserPassword,
    toggleUserStatus,
  };
};
