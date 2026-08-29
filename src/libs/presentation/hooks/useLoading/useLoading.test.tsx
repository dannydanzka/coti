/**
 * useLoading Hook Tests
 *
 * Essential tests for global loading state management hook.
 * Following TESTING-STANDARDS.md: Spanish locale, centralized imports, essential tests.
 *
 * Two loading sources:
 * - globalLoading: Manual full-screen overlay
 * - activeLoaders: Automatic per-thunk loading via createManagedThunk
 */

import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';

import { act } from '@testing';
import { configureStore } from '@reduxjs/toolkit';
import { globalSlice } from '@redux';

import { useLoading } from './useLoading';

const createTestStore = () => {
  return configureStore({
    reducer: {
      global: globalSlice.reducer,
    },
  });
};

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
};

describe('useLoading Hook', () => {
  it('returns initial loading state', () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    expect(result.current.isGlobalLoading).toBe(false);
    expect(result.current.isAnyLoading).toBe(false);
  });

  it('provides Spanish loading helpers', () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    expect(typeof result.current.mostrarCargaGlobal).toBe('function');
    expect(typeof result.current.ocultarCargaGlobal).toBe('function');
    expect(typeof result.current.guardando).toBe('function');
    expect(typeof result.current.procesando).toBe('function');
  });

  it('handles global loading state', () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    act(() => {
      result.current.mostrarCargaGlobal();
    });

    expect(result.current.isGlobalLoading).toBe(true);
    expect(result.current.isAnyLoading).toBe(true);

    act(() => {
      result.current.ocultarCargaGlobal();
    });

    expect(result.current.isGlobalLoading).toBe(false);
    expect(result.current.isAnyLoading).toBe(false);
  });

  it('provides Spanish loading messages', () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    expect(result.current.mensajes.CARGANDO).toBe('Cargando...');
    expect(result.current.mensajes.GUARDANDO).toBe('Guardando...');
    expect(result.current.mensajes.PROCESANDO).toBe('Procesando...');
    expect(result.current.mensajes.ACTUALIZANDO).toBe('Actualizando...');
    expect(result.current.mensajes.ELIMINANDO).toBe('Eliminando...');
  });

  it('Spanish loading helpers trigger global loading', () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    act(() => {
      result.current.guardando();
    });
    expect(result.current.isGlobalLoading).toBe(true);

    act(() => {
      result.current.ocultarCargaGlobal();
    });

    act(() => {
      result.current.procesando();
    });
    expect(result.current.isGlobalLoading).toBe(true);

    act(() => {
      result.current.ocultarCargaGlobal();
    });

    act(() => {
      result.current.actualizando();
    });
    expect(result.current.isGlobalLoading).toBe(true);
  });

  it('provides English compatibility helpers', () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    expect(typeof result.current.showGlobalLoading).toBe('function');
    expect(typeof result.current.hideGlobalLoading).toBe('function');

    act(() => {
      result.current.showGlobalLoading();
    });
    expect(result.current.isGlobalLoading).toBe(true);

    act(() => {
      result.current.hideGlobalLoading();
    });
    expect(result.current.isGlobalLoading).toBe(false);
  });

  it('isAnyLoading reflects global loading state', () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    expect(result.current.isAnyLoading).toBe(false);

    act(() => {
      result.current.mostrarCargaGlobal();
    });
    expect(result.current.isAnyLoading).toBe(true);

    act(() => {
      result.current.ocultarCargaGlobal();
    });
    expect(result.current.isAnyLoading).toBe(false);
  });
});
