/**
 * Authentication Middleware Interfaces
 *
 * Type definitions for authentication middleware.
 * Coti: Challenge & Events vertical
 */

export interface JWTPayload {
  email: string;
  exp: number;
  firstName: string;
  iat: number;
  isActive: boolean;
  lastName: string;
  role: string;
  userId: string;
}

export interface AuthResult {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  status: number;
  success: boolean;
  user?: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: string;
  } | null;
}
