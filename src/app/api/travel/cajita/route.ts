/**
 * Cajita API - Thin Controller
 *
 * GET /api/travel/cajita - Devuelve la cajita de ahorro del usuario autenticado.
 *
 * No recibe `id`: la identidad sale del header `x-user-id` que inyecta
 * `withAuthMiddleware` tras verificar el JWT, así que nadie puede leer la
 * cajita de otra persona.
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeGetCajita } from '@apps/public/domain/use-cases';
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

    const result = await executeGetCajita({ request, userId });

    if (!result.success) {
      return NextResponse.json(result, { status: HTTP_STATUS.BAD_REQUEST });
    }

    return NextResponse.json(result, { status: HTTP_STATUS.OK });
  } catch (error) {
    return handleApiError(error, 'GET /api/travel/cajita');
  }
});
