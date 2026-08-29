import {
  assertNoRole,
  assertRole,
  assertText,
  assertTexts,
  renderWithProviders,
  screen,
  user,
} from '@testing';
import type { Notification } from '@thunks';

import { NotificationContainer } from './NotificationContainer';

const mockUseNotifications = {
  addNotification: vi.fn(),
  clearAll: vi.fn(),
  notifications: [] as Notification[],
  removeNotification: vi.fn(),
  showError: vi.fn(),
  showInfo: vi.fn(),
  showSuccess: vi.fn(),
  showWarning: vi.fn(),
};

vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@hooks')>();
  return {
    ...actual,
    useNotifications: () => mockUseNotifications,
  };
});

describe('NotificationContainer', () => {
  beforeEach(() => {
    mockUseNotifications.notifications = [];
    mockUseNotifications.removeNotification = vi.fn();
  });

  it('renders nothing when no notifications', () => {
    renderWithProviders(<NotificationContainer />);
    assertNoRole('button');
  });

  it('renders notification content and close button', () => {
    const notifications = [
      {
        displayDuration: 5000,
        id: 'test-1',
        message: 'Error al procesar datos de María García',
        timestamp: Date.now(),
        type: 'error' as const,
      },
    ];
    mockUseNotifications.notifications = notifications;

    renderWithProviders(<NotificationContainer />);

    assertText('Error al procesar datos de María García');
    assertRole('button');
  });

  it('removes notification when close button clicked', async () => {
    const notifications = [
      {
        displayDuration: 5000,
        id: 'test-notification',
        message: 'Solicitud de José Martínez completada',
        timestamp: Date.now(),
        type: 'success' as const,
      },
    ];
    mockUseNotifications.notifications = notifications;

    const userEvent = user.setup();
    renderWithProviders(<NotificationContainer />);

    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);

    expect(mockUseNotifications.removeNotification).toHaveBeenCalledWith('test-notification');
  });

  it('renders multiple notifications', () => {
    const notifications = [
      {
        displayDuration: 3000,
        id: 'notif-1',
        message: 'Primera notificación para Ana López',
        timestamp: Date.now(),
        type: 'info' as const,
      },
      {
        displayDuration: 5000,
        id: 'notif-2',
        message: 'Segunda notificación del sistema',
        timestamp: Date.now() + 1000,
        type: 'warning' as const,
      },
    ];
    mockUseNotifications.notifications = notifications;

    renderWithProviders(<NotificationContainer />);

    assertTexts(['Primera notificación para Ana López', 'Segunda notificación del sistema']);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('displays different notification types correctly', () => {
    const notifications = [
      {
        displayDuration: 5000,
        id: 'error-notif',
        message: 'Error crítico en el sistema',
        timestamp: Date.now(),
        type: 'error' as const,
      },
      {
        displayDuration: 3000,
        id: 'success-notif',
        message: 'Datos guardados exitosamente',
        timestamp: Date.now(),
        type: 'success' as const,
      },
    ];
    mockUseNotifications.notifications = notifications;

    renderWithProviders(<NotificationContainer />);

    assertTexts(['Error crítico en el sistema', 'Datos guardados exitosamente']);
  });
});
