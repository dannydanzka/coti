/**
 * Public Viaje Activo API - Thin Controller
 *
 * GET /api/public/viajes/activo - Viaje en curso del usuario (o null).
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeGetViajeActivo } from '@apps/public/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { withAuthMiddleware } from '@middleware';

export const GET = withAuthMiddleware(async (request: NextRequest) => {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { error: 'Sesión inválida', success: false },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const result = await executeGetViajeActivo({ userId });
    if (!result.success) {
      return NextResponse.json(result, { status: HTTP_STATUS.BAD_REQUEST });
    }
    return NextResponse.json(result, { status: HTTP_STATUS.OK });
  } catch (error) {
    return handleApiError(error, 'GET /api/public/viajes/activo');
  }
});
