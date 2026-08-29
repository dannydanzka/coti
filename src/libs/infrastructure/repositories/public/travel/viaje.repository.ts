/**
 * Viaje Repository - Prisma Implementation
 *
 * Viaje + plan de ahorro + registros de la cajita. El "viaje activo" es el más
 * reciente en estado AHORRANDO del usuario.
 */

import type {
  CreateViajeInput,
  RegistrarAporteInput,
  ViajeEntity,
  ViajeRepository,
} from '@interfaces';
import type { EstiloNivel, Ritmo } from '@domain';
import { logError } from '@logger';
import { prisma } from '@database';

const VIAJE_INCLUDE = {
  atracciones: { include: { atraccion: true } },
  destino: true,
  plan: { include: { registros: { orderBy: { fecha: 'asc' as const } } } },
};

type PrismaViaje = NonNullable<
  Awaited<ReturnType<typeof prisma.viaje.findFirst<{ include: typeof VIAJE_INCLUDE }>>>
>;

const toEntity = (viaje: PrismaViaje): ViajeEntity => ({
  atracciones: viaje.atracciones.map((item) => ({
    atraccionId: item.atraccionId,
    nombre: item.atraccion.nombre,
    prioridad: item.prioridad,
  })),
  costoMax: viaje.costoMax,
  costoMin: viaje.costoMin,
  destino: {
    ciudad: viaje.destino.ciudad,
    emoji: viaje.destino.emoji,
    id: viaje.destino.id,
    pais: viaje.destino.pais,
    slug: viaje.destino.slug,
  },
  estado: viaje.estado,
  estiloAlojamiento: viaje.estiloAlojamiento as EstiloNivel,
  estiloComida: viaje.estiloComida as EstiloNivel,
  fechaSalida: viaje.fechaSalida ? viaje.fechaSalida.toISOString() : null,
  id: viaje.id,
  noches: viaje.noches,
  personas: viaje.personas,
  plan: viaje.plan
    ? {
        aportacion: viaje.plan.aportacion,
        fechaObjetivo: viaje.plan.fechaObjetivo.toISOString(),
        frecuencia: viaje.plan.frecuencia,
        id: viaje.plan.id,
        meta: viaje.plan.meta,
        montoInicial: viaje.plan.montoInicial,
        recordatorios: viaje.plan.recordatorios,
        registros: viaje.plan.registros.map((registro) => ({
          fecha: registro.fecha.toISOString(),
          id: registro.id,
          monto: registro.monto,
          nota: registro.nota,
        })),
      }
    : null,
  ritmo: viaje.ritmo as Ritmo,
});

export const viajeRepository: ViajeRepository = {
  addRegistro: async (planId, input: RegistrarAporteInput) => {
    try {
      const registro = await prisma.registroDeAhorro.create({
        data: { monto: input.monto, nota: input.nota ?? null, planId },
      });
      return {
        fecha: registro.fecha.toISOString(),
        id: registro.id,
        monto: registro.monto,
        nota: registro.nota,
      };
    } catch (error) {
      logError(error, 'viajeRepository.addRegistro');
      throw error;
    }
  },
  create: async (userId, input: CreateViajeInput, rango) => {
    try {
      const fechaSalida = new Date(input.fechaSalida);
      const viaje = await prisma.viaje.create({
        data: {
          atracciones: {
            create: input.atracciones.map((item) => ({
              atraccionId: item.atraccionId,
              prioridad: item.prioridad,
            })),
          },
          costoMax: rango.costoMax,
          costoMin: rango.costoMin,
          destinoId: input.destinoId,
          estado: 'AHORRANDO',
          estiloAlojamiento: input.estiloAlojamiento,
          estiloComida: input.estiloComida,
          fechaSalida,
          noches: input.noches,
          personas: input.personas,
          plan: {
            create: {
              aportacion: input.aportacion,
              fechaObjetivo: fechaSalida,
              frecuencia: input.frecuencia,
              meta: input.meta,
              montoInicial: input.montoInicial,
              recordatorios: input.recordatorios,
            },
          },
          ritmo: input.ritmo,
          userId,
        },
        include: VIAJE_INCLUDE,
      });
      return toEntity(viaje);
    } catch (error) {
      logError(error, 'viajeRepository.create');
      throw error;
    }
  },
  findActivoByUserId: async (userId) => {
    try {
      const viaje = await prisma.viaje.findFirst({
        include: VIAJE_INCLUDE,
        orderBy: { creadoEn: 'desc' },
        where: { estado: 'AHORRANDO', userId },
      });
      return viaje ? toEntity(viaje) : null;
    } catch (error) {
      logError(error, 'viajeRepository.findActivoByUserId');
      throw error;
    }
  },
};
