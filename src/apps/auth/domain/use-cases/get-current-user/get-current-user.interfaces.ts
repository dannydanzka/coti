/**
 * Get Current User Use Case Interfaces
 *
 * Interface contracts for GetCurrentUserUseCase input/output.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 */

import type { NextRequest } from 'next/server';

import type { UserEntity } from '@interfaces';

export interface GetCurrentUserParams {
  request: NextRequest;
}

export interface SessionMetadata {
  tokenIssuedAt: number;
  tokenExpiresAt: number;
  sessionType: string;
}

export interface GetCurrentUserResponse {
  data: {
    user: Omit<UserEntity, 'passwordHash'>;
    session: SessionMetadata;
  };
  status: number;
  success: true;
}

export interface GetCurrentUserErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success: false;
  status: number;
}

export type GetCurrentUserResult = GetCurrentUserResponse | GetCurrentUserErrorResponse;

export interface TokenExtractionResult {
  isValid: boolean;
  i18nKey?: string;
  token?: string;
}

export interface PayloadValidationResult {
  isValid: boolean;
  i18nKey?: string;
  field?: string;
}
