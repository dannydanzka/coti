/**
 * useAuthDispatch Hook
 *
 * Encapsulates Redux dispatch for AuthProvider.
 * This hook is internal to AuthProvider and should not be used elsewhere.
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch, SerializableAuthUser } from '@redux';
import {
  loginUser,
  logoutUser,
  resetAuthState,
  restoreSession,
  setDrawerCollapsed,
  signupUser,
} from '@redux';

import type { LoginParams, SignupParams } from './useAuthDispatch.interfaces';

export const useAuthDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dispatchLogin = useCallback(
    async (params: LoginParams) => {
      return dispatch(loginUser(params)).unwrap();
    },
    [dispatch]
  );

  const dispatchSignup = useCallback(
    async (params: SignupParams) => {
      return dispatch(signupUser(params)).unwrap();
    },
    [dispatch]
  );

  const dispatchLogout = useCallback(async () => {
    const result = await dispatch(logoutUser()).unwrap();
    dispatch(setDrawerCollapsed(false));
    return result;
  }, [dispatch]);

  const dispatchRestoreSession = useCallback(
    (user: SerializableAuthUser) => {
      dispatch(restoreSession(user));
    },
    [dispatch]
  );

  const dispatchResetAuthState = useCallback(() => {
    dispatch(resetAuthState());
    dispatch(setDrawerCollapsed(false));
  }, [dispatch]);

  return {
    dispatchLogin,
    dispatchLogout,
    dispatchResetAuthState,
    dispatchRestoreSession,
    dispatchSignup,
  };
};
