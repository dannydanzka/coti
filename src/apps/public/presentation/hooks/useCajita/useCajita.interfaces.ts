/**
 * useCajita Interfaces
 */

import type { ViajeEntity } from '@interfaces';

export interface CajitaMonth {
  key: string;
  label: string;
  monto: number;
}

export interface CajitaMetrics {
  ahorrado: number;
  aportes: number;
  faltante: number;
  hito: 25 | 50 | 75 | 100 | null;
  meses: CajitaMonth[];
  mesesRestantes: number;
  meta: number;
  porcentaje: number;
  proximoAporte: Date;
}

export interface UseCajitaReturn {
  isLoaded: boolean;
  isSaving: boolean;
  metrics: CajitaMetrics | null;
  refresh: () => void;
  registrarAporte: (monto: number, nota?: string) => Promise<boolean>;
  viaje: ViajeEntity | null;
}
