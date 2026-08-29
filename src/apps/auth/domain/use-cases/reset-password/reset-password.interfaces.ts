/**
 * Reset Password Use Case Interfaces
 *
 * Type definitions for password reset completion operations.
 *
 * @pattern Clean Architecture - Use Case Layer
 * @context Coti (Auth - Password Reset)
 */

export interface ResetPasswordParams {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  data: {
    message: string;
  };
  status: number;
  success: true;
}

export interface ResetPasswordErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  field?: string;
  status: number;
  success: false;
}

export type ResetPasswordResult = ResetPasswordResponse | ResetPasswordErrorResponse;

export interface PasswordValidationResult {
  isValid: boolean;
  i18nKey?: string;
  params?: Record<string, unknown>;
}
