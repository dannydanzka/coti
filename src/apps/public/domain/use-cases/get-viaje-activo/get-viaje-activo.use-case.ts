/**
 * Get Viaje Activo Use Case
 *
 * El viaje en curso del usuario (con plan y registros) o null si no ha abierto
 * su cajita todavía. Null no es error: es el estado vacío del dashboard.
 */

import { handleUseCaseError } from '@use-case-error';
import { viajeRepository } from '@repositories';

import type {
  GetViajeActivoErrorResponse,
  GetViajeActivoParams,
  GetViajeActivoResponse,
} from './get-viaje-activo.interfaces';

export const executeGetViajeActivo = async ({
  userId,
}: GetViajeActivoParams): Promise<GetViajeActivoErrorResponse | GetViajeActivoResponse> => {
  try {
    const viaje = await viajeRepository.findActivoByUserId(userId);
    return { data: { viaje }, success: true };
  } catch (error) {
    return handleUseCaseError<GetViajeActivoErrorResponse>(error, 'executeGetViajeActivo');
  }
};
