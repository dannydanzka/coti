/**
 * Travel Memoized Selectors
 */

import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

const selectTravelState = (state: RootState) => state.travel;

export const selectDestinos = createSelector([selectTravelState], (travel) => travel.destinos);
export const selectDestinosLoaded = createSelector(
  [selectTravelState],
  (travel) => travel.destinosLoaded
);
export const selectPlannerDraft = createSelector([selectTravelState], (travel) => travel.draft);
export const selectViajeActivo = createSelector(
  [selectTravelState],
  (travel) => travel.viajeActivo
);
export const selectViajeLoaded = createSelector(
  [selectTravelState],
  (travel) => travel.viajeLoaded
);

export const selectDestinoSeleccionado = createSelector(
  [selectDestinos, selectPlannerDraft],
  (destinos, draft) => destinos.find((destino) => destino.id === draft.destinoId) ?? null
);

export const selectTravelSaving = createSelector(
  [(state: RootState) => state.global.activeLoaders],
  (activeLoaders) =>
    Boolean(activeLoaders['LOADER_FOR_travel/createViaje']) ||
    Boolean(activeLoaders['LOADER_FOR_travel/registrarAporte'])
);
