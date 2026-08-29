/**
 * Travel Entities - Coti Platform
 *
 * SINGLE SOURCE OF TRUTH based on Prisma schema.
 * Covers the trip planning domain: catalog (Destino, Atraccion, TemporadaDestino)
 * and the user's own plan (Viaje, AtraccionViaje, PlanDeAhorro, RegistroDeAhorro).
 *
 * Money is always MXN, stored as whole pesos (Int in Prisma) — never cents,
 * never floats. The product projects ranges, it does not quote prices.
 *
 * @pattern Clean Architecture - Domain Entity
 * @context Coti (Travel)
 * @prisma models Destino, TemporadaDestino, Atraccion, Viaje, AtraccionViaje,
 *                PlanDeAhorro, RegistroDeAhorro
 */

import type { Prioridad, TemporadaNivel, TripStatus } from '@domain-types';

import type { EstiloNivel, FrecuenciaAporte, Ritmo } from '../../projection';

/**
 * Attraction offered by a destination. Costs are per person, MXN.
 *
 * @prisma model Atraccion
 */
export interface AtraccionEntity {
  id: string;
  destinoId: string;
  nombre: string;
  descripcion: string;
  costoMin: number;
  costoMax: number;
}

/**
 * Season multiplier for a given month of a destination.
 * `multiplicador` is 1.0 at base, 1.35 in high season, 0.85 in low.
 *
 * @prisma model TemporadaDestino
 */
export interface TemporadaDestinoEntity {
  id: string;
  destinoId: string;
  /** Month of the year, 1-12 */
  mes: number;
  temporada: TemporadaNivel;
  multiplicador: number;
}

/**
 * Curated destination. Ranges are hand-curated and fixed on purpose —
 * they are not live provider prices.
 *
 * @prisma model Destino
 */
export interface DestinoEntity {
  id: string;
  slug: string;
  ciudad: string;
  pais: string;
  continente: string;
  emoji: string;
  descripcion: string;

  /** Round trip from Mexico, MXN */
  vueloMin: number;
  vueloMax: number;
  /** Per night, MXN */
  hospedajeMin: number;
  hospedajeMax: number;
  /** Food and local transport per day, MXN */
  diarioMin: number;
  diarioMax: number;
  /** Visa and paperwork, MXN. Zero when not required. */
  visaCosto: number;

  diasSugeridos: number;
}

/**
 * Destination with its catalog relations loaded.
 * Used by the wizard once a destination is picked.
 */
export interface DestinoDetalleEntity extends DestinoEntity {
  atracciones: AtraccionEntity[];
  temporadas: TemporadaDestinoEntity[];
}

/**
 * An attraction the user picked for their trip, with its priority.
 * "Must go" attractions weigh on both ends of the range; "would be nice"
 * ones only push the maximum.
 *
 * @prisma model AtraccionViaje
 */
export interface AtraccionViajeEntity {
  id: string;
  viajeId: string;
  atraccionId: string;
  prioridad: Prioridad;
  atraccion: AtraccionEntity;
}

/**
 * The user's trip. Lives as BORRADOR while the wizard is in progress and
 * flips to AHORRANDO once the savings plan is created.
 *
 * `costoMin`/`costoMax` are frozen at projection time so the goal does not
 * move under the user's feet while they save.
 *
 * @prisma model Viaje
 */
export interface ViajeEntity {
  id: string;
  userId: string;
  destinoId: string;

  estado: TripStatus;
  fechaSalida: Date | null;
  noches: number;
  personas: number;

  costoMin: number;
  costoMax: number;

  estiloAlojamiento: EstiloNivel;
  estiloComida: EstiloNivel;
  ritmo: Ritmo;

  creadoEn: Date;
  actualizadoEn: Date;
}

/**
 * Trip with the relations the screens need.
 */
export interface ViajeDetalleEntity extends ViajeEntity {
  destino: DestinoEntity;
  atracciones: AtraccionViajeEntity[];
  plan: PlanDeAhorroEntity | null;
}

/**
 * A single contribution to the savings box.
 *
 * @prisma model RegistroDeAhorro
 */
export interface RegistroDeAhorroEntity {
  id: string;
  planId: string;
  monto: number;
  fecha: Date;
  nota: string | null;
}

/**
 * The savings plan behind the "cajita". One per trip.
 *
 * `meta` is frozen when the plan is created so progress stays comparable.
 * `recordatorios` only stores the preference — nothing is ever sent.
 *
 * @prisma model PlanDeAhorro
 */
export interface PlanDeAhorroEntity {
  id: string;
  viajeId: string;

  meta: number;
  montoInicial: number;
  aportacion: number;
  frecuencia: FrecuenciaAporte;
  fechaObjetivo: Date;
  recordatorios: boolean;

  creadoEn: Date;
}

/**
 * Everything the savings box screen renders, already computed.
 * Assembled by the use case so the screen does no math of its own.
 */
export interface CajitaEntity {
  viaje: ViajeDetalleEntity;
  plan: PlanDeAhorroEntity;
  registros: RegistroDeAhorroEntity[];

  /** montoInicial + every contribution */
  ahorrado: number;
  /** meta - ahorrado, never below zero */
  faltante: number;
  /** 0-100, capped */
  porcentaje: number;
  /** Highest milestone already crossed, null before 25% */
  hitoAlcanzado: 25 | 50 | 75 | 100 | null;
  /** Contribution periods left to reach the goal */
  periodosRestantes: number;
  /** Projected date the goal is met, null when aportacion is zero */
  fechaEstimada: Date | null;
  proximoAporte: Date | null;
}

/**
 * Total contributed so far, including the starting amount.
 */
export const calcularAhorrado = (
  montoInicial: number,
  registros: RegistroDeAhorroEntity[]
): number => registros.reduce((total, registro) => total + registro.monto, montoInicial);

/**
 * Splits picked attractions into the two buckets the projection expects:
 * must-go costs count on both ends, optional ones only on the maximum.
 */
export const sumarAtraccionesPorPrioridad = (
  atracciones: AtraccionViajeEntity[]
): { mustGo: number; opcionales: number } =>
  atracciones.reduce(
    (totales, seleccion) =>
      seleccion.prioridad === 'MUST_GO'
        ? { ...totales, mustGo: totales.mustGo + seleccion.atraccion.costoMin }
        : { ...totales, opcionales: totales.opcionales + seleccion.atraccion.costoMax },
    { mustGo: 0, opcionales: 0 }
  );
