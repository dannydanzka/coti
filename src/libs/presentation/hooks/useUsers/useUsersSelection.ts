/**
 * useUsersSelection Hook
 * User selection and notification operations.
 */
import { useCallback } from 'react';

import {
  clearAllNotifications,
  clearSelectedUsersAction,
  dequeueNotification,
  selectSelectedUsers,
  selectUserAction,
  unselectUserAction,
} from '@redux';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';

export const useUsersSelection = () => {
  const dispatch = useAppDispatch();
  const selectedUsers = useAppSelector(selectSelectedUsers);

  const selectUserById = useCallback(
    (userId: string) => {
      dispatch(selectUserAction(userId));
    },
    [dispatch]
  );

  const unselectUserById = useCallback(
    (userId: string) => {
      dispatch(unselectUserAction(userId));
    },
    [dispatch]
  );

  const clearSelectedUsers = useCallback(() => {
    dispatch(clearSelectedUsersAction());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearAllNotifications());
  }, [dispatch]);

  const clearNotification = useCallback(
    (notificationId: string) => {
      dispatch(dequeueNotification({ notificationId }));
    },
    [dispatch]
  );

  return {
    clearError,
    clearNotification,
    clearSelectedUsers,
    selectUserById,
    selectedUsers,
    unselectUserById,
  };
};
