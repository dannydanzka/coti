/**
 * Get Cajita Use Case Interfaces
 */

import type { NextRequest } from 'next/server';

import type { CajitaEntity } from '@entities';
import type { UseCaseErrorResponse } from '@use-case-error';

export interface GetCajitaParams {
  request: NextRequest;
  userId: string;
}

/**
 * `cajita` is null when the participant has no savings plan yet — that is the
 * empty state, not an error. `viajeId` carries the draft's id when the wizard
 * was started but never finished, so the screen can offer to resume it.
 */
export interface GetCajitaSuccessResponse {
  data: {
    cajita: CajitaEntity | null;
    borradorId: string | null;
  };
  message: string;
  success: true;
}

export type GetCajitaErrorResponse = UseCaseErrorResponse;

export type GetCajitaResponse = GetCajitaSuccessResponse | GetCajitaErrorResponse;
