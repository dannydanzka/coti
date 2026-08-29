/**
 * DashboardScreen Helpers
 *
 * Pure presentation helpers. All the financial math already happened in the use
 * case; these only shape what is displayed.
 */

import type { SerializedCajita, SerializedRegistro } from '@services';

import type { AporteBarra } from './DashboardScreen.interfaces';
import { APORTES_VISIBLES } from './DashboardScreen.constants';

const MESES_CORTOS = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
];

/** Short month label for a contribution, e.g. "sep". */
export const formatMesCorto = (iso: string): string => MESES_CORTOS[new Date(iso).getMonth()] ?? '';

/** Long date for the next contribution, e.g. "1 de marzo". */
export const formatDiaYMes = (iso: string | null): string => {
  if (!iso) {
    return '';
  }

  const fecha = new Date(iso);

  return `${fecha.getDate()} de ${new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(fecha)}`;
};

/**
 * Turns the last contributions into bar heights, scaled against the biggest one
 * so the chart always fills its box.
 */
export const construirBarras = (registros: SerializedRegistro[]): AporteBarra[] => {
  const visibles = registros.slice(-APORTES_VISIBLES);

  if (visibles.length === 0) {
    return [];
  }

  const mayor = Math.max(...visibles.map((registro) => registro.monto));

  return visibles.map((registro, indice) => ({
    alturaPorcentaje: mayor > 0 ? Math.round((registro.monto / mayor) * 100) : 0,
    esUltimo: indice === visibles.length - 1,
    etiqueta: formatMesCorto(registro.fecha),
    id: registro.id,
    monto: registro.monto,
  }));
};

/** Trip title used in the greeting subtitle, e.g. "Tokio". */
export const obtenerDestino = (cajita: SerializedCajita): string => cajita.viaje.destino.ciudad;
