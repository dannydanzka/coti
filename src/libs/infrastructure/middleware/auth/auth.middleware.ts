/**
 * Authentication Middleware
 *
 * Server-side authentication validation for API routes.
 * Validates JWT tokens and checks user roles.
 */

import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

import { HTTP_STATUS, ROLE_HIERARCHY, USER_ROLES } from '@constants';
import { logError } from '@logger';

import type { AuthResult, JWTPayload } from './auth.middleware.interfaces';
import { extractTokenFromCookies, extractTokenFromHeader } from './auth.middleware.helpers';

export type { AuthResult, JWTPayload };

/**
 * Validate JWT payload structure
 */
const isValidPayloadStructure = (decoded: unknown): decoded is JWTPayload => {
  if (!decoded || typeof decoded !== 'object') {
    return false;
  }

  const payload = decoded as Record<string, unknown>;

  return (
    typeof payload['userId'] === 'string' &&
    typeof payload['email'] === 'string' &&
    typeof payload['firstName'] === 'string' &&
    typeof payload['lastName'] === 'string' &&
    typeof payload['role'] === 'string' &&
    typeof payload['isActive'] === 'boolean'
  );
};

/**
 * Build user object from JWT payload
 */
const buildUserFromPayload = (
  decoded: JWTPayload
): { email: string; firstName: string; id: string; lastName: string; role: string } => ({
  email: decoded.email,
  firstName: decoded.firstName,
  id: decoded.userId,
  lastName: decoded.lastName,
  role: decoded.role,
});

/**
 * Handle JWT verification errors.
 *
 * NOTE: `TokenExpiredError` extends `JsonWebTokenError`, so it MUST be checked
 * first — otherwise expired tokens fall into the generic branch and leak the
 * raw library message ("jwt expired") with no i18n key. Raw messages are never
 * exposed; every failure resolves to a localized key.
 */
const handleJWTError = (error: unknown): AuthResult => {
  if (error instanceof TokenExpiredError) {
    return {
      error: 'Token expirado',
      i18n: { key: 'errors.auth.tokenExpired' },
      status: HTTP_STATUS.UNAUTHORIZED,
      success: false,
    };
  }

  if (error instanceof JsonWebTokenError) {
    return {
      error: 'Token inválido',
      i18n: { key: 'errors.auth.tokenInvalid' },
      status: HTTP_STATUS.UNAUTHORIZED,
      success: false,
    };
  }

  return {
    error: 'Autenticación fallida',
    i18n: { key: 'errors.auth.authenticationFailed' },
    status: HTTP_STATUS.UNAUTHORIZED,
    success: false,
  };
};

/**
 * Validate JWT token from request headers or cookies
 */
export const validateToken = async (request: NextRequest): Promise<AuthResult> => {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader) ?? extractTokenFromCookies(request);

    if (!token) {
      return {
        error: 'Header de autorización faltante o inválido',
        i18n: { key: 'errors.auth.authHeaderInvalid' },
        status: HTTP_STATUS.UNAUTHORIZED,
        success: false,
      };
    }

    const jwtSecret = process.env['JWT_SECRET'];
    if (!jwtSecret) {
      return {
        error: 'Error de configuración del servidor',
        i18n: { key: 'errors.auth.configMissing' },
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
      };
    }

    const decoded = verify(token, jwtSecret) as JWTPayload;

    if (!isValidPayloadStructure(decoded)) {
      return {
        error: 'Token sin payload válido',
        i18n: { key: 'errors.auth.tokenPayloadInvalid' },
        status: HTTP_STATUS.UNAUTHORIZED,
        success: false,
      };
    }

    if (!decoded.isActive) {
      return {
        error: 'Cuenta desactivada',
        i18n: { key: 'errors.auth.accountDeactivated' },
        status: HTTP_STATUS.FORBIDDEN,
        success: false,
      };
    }

    return {
      status: HTTP_STATUS.OK,
      success: true,
      user: buildUserFromPayload(decoded),
    };
  } catch (error) {
    logError(error, 'validateToken');
    return handleJWTError(error);
  }
};

/**
 * Get role hierarchy level for permission checks
 * Higher level = more permissions
 * Uses centralized ROLE_HIERARCHY constant
 */
