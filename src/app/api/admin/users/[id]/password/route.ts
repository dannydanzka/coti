/**
 * Admin User Password API - Thin Controller
 *
 * PUT /api/admin/users/[id]/password - Change user password
 *
 * Context7 Compliant: withAuthMiddleware, Use Case delegation, handleApiError, HTTP_STATUS constants
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeChangeUserPassword } from '@apps/admin/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { withAuthMiddleware } from '@middleware';

import type { PasswordRouteParams } from './route.interfaces';

/**
 * PUT /api/admin/users/[id]/password - Change user password
 */
export const PUT = withAuthMiddleware(
  async (request: NextRequest, context: PasswordRouteParams) => {
    try {
      const { id } = await context.params;
      const body = await request.json();
      const { newPassword } = body;

      const result = await executeChangeUserPassword({
        newPassword,
        request,
        userId: id,
      });

      if (!result.success) {
        return NextResponse.json(result, { status: result.status || HTTP_STATUS.BAD_REQUEST });
      }

      return NextResponse.json(result, { status: HTTP_STATUS.OK });
    } catch (error) {
      return handleApiError(error, 'PUT /api/admin/users/[id]/password');
    }
  },
  ['admin']
);
