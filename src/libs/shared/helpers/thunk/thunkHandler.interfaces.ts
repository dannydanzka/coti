/**
 * Thunk Handler Interfaces
 *
 * All types and interfaces for thunk handler utilities.
 * Following DOMAIN-OBJECTS-STANDARDS: Types/Interfaces ONLY in .interfaces.ts files.
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type PersistentNotificationType = 'system' | 'alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  displayDuration?: number;
  origin?: string;
  source?: string;
  timestamp: number;
}

export interface PersistentNotification {
  id: string;
  type: PersistentNotificationType;
  title: string;
  description?: string;
  dateTime: string;
  isRead: boolean;
  timestamp: number;
}

export interface ThunkHandlerOptions<T = unknown, P = unknown> {
  operation: (payload: P) => Promise<T>;

  actionName: string;

  showLoader?: boolean;
  customLoaderId?: string;

  showErrorNotification?: boolean;
  showSuccessNotification?: boolean;
  successMessage?: string | ((result: T) => string);
  customErrorMessage?: string;

  transformError?: (error: unknown) => string;

  enableDebugLogging?: boolean;
}

export interface ManagedThunkError {
  message: string;
  origin: string;
  details?: unknown;
  i18n?: { key: string; params?: Record<string, unknown> };
}

export interface LoaderState {
  [loaderId: string]: boolean;
}

export interface NotificationState {
  notifications: Notification[];
}

export interface ThunkHandlerGlobalState {
  activeLoaders: LoaderState;
  notifications: NotificationState['notifications'];
  persistentNotifications: PersistentNotification[];
}
