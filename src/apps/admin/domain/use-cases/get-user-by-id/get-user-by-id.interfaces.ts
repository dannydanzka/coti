/**
 * Get User By ID Use Case Interfaces
 *
 * Type definitions for GetUserByIdUseCase input/output contracts.
 * Separated for better maintainability and reusability.
 *
 */

import type { NextRequest } from 'next/server';

import type { UserEntity } from '@interfaces';

export interface GetUserByIdParams {
  request: NextRequest;
  id: string;
}

export interface EnrichedUserEntity extends UserEntity {
  canBeDeleted: boolean;
  canBeEdited: boolean;
  displayRole: string;
  isCurrentUser: boolean;
  lastActivityFormatted: string;
}

export interface GetUserByIdResponse {
  data: EnrichedUserEntity;
  status: number;
  success: true;
}

export interface GetUserByIdErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success: false;
  status: number;
}

export type GetUserByIdResult = GetUserByIdResponse | GetUserByIdErrorResponse;
