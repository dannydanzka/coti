/**
 * Authentication Me API - Thin Controller
 *
 * RESTful endpoint for getting current user profile.
 * Following Clean Architecture - delegates all business logic to Use Cases.
 *
 * Context7 Compliant: Use Case delegation, handleApiError, HTTP_STATUS constants
 *
 * Route: /api/auth/me
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeGetCurrentUser } from '@apps/auth/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';

/**
 * GET /api/auth/me
 * Get current authenticated user profile
 */
export const GET = async (request: NextRequest) => {
  try {
    const result = await executeGetCurrentUser({ request });

    return NextResponse.json(result, {
      status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.UNAUTHORIZED,
    });
  } catch (error) {
    return handleApiError(error, 'GET /api/auth/me');
  }
};
