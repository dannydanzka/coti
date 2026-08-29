/**
 * Signup Use Case Interfaces
 *
 * Interface contracts for SignupUseCase input/output.
 * Coti: No email verification - immediate account access.
 *
 */

import type { NextRequest } from 'next/server';

export interface SignupParams {
  request: NextRequest;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

/** Public user snapshot returned on signup (drives client auto-login). */
export interface SignupUserData {
  createdAt: Date;
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  isVerified: boolean;
  lastLoginAt: Date | null;
  lastName: string;
  role: string;
  updatedAt: Date;
}

export interface SignupSuccessResponse {
  data: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string | null;
    user: SignupUserData;
  };
  message: string;
  success: true;
}

export interface SignupErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  field?: string;
  status: number;
  success: false;
}

export type SignupResult = SignupSuccessResponse | SignupErrorResponse;

export interface ValidationResult {
  i18nKey?: string;
  params?: Record<string, unknown>;
  field?: string;
  isValid: boolean;
}
