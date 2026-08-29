/**
 * Travel Repository Constants
 *
 * Prisma `include` shapes shared by the travel repositories, so every query
 * that loads a trip or a destination returns the same relations.
 */

export const VIAJE_DETALLE_INCLUDE = {
  atracciones: { include: { atraccion: true } },
  destino: true,
  plan: true,
} as const;

export const DESTINO_DETALLE_INCLUDE = {
  atracciones: { orderBy: { nombre: 'asc' } },
  temporadas: { orderBy: { mes: 'asc' } },
} as const;

/** Season multiplier used when a destination has no row for that month. */
export const MULTIPLICADOR_BASE = 1;
