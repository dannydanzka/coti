/**
 * useAuth Hook Interfaces
 *
 * Type definitions for authentication hook.
 * Uses AuthUser from AuthContext (single source of truth).
 */

import type { LoginResult, SignupParams, SignupResult } from '@providers';
import type { SerializableAuthUser } from '@redux';

export interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  signup: (params: SignupParams) => Promise<SignupResult>;
  user: SerializableAuthUser | null;
  userId: string | null;
}
