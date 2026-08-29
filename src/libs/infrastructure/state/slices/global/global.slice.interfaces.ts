/**
 * Global Slice Interfaces
 */

import type { Notification, PersistentNotification } from '@thunks';

export type ModalType = 'alert' | 'confirm' | 'fixed' | 'dismissible' | 'custom';

export interface ModalAction {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

export interface ModalConfig {
  id: string;
  type: ModalType;
  title?: string;
  content?: React.ReactNode;
  actions?: ModalAction[];
  canCloseOnBackdrop?: boolean;
  canCloseOnEscape?: boolean;
  showCloseButton?: boolean;
}

export interface ActiveModal {
  id: string;
  config: ModalConfig;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface GlobalState {
  activeLoaders: Record<string, boolean>;
  activeModals: ActiveModal[];
  animationsEnabled: boolean;
  autoRefreshEnabled: boolean;
  dashboardRefreshIntervalInMinutes: number;
  globalLoading: boolean;
  isDrawerCollapsed: boolean;
  isMobileMenuOpen: boolean;
  language: 'es' | 'en';
  layoutBgColor: string | null;
  notifications: Notification[];
  persistentNotifications: PersistentNotification[];
  reduceMotion: boolean;
  theme: 'light' | 'dark';
  toasts: Toast[];
}
