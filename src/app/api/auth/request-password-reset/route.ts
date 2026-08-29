/**
 * Request Password Reset API - Thin Controller
 *
 * RESTful endpoint for initiating password reset.
 * Sends email with secure reset link.
 *
 * Route: /api/auth/request-password-reset
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeRequestPasswordReset } from '@apps/auth/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';

/**
 * POST /api/auth/request-password-reset
 * Request password reset email
 */
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email } = body;

    const result = await executeRequestPasswordReset({ email });

    return NextResponse.json(result, {
      status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
    });
  } catch (error) {
    return handleApiError(error, 'POST /api/auth/request-password-reset');
  }
};
