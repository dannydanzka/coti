/**
 * Travel Repository Interfaces
 *
 * Repository contracts for the trip planning domain.
 * Domain-level interfaces shared across repository implementations.
 */
import type {
  AtraccionEntity,
  DestinoDetalleEntity,
  DestinoEntity,
  PlanDeAhorroEntity,
  RegistroDeAhorroEntity,
  ViajeDetalleEntity,
  ViajeEntity,
} from '@entities';
import type { EstiloNivel, FrecuenciaAporte, Ritmo } from '@domain/projection';
import type { Prioridad, TripStatus } from '@domain-types';

export interface DestinoFilters {
  continente?: string;
  searchTerm?: string;
}

export interface DestinoRepository {
  findMany(filters?: DestinoFilters): Promise<DestinoEntity[]>;
  findBySlug(slug: string): Promise<DestinoDetalleEntity | null>;
  findById(id: string): Promise<DestinoDetalleEntity | null>;
  /** Season multiplier for a given month (1-12). Falls back to 1 when unknown. */
  getMultiplicadorTemporada(destinoId: string, mes: number): Promise<number>;
  findAtraccionesByIds(ids: string[]): Promise<AtraccionEntity[]>;
}

/** Attraction pick coming from the wizard, before it becomes a row. */
export interface AtraccionSeleccion {
  atraccionId: string;
  prioridad: Prioridad;
}

/**
 * Upsert payload for the wizard draft. Every field is optional because the
 * wizard saves progressively, one step at a time.
 */
export interface SaveViajeDraftRequest {
  userId: string;
  destinoId: string;
  fechaSalida?: Date | null;
  noches?: number;
  personas?: number;
  estiloAlojamiento?: EstiloNivel;
  estiloComida?: EstiloNivel;
  ritmo?: Ritmo;
  atracciones?: AtraccionSeleccion[];
  costoMin?: number;
  costoMax?: number;
}

export interface ViajeRepository {
  /**
   * The trip the user is currently working on: the one in AHORRANDO if it
   * exists, otherwise the most recent BORRADOR. Null when they have neither.
   */
  findActivoByUserId(userId: string): Promise<ViajeDetalleEntity | null>;
  findById(id: string): Promise<ViajeDetalleEntity | null>;
  /** Creates the draft on first call, updates it afterwards. */
  saveDraft(request: SaveViajeDraftRequest): Promise<ViajeDetalleEntity>;
  updateEstado(id: string, estado: TripStatus): Promise<ViajeEntity>;
  delete(id: string): Promise<void>;
}

export interface CreatePlanDeAhorroRequest {
  viajeId: string;
  meta: number;
  montoInicial: number;
  aportacion: number;
  frecuencia: FrecuenciaAporte;
  fechaObjetivo: Date;
  recordatorios: boolean;
}

export interface RegistrarAporteRequest {
  planId: string;
  monto: number;
  fecha?: Date;
  nota?: string | null;
}

export interface PlanDeAhorroRepository {
  findByViajeId(viajeId: string): Promise<PlanDeAhorroEntity | null>;
  create(request: CreatePlanDeAhorroRequest): Promise<PlanDeAhorroEntity>;
  registrarAporte(request: RegistrarAporteRequest): Promise<RegistroDeAhorroEntity>;
  findRegistros(planId: string): Promise<RegistroDeAhorroEntity[]>;
}
