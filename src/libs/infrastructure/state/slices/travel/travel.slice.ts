/**
 * Travel Redux Slice
 *
 * Owns the savings box state. Loading and error toasts come free from
 * `createManagedThunk`, so this slice keeps no `loading` or `error` field —
 * those are derived from `global` in the selectors, same as users.
 */

import { createManagedThunk } from '@thunks';
import { createSlice } from '@reduxjs/toolkit';
import type { RegistrarAportePayload } from '@services';
import { TravelService } from '@services';

import type { CajitaPayload, TravelState } from './travel.slice.interfaces';

const initialState: TravelState = {
  borradorId: null,
  cajita: null,
  cargada: false,
  lastUpdated: null,
};

export const fetchCajitaAction = createManagedThunk<CajitaPayload, void>({
  actionName: 'travel/fetchCajita',
  operation: async () => TravelService.getCajita(),
});

/**
 * Re-reads the box after contributing instead of patching state locally: the
 * percentage, milestone and remaining periods are all computed server-side.
 */
export const registrarAporteAction = createManagedThunk<CajitaPayload, RegistrarAportePayload>({
  actionName: 'travel/registrarAporte',
  operation: async (payload) => {
    await TravelService.registrarAporte(payload);

    return TravelService.getCajita();
  },
  showSuccessNotification: true,
  successMessage: () => 'Aporte registrado. ¡Vas avanzando!',
});

const guardarCajita = (state: TravelState, payload: CajitaPayload): void => {
  state.borradorId = payload.borradorId;
  state.cajita = payload.cajita;
  state.cargada = true;
  state.lastUpdated = new Date().toISOString();
};

export const travelSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchCajitaAction.fulfilled, (state, action) => {
      guardarCajita(state, action.payload);
    });
    builder.addCase(registrarAporteAction.fulfilled, (state, action) => {
      guardarCajita(state, action.payload);
    });
  },
  initialState,
  name: 'travel',
  reducers: {
    clearCajitaAction: (state) => {
      state.borradorId = null;
      state.cajita = null;
      state.cargada = false;
      state.lastUpdated = null;
    },
  },
});

export const { clearCajitaAction } = travelSlice.actions;
