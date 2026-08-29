/**
 * Authentication Login API - Thin Controller
 *
 * RESTful endpoint for user authentication with email/password.
 * Following Clean Architecture - delegates all business logic to Use Cases.
 *
 * Context7 Compliant: Use Case delegation, handleApiError, HTTP_STATUS constants
 * Security: Rate limited to prevent brute force attacks (5 attempts per 15 minutes)
 *
 * Route: /api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeLogin } from '@apps/auth/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { loginBodySchema } from '@validation';
import { validateBody } from '@helpers';
import { withRateLimit } from '@middleware';

/**
 * POST /api/auth/login
 * Authenticate user with email and password
 * Rate limited: 5 attempts per 15 minutes per IP address
 */
export const POST = withRateLimit(
  async (request: NextRequest) => {
    try {
      const body = await request.json();
      const validated = validateBody(loginBodySchema, body);
      if (!validated.success) return validated.error;

      const { email, password } = validated.data;

      const result = await executeLogin({ email, password, request });

      const response = NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.UNAUTHORIZED,
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
      return handleApiError(error, 'POST /api/auth/login');
    }
  },
  {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  }
);
