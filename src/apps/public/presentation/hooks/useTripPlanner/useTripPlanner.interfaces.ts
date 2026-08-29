/**
 * useTripPlanner Interfaces
 */

import type { DestinoEntity, EstiloViaje, PrioridadAtraccion } from '@interfaces';
import type { MetaOpcion, PlannerDraft } from '@redux';
import type { RangoCosto } from '@domain';

export interface PlannerProjection {
  metas: Record<MetaOpcion, number>;
  multiplicadorTemporada: number;
  rango: RangoCosto;
}

export interface PlannerPlanSummary {
  /** Fecha estimada en que se junta la meta con la aportación actual, o null si no se llega. */
  fechaLlegada: Date | null;
  llegaATiempo: boolean;
  meta: number;
  periodos: number;
  restante: number;
}

export interface UseTripPlannerReturn {
  canContinue: boolean;
  destino: DestinoEntity | null;
  destinos: DestinoEntity[];
  destinosLoaded: boolean;
  draft: PlannerDraft;
  goBack: () => void;
  goNext: () => void;
  isSaving: boolean;
  noches: number;
  plan: PlannerPlanSummary | null;
  projection: PlannerProjection | null;
  saveAndExit: () => void;
  setAtraccion: (atraccionId: string, prioridad: PrioridadAtraccion | null) => void;
  setDraft: (patch: Partial<PlannerDraft>) => void;
  submit: () => Promise<void>;
  toggleEstilo: (estilo: EstiloViaje) => void;
  totalSteps: number;
}
