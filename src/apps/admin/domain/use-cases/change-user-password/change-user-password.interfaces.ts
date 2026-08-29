/**
 * Change User Password Use Case Interfaces
 *
 * Type definitions for ChangeUserPassword input/output contracts.
 */

import type { NextRequest } from 'next/server';

export interface ChangeUserPasswordParams {
  request: NextRequest;
  userId: string;
  newPassword: string;
}

export interface ChangeUserPasswordResponse {
  message: string;
  success: true;
}

export interface ChangeUserPasswordErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success: false;
  status: number;
}

export type ChangeUserPasswordResult = ChangeUserPasswordResponse | ChangeUserPasswordErrorResponse;
