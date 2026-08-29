/**
 * useUsersCrud Hook
 * CRUD operations for user management.
 */
import { useCallback } from 'react';

import {
  createUserAction,
  deleteUserWithConfirmationAction,
  fetchUsersAction,
  updateUserAction,
} from '@redux';
import { logError } from '@logger';
import { useAppDispatch } from '@hooks/useRedux';
import type { UserQueryParams } from '@services';

import type { CreateUserPayload, UpdateUserData } from './useUsers.interfaces';
import { extractErrorMessage } from './useUsers.helpers';

export const useUsersCrud = () => {
  const dispatch = useAppDispatch();

  const loadUsers = useCallback(
    (params?: UserQueryParams) => {
      return dispatch(fetchUsersAction(params));
    },
    [dispatch]
  );

  const createUser = useCallback(
    async (userData?: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      role: string;
    }) => {
      if (!userData) {
        return { error: 'userData is required', success: false as const };
      }
      try {
        await dispatch(createUserAction(userData as CreateUserPayload)).unwrap();
        return { success: true as const };
      } catch (err) {
        logError(err, 'useUsersCrud.createUser');
        return { error: extractErrorMessage(err), success: false as const };
      }
    },
    [dispatch]
  );

  const updateUser = useCallback(
    async (userId?: string, data?: Record<string, unknown>) => {
      if (!userId || !data) {
        return { error: 'userId and data are required', success: false as const };
      }
      try {
        await dispatch(
          updateUserAction({
            data: data as UpdateUserData,
            userId,
          })
        ).unwrap();
        return { success: true as const };
      } catch (err) {
        logError(err, 'useUsersCrud.updateUser');
        return { error: extractErrorMessage(err), success: false as const };
      }
    },
    [dispatch]
  );

  const deleteUser = useCallback(
    (userId: string) => {
      return dispatch(deleteUserWithConfirmationAction(userId));
    },
    [dispatch]
  );

  return {
    createUser,
    deleteUser,
    loadUsers,
    updateUser,
  };
};
