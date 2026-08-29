/**
 * Get Viaje Activo Use Case Interfaces
 */

import type { UseCaseErrorResponse } from '@use-case-error';
import type { ViajeEntity } from '@interfaces';

export interface GetViajeActivoParams {
  userId: string;
}

export interface GetViajeActivoResponse {
  data: { viaje: ViajeEntity | null };
  success: true;
}

export type GetViajeActivoErrorResponse = UseCaseErrorResponse;
