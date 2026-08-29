/**
 * Viaje Repository - Prisma Implementation
 *
 * Infrastructure layer implementation of the ViajeRepository contract.
 * Owns the user's trip: the wizard draft (BORRADOR) and the active trip
 * being saved for (AHORRANDO).
 *
 */

import type {
  AtraccionViajeEntity,
  PlanDeAhorroEntity,
  ViajeDetalleEntity,
  ViajeEntity,
} from '@entities';
import type { EstiloNivel, FrecuenciaAporte, Ritmo } from '@domain';
import type { Prioridad, TripStatus } from '@domain-types';
import { prisma } from '@database';
import type { SaveViajeDraftRequest, ViajeRepository } from '@interfaces';

import type {
  PrismaAtraccionViajeRow,
  PrismaPlanRow,
  PrismaViajeRow,
  ViajeConRelaciones,
} from './travel.repository.interfaces';
import { VIAJE_DETALLE_INCLUDE } from './travel.repository.constants';

const transformViaje = (viaje: PrismaViajeRow): ViajeEntity => ({
  actualizadoEn: viaje.actualizadoEn,
  costoMax: viaje.costoMax,
  costoMin: viaje.costoMin,
  creadoEn: viaje.creadoEn,
  destinoId: viaje.destinoId,
  estado: viaje.estado as TripStatus,
  estiloAlojamiento: viaje.estiloAlojamiento as EstiloNivel,
  estiloComida: viaje.estiloComida as EstiloNivel,
  fechaSalida: viaje.fechaSalida,
  id: viaje.id,
  noches: viaje.noches,
  personas: viaje.personas,
  ritmo: viaje.ritmo as Ritmo,
  userId: viaje.userId,
});

const transformPlan = (plan: PrismaPlanRow): PlanDeAhorroEntity => ({
  aportacion: plan.aportacion,
  creadoEn: plan.creadoEn,
  fechaObjetivo: plan.fechaObjetivo,
  frecuencia: plan.frecuencia as FrecuenciaAporte,
  id: plan.id,
  meta: plan.meta,
  montoInicial: plan.montoInicial,
  recordatorios: plan.recordatorios,
  viajeId: plan.viajeId,
});

const transformAtraccionViaje = (seleccion: PrismaAtraccionViajeRow): AtraccionViajeEntity => ({
  atraccion: { ...seleccion.atraccion },
  atraccionId: seleccion.atraccionId,
  id: seleccion.id,
  prioridad: seleccion.prioridad as Prioridad,
  viajeId: seleccion.viajeId,
});

const transformDetalle = (viaje: ViajeConRelaciones): ViajeDetalleEntity => ({
  ...transformViaje(viaje),
  atracciones: viaje.atracciones.map(transformAtraccionViaje),
  destino: { ...viaje.destino },
  plan: viaje.plan ? transformPlan(viaje.plan) : null,
});

/**
 * Fields the wizard can push on each step. Undefined means "not touched yet",
 * so it is stripped before hitting Prisma to avoid clobbering saved answers.
 */
const buildDraftData = (request: SaveViajeDraftRequest): Record<string, unknown> => {
  const campos = {
    costoMax: request.costoMax,
    costoMin: request.costoMin,
    estiloAlojamiento: request.estiloAlojamiento,
    estiloComida: request.estiloComida,
    fechaSalida: request.fechaSalida,
    noches: request.noches,
    personas: request.personas,
    ritmo: request.ritmo,
  };

  return Object.fromEntries(Object.entries(campos).filter(([, valor]) => valor !== undefined));
};

/** Replaces the whole selection: the wizard always sends the full set. */
const reemplazarAtracciones = async (
  viajeId: string,
  atracciones: NonNullable<SaveViajeDraftRequest['atracciones']>
): Promise<void> => {
  await prisma.atraccionViaje.deleteMany({ where: { viajeId } });

  if (atracciones.length === 0) {
    return;
  }

  await prisma.atraccionViaje.createMany({
    data: atracciones.map((seleccion) => ({
      atraccionId: seleccion.atraccionId,
      prioridad: seleccion.prioridad,
      viajeId,
    })),
  });
};

export const viajeRepository: ViajeRepository = {
  delete: async (id: string): Promise<void> => {
    await prisma.viaje.delete({ where: { id } });
  },
  findActivoByUserId: async (userId: string): Promise<ViajeDetalleEntity | null> => {
    const viaje = await prisma.viaje.findFirst({
      include: VIAJE_DETALLE_INCLUDE,
      orderBy: [{ estado: 'asc' }, { actualizadoEn: 'desc' }],
      where: { estado: { in: ['AHORRANDO', 'BORRADOR'] }, userId },
    });

    return viaje ? transformDetalle(viaje) : null;
  },
  findById: async (id: string): Promise<ViajeDetalleEntity | null> => {
    const viaje = await prisma.viaje.findUnique({ include: VIAJE_DETALLE_INCLUDE, where: { id } });

    return viaje ? transformDetalle(viaje) : null;
  },
  saveDraft: async (request: SaveViajeDraftRequest): Promise<ViajeDetalleEntity> => {
    const existente = await prisma.viaje.findFirst({
      where: { estado: 'BORRADOR', userId: request.userId },
    });
    const data = buildDraftData(request);
    const guardado = existente
      ? await prisma.viaje.update({
          data: { ...data, destinoId: request.destinoId },
          where: { id: existente.id },
        })
      : await prisma.viaje.create({
          data: {
            costoMax: request.costoMax ?? 0,
            costoMin: request.costoMin ?? 0,
            destinoId: request.destinoId,
            userId: request.userId,
            ...data,
          },
        });

    if (request.atracciones) {
      await reemplazarAtracciones(guardado.id, request.atracciones);
    }

    const viaje = await prisma.viaje.findUniqueOrThrow({
      include: VIAJE_DETALLE_INCLUDE,
      where: { id: guardado.id },
    });

    return transformDetalle(viaje);
  },
  updateEstado: async (id: string, estado: TripStatus): Promise<ViajeEntity> => {
    const viaje = await prisma.viaje.update({ data: { estado }, where: { id } });

    return transformViaje(viaje);
  },
};
