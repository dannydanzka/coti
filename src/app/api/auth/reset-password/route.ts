/**
 * Reset Password API - Thin Controller
 *
 * RESTful endpoint for completing password reset.
 * Validates token and updates password.
 *
 * Route: /api/auth/reset-password
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeResetPassword } from '@apps/auth/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { resetPasswordBodySchema } from '@validation';
import { validateBody } from '@helpers';

/**
 * POST /api/auth/reset-password
 * Complete password reset with token
 */
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validated = validateBody(resetPasswordBodySchema, body);
    if (!validated.success) return validated.error;

    const { confirmPassword, newPassword, token } = validated.data;

    const result = await executeResetPassword({ confirmPassword, newPassword, token });

    return NextResponse.json(result, {
      status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
    });
  } catch (error) {
    return handleApiError(error, 'POST /api/auth/reset-password');
  }
};
