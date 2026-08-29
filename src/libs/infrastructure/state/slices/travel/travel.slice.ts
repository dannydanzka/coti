/**
 * Travel Redux Slice
 *
 * Borrador del wizard de planeación + viaje activo. El borrador no se persiste:
 * "Guardar y salir" en el MVP significa quedarse en memoria hasta recargar.
 */

import { createManagedThunk } from '@thunks';
import { createSlice } from '@reduxjs/toolkit';
import type {
  CreateViajeInput,
  DestinoEntity,
  RegistrarAporteInput,
  ViajeEntity,
} from '@interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TravelService } from '@services';

import type { PlannerDraft, TravelState } from './travel.slice.interfaces';

export const PLANNER_TOTAL_STEPS = 7;

export const INITIAL_DRAFT: PlannerDraft = {
  aportacion: 3000,
  atracciones: {},
  destinoId: null,
  estilos: [],
  fechaRegreso: null,
  fechaSalida: null,
  frecuencia: 'MENSUAL',
  metaOpcion: 'COMODO',
  montoInicial: 0,
  personas: 1,
  recordatorios: true,
  step: 1,
  tieneAhorro: false,
};

const initialState: TravelState = {
  destinos: [],
  destinosLoaded: false,
  draft: INITIAL_DRAFT,
  viajeActivo: null,
  viajeLoaded: false,
};

export const fetchDestinosAction = createManagedThunk<DestinoEntity[], void>({
  actionName: 'travel/fetchDestinos',
  operation: () => TravelService.getDestinos(),
});

export const fetchViajeActivoAction = createManagedThunk<ViajeEntity | null, void>({
  actionName: 'travel/fetchViajeActivo',
  operation: () => TravelService.getViajeActivo(),
  showLoader: false,
});

export const createViajeAction = createManagedThunk<ViajeEntity, CreateViajeInput>({
  actionName: 'travel/createViaje',
  operation: (input) => TravelService.createViaje(input),
  showSuccessNotification: true,
  successMessage: () => 'Tu cajita de ahorro está abierta',
});

export const registrarAporteAction = createManagedThunk<ViajeEntity, RegistrarAporteInput>({
  actionName: 'travel/registrarAporte',
  operation: (input) => TravelService.registrarAporte(input),
  showSuccessNotification: true,
  successMessage: () => 'Aporte registrado',
});

export const travelSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinosAction.fulfilled, (state, action) => {
        state.destinos = action.payload;
        state.destinosLoaded = true;
      })
      .addCase(fetchViajeActivoAction.fulfilled, (state, action) => {
        state.viajeActivo = action.payload;
        state.viajeLoaded = true;
      })
      .addCase(createViajeAction.fulfilled, (state, action) => {
        state.viajeActivo = action.payload;
        state.viajeLoaded = true;
        state.draft = INITIAL_DRAFT;
      })
      .addCase(registrarAporteAction.fulfilled, (state, action) => {
        state.viajeActivo = action.payload;
      });
  },
  initialState,
  name: 'travel',
  reducers: {
    goToStep: (state, action: PayloadAction<number>) => {
      state.draft.step = Math.min(PLANNER_TOTAL_STEPS, Math.max(1, action.payload));
    },
    resetDraft: (state) => {
      state.draft = INITIAL_DRAFT;
    },
    updateDraft: (state, action: PayloadAction<Partial<PlannerDraft>>) => {
      state.draft = { ...state.draft, ...action.payload };
    },
  },
});

export const { goToStep, resetDraft, updateDraft } = travelSlice.actions;
