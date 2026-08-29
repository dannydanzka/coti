/**
 * Get Users By IDs Use Case Interfaces
 *
 * Interface contracts for GetUsersByIds Use Case input/output.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 */

import type { NextRequest } from 'next/server';

import type { UserEntity } from '@interfaces';

export interface GetUsersByIdsParams {
  ids: string[];
  request: NextRequest;
}

export interface GetUsersByIdsSuccessResponse {
  success: true;
  data: {
    users: UserEntity[];
    requested: number;
    found: number;
    notFound: string[];
  };
  timestamp: string;
}

export interface GetUsersByIdsErrorResponse {
  success: false;
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  status: number;
  details?: Record<string, unknown>;
}

export type GetUsersByIdsResponse = GetUsersByIdsSuccessResponse | GetUsersByIdsErrorResponse;
