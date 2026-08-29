/**
 * useCajita Interfaces
 */

import type { SerializedCajita } from '@services';

export interface UseCajitaResult {
  cajita: SerializedCajita | null;
  borradorId: string | null;
  cargada: boolean;
  loading: boolean;
  aporteEnCurso: boolean;
  error: string | null;
  tieneCajita: boolean;
  recargar: () => void;
  registrarAporte: (monto: number, nota?: string) => Promise<{ success: boolean }>;
}
