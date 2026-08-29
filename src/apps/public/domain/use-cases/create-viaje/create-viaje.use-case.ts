/**
 * Create Viaje Use Case
 *
 * Cierra el wizard (paso 7): recalcula el rango en el servidor con el catálogo
 * — nunca se confía en cifras del cliente — y abre viaje + plan de ahorro en
 * una sola escritura. La meta se acota al rango proyectado.
 */

import { createNotFoundError, createValidationError, handleUseCaseError } from '@use-case-error';
import { destinoRepository, viajeRepository } from '@repositories';
import { proyectarCosto } from '@domain';

import type {
  CreateViajeErrorResponse,
  CreateViajeParams,
  CreateViajeResponse,
} from './create-viaje.interfaces';

export const executeCreateViaje = async ({
  input,
  userId,
}: CreateViajeParams): Promise<CreateViajeErrorResponse | CreateViajeResponse> => {
  try {
    const destino = await destinoRepository.findById(input.destinoId);
    if (!destino) {
      return createNotFoundError<CreateViajeErrorResponse>('Destino', input.destinoId);
    }

    const atraccionesPorId = new Map(destino.atracciones.map((item) => [item.id, item]));
    const desconocida = input.atracciones.find((item) => !atraccionesPorId.has(item.atraccionId));
    if (desconocida) {
      return createValidationError<CreateViajeErrorResponse>(
        'Una de las atracciones no pertenece al destino',
        'atracciones',
        desconocida.atraccionId
      );
    }

    const fechaSalida = new Date(input.fechaSalida);
    if (fechaSalida.getTime() <= Date.now()) {
      return createValidationError<CreateViajeErrorResponse>(
        'La fecha de salida debe ser futura',
        'fechaSalida',
        input.fechaSalida
      );
    }

    const mesSalida = fechaSalida.getMonth() + 1;
    const multiplicadorTemporada =
      destino.temporadas.find((temporada) => temporada.mes === mesSalida)?.multiplicador ?? 1;

    const atraccionesMustGo = input.atracciones
      .filter((item) => item.prioridad === 'MUST_GO')
      .reduce((total, item) => total + (atraccionesPorId.get(item.atraccionId)?.costoMin ?? 0), 0);
    const atraccionesOpcionales = input.atracciones
      .filter((item) => item.prioridad === 'WOULD_BE_NICE')
      .reduce((total, item) => total + (atraccionesPorId.get(item.atraccionId)?.costoMax ?? 0), 0);

    const rango = proyectarCosto(destino, {
      atraccionesMustGo,
      atraccionesOpcionales,
      estiloAlojamiento: input.estiloAlojamiento,
      estiloComida: input.estiloComida,
      multiplicadorTemporada,
      noches: input.noches,
      personas: input.personas,
      ritmo: input.ritmo,
    });

    const meta = Math.min(Math.max(input.meta, rango.min), rango.max);

    const viaje = await viajeRepository.create(
      userId,
      { ...input, meta },
      { costoMax: rango.max, costoMin: rango.min }
    );

    return { data: { viaje }, message: 'Tu cajita de ahorro está abierta', success: true };
  } catch (error) {
    return handleUseCaseError<CreateViajeErrorResponse>(error, 'executeCreateViaje');
  }
};
