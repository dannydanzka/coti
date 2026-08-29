'use client';

/**
 * useCajita
 *
 * Bridge between the savings box screen and Redux. The screen never dispatches
 * or selects directly (`custom/no-redux-in-components`).
 *
 * Every amount and percentage arrives already computed from the API, so this
 * hook only moves data — it does no math.
 */

import { useCallback, useEffect } from 'react';

import {
  fetchCajitaAction,
  registrarAporteAction,
  selectAporteEnCurso,
  selectBorradorId,
  selectCajita,
  selectCajitaCargada,
  selectCajitaError,
  selectCajitaLoading,
  selectTieneCajita,
} from '@redux';
import { logError } from '@logger';

import { useAppDispatch, useAppSelector } from '../useRedux';
import type { UseCajitaResult } from './useCajita.interfaces';

export const useCajita = (): UseCajitaResult => {
  const dispatch = useAppDispatch();

  const cajita = useAppSelector(selectCajita);
  const borradorId = useAppSelector(selectBorradorId);
  const cargada = useAppSelector(selectCajitaCargada);
  const loading = useAppSelector(selectCajitaLoading);
  const aporteEnCurso = useAppSelector(selectAporteEnCurso);
  const error = useAppSelector(selectCajitaError);
  const tieneCajita = useAppSelector(selectTieneCajita);

  const recargar = useCallback(() => {
    void dispatch(fetchCajitaAction());
  }, [dispatch]);

  useEffect(() => {
    if (!cargada) {
      recargar();
    }
  }, [cargada, recargar]);

  const registrarAporte = useCallback(
    async (monto: number, nota?: string) => {
      try {
        await dispatch(registrarAporteAction({ monto, nota: nota ?? null })).unwrap();

        return { success: true };
      } catch (err) {
        /** El toast de error ya lo emite createManagedThunk; aquí sólo se deja rastro. */
        logError(err, 'useCajita.registrarAporte');

        return { success: false };
      }
    },
    [dispatch]
  );

  return {
    aporteEnCurso,
    borradorId,
    cajita,
    cargada,
    error,
    loading,
    recargar,
    registrarAporte,
    tieneCajita,
  };
};
