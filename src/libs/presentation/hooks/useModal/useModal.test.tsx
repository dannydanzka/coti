import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { globalSlice } from '@redux';

import { useModal } from './useModal';

const createTestStore = () =>
  configureStore({
    reducer: {
      global: globalSlice.reducer,
    },
  });

describe('useModal', () => {
  let store: ReturnType<typeof createTestStore>;
  let wrapper: ({ children }: { children: ReactNode }) => React.JSX.Element;

  beforeEach(() => {
    store = createTestStore();
    wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
  });

  it('has empty initial state', () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    expect(result.current.activeModals).toEqual([]);
    expect(result.current.topModal).toBeNull();
    expect(result.current.hasModals).toBe(false);
  });

  it('shows alert modal with confirmation', () => {
    const { result } = renderHook(() => useModal(), { wrapper });
    const onConfirm = vi.fn();

    act(() => {
      result.current.showAlert(
        'Error del Sistema',
        'Error al procesar datos de María García',
        onConfirm
      );
    });

    expect(result.current.activeModals).toHaveLength(1);
    expect(result.current.hasModals).toBe(true);

    const modal = result.current.topModal;
    expect(modal?.config.type).toBe('alert');
    expect(modal?.config.title).toBe('Error del Sistema');
    expect(modal?.config.content).toBe('Error al procesar datos de María García');

    act(() => {
      modal?.config.actions?.[0]?.onClick?.();
    });

    expect(onConfirm).toHaveBeenCalledOnce();
    expect(result.current.activeModals).toHaveLength(0);
  });

  it('shows confirm modal with both actions', () => {
    const { result } = renderHook(() => useModal(), { wrapper });
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    act(() => {
      result.current.showConfirm(
        'Confirmar Eliminación',
        '¿Eliminar usuario José Martínez?',
        onConfirm,
        onCancel
      );
    });

    const modal = result.current.topModal;
    expect(modal?.config.type).toBe('confirm');
    expect(modal?.config.actions).toHaveLength(2);

    act(() => {
      modal?.config.actions?.[0]?.onClick?.();
    });

    expect(onCancel).toHaveBeenCalledOnce();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('shows custom modal with provided config', () => {
    const { result } = renderHook(() => useModal(), { wrapper });
    const customAction = vi.fn();

    const customConfig = {
      actions: [
        {
          label: 'Procesar Datos',
          onClick: customAction,
          variant: 'primary' as const,
        },
      ],
      canCloseOnBackdrop: true,
      canCloseOnEscape: false,
      content: 'Información de la administradora Ana López',
      showCloseButton: true,
      title: 'Datos del Usuario',
      type: 'custom' as const,
    };

    act(() => {
      result.current.showCustomModal(customConfig);
    });

    const modal = result.current.topModal;
    expect(modal?.config.title).toBe('Datos del Usuario');
    expect(modal?.config.type).toBe('custom');
    expect(modal?.config.actions).toHaveLength(1);
  });

  it('closes specific modal by ID', () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    let modalId: string = '';
    act(() => {
      modalId = result.current.showAlert('Modal de Prueba', 'Contenido temporal');
    });

    expect(result.current.activeModals).toHaveLength(1);

    act(() => {
      result.current.closeModal(modalId);
    });

    expect(result.current.activeModals).toHaveLength(0);
  });

  it('manages multiple modals in stack', () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    act(() => {
      result.current.showAlert('Primer Modal', 'Usuario María García');
      result.current.showAlert('Segundo Modal', 'Usuario José Martínez');
      result.current.showAlert('Tercer Modal', 'Usuario Ana López');
    });

    expect(result.current.activeModals).toHaveLength(3);
    expect(result.current.topModal?.config.title).toBe('Tercer Modal');

    act(() => {
      result.current.clearAll();
    });

    expect(result.current.activeModals).toHaveLength(0);
    expect(result.current.hasModals).toBe(false);
  });
});
