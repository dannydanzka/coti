/**
 * DashboardScreen Interfaces
 */

import type { z } from 'zod';

import type { registrarAporteValidationSchema } from '@validation';
import type { SerializedCajita } from '@services';

export interface DashboardScreenProps {
  className?: string;
}

export interface CajitaHeroProps {
  cajita: SerializedCajita;
}

export interface CajitaStatsProps {
  cajita: SerializedCajita;
}

export interface CajitaAportesProps {
  cajita: SerializedCajita;
}

export interface CajitaProximoAporteProps {
  cajita: SerializedCajita;
  registrando: boolean;
  onRegistrar: () => void;
}

export interface CajitaEmptyStateProps {
  borradorId: string | null;
  onPlanear: () => void;
}

export interface RegistrarAporteModalProps {
  isOpen: boolean;
  sugerido: number;
  registrando: boolean;
  onClose: () => void;
  onSubmit: (monto: number, nota?: string) => Promise<void>;
}

/** One bar in the contributions chart. */
export interface AporteBarra {
  id: string;
  alturaPorcentaje: number;
  etiqueta: string;
  monto: number;
  esUltimo: boolean;
}

/** Campos del formulario de aporte, derivados del schema compartido. */
export type RegistrarAporteFormData = z.infer<typeof registrarAporteValidationSchema>;
