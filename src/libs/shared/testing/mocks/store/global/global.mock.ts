/**
 * Global Store Mock States
 *
 * Mock states for global slice testing
 */

import type { GlobalState } from '@redux';
import type { Notification, PersistentNotification } from '@thunks';

// Spanish mock data for testing
export const mockNotification: Notification = {
  id: 'notif-1',
  message: 'Operación completada exitosamente',
  timestamp: 1735986600000,
  type: 'success',
};

export const mockPersistentNotification: PersistentNotification = {
  dateTime: '2025-01-15T10:30:00.000Z',
  description: 'Nueva actualización disponible para Event Platform',
  id: 'persist-1',
  isRead: false,
  timestamp: 1735986600000,
  title: 'Información importante',
  type: 'system',
};

export const mockModalConfig = {
  actions: [
    { label: 'Eliminar', onClick: () => {}, variant: 'primary' as const },
    { label: 'Cancelar', onClick: () => {}, variant: 'secondary' as const },
  ],
  canCloseOnBackdrop: false,
  canCloseOnEscape: true,
  content: '¿Estás seguro de que deseas eliminar este elemento?',
  id: 'modal-confirm-delete',
  showCloseButton: true,
  title: 'Confirmar eliminación',
  type: 'confirm' as const,
};

export const mockToast = {
  duration: 5000,
  id: 'toast-1',
  message: 'Datos guardados temporalmente',
  type: 'warning' as const,
};

// Global state mocks
export const globalMockStates = {
  initial: {
    activeLoaders: {},
    activeModals: [],
    animationsEnabled: true,
    autoRefreshEnabled: true,
    dashboardRefreshIntervalInMinutes: 10,
    globalLoading: false,
    isDrawerCollapsed: false,
    isMobileMenuOpen: false,
    language: 'es',
    layoutBgColor: null,
    notifications: [],
    persistentNotifications: [],
    reduceMotion: false,
    theme: 'dark',
    toasts: [],
  },
  loading: {
    activeLoaders: { 'global-operation': true },
    activeModals: [],
    animationsEnabled: true,
    autoRefreshEnabled: true,
    dashboardRefreshIntervalInMinutes: 10,
    globalLoading: true,
    isDrawerCollapsed: false,
    isMobileMenuOpen: false,
    language: 'es',
    layoutBgColor: null,
    notifications: [],
    persistentNotifications: [],
    reduceMotion: false,
    theme: 'dark',
    toasts: [],
  },
  withNotifications: {
    activeLoaders: {},
    activeModals: [],
    animationsEnabled: true,
    autoRefreshEnabled: true,
    dashboardRefreshIntervalInMinutes: 10,
    globalLoading: false,
    isDrawerCollapsed: false,
    isMobileMenuOpen: false,
    language: 'es',
    layoutBgColor: null,
    notifications: [mockNotification],
    persistentNotifications: [mockPersistentNotification],
    reduceMotion: false,
    theme: 'dark',
    toasts: [mockToast],
  },
} satisfies Record<string, GlobalState>;

// Helper to create custom global state
export const createGlobalMockState = (overrides: Partial<GlobalState>): GlobalState => ({
  ...globalMockStates.initial,
  ...overrides,
});
