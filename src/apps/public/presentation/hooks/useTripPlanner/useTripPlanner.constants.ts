/**
 * useTripPlanner Constants
 *
 * Los chips de estilo del paso 2 se traducen a los tres ejes del dominio
 * (alojamiento · comida · ritmo). Si hay chips en conflicto gana el último.
 */

import type { EstiloNivel, Ritmo } from '@domain';
import type { EstiloViaje } from '@interfaces';

export const ESTILO_ALOJAMIENTO: Partial<Record<EstiloViaje, EstiloNivel>> = {
  BOUTIQUE: 'COMODO',
  COMODO: 'MEDIO',
  MOCHILERO: 'ECONOMICO',
};

export const ESTILO_COMIDA: Partial<Record<EstiloViaje, EstiloNivel>> = {
  FOODIE: 'COMODO',
  MOCHILERO: 'ECONOMICO',
};

export const ESTILO_RITMO: Partial<Record<EstiloViaje, Ritmo>> = {
  CULTURA: 'INTENSO',
  FIESTA: 'INTENSO',
  NATURALEZA: 'RELAJADO',
  RELAX: 'RELAJADO',
};

export const MS_PER_DAY = 86_400_000;

export const MUST_GO = 'MUST_GO';
