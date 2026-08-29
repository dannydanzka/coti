/**
 * AuthProvider Component
 *
 * Manages token lifecycle (localStorage + cookie).
 * User data comes from /api/auth/me (single source of truth).
 *
 * Flow:
 * 1. On mount: Check token validity → fetch /api/auth/me → dispatch restoreSession
 * 2. On login: Dispatch loginUser thunk (handles token + Redux state)
 * 3. On logout: Dispatch logoutUser thunk (clears all)
 * 4. On profile update: dispatch updateUserProfile → Redux re-renders consumers
 */

'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { handleRequest } from '@helpers';
import { logError } from '@logger';
import { selectCurrentUser, selectIsAuthenticated } from '@redux';
import type { SerializableAuthUser } from '@redux';

import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_KEY,
  JWT_PARTS_COUNT,
} from './AuthProvider.constants';
import type {
  AuthContextValue,
  AuthProviderProps,
  LoginResult,
  SignupParams,
  SignupResult,
} from './AuthProvider.interfaces';
import { useAuthDispatch } from './hooks';

/**
 * Decode JWT payload without verification (client-side).
 * Used ONLY to check expiration - NOT as data source.
 */
const decodeToken = (token: string): { exp: number; userId: string } | null => {
  const parts = token.split('.');
  if (parts.length !== JWT_PARTS_COUNT) return null;

  try {
    const payload = JSON.parse(atob(parts[1] as string));
    return payload;
  } catch (error) {
    logError(error, 'AuthProvider.decodeToken');
    return null;
  }
};

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload?.exp || !payload?.userId) return false;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
};

const setCookie = (token: string): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`;
};

const clearCookie = (): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const clearToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const {
    dispatchLogin,
    dispatchLogout,
    dispatchResetAuthState,
    dispatchRestoreSession,
    dispatchSignup,
  } = useAuthDispatch();

  const [isInitialized, setIsInitialized] = useState(false);

  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  /**
   * Fetch full user profile from API and restore session in Redux.
   * This is the ONLY source of user data - JWT is only for auth validation.
   */
  const fetchAndRestoreUser = useCallback(async () => {
    try {
      const response = (await handleRequest({
        endpoint: '/api/auth/me',
        method: 'GET',
      })) as { data?: { user: SerializableAuthUser }; success?: boolean };

      if (response?.success && response?.data?.user) {
        dispatchRestoreSession(response.data.user);
      } else {
        clearToken();
        clearCookie();
        dispatchResetAuthState();
      }
    } catch (err) {
      logError(err, 'AuthProvider.fetchAndRestoreUser');
      clearToken();
      clearCookie();
      dispatchResetAuthState();
    }
  }, [dispatchResetAuthState, dispatchRestoreSession]);

  /**
   * Initialize: validate token → fetch user from API → dispatch to Redux
   */
  const initializeAuth = useCallback(async () => {
    const token = getStoredToken();

    if (isTokenValid(token)) {
      setCookie(token as string);
      await fetchAndRestoreUser();
    } else {
      clearToken();
      clearCookie();
      dispatchResetAuthState();
    }

    setIsInitialized(true);
  }, [dispatchResetAuthState, fetchAndRestoreUser]);

  const refreshAuth = useCallback(() => {
    void initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      try {
        const result = await dispatchLogin({ email, password });

        if (result.token) {
          return { user: result.user ?? undefined };
        }

        return { error: 'Error al iniciar sesión' };
      } catch (error) {
        logError(error, 'AuthProvider.login');
        const thunkError = error as {
          i18n?: { key: string; params?: Record<string, unknown> };
          message?: string;
        };
        return {
          error: thunkError.message || 'Credenciales inválidas',
          ...(thunkError.i18n ? { i18n: thunkError.i18n } : {}),
        };
      }
    },
    [dispatchLogin]
  );

  const signup = useCallback(
    async (params: SignupParams): Promise<SignupResult> => {
      try {
        await dispatchSignup(params);
        return { success: true };
      } catch (error) {
        logError(error, 'AuthProvider.signup');
        const thunkError = error as {
          i18n?: { key: string; params?: Record<string, unknown> };
          message?: string;
        };
        return {
          error: thunkError.message || 'Error al crear la cuenta',
          ...(thunkError.i18n ? { i18n: thunkError.i18n } : {}),
        };
      }
    },
    [dispatchSignup]
  );

  const logout = useCallback(async () => {
    try {
      const result = await dispatchLogout();
      clearToken();
      clearCookie();
      router.push(result.redirectTo || '/login');
    } catch (error) {
      logError(error, 'AuthProvider.logout');
      clearToken();
      clearCookie();
      dispatchResetAuthState();
      router.push('/login');
    }
  }, [dispatchLogout, dispatchResetAuthState, router]);

  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  const userId = user?.id ?? null;
  const isLoading = !isInitialized;

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshAuth,
      signup,
      user,
      userId,
    }),
    [isAuthenticated, isLoading, login, logout, refreshAuth, signup, user, userId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
