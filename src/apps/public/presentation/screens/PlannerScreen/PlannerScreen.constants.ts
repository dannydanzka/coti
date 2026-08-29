/**
 * PlannerScreen Constants
 */

import type { EstiloViaje } from '@interfaces';
import type { FrecuenciaAporte } from '@domain';
import type { MetaOpcion } from '@redux';

export const ESTILOS: Array<{ emoji: string; key: EstiloViaje }> = [
  { emoji: '🎒', key: 'MOCHILERO' },
  { emoji: '🛏️', key: 'COMODO' },
  { emoji: '✨', key: 'BOUTIQUE' },
  { emoji: '🍜', key: 'FOODIE' },
  { emoji: '🌿', key: 'NATURALEZA' },
  { emoji: '🏛️', key: 'CULTURA' },
  { emoji: '🪩', key: 'FIESTA' },
  { emoji: '🌊', key: 'RELAX' },
];

export const PRIORIDAD = { MUST_GO: 'MUST_GO', WOULD_BE_NICE: 'WOULD_BE_NICE' } as const;

export const META_OPCIONES: MetaOpcion[] = ['MINIMO', 'COMODO', 'SIN_LIMITES'];

export const FRECUENCIAS: FrecuenciaAporte[] = ['SEMANAL', 'QUINCENAL', 'MENSUAL'];

export const APORTACION_RANGE = { MAX: 20000, MIN: 500, STEP: 100 } as const;

export const MONTOS_RAPIDOS = [1000, 2500, 5000, 10000] as const;

export const MAX_PERSONAS = 8;

/** Ordinal del paso en la URL/estado → clave i18n del título de sección. */
export const STEP_KEYS = [
  'define',
  'style',
  'attractions',
  'projection',
  'plan',
  'start',
  'activate',
] as const;
