/**
 * Request Password Reset Use Case Interfaces
 *
 * Type definitions for password reset request operations.
 *
 * @pattern Clean Architecture - Use Case Layer
 * @context DearAdry (Auth - Password Reset)
 */

export interface RequestPasswordResetParams {
  email: string;
}

export interface RequestPasswordResetResponse {
  data: {
    message: string;
  };
  status: number;
  success: true;
}

export interface RequestPasswordResetErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  field?: string;
  status: number;
  success: false;
}

export type RequestPasswordResetResult =
  RequestPasswordResetResponse | RequestPasswordResetErrorResponse;
