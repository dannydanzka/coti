/**
 * Aportes API - Thin Controller
 *
 * POST /api/travel/cajita/aportes - Registra un aporte en la cajita del
 * usuario autenticado.
 *
 * El plan se resuelve desde la identidad del header `x-user-id`, no desde el
 * body, para que nadie pueda aportar a la cajita de otra persona.
 */

import { NextRequest, NextResponse } from 'next/server';

import { executeRegistrarAporte } from '@apps/public/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { registrarAporteBodySchema } from '@validation';
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
    const validated = validateBody(registrarAporteBodySchema, body);
    if (!validated.success) return validated.error;

    const result = await executeRegistrarAporte({
      monto: validated.data.monto,
      nota: validated.data.nota ?? null,
      request,
      userId,
    });

    if (!result.success) {
      return NextResponse.json(result, { status: HTTP_STATUS.BAD_REQUEST });
    }

    return NextResponse.json(result, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    return handleApiError(error, 'POST /api/travel/cajita/aportes');
  }
});
