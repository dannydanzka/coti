/**
 * Travel Interfaces
 *
 * Contratos del dominio de viajes: destino, viaje, plan de ahorro y cajita.
 * Las fechas viajan como ISO string para que las entidades sean serializables
 * (Redux, API) sin conversiones en cada capa.
 */

import type { EstiloNivel, FrecuenciaAporte, Ritmo } from '../../projection';

export type PrioridadAtraccion = 'MUST_GO' | 'WOULD_BE_NICE';
export type EstadoViaje = 'AHORRANDO' | 'BORRADOR' | 'COMPLETADO';

/** Chips de estilo del paso 2 — se traducen a los tres ejes del dominio. */
export type EstiloViaje =
  'BOUTIQUE' | 'COMODO' | 'CULTURA' | 'FIESTA' | 'FOODIE' | 'MOCHILERO' | 'NATURALEZA' | 'RELAX';

export interface AtraccionEntity {
  costoMax: number;
  costoMin: number;
  descripcion: string;
  id: string;
  nombre: string;
}

export interface TemporadaEntity {
  mes: number;
  multiplicador: number;
}

export interface DestinoEntity {
  atracciones: AtraccionEntity[];
  ciudad: string;
  continente: string;
  descripcion: string;
  diarioMax: number;
  diarioMin: number;
  diasSugeridos: number;
  emoji: string;
  hospedajeMax: number;
  hospedajeMin: number;
  id: string;
  pais: string;
  slug: string;
  temporadas: TemporadaEntity[];
  visaCosto: number;
  vueloMax: number;
  vueloMin: number;
}

export interface RegistroDeAhorroEntity {
  fecha: string;
  id: string;
  monto: number;
  nota: string | null;
}

export interface PlanDeAhorroEntity {
  aportacion: number;
  fechaObjetivo: string;
  frecuencia: FrecuenciaAporte;
  id: string;
  meta: number;
  montoInicial: number;
  recordatorios: boolean;
  registros: RegistroDeAhorroEntity[];
}

export interface AtraccionViajeEntity {
  atraccionId: string;
  nombre: string;
  prioridad: PrioridadAtraccion;
}

export interface ViajeEntity {
  atracciones: AtraccionViajeEntity[];
  costoMax: number;
  costoMin: number;
  destino: Pick<DestinoEntity, 'ciudad' | 'emoji' | 'id' | 'pais' | 'slug'>;
  estado: EstadoViaje;
  estiloAlojamiento: EstiloNivel;
  estiloComida: EstiloNivel;
  fechaSalida: string | null;
  id: string;
  noches: number;
  personas: number;
  plan: PlanDeAhorroEntity | null;
  ritmo: Ritmo;
}

/** Lo que manda el wizard al cerrar el paso 7. El servidor recalcula el rango. */
export interface CreateViajeInput {
  aportacion: number;
  atracciones: Array<{ atraccionId: string; prioridad: PrioridadAtraccion }>;
  destinoId: string;
  estiloAlojamiento: EstiloNivel;
  estiloComida: EstiloNivel;
  fechaSalida: string;
  frecuencia: FrecuenciaAporte;
  meta: number;
  montoInicial: number;
  noches: number;
  personas: number;
  recordatorios: boolean;
  ritmo: Ritmo;
}

export interface RegistrarAporteInput {
  monto: number;
  nota?: string;
}

export interface DestinoRepository {
  findAll(): Promise<DestinoEntity[]>;
  findById(id: string): Promise<DestinoEntity | null>;
}

export interface ViajeRepository {
  addRegistro(planId: string, input: RegistrarAporteInput): Promise<RegistroDeAhorroEntity>;
  create(
    userId: string,
    input: CreateViajeInput,
    rango: { costoMax: number; costoMin: number }
  ): Promise<ViajeEntity>;
  findActivoByUserId(userId: string): Promise<ViajeEntity | null>;
}
