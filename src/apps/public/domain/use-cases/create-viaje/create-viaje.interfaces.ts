/**
 * Create Viaje Use Case Interfaces
 */

import type { CreateViajeInput, ViajeEntity } from '@interfaces';
import type { UseCaseErrorResponse } from '@use-case-error';

export interface CreateViajeParams {
  input: CreateViajeInput;
  userId: string;
}

export interface CreateViajeResponse {
  data: { viaje: ViajeEntity };
  message: string;
  success: true;
}

export type CreateViajeErrorResponse = UseCaseErrorResponse;
