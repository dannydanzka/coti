/**
 * AuthProvider Interfaces
 *
 * Type definitions for the centralized authentication provider.
 * Single source of truth for authentication state.
 */

import type { SerializableAuthUser } from '@redux';

export interface LoginResult {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  user?: SerializableAuthUser;
}

export interface SignupParams {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface SignupResult {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success?: boolean;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  refreshAuth: () => void;
  signup: (params: SignupParams) => Promise<SignupResult>;
  user: SerializableAuthUser | null;
  userId: string | null;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
