/**
 * Travel Slice Interfaces
 *
 * Dos cosas viven aquí: el borrador del wizard (pasos 1–7, sólo en memoria)
 * y el viaje activo con su cajita (lo que devuelve el servidor).
 */

import type { DestinoEntity, EstiloViaje, PrioridadAtraccion, ViajeEntity } from '@interfaces';
import type { FrecuenciaAporte } from '@domain';

export type MetaOpcion = 'COMODO' | 'MINIMO' | 'SIN_LIMITES';

export interface PlannerDraft {
  aportacion: number;
  atracciones: Record<string, PrioridadAtraccion>;
  destinoId: string | null;
  estilos: EstiloViaje[];
  fechaRegreso: string | null;
  fechaSalida: string | null;
  frecuencia: FrecuenciaAporte;
  metaOpcion: MetaOpcion;
  montoInicial: number;
  personas: number;
  recordatorios: boolean;
  step: number;
  tieneAhorro: boolean;
}

export interface TravelState {
  destinos: DestinoEntity[];
  destinosLoaded: boolean;
  draft: PlannerDraft;
  viajeActivo: ViajeEntity | null;
  viajeLoaded: boolean;
}
