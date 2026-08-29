/**
 * Travel Memoized Selectors
 *
 * Loading is derived from the global loader registry, not from the slice:
 * `createManagedThunk` registers one loader per action name.
 */

import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

const selectTravelState = (state: RootState) => state.travel;

export const selectCajita = createSelector([selectTravelState], (travel) => travel.cajita);

export const selectBorradorId = createSelector([selectTravelState], (travel) => travel.borradorId);

/** True once a fetch resolved — tells "not loaded yet" apart from "loaded and empty". */
export const selectCajitaCargada = createSelector([selectTravelState], (travel) => travel.cargada);

export const selectTieneCajita = createSelector(
  [selectTravelState],
  (travel) => travel.cajita !== null
);

export const selectCajitaLoading = createSelector(
  [(state: RootState) => state.global.activeLoaders],
  (activeLoaders) => Boolean(activeLoaders['LOADER_FOR_travel/fetchCajita'])
);

export const selectAporteEnCurso = createSelector(
  [(state: RootState) => state.global.activeLoaders],
  (activeLoaders) => Boolean(activeLoaders['LOADER_FOR_travel/registrarAporte'])
);

export const selectCajitaError = createSelector(
  [(state: RootState) => state.global.notifications],
  (notifications) => {
    const errores = notifications.filter(
      (notificacion) => notificacion.type === 'error' && notificacion.origin?.startsWith('travel/')
    );

    return errores.length > 0 ? (errores[errores.length - 1]?.message ?? null) : null;
  }
);
