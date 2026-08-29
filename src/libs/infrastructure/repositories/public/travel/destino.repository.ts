/**
 * Destino Repository - Prisma Implementation
 *
 * Catálogo curado de destinos con sus temporadas y atracciones.
 */

import type { DestinoEntity, DestinoRepository } from '@interfaces';
import { logError } from '@logger';
import { prisma } from '@database';

const DESTINO_INCLUDE = {
  atracciones: { orderBy: { nombre: 'asc' as const } },
  temporadas: { orderBy: { mes: 'asc' as const } },
};

type PrismaDestino = NonNullable<
  Awaited<ReturnType<typeof prisma.destino.findFirst<{ include: typeof DESTINO_INCLUDE }>>>
>;

const toEntity = (destino: PrismaDestino): DestinoEntity => ({
  atracciones: destino.atracciones.map((atraccion) => ({
    costoMax: atraccion.costoMax,
    costoMin: atraccion.costoMin,
    descripcion: atraccion.descripcion,
    id: atraccion.id,
    nombre: atraccion.nombre,
  })),
  ciudad: destino.ciudad,
  continente: destino.continente,
  descripcion: destino.descripcion,
  diarioMax: destino.diarioMax,
  diarioMin: destino.diarioMin,
  diasSugeridos: destino.diasSugeridos,
  emoji: destino.emoji,
  hospedajeMax: destino.hospedajeMax,
  hospedajeMin: destino.hospedajeMin,
  id: destino.id,
  pais: destino.pais,
  slug: destino.slug,
  temporadas: destino.temporadas.map((temporada) => ({
    mes: temporada.mes,
    multiplicador: temporada.multiplicador,
  })),
  visaCosto: destino.visaCosto,
  vueloMax: destino.vueloMax,
  vueloMin: destino.vueloMin,
});

export const destinoRepository: DestinoRepository = {
  findAll: async () => {
    try {
      const destinos = await prisma.destino.findMany({
        include: DESTINO_INCLUDE,
        orderBy: [{ continente: 'asc' }, { ciudad: 'asc' }],
      });
      return destinos.map(toEntity);
    } catch (error) {
      logError(error, 'destinoRepository.findAll');
      throw error;
    }
  },
  findById: async (id) => {
    try {
      const destino = await prisma.destino.findUnique({ include: DESTINO_INCLUDE, where: { id } });
      return destino ? toEntity(destino) : null;
    } catch (error) {
      logError(error, 'destinoRepository.findById');
      throw error;
    }
  },
};
