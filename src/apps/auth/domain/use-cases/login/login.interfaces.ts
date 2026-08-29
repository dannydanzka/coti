/**
 * Login Use Case Interfaces
 *
 * Interface contracts for LoginUseCase input/output.
 * Following DOMAIN-OBJECTS-STANDARDS: Interfaces = Contracts & Shapes (Communication)
 * Separated for better maintainability and reusability.
 */

import type { NextRequest } from 'next/server';

import type { UserEntity } from '@interfaces';

export interface LoginParams {
  request: NextRequest;
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
    expiresIn: string;
    user: Omit<UserEntity, 'passwordHash'>;
  };
  status: number;
  success: true;
}

export interface LoginErrorResponse {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success: false;
  status: number;
}

export interface AuthResult {
  user: UserEntity;
  token: string;
  expiresAt: Date;
}

export type LoginResult = LoginResponse | LoginErrorResponse;
