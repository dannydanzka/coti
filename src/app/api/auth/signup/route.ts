/**
 * Authentication Signup API - Thin Controller
 *
 * RESTful endpoint for participant self-registration.
 * Coti Model: No email verification, immediate account access.
 *
 * Route: /api/auth/signup
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeSignup } from '@apps/auth/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { signupBodySchema } from '@validation';
import { validateBody } from '@helpers';

/**
 * POST /api/auth/signup
 * Register new participant account
 */
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validated = validateBody(signupBodySchema, body);
    if (!validated.success) return validated.error;

    const { email, firstName, lastName, password } = validated.data;

    const result = await executeSignup({ email, firstName, lastName, password, request });

    const response = NextResponse.json(result, {
      status: result.success ? HTTP_STATUS.CREATED : HTTP_STATUS.BAD_REQUEST,
    });

    if (result.success && result.data?.token) {
      response.cookies.set('auth-token', result.data.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    return response;
  } catch (error) {
    return handleApiError(error, 'POST /api/auth/signup');
  }
};
