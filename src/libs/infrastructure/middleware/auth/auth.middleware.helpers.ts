/**
 * Auth Middleware Helpers
 *
 * Pure token-extraction transforms for the auth middleware.
 */

import { NextRequest } from 'next/server';

/** Extract token from authorization header */
export const extractTokenFromHeader = (authHeader: string | null): string | null => {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};

/** Extract token from cookies */
export const extractTokenFromCookies = (request: NextRequest): string | null => {
  const authCookie = request.cookies.get('auth-token');
  return authCookie?.value ?? null;
};