const getRoleLevel = (role: string): number => {
  return ROLE_HIERARCHY[role as keyof typeof ROLE_HIERARCHY] || 0;
};

/**
 * Check if user has one of the required roles (with hierarchy support)
 */
export const checkRequiredRoles = (authResult: AuthResult, requiredRoles: string[]): AuthResult => {
  if (!authResult.success || !authResult.user) {
    return {
      error: 'Autenticación requerida',
      i18n: { key: 'errors.auth.authenticationRequired' },
      status: HTTP_STATUS.UNAUTHORIZED,
      success: false,
    };
  }

  if (requiredRoles.length === 0) {
    return authResult;
  }

  const userRole = authResult.user.role;
  const userLevel = getRoleLevel(userRole);

  const hasAccess = requiredRoles.some((role) => {
    const requiredLevel = getRoleLevel(role);
    return userLevel >= requiredLevel;
  });

  if (!hasAccess) {
    return {
      error: 'Permisos insuficientes',
      i18n: { key: 'errors.auth.insufficientPermissions' },
      status: HTTP_STATUS.FORBIDDEN,
      success: false,
    };
  }

  return authResult;
};

/**
 * Validate admin role access (with hierarchy support)
 */
export const validateAdminRole = async (
  request: NextRequest,
  requiredRoles: string[] = [USER_ROLES.ADMIN, USER_ROLES.OWNER]
): Promise<AuthResult> => {
  const authResult = await validateToken(request);

  if (!authResult.success || !authResult.user) {
    return authResult;
  }

  return checkRequiredRoles(authResult, requiredRoles);
};

/**
 * Create JSON error response, forwarding the i18n key + localized fallback so
 * the client toast can show a descriptive message (e.g. "Sesión expirada")
 * instead of a raw library string. Never invents a generic English message.
 */
const createErrorResponse = (
  authResult: Pick<AuthResult, 'error' | 'i18n' | 'status'>
): Response => {
  const body: {
    error: string;
    i18n?: { key: string; params?: Record<string, unknown> };
    success: false;
  } = {
    error: authResult.error || 'Error de autenticación',
    success: false,
  };

  if (authResult.i18n) {
    body.i18n = authResult.i18n;
  }

  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
    status: authResult.status,
  });
};

/**
 * Create modified request with user headers
 */
const createAuthenticatedRequest = (request: NextRequest, authResult: AuthResult): NextRequest => {
  const headers: Record<string, string> = {
    ...Object.fromEntries(request.headers.entries()),
    'x-user-email': authResult.user?.email || '',
    'x-user-id': authResult.user?.id || '',
    'x-user-role': authResult.user?.role || '',
  };

  return new NextRequest(request.url, {
    body: request.body,
    headers,
    method: request.method,
  });
};

/**
 * Validate role permissions with hierarchy support
 */
const validateRolePermissions = (
  authResult: AuthResult,
  allowedRoles: string[]
): AuthResult | null => {
  if (allowedRoles.length === 0) {
    return null;
  }

  const roleCheck = checkRequiredRoles(authResult, allowedRoles);
  return roleCheck.success ? null : roleCheck;
};

/**
 * Higher-order function that wraps API handlers with authentication middleware
 * @param handler - The API handler function
 * @param allowedRoles - Array of roles that can access this endpoint
 */
export const withAuthMiddleware = <T = unknown>(
  handler: (request: NextRequest, context: T) => Promise<Response>,
  allowedRoles: string[] = []
) => {
  return async (request: NextRequest, context: T): Promise<Response> => {
    try {
      const authResult = await validateToken(request);

      if (!authResult.success) {
        return createErrorResponse(authResult);
      }

      const roleError = validateRolePermissions(authResult, allowedRoles);

      if (roleError) {
        return createErrorResponse(roleError);
      }

      const modifiedRequest = createAuthenticatedRequest(request, authResult);
      return await handler(modifiedRequest, context);
    } catch (error) {
      logError(error, 'withAuthMiddleware');
      return createErrorResponse({
        error: 'Error interno del servidor',
        i18n: { key: 'errors.generic.serverError' },
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  };
};
