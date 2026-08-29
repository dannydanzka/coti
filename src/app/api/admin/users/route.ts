/**
 * Admin Users API - Thin Controller
 *
 * RESTful endpoint for user management operations.
 * Following Clean Architecture - delegates all business logic to Use Cases.
 *
 * Context7 Compliant: withAuthMiddleware, Use Case delegation, handleApiError, HTTP_STATUS constants
 *
 * Route: /api/admin/users
 */

import { NextRequest, NextResponse } from 'next/server';

import { createUserBodySchema } from '@validation';
import { executeCreateUser, executeGetUsers } from '@apps/admin/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { validateBody } from '@helpers';
import { withAuthMiddleware } from '@middleware';

/**
 * GET /api/admin/users
 * Retrieves users with filtering, pagination, and search
 */
export const GET = withAuthMiddleware(
  async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);

      const isActive = searchParams.get('isActive');
      const role = searchParams.get('role');
      const search = searchParams.get('search');
      const sortBy = searchParams.get('sortBy');
      const sortOrder = searchParams.get('sortOrder');
      const limitParam = searchParams.get('limit');
      const pageParam = searchParams.get('page');

      const result = await executeGetUsers({
        ...(isActive !== null && { isActive }),
        ...(limitParam !== null && { limit: parseInt(limitParam, 10) }),
        ...(pageParam !== null && { page: parseInt(pageParam, 10) }),
        ...(role !== null && { role }),
        ...(search !== null && { search }),
        ...(sortBy !== null && { sortBy }),
        ...(sortOrder !== null && { sortOrder }),
        request,
      });

      return NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
      });
    } catch (error) {
      return handleApiError(error, 'GET /api/admin/users');
    }
  },
  ['admin']
);

/**
 * POST /api/admin/users
 * Creates a new admin user
 */
export const POST = withAuthMiddleware(
  async (request: NextRequest) => {
    try {
      const body = await request.json();
      const validated = validateBody(createUserBodySchema, body);
      if (!validated.success) return validated.error;

      const result = await executeCreateUser({
        age: body.age,
        email: validated.data.email,
        firstName: validated.data.firstName,
        isActive: validated.data.isActive,
        lastName: validated.data.lastName,
        password: validated.data.password,
        phone: validated.data.phone,
        request,
        role: validated.data.role,
      });

      return NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.CREATED : HTTP_STATUS.BAD_REQUEST,
      });
    } catch (error) {
      return handleApiError(error, 'POST /api/admin/users');
    }
  },
  ['admin']
);
