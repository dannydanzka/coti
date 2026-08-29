/**
 * Authentication Logout API - Thin Controller
 *
 * RESTful endpoint for user logout with token invalidation and session cleanup.
 * Following Clean Architecture - delegates all business logic to Use Cases.
 *
 * Context7 Compliant: Use Case delegation, handleApiError, HTTP_STATUS constants
 *
 * Route: /api/auth/logout
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeLogout } from '@apps/auth/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';

/**
 * POST /api/auth/logout
 * User logout with token invalidation and session cleanup
 */
export const POST = async (request: NextRequest) => {
  try {
    const result = await executeLogout({ request });

    const response = NextResponse.json(result, {
      status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
    });

    response.cookies.set('auth-token', '', {
      expires: new Date(0),
      httpOnly: true,
      path: '/',
    });

    return response;
  } catch (error) {
    return handleApiError(error, 'POST /api/auth/logout');
  }
};
