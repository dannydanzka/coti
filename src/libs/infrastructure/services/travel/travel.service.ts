/**
 * Travel Service
 *
 * HTTP client for the trip planning domain. Only the transport lives here:
 * every amount and percentage arrives already computed from the use case.
 */

import { apiConfig } from '@config';
import { handleRequest } from '@helpers';

import type {
  CajitaApiData,
  CajitaApiResponse,
  RegistrarAporteApiData,
  RegistrarAporteApiResponse,
  RegistrarAportePayload,
} from './travel.service.interfaces';

const TIMEOUT_MS = 10000;

/**
 * `getCajita` reads the caller's own box (`cajita` is null when there is none yet);
 * `registrarAporte` records one contribution — the plan is resolved server-side.
 */
export const TravelService = {
  getCajita: async (): Promise<CajitaApiData> => {
    const response = await handleRequest({
      customDefaultErrorMessage: 'No pudimos cargar tu cajita de ahorro',
      endpoint: apiConfig.API_BASE.ENDPOINTS.TRAVEL.CAJITA,
      method: 'GET',
      timeout: TIMEOUT_MS,
    });
    const typed = response as CajitaApiResponse;

    if (!typed.success || !typed.data) {
      throw new Error(typed.error ?? 'No pudimos cargar tu cajita de ahorro');
    }

    return typed.data;
  },
  registrarAporte: async (payload: RegistrarAportePayload): Promise<RegistrarAporteApiData> => {
    const response = await handleRequest({
      body: { ...payload },
      customDefaultErrorMessage: 'No pudimos registrar tu aporte',
      endpoint: apiConfig.API_BASE.ENDPOINTS.TRAVEL.CAJITA_APORTES,
      method: 'POST',
      timeout: TIMEOUT_MS,
    });
    const typed = response as RegistrarAporteApiResponse;

    if (!typed.success || !typed.data) {
      throw new Error(typed.error ?? 'No pudimos registrar tu aporte');
    }

    return typed.data;
  },
};
