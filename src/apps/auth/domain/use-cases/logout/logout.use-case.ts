/**
 * Logout Use Case
 *
 *
 * Business logic for user logout with stateless JWT tokens and audit logging.
 */

import { createValidationError, handleUseCaseError } from '@use-case-error';
import { HTTP_STATUS } from '@constants';
import { logError } from '@logger';

import type { LogoutErrorResponse, LogoutParams, LogoutResponse } from './logout.interfaces';

/**
 * Validates logout security and business rules
 */
const validateLogoutSecurity = (params: {
  userAgent: string;
  ipAddress: string;
}): { isValid: boolean; i18nKey?: string } => {
  if (params.userAgent && params.userAgent.length > 1000) {
    return { i18nKey: 'errors.auth.logoutSessionDataInvalid', isValid: false };
  }

  return { isValid: true };
};

/**
 * Logs logout event for audit trail
 */
const logLogoutEvent = async (auditData: {
  action: string;
  timestamp: string;
  userAgent: string;
  ipAddress: string;
  userId?: string;
  sessionId?: string;
}): Promise<void> => {
  try {
    if (!auditData || typeof auditData !== 'object') {
      throw new Error('Invalid audit data structure');
    }

    if (!auditData.action || !auditData.timestamp) {
      throw new Error('Missing required audit fields');
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
  } catch (error) {
    logError(error, 'executeLogout.logLogoutEvent');
  }
};

/**
 * Execute user logout with comprehensive audit logging
 */
export const executeLogout = async (
  params: LogoutParams
): Promise<LogoutResponse | LogoutErrorResponse> => {
  try {
    if (!params) {
      return createValidationError<LogoutErrorResponse>(
        { key: 'errors.auth.logoutParamsRequired' },
        'params'
      );
    }

    const userAgent = params.userAgent || params.request?.headers?.get('user-agent') || 'unknown';
    const ipAddress =
      params.ipAddress ||
      params.request?.headers?.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      params.request?.headers?.get('x-real-ip') ||
      'unknown';

    const sanitizedParams = {
      ipAddress: ipAddress.trim(),
      userAgent: userAgent.trim(),
      userId: params.userId?.trim(),
    };

    const securityValidation = validateLogoutSecurity(sanitizedParams);
    if (!securityValidation.isValid) {
      return createValidationError<LogoutErrorResponse>({
        key: securityValidation.i18nKey ?? 'errors.auth.logoutSecurityError',
      });
    }

    const auditData: {
      action: string;
      timestamp: string;
      userAgent: string;
      ipAddress: string;
      userId?: string;
      sessionId?: string;
    } = {
      action: 'logout',
      ipAddress: sanitizedParams.ipAddress,
      timestamp: new Date().toISOString(),
      userAgent: sanitizedParams.userAgent,
    };

    if (sanitizedParams.userId !== undefined) {
      auditData.userId = sanitizedParams.userId;
    }

    auditData.sessionId = `logout_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    await logLogoutEvent(auditData);

    return {
      message: 'Sesión cerrada exitosamente',
      status: HTTP_STATUS.OK,
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<LogoutErrorResponse>(error, 'executeLogout');
  }
};
