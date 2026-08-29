/**
 * Admin Users Count by Role API - Thin Controller
 *
 * RESTful endpoint for user count grouped by role operations.
 * Following Clean Architecture - delegates all business logic to Use Cases.
 *
 * Context7 Compliant: withAuthMiddleware, Use Case delegation, handleApiError, HTTP_STATUS constants
 *
 * Route: /api/admin/users/count-by-role
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeCountUsersByRole } from '@apps/admin/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { withAuthMiddleware } from '@middleware';

/**
 * GET /api/admin/users/count-by-role
 * Retrieves user count grouped by role
 */
export const GET = withAuthMiddleware(
  async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const activeOnlyParam = searchParams.get('activeOnly');

      const result = await executeCountUsersByRole({
        ...(activeOnlyParam !== null && { activeOnly: activeOnlyParam === 'true' }),
        request,
      });

      return NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
      });
    } catch (error) {
      return handleApiError(error, 'GET /api/admin/users/count-by-role');
    }
  },
  ['admin']
);
