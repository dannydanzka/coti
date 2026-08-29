/**
 * Delete User Use Case Interfaces
 *
 * Type definitions for DeleteUserUseCase input/output contracts.
 * Separated for better maintainability and reusability.
 */

import type { NextRequest } from 'next/server';

export interface DeleteUserParams {
  request: NextRequest;
  id: string;
}

export interface DeleteUserResponse {
  message: string;
  status: number;
  success: true;
}

export interface DeleteUserErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success: false;
  status: number;
}

export type DeleteUserResult = DeleteUserResponse | DeleteUserErrorResponse;
