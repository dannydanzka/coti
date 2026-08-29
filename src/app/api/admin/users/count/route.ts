/**
 * Admin Users Count API - Thin Controller
 *
 * RESTful endpoint for user count operations.
 * Following Clean Architecture - delegates all business logic to Use Cases.
 *
 * Context7 Compliant: withAuthMiddleware, Use Case delegation, handleApiError, HTTP_STATUS constants
 *
 * Route: /api/admin/users/count
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeCountUsers } from '@apps/admin/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { withAuthMiddleware } from '@middleware';

/**
 * GET /api/admin/users/count
 * Retrieves user count with optional filters
 */
export const GET = withAuthMiddleware(
  async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);

      const role = searchParams.get('role');
      const isActive = searchParams.get('isActive');
      const isVerified = searchParams.get('isVerified');

      const result = await executeCountUsers({
        ...(isActive !== null && { isActive }),
        ...(isVerified !== null && { isVerified }),
        ...(role !== null && { role }),
        request,
      });

      return NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
      });
    } catch (error) {
      return handleApiError(error, 'GET /api/admin/users/count');
    }
  },
  ['admin']
);
