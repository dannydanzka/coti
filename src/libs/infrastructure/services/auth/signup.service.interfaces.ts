/**
 * Signup Service Interfaces
 *
 * DearAdry: Challenge & Events vertical
 */

import type { AuthUserApiData } from '@interfaces';

export interface SignupData extends Record<string, unknown> {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface SignupResponse {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  token?: string | null;
  user?: AuthUserApiData;
  userId: string;
}

export interface ResendVerificationData extends Record<string, unknown> {
  email: string;
}
