/**
 * Registrar Aporte Use Case
 *
 * Records one contribution into the participant's savings box.
 *
 * The plan is resolved from the caller's own active trip rather than from a
 * client-supplied id, so a participant can only ever contribute to their own
 * box even if they forge the request body.
 */

import { createBusinessLogicError, createNotFoundError, handleUseCaseError } from '@use-case-error';
import { planDeAhorroRepository, viajeRepository } from '@repositories';

import type {
  RegistrarAporteErrorResponse,
  RegistrarAporteParams,
  RegistrarAporteResponse,
} from './registrar-aporte.interfaces';

export const executeRegistrarAporte = async (
  params: RegistrarAporteParams
): Promise<RegistrarAporteResponse> => {
  try {
    if (params.monto <= 0) {
      return createBusinessLogicError<RegistrarAporteErrorResponse>({
        key: 'errors.travel.aporteInvalido',
      });
    }

    const viaje = await viajeRepository.findActivoByUserId(params.userId);

    if (viaje?.estado !== 'AHORRANDO') {
      return createNotFoundError<RegistrarAporteErrorResponse>('Cajita de ahorro', params.userId);
    }

    const plan = await planDeAhorroRepository.findByViajeId(viaje.id);

    if (!plan) {
      return createNotFoundError<RegistrarAporteErrorResponse>('Plan de ahorro', viaje.id);
    }

    const registro = await planDeAhorroRepository.registrarAporte({
      monto: params.monto,
      nota: params.nota ?? null,
      planId: plan.id,
    });

    return {
      data: { registro },
      message: 'Aporte registrado correctamente',
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<RegistrarAporteErrorResponse>(error, 'executeRegistrarAporte');
  }
};
