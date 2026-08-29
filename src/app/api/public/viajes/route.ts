/**
 * Public Viajes API - Thin Controller
 *
 * POST /api/public/viajes - Cierra el wizard: crea viaje + plan de ahorro.
 */

import { NextRequest, NextResponse } from 'next/server';

import { createViajeBodySchema } from '@validation';
import { executeCreateViaje } from '@apps/public/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { validateBody } from '@helpers';
import { withAuthMiddleware } from '@middleware';

export const POST = withAuthMiddleware(async (request: NextRequest) => {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { error: 'Sesión inválida', success: false },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const body = await request.json();
    const validated = validateBody(createViajeBodySchema, body);
    if (!validated.success) return validated.error;

    const result = await executeCreateViaje({ input: validated.data, userId });
    if (!result.success) {
      return NextResponse.json(result, { status: HTTP_STATUS.BAD_REQUEST });
    }
    return NextResponse.json(result, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    return handleApiError(error, 'POST /api/public/viajes');
  }
});
