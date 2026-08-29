/**
 * useLoading Hook - Context7 Compliant
 *
 * Perfect Redux bridge for global loading state management.
 * Provides memoized selectors and actions following useAuth pattern.
 * All loading messages support Spanish locale.
 *
 * Two loading sources:
 * - globalLoading: Manual full-screen overlay (showGlobalLoading/hideGlobalLoading)
 * - activeLoaders: Automatic per-thunk loading via createManagedThunk
 */

import { useCallback, useEffect } from 'react';

import { selectGlobalLoading, selectIsAnyLoading, setGlobalLoading } from '@redux';

import { useAppDispatch, useAppSelector } from '../useRedux';
import type { UseLoadingReturn } from './useLoading.interfaces';

const SPANISH_LOADING_MESSAGES = {
  ACTUALIZANDO: 'Actualizando...',
  CARGANDO: 'Cargando...',
  CARGANDO_DATOS: 'Cargando datos...',
  DESCARGANDO: 'Descargando...',
  ELIMINANDO: 'Eliminando...',
  ENVIANDO: 'Enviando...',
  GUARDANDO: 'Guardando...',
  PROCESANDO: 'Procesando...',
  SUBIENDO: 'Subiendo archivos...',
} as const;

export const useLoading = (): UseLoadingReturn => {
  const dispatch = useAppDispatch();
  const isGlobalLoading = useAppSelector(selectGlobalLoading);
  const isAnyLoadingFromRedux = useAppSelector(selectIsAnyLoading);

  const showGlobalLoading = useCallback(() => {
    dispatch(setGlobalLoading(true));
  }, [dispatch]);

  const hideGlobalLoading = useCallback(() => {
    dispatch(setGlobalLoading(false));
  }, [dispatch]);

  return {
    actualizando: showGlobalLoading,
    cargandoDatos: showGlobalLoading,
    descargando: showGlobalLoading,
    eliminando: showGlobalLoading,
    enviando: showGlobalLoading,
    guardando: showGlobalLoading,
    hideGlobalLoading,
    isAnyLoading: isAnyLoadingFromRedux,
    isGlobalLoading,
    mensajes: SPANISH_LOADING_MESSAGES,
    mostrarCargaGlobal: showGlobalLoading,
    ocultarCargaGlobal: hideGlobalLoading,
    procesando: showGlobalLoading,
    showGlobalLoading,
    subiendoArchivos: showGlobalLoading,
  };
};

export const useGlobalLoading = () => {
  return useAppSelector(selectGlobalLoading);
};

/**
 * Drives the single global full-screen overlay from a local/thunk loading flag.
 *
 * There is exactly ONE loader in the app (the logo overlay in Providers). Screens
 * that would otherwise render a blank page while their data loads call this hook so
 * that same overlay covers them — no per-screen loaders. Turns the overlay on while
 * `isLoading` is true and off on transition to false or on unmount.
 */
export const useSyncGlobalLoading = (isLoading: boolean): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading) {
      return undefined;
    }

    dispatch(setGlobalLoading(true));

    return () => {
      dispatch(setGlobalLoading(false));
    };
  }, [dispatch, isLoading]);
};

export const useLoadingHelpers = () => {
  const {
    actualizando,
    cargandoDatos,
    guardando,
    ocultarCargaGlobal,
    procesando,
    showGlobalLoading,
  } = useLoading();

  return {
    actualizando,
    cargandoDatos,
    guardando,
    mostrarCargaGlobal: showGlobalLoading,
    ocultarCargaGlobal,
    procesando,
  };
};

export const useLoadingHelpersEnglish = () => {
  const { hideGlobalLoading, showGlobalLoading } = useLoading();

  return {
    hideGlobalLoading,
    showGlobalLoading,
  };
};
