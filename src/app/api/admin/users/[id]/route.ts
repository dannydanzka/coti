/**
 * Admin User API (Individual User) - Thin Controller
 *
 * GET /api/admin/users/[id] - Get user by ID
 * PUT /api/admin/users/[id] - Update user (full update)
 * PATCH /api/admin/users/[id] - Update user (partial update)
 * DELETE /api/admin/users/[id] - Delete user
 *
 * Context7 Compliant: withAuthMiddleware, Use Case delegation, handleApiError, HTTP_STATUS constants
 */

import { NextRequest, NextResponse } from 'next/server';

import {
  executeDeleteUser,
  executeGetUserById,
  executeUpdateUser,
} from '@apps/admin/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { withAuthMiddleware } from '@middleware';

import type { UserRouteParams } from './route.interfaces';

/**
 * GET /api/admin/users/[id] - Get user by ID
 */
export const GET = withAuthMiddleware(
  async (request: NextRequest, context: UserRouteParams) => {
    try {
      const { id } = await context.params;

      const result = await executeGetUserById({ id, request });

      if (!result.success) {
        return NextResponse.json(result, { status: result.status || HTTP_STATUS.BAD_REQUEST });
      }

      return NextResponse.json(result, { status: HTTP_STATUS.OK });
    } catch (error) {
      return handleApiError(error, 'GET /api/admin/users/[id]');
    }
  },
  ['admin']
);

/**
 * PUT /api/admin/users/[id] - Update user (full update)
 */
export const PUT = withAuthMiddleware(
  async (request: NextRequest, context: UserRouteParams) => {
    try {
      const { id } = await context.params;
      const updates = await request.json();

      const result = await executeUpdateUser({
        id,
        request,
        updateType: 'full',
        updates,
      });

      if (!result.success) {
        return NextResponse.json(result, { status: HTTP_STATUS.BAD_REQUEST });
      }

      return NextResponse.json(result, { status: HTTP_STATUS.OK });
    } catch (error) {
      return handleApiError(error, 'PUT /api/admin/users/[id]');
    }
  },
  ['admin']
);

/**
 * PATCH /api/admin/users/[id] - Update user (partial update)
 */
export const PATCH = withAuthMiddleware(
  async (request: NextRequest, context: UserRouteParams) => {
    try {
      const { id } = await context.params;
      const updates = await request.json();

      const result = await executeUpdateUser({
        id,
        request,
        updateType: 'partial',
        updates,
      });

      if (!result.success) {
        return NextResponse.json(result, { status: HTTP_STATUS.BAD_REQUEST });
      }

      return NextResponse.json(result, { status: HTTP_STATUS.OK });
    } catch (error) {
      return handleApiError(error, 'PATCH /api/admin/users/[id]');
    }
  },
  ['admin']
);

/**
 * DELETE /api/admin/users/[id] - Delete user
 */
export const DELETE = withAuthMiddleware(
  async (request: NextRequest, context: UserRouteParams) => {
    try {
      const { id } = await context.params;

      const result = await executeDeleteUser({ id, request });

      if (!result.success) {
        return NextResponse.json(result, { status: result.status || HTTP_STATUS.BAD_REQUEST });
      }

      return NextResponse.json(result, { status: HTTP_STATUS.OK });
    } catch (error) {
      return handleApiError(error, 'DELETE /api/admin/users/[id]');
    }
  },
  ['admin']
);
