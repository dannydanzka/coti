/**
 * Get Cajita Use Case
 *
 * Assembles everything the savings box screen renders, already computed, so the
 * screen does no math of its own. Identity comes from the auth middleware via
 * `x-user-id` — a participant can only ever read their own box.
 *
 * Returns `cajita: null` when there is no plan yet. That is the empty state the
 * dashboard already shows, not an error.
 */

import type { CajitaEntity } from '@entities';
import {
  calcularAhorrado,
  DIAS_POR_APORTE,
  fechaDeLlegada,
  hitoAlcanzado,
  porcentajeAvance,
} from '@domain';
import type { FrecuenciaAporte } from '@domain';
import { handleUseCaseError } from '@use-case-error';
import { planDeAhorroRepository, viajeRepository } from '@repositories';

import type {
  GetCajitaErrorResponse,
  GetCajitaParams,
  GetCajitaResponse,
} from './get-cajita.interfaces';
import { MENSAJE_SIN_CAJITA } from './get-cajita.constants';

/**
 * Next contribution date: one period after the last one recorded (or after the
 * plan was opened, when nothing has been contributed yet).
 */
const calcularProximoAporte = (ultimaFecha: Date, frecuencia: FrecuenciaAporte): Date => {
  const proximo = new Date(ultimaFecha);

  proximo.setDate(proximo.getDate() + DIAS_POR_APORTE[frecuencia]);

  return proximo;
};

export const executeGetCajita = async (params: GetCajitaParams): Promise<GetCajitaResponse> => {
  try {
    const viaje = await viajeRepository.findActivoByUserId(params.userId);

    if (!viaje || viaje.estado === 'BORRADOR') {
      return {
        data: { borradorId: viaje?.id ?? null, cajita: null },
        message: MENSAJE_SIN_CAJITA,
        success: true,
      };
    }

    const plan = await planDeAhorroRepository.findByViajeId(viaje.id);

    if (!plan) {
      return {
        data: { borradorId: null, cajita: null },
        message: MENSAJE_SIN_CAJITA,
        success: true,
      };
    }

    const registros = await planDeAhorroRepository.findRegistros(plan.id);
    const ahorrado = calcularAhorrado(plan.montoInicial, registros);
    const porcentaje = porcentajeAvance(ahorrado, plan.meta);
    const faltante = Math.max(0, plan.meta - ahorrado);
    const ultimoAporte = registros.at(-1)?.fecha ?? plan.creadoEn;

    const cajita: CajitaEntity = {
      ahorrado,
      faltante,
      fechaEstimada: fechaDeLlegada(plan.meta, ahorrado, plan.aportacion, plan.frecuencia),
      hitoAlcanzado: hitoAlcanzado(porcentaje),
      periodosRestantes: plan.aportacion > 0 ? Math.ceil(faltante / plan.aportacion) : 0,
      plan,
      porcentaje,
      proximoAporte: calcularProximoAporte(ultimoAporte, plan.frecuencia),
      registros,
      viaje,
    };

    return {
      data: { borradorId: null, cajita },
      message: 'Cajita de ahorro obtenida correctamente',
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<GetCajitaErrorResponse>(error, 'executeGetCajita');
  }
};
