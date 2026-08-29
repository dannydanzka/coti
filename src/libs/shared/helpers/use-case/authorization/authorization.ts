/**
 * Authorization Helper
 *
 *
 * Centralized authorization logic for use cases across all contexts.
 */

import type { NextRequest } from 'next/server';

import { HTTP_STATUS } from '@constants';
import { validateAdminRole } from '@middleware';

import type { AuthResult } from './authorization.interfaces';
import type { UseCaseErrorResponse } from '../../error-handling/use-case-error-handler';

/**
 * Validates admin role and returns authenticated user or error response
 *
 * Centralizes the common authorization pattern used across all use cases:
 * - Validates role with specified permissions
 * - Returns structured success/error result
 * - Handles missing user scenario
 *
 * This helper can be used in any context (admin, public, auth, etc.)
 *
 * @param request - Next.js request object with auth headers
 * @param allowedRoles - Array of roles permitted for this operation
 * @returns Promise with success (user) or failure (error response)
 *
 * @example
 * ```typescript
 * // Admin context
 * const authResult = await validateAndGetUser(params.request, [USER_ROLES.ADMIN]);
 * if (!authResult.success) {
 *   return authResult.error;
 * }
 * const user = authResult.user;
 *
 * // Public context (if needed)
 * const authResult = await validateAndGetUser(params.request, [USER_ROLES.USER]);
 * if (!authResult.success) {
 *   return authResult.error;
 * }
 * ```
 */
export const validateAndGetUser = async <T = Record<string, unknown>>(
  request: NextRequest,
  allowedRoles: string[]
): Promise<AuthResult<T>> => {
  const authResult = await validateAdminRole(request, allowedRoles);

  if (!authResult.success || !authResult.user) {
    /**
     * Forward the specific reason from the middleware (token expired/invalid,
     * insufficient permissions, deactivated account) instead of collapsing
     * everything into a generic "Acceso denegado". This keeps the toast
     * descriptive and lets the client void the session on a 401.
     */
    const isErrorStatus = !authResult.success && authResult.status >= HTTP_STATUS.BAD_REQUEST;
    const errorResponse: UseCaseErrorResponse = {
      status: isErrorStatus ? authResult.status : HTTP_STATUS.UNAUTHORIZED,
      success: false,
    };

    if (authResult.error) errorResponse.error = authResult.error;
    if (authResult.i18n) errorResponse.i18n = authResult.i18n;

    if (!errorResponse.error && !errorResponse.i18n) {
      errorResponse.i18n = { key: 'errors.auth.accessDenied' };
    }

    return { error: errorResponse as T, success: false };
  }

  const { user } = authResult;
  return {
    success: true,
    user: {
      email: user.email,
      firstName: user.firstName ?? '',
      id: user.id,
      lastName: user.lastName ?? '',
      role: user.role,
    },
  };
};
