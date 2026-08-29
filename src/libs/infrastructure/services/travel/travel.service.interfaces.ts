/**
 * Travel Service Interfaces
 *
 * Shapes crossing the wire. Dates arrive serialized as ISO strings, so the
 * entity types are not reused verbatim: `SerializedCajita` mirrors CajitaEntity
 * with `string` where the domain has `Date`.
 */

import type { CajitaEntity, RegistroDeAhorroEntity } from '@entities';

type IsoDates<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K] extends Date | null ? string | null : T[K];
};

export type SerializedRegistro = IsoDates<RegistroDeAhorroEntity>;

export type SerializedCajita = Omit<
  CajitaEntity,
  'fechaEstimada' | 'plan' | 'proximoAporte' | 'registros' | 'viaje'
> & {
  fechaEstimada: string | null;
  proximoAporte: string | null;
  plan: IsoDates<CajitaEntity['plan']>;
  registros: SerializedRegistro[];
  viaje: Omit<CajitaEntity['viaje'], 'actualizadoEn' | 'creadoEn' | 'fechaSalida'> & {
    actualizadoEn: string;
    creadoEn: string;
    fechaSalida: string | null;
  };
};

export interface CajitaApiData {
  cajita: SerializedCajita | null;
  borradorId: string | null;
}

export interface RegistrarAporteApiData {
  registro: SerializedRegistro;
}

export interface RegistrarAportePayload {
  monto: number;
  nota?: string | null;
}

export interface CajitaApiResponse {
  data?: CajitaApiData;
  error?: string;
  success: boolean;
}

export interface RegistrarAporteApiResponse {
  data?: RegistrarAporteApiData;
  error?: string;
  success: boolean;
}
