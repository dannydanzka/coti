/**
 * useNotifications Hook Tests
 *
 * Tests notification add/remove/clear and convenience helpers.
 * Spanish locale mandatory.
 */

import { act, renderHook } from '@testing-library/react';

import { useNotifications, usePersistentNotifications, useToastHelpers } from './useNotifications';

const mockDispatch = vi.fn();

vi.mock('../useRedux/useRedux', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn().mockReturnValue([]),
}));

vi.mock('@redux', () => ({
  addPersistentNotification: vi.fn((data: unknown) => ({
    payload: data,
    type: 'notifications/addPersistent',
  })),
  clearAllNotifications: vi.fn(() => ({ type: 'notifications/clearAll' })),
  clearAllPersistentNotifications: vi.fn(() => ({ type: 'notifications/clearAllPersistent' })),
  dequeueNotification: vi.fn((data: unknown) => ({ payload: data, type: 'notifications/dequeue' })),
  enqueueNotification: vi.fn((data: unknown) => ({ payload: data, type: 'notifications/enqueue' })),
  markNotificationAsRead: vi.fn((data: unknown) => ({
    payload: data,
    type: 'notifications/markRead',
  })),
  removePersistentNotification: vi.fn((data: unknown) => ({
    payload: data,
    type: 'notifications/removePersistent',
  })),
  selectNotifications: vi.fn(),
  selectPersistentNotifications: vi.fn(),
  selectUnreadPersistentNotifications: vi.fn(),
}));

describe('useNotifications', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds notification and dispatches enqueue', () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.addNotification({ message: 'Operación exitosa', type: 'success' });
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('auto-removes notification after duration', () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.addNotification({
        displayDuration: 3000,
        message: 'Temporal',
        type: 'info',
      });
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Should have dispatched enqueue + dequeue
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('removes notification manually', () => {
    const { result } = renderHook(() => useNotifications());

    let notifId = '';
    act(() => {
      notifId = result.current.addNotification({ message: 'Test', type: 'info' });
    });

    act(() => {
      result.current.removeNotification(notifId);
    });

    // enqueue + dequeue (auto-timer dequeue may not fire in fake timer mode)
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('clears all notifications', () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.clearAll();
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  describe('Convenience Helpers', () => {
    it('shows error notification', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.showError('Error de conexión');
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('shows success notification', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.showSuccess('Guardado correctamente');
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('shows warning notification', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.showWarning('Atención requerida');
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('shows info notification', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.showInfo('Información importante');
      });

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});

describe('useToastHelpers', () => {
  it('exposes convenience methods', () => {
    const { result } = renderHook(() => useToastHelpers());

    expect(result.current.showError).toBeDefined();
    expect(result.current.showSuccess).toBeDefined();
    expect(result.current.showWarning).toBeDefined();
    expect(result.current.showInfo).toBeDefined();
  });
});

describe('usePersistentNotifications', () => {
  it('adds persistent notification', () => {
    const { result } = renderHook(() => usePersistentNotifications());

    act(() => {
      result.current.addPersistent({
        dateTime: new Date().toISOString(),
        isRead: false,
        title: 'Nueva inscripción',
        type: 'system',
      });
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('marks notification as read', () => {
    const { result } = renderHook(() => usePersistentNotifications());

    act(() => {
      result.current.markAsRead('notif-1');
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('adds system notification', () => {
    const { result } = renderHook(() => usePersistentNotifications());

    act(() => {
      result.current.addSystemNotification('Título', 'Descripción');
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('adds alert notification', () => {
    const { result } = renderHook(() => usePersistentNotifications());

    act(() => {
      result.current.addAlertNotification('Alerta', 'Detalles de la alerta');
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('clears all persistent', () => {
    const { result } = renderHook(() => usePersistentNotifications());

    act(() => {
      result.current.clearAllPersistent();
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
