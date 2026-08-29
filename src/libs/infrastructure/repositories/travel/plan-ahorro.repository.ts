/**
 * PlanDeAhorro Repository - Prisma Implementation
 *
 * Infrastructure layer implementation of the PlanDeAhorroRepository contract.
 * Owns the savings plan behind the "cajita" and its contribution history.
 *
 */

import type {
  CreatePlanDeAhorroRequest,
  PlanDeAhorroRepository,
  RegistrarAporteRequest,
} from '@interfaces';
import type { FrecuenciaAporte } from '@domain';
import type { PlanDeAhorroEntity, RegistroDeAhorroEntity } from '@entities';
import { prisma } from '@database';

import type { PrismaPlanRow, PrismaRegistroRow } from './travel.repository.interfaces';

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

const transformRegistro = (registro: PrismaRegistroRow): RegistroDeAhorroEntity => ({
  fecha: registro.fecha,
  id: registro.id,
  monto: registro.monto,
  nota: registro.nota,
  planId: registro.planId,
});

export const planDeAhorroRepository: PlanDeAhorroRepository = {
  create: async (request: CreatePlanDeAhorroRequest): Promise<PlanDeAhorroEntity> => {
    const plan = await prisma.planDeAhorro.create({
      data: {
        aportacion: request.aportacion,
        fechaObjetivo: request.fechaObjetivo,
        frecuencia: request.frecuencia,
        meta: request.meta,
        montoInicial: request.montoInicial,
        recordatorios: request.recordatorios,
        viajeId: request.viajeId,
      },
    });

    return transformPlan(plan);
  },
  findByViajeId: async (viajeId: string): Promise<PlanDeAhorroEntity | null> => {
    const plan = await prisma.planDeAhorro.findUnique({ where: { viajeId } });

    return plan ? transformPlan(plan) : null;
  },
  findRegistros: async (planId: string): Promise<RegistroDeAhorroEntity[]> => {
    const registros = await prisma.registroDeAhorro.findMany({
      orderBy: { fecha: 'asc' },
      where: { planId },
    });

    return registros.map(transformRegistro);
  },
  registrarAporte: async (request: RegistrarAporteRequest): Promise<RegistroDeAhorroEntity> => {
    const registro = await prisma.registroDeAhorro.create({
      data: {
        monto: request.monto,
        nota: request.nota ?? null,
        planId: request.planId,
        ...(request.fecha ? { fecha: request.fecha } : {}),
      },
    });

    return transformRegistro(registro);
  },
};
