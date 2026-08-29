/**
 * useCajita
 *
 * Viaje activo + métricas de la cajita (paso 8 y dashboard). Carga el viaje
 * una vez por sesión y deriva avance, hitos y calendario de aportes con las
 * funciones puras del dominio.
 */

'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { DIAS_POR_APORTE, hitoAlcanzado, porcentajeAvance } from '@domain';
import {
  fetchViajeActivoAction,
  registrarAporteAction,
  selectTravelSaving,
  selectViajeActivo,
  selectViajeLoaded,
} from '@redux';
import { useAppDispatch, useAppSelector } from '@hooks';

import type { CajitaMetrics, CajitaMonth, UseCajitaReturn } from './useCajita.interfaces';

const MONTHS_SHOWN = 6;
const MS_PER_DAY = 86_400_000;

const monthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;

const buildMonths = (registros: Array<{ fecha: string; monto: number }>): CajitaMonth[] => {
  const totals = new Map<string, number>();
  registros.forEach((registro) => {
    const key = monthKey(new Date(registro.fecha));
    totals.set(key, (totals.get(key) ?? 0) + registro.monto);
  });
  const formatter = new Intl.DateTimeFormat('es-MX', { month: 'short' });
  const months: CajitaMonth[] = [];
  for (let offset = MONTHS_SHOWN - 1; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - offset);
    const key = monthKey(date);
    months.push({
      key,
      label: formatter.format(date).replace('.', ''),
      monto: totals.get(key) ?? 0,
    });
  }
  return months;
};

export const useCajita = (): UseCajitaReturn => {
  const dispatch = useAppDispatch();
  const viaje = useAppSelector(selectViajeActivo);
  const isLoaded = useAppSelector(selectViajeLoaded);
  const isSaving = useAppSelector(selectTravelSaving);

  useEffect(() => {
    if (!isLoaded) {
      void dispatch(fetchViajeActivoAction());
    }
  }, [dispatch, isLoaded]);

  const refresh = useCallback(() => {
    void dispatch(fetchViajeActivoAction());
  }, [dispatch]);

  const metrics = useMemo<CajitaMetrics | null>(() => {
    if (!viaje?.plan) return null;
    const { plan } = viaje;
    const ahorrado = plan.registros.reduce(
      (total, registro) => total + registro.monto,
      plan.montoInicial
    );
    const porcentaje = porcentajeAvance(ahorrado, plan.meta);
    const salida = viaje.fechaSalida ? new Date(viaje.fechaSalida) : new Date(plan.fechaObjetivo);
    const mesesRestantes = Math.max(
      0,
      Math.round((salida.getTime() - Date.now()) / (MS_PER_DAY * 30))
    );
    const ultimo = plan.registros.at(-1);
    const proximoAporte = ultimo ? new Date(ultimo.fecha) : new Date();
    proximoAporte.setDate(proximoAporte.getDate() + DIAS_POR_APORTE[plan.frecuencia]);
    return {
      ahorrado,
      aportes: plan.registros.length,
      faltante: Math.max(0, plan.meta - ahorrado),
      hito: hitoAlcanzado(porcentaje),
      meses: buildMonths(plan.registros),
      mesesRestantes,
      meta: plan.meta,
      porcentaje,
      proximoAporte: proximoAporte.getTime() < Date.now() ? new Date() : proximoAporte,
    };
  }, [viaje]);

  const registrarAporte = useCallback(
    async (monto: number, nota?: string) => {
      const result = await dispatch(registrarAporteAction({ monto, nota }));
      return registrarAporteAction.fulfilled.match(result);
    },
    [dispatch]
  );

  return { isLoaded, isSaving, metrics, refresh, registrarAporte, viaje };
};
