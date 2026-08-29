/**
 * JWT Helper Interfaces
 *
 * Abstracts JWT operations for use in domain layer.
 */

export interface JwtSignOptions {
  expiresIn?: string | number;
}

export interface JwtPayload {
  [key: string]: unknown;
}

export interface JwtVerifyResult<T = JwtPayload> {
  valid: boolean;
  payload?: T;
  error?: string;
}
