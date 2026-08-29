import {
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
  globalSlice,
  markNotificationAsRead,
  removeModal,
  removePersistentNotification,
  removeToast,
  removeTopModal,
  selectActiveLoaders,
  selectActiveModals,
  selectAnimationsEnabled,
  selectAutoRefreshEnabled,
  selectDashboardRefreshInterval,
  selectGlobalLoading,
  selectHasModals,
  selectIsAnyLoading,
  selectIsDrawerCollapsed,
  selectIsMobileMenuOpen,
  selectLanguage,
  selectLatestNotification,
  selectLayoutBgColor,
  selectNotifications,
  selectNotificationsByType,
  selectPersistentNotifications,
  selectReduceMotion,
  selectTheme,
  selectToasts,
  selectToastsByType,
  selectTopModal,
  selectUnreadPersistentNotifications,
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
} from './global.slice';

const { reducer: globalReducer } = globalSlice;

describe('Global Slice', () => {
  it('exports slice', () => {
    expect(globalSlice.name).toBe('global');
  });

  it('exports reducer', () => {
    expect(globalReducer).toBeDefined();
    expect(typeof globalReducer).toBe('function');
  });

  it('has correct initial state shape', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty('activeModals');
    expect(state).toHaveProperty('toasts');
    expect(state).toHaveProperty('theme');
    expect(state).toHaveProperty('language');
    expect(state).toHaveProperty('globalLoading');
    expect(state).toHaveProperty('isDrawerCollapsed');
    expect(state.theme).toBe('dark');
    expect(state.language).toBe('es');
  });

  it('sets global loading', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    const newState = globalReducer(state, setGlobalLoading(true));
    expect(newState.globalLoading).toBe(true);
  });

  it('sets theme', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    const newState = globalReducer(state, setTheme('light'));
    expect(newState.theme).toBe('light');
  });

  it('sets language', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    const newState = globalReducer(state, setLanguage('en'));
    expect(newState.language).toBe('en');
  });

  it('toggles drawer collapsed', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    expect(state.isDrawerCollapsed).toBe(false);
    const newState = globalReducer(state, toggleDrawerCollapsed());
    expect(newState.isDrawerCollapsed).toBe(true);
  });

  it('sets drawer collapsed', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    const newState = globalReducer(state, setDrawerCollapsed(true));
    expect(newState.isDrawerCollapsed).toBe(true);
  });

  it('toggles mobile menu', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    expect(state.isMobileMenuOpen).toBe(false);
    const newState = globalReducer(state, toggleMobileMenu());
    expect(newState.isMobileMenuOpen).toBe(true);
  });

  it('adds and removes toast', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    const toast = { id: 't-1', message: 'Éxito', type: 'success' as const };
    const withToast = globalReducer(state, addToast(toast));
    expect(withToast.toasts).toHaveLength(1);

    const removed = globalReducer(withToast, removeToast('t-1'));
    expect(removed.toasts).toHaveLength(0);
  });

  it('clears all toasts', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    const toast = { id: 't-1', message: 'Éxito', type: 'success' as const };
    const withToast = globalReducer(state, addToast(toast));
    const cleared = globalReducer(withToast, clearToasts());
    expect(cleared.toasts).toHaveLength(0);
  });

  it('clears all modals', () => {
    const state = globalReducer(undefined, { type: '@@INIT' });
    const cleared = globalReducer(state, clearAllModals());
    expect(cleared.activeModals).toEqual([]);
  });

  describe('loader reducers', () => {
    it('activates and deactivates loader', () => {
      let state = globalReducer(undefined, { type: '@@INIT' });
      state = globalReducer(state, activateLoader({ loaderId: 'fetchUsers' }));
      expect(state.activeLoaders['fetchUsers']).toBe(true);

      state = globalReducer(state, deactivateLoader({ loaderId: 'fetchUsers' }));
      expect(state.activeLoaders['fetchUsers']).toBeUndefined();
    });

    it('clears all loaders', () => {
      let state = globalReducer(undefined, { type: '@@INIT' });
      state = globalReducer(state, activateLoader({ loaderId: 'a' }));
      state = globalReducer(state, activateLoader({ loaderId: 'b' }));
      state = globalReducer(state, clearAllLoaders());
      expect(Object.keys(state.activeLoaders)).toHaveLength(0);
    });
  });

  describe('modal reducers', () => {
    it('adds and removes modal', () => {
      let state = globalReducer(undefined, { type: '@@INIT' });
      state = globalReducer(state, addModal({ modal: { id: 'm-1', type: 'confirm' } as never }));
      expect(state.activeModals).toHaveLength(1);

      state = globalReducer(state, removeModal({ modalId: 'm-1' }));
      expect(state.activeModals).toHaveLength(0);
    });

    it('removes top modal', () => {
      let state = globalReducer(undefined, { type: '@@INIT' });
      state = globalReducer(state, addModal({ modal: { id: 'm-1', type: 'confirm' } as never }));
      state = globalReducer(state, addModal({ modal: { id: 'm-2', type: 'alert' } as never }));
      state = globalReducer(state, removeTopModal());
      expect(state.activeModals).toHaveLength(1);
      expect(state.activeModals[0]?.id).toBe('m-1');
    });
  });

  describe('notification reducers', () => {
    it('enqueues and dequeues notification', () => {
      let state = globalReducer(undefined, { type: '@@INIT' });
      state = globalReducer(
        state,
        enqueueNotification({
          notification: { id: 'n-1', message: 'Éxito', type: 'success' } as never,
        })
      );
      expect(state.notifications).toHaveLength(1);

      state = globalReducer(state, dequeueNotification({ notificationId: 'n-1' }));
      expect(state.notifications).toHaveLength(0);
    });

    it('clears all notifications', () => {
      let state = globalReducer(undefined, { type: '@@INIT' });
      state = globalReducer(
        state,
        enqueueNotification({ notification: { id: 'n-1', message: 'A', type: 'info' } as never })
      );
      state = globalReducer(state, clearAllNotifications());
      expect(state.notifications).toHaveLength(0);
    });

    it('adds persistent notification and marks as read', () => {
      let state = globalReducer(undefined, { type: '@@INIT' });
      state = globalReducer(
        state,
        addPersistentNotification({
          notification: { id: 'pn-1', isRead: false, message: 'Notificación' } as never,
        })
      );
      expect(state.persistentNotifications).toHaveLength(1);
      expect(state.persistentNotifications[0]?.isRead).toBe(false);

      state = globalReducer(state, markNotificationAsRead({ notificationId: 'pn-1' }));
      expect(state.persistentNotifications[0]?.isRead).toBe(true);
    });

    it('removes persistent notification', () => {
      let state = globalReducer(undefined, { type: '@@INIT' });
      state = globalReducer(
        state,
        addPersistentNotification({
          notification: { id: 'pn-1', isRead: false, message: 'A' } as never,
        })
      );
      state = globalReducer(state, removePersistentNotification({ notificationId: 'pn-1' }));
      expect(state.persistentNotifications).toHaveLength(0);
    });
  });

  describe('UI preference reducers', () => {
    it('sets animations enabled', () => {
      const state = globalReducer(undefined, setAnimationsEnabled(false));
      expect(state.animationsEnabled).toBe(false);
    });

    it('sets reduce motion', () => {
      const state = globalReducer(undefined, setReduceMotion(true));
      expect(state.reduceMotion).toBe(true);
    });

    it('sets auto refresh enabled', () => {
      const state = globalReducer(undefined, setAutoRefreshEnabled(false));
      expect(state.autoRefreshEnabled).toBe(false);
    });

    it('sets dashboard refresh interval', () => {
      const state = globalReducer(undefined, setDashboardRefreshInterval(5));
      expect(state.dashboardRefreshIntervalInMinutes).toBe(5);
    });

    it('sets layout bg color', () => {
      const state = globalReducer(undefined, setLayoutBgColor('#FF0000'));
      expect(state.layoutBgColor).toBe('#FF0000');
    });

    it('sets mobile menu open', () => {
      const state = globalReducer(undefined, setMobileMenuOpen(true));
      expect(state.isMobileMenuOpen).toBe(true);
    });

    it('clears persistent notifications', () => {
      let state = globalReducer(
        undefined,
        addPersistentNotification({
          notification: { id: 'n-1', isRead: false, message: 'Hola', type: 'info' } as never,
        })
      );
      state = globalReducer(state, clearAllPersistentNotifications());
      expect(state.persistentNotifications).toHaveLength(0);
    });
  });

  describe('Selectors', () => {
    const baseState = { global: globalReducer(undefined, { type: '@@INIT' }) } as never;

    it('selectActiveModals returns modals array', () => {
      expect(selectActiveModals(baseState)).toEqual([]);
    });

    it('selectTopModal returns null when no modals', () => {
      expect(selectTopModal(baseState)).toBeNull();
    });

    it('selectTopModal returns last modal', () => {
      let state = globalReducer(
        undefined,
        addModal({ modal: { id: 'm-1', type: 'confirm' } as never })
      );
      state = globalReducer(state, addModal({ modal: { id: 'm-2', type: 'form' } as never }));
      expect(selectTopModal({ global: state } as never)?.id).toBe('m-2');
    });

    it('selectHasModals returns false when empty', () => {
      expect(selectHasModals(baseState)).toBe(false);
    });

    it('selectToasts returns toasts array', () => {
      expect(selectToasts(baseState)).toEqual([]);
    });

    it('selectToastsByType filters by type', () => {
      let state = globalReducer(
        undefined,
        addToast({ id: 't-1', message: 'Ok', type: 'success' } as never)
      );
      state = globalReducer(
        state,
        addToast({ id: 't-2', message: 'Error', type: 'error' } as never)
      );
      const selector = selectToastsByType('success');
      const result = selector({ global: state } as never);
      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe('t-1');
    });

    it('selectTheme returns theme', () => {
      expect(selectTheme(baseState)).toBe('dark');
    });

    it('selectLanguage returns language', () => {
      expect(selectLanguage(baseState)).toBe('es');
    });

    it('selectLayoutBgColor returns null by default', () => {
      expect(selectLayoutBgColor(baseState)).toBeNull();
    });

    it('selectIsDrawerCollapsed returns false by default', () => {
      expect(selectIsDrawerCollapsed(baseState)).toBe(false);
    });

    it('selectIsMobileMenuOpen returns false by default', () => {
      expect(selectIsMobileMenuOpen(baseState)).toBe(false);
    });

    it('selectAnimationsEnabled returns true by default', () => {
      expect(selectAnimationsEnabled(baseState)).toBe(true);
    });

    it('selectReduceMotion returns false by default', () => {
      expect(selectReduceMotion(baseState)).toBe(false);
    });

    it('selectGlobalLoading returns false by default', () => {
      expect(selectGlobalLoading(baseState)).toBe(false);
    });

    it('selectActiveLoaders returns empty object', () => {
      expect(selectActiveLoaders(baseState)).toEqual({});
    });

    it('selectIsAnyLoading returns false when nothing loading', () => {
      expect(selectIsAnyLoading(baseState)).toBe(false);
    });

    it('selectIsAnyLoading returns true with global loading', () => {
      const state = globalReducer(undefined, setGlobalLoading(true));
      expect(selectIsAnyLoading({ global: state } as never)).toBe(true);
    });

    it('selectIsAnyLoading returns true with active loaders', () => {
      const state = globalReducer(undefined, activateLoader({ loaderId: 'loader-1' }));
      expect(selectIsAnyLoading({ global: state } as never)).toBe(true);
    });

    it('selectDashboardRefreshInterval returns default', () => {
      expect(selectDashboardRefreshInterval(baseState)).toBe(10);
    });

    it('selectAutoRefreshEnabled returns true by default', () => {
      expect(selectAutoRefreshEnabled(baseState)).toBe(true);
    });

    it('selectNotifications returns empty array', () => {
      expect(selectNotifications(baseState)).toEqual([]);
    });

    it('selectPersistentNotifications returns empty array', () => {
      expect(selectPersistentNotifications(baseState)).toEqual([]);
    });

    it('selectUnreadPersistentNotifications filters unread', () => {
      let state = globalReducer(
        undefined,
        addPersistentNotification({
          notification: { id: 'n-1', isRead: false, message: 'Nueva', type: 'info' } as never,
        })
      );
      state = globalReducer(
        state,
        addPersistentNotification({
          notification: { id: 'n-2', isRead: true, message: 'Leída', type: 'info' } as never,
        })
      );
      const result = selectUnreadPersistentNotifications({ global: state } as never);
      expect(result).toHaveLength(1);
    });

    it('selectNotificationsByType filters by type', () => {
      let state = globalReducer(
        undefined,
        enqueueNotification({ notification: { id: 'n-1', message: 'Info', type: 'info' } as never })
      );
      state = globalReducer(
        state,
        enqueueNotification({
          notification: { id: 'n-2', message: 'Error', type: 'error' } as never,
        })
      );
      const selector = selectNotificationsByType('error');
      expect(selector({ global: state } as never)).toHaveLength(1);
    });

    it('selectLatestNotification returns last notification', () => {
      let state = globalReducer(
        undefined,
        enqueueNotification({
          notification: { id: 'n-1', message: 'Primera', type: 'info' } as never,
        })
      );
      state = globalReducer(
        state,
        enqueueNotification({
          notification: { id: 'n-2', message: 'Segunda', type: 'info' } as never,
        })
      );
      expect(selectLatestNotification({ global: state } as never)?.id).toBe('n-2');
    });
  });
});
