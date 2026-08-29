/**
 * Registrar Aporte Use Case
 *
 * Un aporte más a la cajita del viaje activo. La identidad la impone el
 * middleware; el plan se resuelve desde el viaje del usuario, así que nadie
 * puede aportar a la cajita de otro.
 */

import { createNotFoundError, handleUseCaseError } from '@use-case-error';
import { viajeRepository } from '@repositories';

import type {
  RegistrarAporteErrorResponse,
  RegistrarAporteParams,
  RegistrarAporteResponse,
} from './registrar-aporte.interfaces';

export const executeRegistrarAporte = async ({
  input,
  userId,
}: RegistrarAporteParams): Promise<RegistrarAporteErrorResponse | RegistrarAporteResponse> => {
  try {
    const activo = await viajeRepository.findActivoByUserId(userId);
    if (!activo?.plan) {
      return createNotFoundError<RegistrarAporteErrorResponse>('Plan de ahorro');
    }

    await viajeRepository.addRegistro(activo.plan.id, input);
    const viaje = await viajeRepository.findActivoByUserId(userId);
    if (!viaje) {
      return createNotFoundError<RegistrarAporteErrorResponse>('Viaje');
    }

    return { data: { viaje }, message: 'Aporte registrado', success: true };
  } catch (error) {
    return handleUseCaseError<RegistrarAporteErrorResponse>(error, 'executeRegistrarAporte');
  }
};
