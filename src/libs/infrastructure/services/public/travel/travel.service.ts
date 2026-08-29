/**
 * Travel Service (Public)
 *
 * HTTP client del dominio de viajes: catálogo, viaje activo, alta del viaje y
 * aportes a la cajita. Devuelve entidades ya desenvueltas o lanza.
 */

import type { ApiResponse } from '@domain-types';
import type {
  CreateViajeInput,
  DestinoEntity,
  RegistrarAporteInput,
  ViajeEntity,
} from '@interfaces';
import { handleRequest } from '@helpers';

const ENDPOINTS = {
  APORTES: '/api/public/viajes/aportes',
  DESTINOS: '/api/public/destinos',
  VIAJES: '/api/public/viajes',
  VIAJE_ACTIVO: '/api/public/viajes/activo',
} as const;

const unwrap = <T>(response: unknown, fallback: string): T => {
  const typed = response as ApiResponse<T>;
  if (!typed.success || typed.data === undefined) {
    throw new Error(typed.error ?? fallback);
  }
  return typed.data;
};

export const TravelService = {
  createViaje: async (input: CreateViajeInput): Promise<ViajeEntity> => {
    const response = await handleRequest({
      body: input as unknown as Record<string, unknown>,
      customDefaultErrorMessage: 'No se pudo abrir tu cajita de ahorro',
      endpoint: ENDPOINTS.VIAJES,
      method: 'POST',
      timeout: 15000,
    });
    return unwrap<{ viaje: ViajeEntity }>(response, 'No se pudo abrir tu cajita de ahorro').viaje;
  },
  getDestinos: async (): Promise<DestinoEntity[]> => {
    const response = await handleRequest({
      customDefaultErrorMessage: 'No se pudo cargar el catálogo de destinos',
      endpoint: ENDPOINTS.DESTINOS,
      method: 'GET',
      timeout: 15000,
    });
    return unwrap<{ destinos: DestinoEntity[] }>(response, 'No se pudo cargar el catálogo')
      .destinos;
  },
  getViajeActivo: async (): Promise<ViajeEntity | null> => {
    const response = await handleRequest({
      customDefaultErrorMessage: 'No se pudo cargar tu viaje',
      endpoint: ENDPOINTS.VIAJE_ACTIVO,
      method: 'GET',
      timeout: 15000,
    });
    return unwrap<{ viaje: ViajeEntity | null }>(response, 'No se pudo cargar tu viaje').viaje;
  },
  registrarAporte: async (input: RegistrarAporteInput): Promise<ViajeEntity> => {
    const response = await handleRequest({
      body: input as unknown as Record<string, unknown>,
      customDefaultErrorMessage: 'No se pudo registrar el aporte',
      endpoint: ENDPOINTS.APORTES,
      method: 'POST',
      timeout: 15000,
    });
    return unwrap<{ viaje: ViajeEntity }>(response, 'No se pudo registrar el aporte').viaje;
  },
};
