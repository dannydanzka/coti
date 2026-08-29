/**
 * Auth Token Interfaces
 *
 * All types and interfaces for authentication token entity.
 * Following DOMAIN-OBJECTS-STANDARDS: Types/Interfaces ONLY in .interfaces.ts files.
 *
 */

import type { AuthTokenType, UserRole } from '@domain-types';

export interface AuthTokenEntity {
  id: string;

  value: string;
  type: AuthTokenType;

  issuedAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  isRevoked: boolean;

  userId: string;
  sessionId: string;

  issuer: string;
  audience: string;
  jwtId: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokenPayload {
  sub: string;
  sid: string;
  jti: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  role: UserRole;
  type: AuthTokenType;
}

export interface AuthTokenValidation {
  isValid: boolean;
  isExpired: boolean;
  isRevoked: boolean;
  payload?: AuthTokenPayload;
  error?: string;
  errorCode?: 'EXPIRED' | 'REVOKED' | 'INVALID_FORMAT' | 'INVALID_SIGNATURE' | 'MALFORMED';
}

export interface AuthTokenGenerationRequest {
  userId: string;
  sessionId: string;
  role: UserRole;
  type?: AuthTokenType;
  expiresInHours?: number;
  issuer?: string;
  audience?: string;
}
