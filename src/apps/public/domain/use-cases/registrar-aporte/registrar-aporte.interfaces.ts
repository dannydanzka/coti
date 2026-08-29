/**
 * Registrar Aporte Use Case Interfaces
 */

import type { RegistrarAporteInput, ViajeEntity } from '@interfaces';
import type { UseCaseErrorResponse } from '@use-case-error';

export interface RegistrarAporteParams {
  input: RegistrarAporteInput;
  userId: string;
}

export interface RegistrarAporteResponse {
  data: { viaje: ViajeEntity };
  message: string;
  success: true;
}

export type RegistrarAporteErrorResponse = UseCaseErrorResponse;
