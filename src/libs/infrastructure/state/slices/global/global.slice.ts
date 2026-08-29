/**
 * Global Redux Slice - Consolidated UI, Modal, and App State
 *
 * Manages all application-wide state: loading, notifications, modals, and UI preferences.
 * Consolidated from global.slice + ui.slice + modal.slice for simplified testing.
 * Based on centralized global reducer pattern adapted for Redux Toolkit.
 */

import { createSlice } from '@reduxjs/toolkit';
import type { Notification, PersistentNotification } from '@thunks';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@store';

import type { ActiveModal, GlobalState, Toast } from './global.slice.interfaces';

export type {
  ActiveModal,
  GlobalState,
  ModalConfig,
  ModalType,
  Toast,
} from './global.slice.interfaces';

const initialState: GlobalState = {
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
};

export const globalSlice = createSlice({
  initialState,
  name: 'global',
  reducers: {
    activateLoader: (state, action: PayloadAction<{ loaderId: string }>) => {
      const { loaderId } = action.payload;
      if (!state.activeLoaders[loaderId]) {
        state.activeLoaders[loaderId] = true;
      }
    },
    addModal: (state, action: PayloadAction<{ modal: ActiveModal }>) => {
      const { modal } = action.payload;
      state.activeModals.push(modal);
    },
    addPersistentNotification: (
      state,
      action: PayloadAction<{ notification: PersistentNotification }>
    ) => {
      const { notification } = action.payload;
      state.persistentNotifications.unshift(notification);
    },
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },
    clearAllLoaders: (state) => {
      state.activeLoaders = {};
    },
    clearAllModals: (state) => {
      state.activeModals = [];
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    clearAllPersistentNotifications: (state) => {
      state.persistentNotifications = [];
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    deactivateLoader: (state, action: PayloadAction<{ loaderId: string }>) => {
      const { loaderId } = action.payload;
      if (state.activeLoaders[loaderId]) {
        delete state.activeLoaders[loaderId];
      }
    },
    dequeueNotification: (state, action: PayloadAction<{ notificationId: string }>) => {
      const { notificationId } = action.payload;
      state.notifications = state.notifications.filter(
        (notification: Notification) => notification.id !== notificationId
      );
    },
    enqueueNotification: (state, action: PayloadAction<{ notification: Notification }>) => {
      const { notification } = action.payload;
      state.notifications.push(notification);
    },
    markNotificationAsRead: (state, action: PayloadAction<{ notificationId: string }>) => {
      const { notificationId } = action.payload;
      const notification = state.persistentNotifications.find(
        (n: PersistentNotification) => n.id === notificationId
      );
      if (notification) {
        notification.isRead = true;
      }
    },
    removeModal: (state, action: PayloadAction<{ modalId: string }>) => {
      const { modalId } = action.payload;
      state.activeModals = state.activeModals.filter((modal) => modal.id !== modalId);
    },
    removePersistentNotification: (state, action: PayloadAction<{ notificationId: string }>) => {
      const { notificationId } = action.payload;
      state.persistentNotifications = state.persistentNotifications.filter(
        (notification: PersistentNotification) => notification.id !== notificationId
      );
    },
    removeToast: (state, action: PayloadAction<string>) => {
      const toastId = action.payload;
      state.toasts = state.toasts.filter((toast) => toast.id !== toastId);
    },
    removeTopModal: (state) => {
      state.activeModals.pop();
    },
    setAnimationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.animationsEnabled = action.payload;
    },
    setAutoRefreshEnabled: (state, action: PayloadAction<boolean>) => {
      state.autoRefreshEnabled = action.payload;
    },
    setDashboardRefreshInterval: (state, action: PayloadAction<number>) => {
      state.dashboardRefreshIntervalInMinutes = action.payload;
    },
    setDrawerCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isDrawerCollapsed = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'es' | 'en'>) => {
      state.language = action.payload;
    },
    setLayoutBgColor: (state, action: PayloadAction<string | null>) => {
      state.layoutBgColor = action.payload;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setReduceMotion: (state, action: PayloadAction<boolean>) => {
      state.reduceMotion = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleDrawerCollapsed: (state) => {
      state.isDrawerCollapsed = !state.isDrawerCollapsed;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
});

export const {
  activateLoader,
  addModal,
  addPersistentNotification,
  addToast,
  clearAllLoaders,
  clearAllModals,
  clearAllNotifications,
  clearAllPersistentNotifications,
  clearToasts,
  deactivateLoader,
  dequeueNotification,
  enqueueNotification,
  markNotificationAsRead,
  removeModal,
  removePersistentNotification,
  removeToast,
  removeTopModal,
  setAnimationsEnabled,
  setAutoRefreshEnabled,
  setDashboardRefreshInterval,
  setDrawerCollapsed,
  setGlobalLoading,
  setLanguage,
  setLayoutBgColor,
  setMobileMenuOpen,
  setReduceMotion,
  setTheme,
  toggleDrawerCollapsed,
  toggleMobileMenu,
} = globalSlice.actions;

export const selectActiveModals = (state: RootState) => state.global.activeModals;
export const selectTopModal = (state: RootState) => {
  const modals = state.global.activeModals;
  return modals[modals.length - 1] || null;
};
export const selectHasModals = (state: RootState) => state.global.activeModals.length > 0;

export const selectToasts = (state: RootState) => state.global.toasts;
export const selectToastsByType = (type: Toast['type']) => (state: RootState) =>
  state.global.toasts.filter((toast) => toast.type === type);

export const selectTheme = (state: RootState) => state.global.theme;
export const selectLanguage = (state: RootState) => state.global.language;
export const selectLayoutBgColor = (state: RootState) => state.global.layoutBgColor;
export const selectIsDrawerCollapsed = (state: RootState) => state.global.isDrawerCollapsed;
export const selectIsMobileMenuOpen = (state: RootState) => state.global.isMobileMenuOpen;
export const selectAnimationsEnabled = (state: RootState) => state.global.animationsEnabled;
export const selectReduceMotion = (state: RootState) => state.global.reduceMotion;

export const selectGlobalLoading = (state: RootState) => state.global.globalLoading;
export const selectActiveLoaders = (state: RootState) => state.global.activeLoaders;
export const selectIsAnyLoading = (state: RootState) =>
  state.global.globalLoading || Object.keys(state.global.activeLoaders).length > 0;

export const selectDashboardRefreshInterval = (state: RootState) =>
  state.global.dashboardRefreshIntervalInMinutes;
export const selectAutoRefreshEnabled = (state: RootState) => state.global.autoRefreshEnabled;

export const selectNotifications = (state: RootState) => state.global.notifications;
export const selectPersistentNotifications = (state: RootState) =>
  state.global.persistentNotifications;
export const selectUnreadPersistentNotifications = (state: RootState) =>
  state.global.persistentNotifications.filter((notification) => !notification.isRead);

export const selectNotificationsByType = (type: Toast['type']) => (state: RootState) =>
  state.global.notifications.filter((notification) => notification.type === type);

export const selectLatestNotification = (state: RootState) =>
  state.global.notifications[state.global.notifications.length - 1];

export const globalReducer = globalSlice.reducer;
