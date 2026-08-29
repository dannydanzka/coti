/**
 * Public Profile API - Thin Controller
 *
 * PUT /api/public/profile - El usuario autenticado edita su propio perfil.
 *
 * No recibe `id`: la identidad sale del header `x-user-id` que inyecta
 * `withAuthMiddleware` tras verificar el JWT.
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeUpdateProfile } from '@apps/public/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { updateProfileBodySchema } from '@validation';
import { validateBody } from '@helpers';
import { withAuthMiddleware } from '@middleware';

export const PUT = withAuthMiddleware(async (request: NextRequest) => {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Sesión inválida', success: false },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const body = await request.json();
    const validated = validateBody(updateProfileBodySchema, body);
    if (!validated.success) return validated.error;

    const result = await executeUpdateProfile({
      request,
      updates: validated.data,
      userId,
    });

    if (!result.success) {
      return NextResponse.json(result, { status: HTTP_STATUS.BAD_REQUEST });
    }

    return NextResponse.json(result, { status: HTTP_STATUS.OK });
  } catch (error) {
    return handleApiError(error, 'PUT /api/public/profile');
  }
});
