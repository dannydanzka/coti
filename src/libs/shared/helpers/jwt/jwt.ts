/**
 * JWT Helper
 *
 * Encapsulates JWT operations using jsonwebtoken.
 * This helper can be imported in domain layer via @helpers.
 */

import { decode, sign, type SignOptions, verify } from 'jsonwebtoken';

import { logError } from '@logger';

import type { JwtPayload, JwtSignOptions, JwtVerifyResult } from './jwt.interfaces';

/**
 * Sign a JWT token with the given payload
 */
export const signToken = (
  payload: JwtPayload,
  secret: string,
  options?: JwtSignOptions
): string => {
  const signOptions: SignOptions = {};
  if (options?.expiresIn) {
    signOptions.expiresIn = options.expiresIn as SignOptions['expiresIn'];
  }
  return sign(payload, secret, signOptions);
};

/**
 * Verify a JWT token and return the payload
 * Note: try-catch is required here because jsonwebtoken throws on invalid tokens
 */
export const verifyToken = <T = JwtPayload>(token: string, secret: string): JwtVerifyResult<T> => {
  try {
    const payload = verify(token, secret) as T;
    return { payload, valid: true };
  } catch (error) {
    logError(error, 'verifyToken');
    return { error: 'Token inválido o expirado', valid: false };
  }
};

/**
 * Decode a JWT token without verification (for reading payload only)
 */
export const decodeToken = <T = JwtPayload>(token: string): T | null => {
  return decode(token) as T | null;
};
