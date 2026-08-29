/**
 * Logout Use Case Interfaces
 *
 * Type definitions for LogoutUseCase input/output contracts.
 * Separated for better maintainability and reusability.
 */

import type { NextRequest } from 'next/server';

export interface LogoutParams {
  request: NextRequest;
  userAgent?: string;
  ipAddress?: string;
  userId?: string;
}

export interface LogoutResponse {
  message: string;
  status: number;
  success: true;
}

export interface LogoutErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success: false;
  status: number;
}

export type LogoutResult = LogoutResponse | LogoutErrorResponse;
