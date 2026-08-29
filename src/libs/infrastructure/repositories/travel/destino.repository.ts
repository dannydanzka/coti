/**
 * Destino Repository - Prisma Implementation
 *
 * Infrastructure layer implementation of the DestinoRepository contract.
 * Reads the curated catalog: destinations, their attractions and season
 * multipliers. This data is seeded and read-only from the app's point of view.
 *
 */

import type {
  AtraccionEntity,
  DestinoDetalleEntity,
  DestinoEntity,
  TemporadaDestinoEntity,
} from '@entities';
import type { DestinoFilters, DestinoRepository } from '@interfaces';
import { prisma } from '@database';
import type { TemporadaNivel } from '@domain-types';

import { DESTINO_DETALLE_INCLUDE, MULTIPLICADOR_BASE } from './travel.repository.constants';
import type {
  DestinoConRelaciones,
  PrismaAtraccionRow,
  PrismaTemporadaRow,
} from './travel.repository.interfaces';

const transformAtraccion = (atraccion: PrismaAtraccionRow): AtraccionEntity => ({
  costoMax: atraccion.costoMax,
  costoMin: atraccion.costoMin,
  descripcion: atraccion.descripcion,
  destinoId: atraccion.destinoId,
  id: atraccion.id,
  nombre: atraccion.nombre,
});

const transformTemporada = (temporada: PrismaTemporadaRow): TemporadaDestinoEntity => ({
  destinoId: temporada.destinoId,
  id: temporada.id,
  mes: temporada.mes,
  multiplicador: temporada.multiplicador,
  temporada: temporada.temporada as TemporadaNivel,
});

const transformDetalle = (destino: DestinoConRelaciones): DestinoDetalleEntity => ({
  ...destino,
  atracciones: destino.atracciones.map(transformAtraccion),
  temporadas: destino.temporadas.map(transformTemporada),
});

export const destinoRepository: DestinoRepository = {
  findAtraccionesByIds: async (ids: string[]): Promise<AtraccionEntity[]> => {
    if (ids.length === 0) {
      return [];
    }

    const atracciones = await prisma.atraccion.findMany({ where: { id: { in: ids } } });

    return atracciones.map(transformAtraccion);
  },
  findById: async (id: string): Promise<DestinoDetalleEntity | null> => {
    const destino = await prisma.destino.findUnique({
      include: DESTINO_DETALLE_INCLUDE,
      where: { id },
    });

    return destino ? transformDetalle(destino) : null;
  },
  findBySlug: async (slug: string): Promise<DestinoDetalleEntity | null> => {
    const destino = await prisma.destino.findUnique({
      include: DESTINO_DETALLE_INCLUDE,
      where: { slug },
    });

    return destino ? transformDetalle(destino) : null;
  },
  findMany: async (filters?: DestinoFilters): Promise<DestinoEntity[]> => {
    const where: Record<string, unknown> = {};

    if (filters?.continente) {
      where['continente'] = filters.continente;
    }

    if (filters?.searchTerm) {
      where['OR'] = [
        { ciudad: { contains: filters.searchTerm, mode: 'insensitive' } },
        { pais: { contains: filters.searchTerm, mode: 'insensitive' } },
      ];
    }

    return prisma.destino.findMany({ orderBy: { ciudad: 'asc' }, where });
  },
  getMultiplicadorTemporada: async (destinoId: string, mes: number): Promise<number> => {
    const temporada = await prisma.temporadaDestino.findUnique({
      where: { destinoId_mes: { destinoId, mes } },
    });

    return temporada?.multiplicador ?? MULTIPLICADOR_BASE;
  },
};
