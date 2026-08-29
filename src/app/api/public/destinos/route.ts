/**
 * Public Destinos API - Thin Controller
 *
 * GET /api/public/destinos - Catálogo curado de destinos (requiere sesión).
 */

import { NextResponse } from 'next/server';

import { executeListDestinos } from '@apps/public/domain/use-cases';
import { handleApiError } from '@api-error';
import { HTTP_STATUS } from '@constants';
import { withAuthMiddleware } from '@middleware';

export const GET = withAuthMiddleware(async () => {
  try {
    const result = await executeListDestinos();
    if (!result.success) {
      return NextResponse.json(result, { status: HTTP_STATUS.BAD_REQUEST });
    }
    return NextResponse.json(result, { status: HTTP_STATUS.OK });
  } catch (error) {
    return handleApiError(error, 'GET /api/public/destinos');
  }
});
