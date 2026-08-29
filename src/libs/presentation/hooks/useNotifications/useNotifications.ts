/**
 * Notification Hooks - Context7 Compliant
 *
 * Centralized notification management with Redux integration.
 * Provides core addNotification function with automatic styling based on type.
 * Includes convenience helpers for common notification patterns.
 */

import { useCallback, useEffect, useRef } from 'react';

import {
  addPersistentNotification,
  clearAllNotifications,
  clearAllPersistentNotifications,
  dequeueNotification,
  enqueueNotification,
  markNotificationAsRead,
  removePersistentNotification,
  selectNotifications,
  selectPersistentNotifications,
  selectUnreadPersistentNotifications,
} from '@redux';
import type { Notification, PersistentNotification } from '@thunks';

import { useAppDispatch, useAppSelector } from '../useRedux/useRedux';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    const currentTimeouts = timeoutRefs.current;
    return () => {
      currentTimeouts.forEach((timeout) => clearTimeout(timeout));
      currentTimeouts.clear();
    };
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp'>) => {
      const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const timestamp = Date.now();

      const fullNotification: Notification = {
        displayDuration: 5000,
        ...notification,
        id,
        timestamp,
      };

      dispatch(enqueueNotification({ notification: fullNotification }));

      if (fullNotification.displayDuration && fullNotification.displayDuration > 0) {
        const timeout = setTimeout(() => {
          dispatch(dequeueNotification({ notificationId: id }));
          timeoutRefs.current.delete(id);
        }, fullNotification.displayDuration);

        timeoutRefs.current.set(id, timeout);
      }

      return id;
    },
    [dispatch]
  );

  const removeNotification = useCallback(
    (notificationId: string) => {
      const timeout = timeoutRefs.current.get(notificationId);
      if (timeout) {
        clearTimeout(timeout);
        timeoutRefs.current.delete(notificationId);
      }
      dispatch(dequeueNotification({ notificationId }));
    },
    [dispatch]
  );

  const clearAll = useCallback(() => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current.clear();
    dispatch(clearAllNotifications());
  }, [dispatch]);

  const showError = useCallback(
    (
      message: string,
      options?: Partial<Omit<Notification, 'id' | 'type' | 'message' | 'timestamp'>>
    ) => {
      return addNotification({ ...options, message, type: 'error' });
    },
    [addNotification]
  );

  const showSuccess = useCallback(
    (
      message: string,
      options?: Partial<Omit<Notification, 'id' | 'type' | 'message' | 'timestamp'>>
    ) => {
      return addNotification({ ...options, message, type: 'success' });
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (
      message: string,
      options?: Partial<Omit<Notification, 'id' | 'type' | 'message' | 'timestamp'>>
    ) => {
      return addNotification({ ...options, message, type: 'warning' });
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (
      message: string,
      options?: Partial<Omit<Notification, 'id' | 'type' | 'message' | 'timestamp'>>
    ) => {
      return addNotification({ ...options, message, type: 'info' });
    },
    [addNotification]
  );

  return {
    addNotification,
    clearAll,
    notifications,
    removeNotification,
    showError,
    showInfo,
    showSuccess,
    showWarning,
  };
};

export const useToastHelpers = () => {
  const { showError, showInfo, showSuccess, showWarning } = useNotifications();

  return {
    showError,
    showInfo,
    showSuccess,
    showWarning,
  };
};

export const usePersistentNotifications = () => {
  const dispatch = useAppDispatch();
  const persistentNotifications = useAppSelector(selectPersistentNotifications);
  const unreadNotifications = useAppSelector(selectUnreadPersistentNotifications);

  const addPersistent = useCallback(
    (notification: Omit<PersistentNotification, 'id' | 'timestamp'>) => {
      const id = `persistent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const timestamp = Date.now();

      const fullNotification: PersistentNotification = {
        ...notification,
        id,
        timestamp,
      };

      dispatch(addPersistentNotification({ notification: fullNotification }));
      return id;
    },
    [dispatch]
  );

  const markAsRead = useCallback(
    (notificationId: string) => {
      dispatch(markNotificationAsRead({ notificationId }));
    },
    [dispatch]
  );

  const removePersistent = useCallback(
    (notificationId: string) => {
      dispatch(removePersistentNotification({ notificationId }));
    },
    [dispatch]
  );

  const clearAllPersistent = useCallback(() => {
    dispatch(clearAllPersistentNotifications());
  }, [dispatch]);

  const addSystemNotification = useCallback(
    (title: string, description?: string, dateTime?: string) => {
      const notification: Omit<PersistentNotification, 'id' | 'timestamp'> = {
        dateTime: dateTime || new Date().toISOString(),
        isRead: false,
        title,
        type: 'system',
      };
      if (description !== undefined) {
        notification.description = description;
      }
      return addPersistent(notification);
    },
    [addPersistent]
  );

  const addAlertNotification = useCallback(
    (title: string, description?: string, dateTime?: string) => {
      const notification: Omit<PersistentNotification, 'id' | 'timestamp'> = {
        dateTime: dateTime || new Date().toISOString(),
        isRead: false,
        title,
        type: 'alert',
      };
      if (description !== undefined) {
        notification.description = description;
      }
      return addPersistent(notification);
    },
    [addPersistent]
  );

  return {
    addAlertNotification,
    addPersistent,
    addSystemNotification,
    clearAllPersistent,
    markAsRead,
    persistentNotifications,
    removePersistent,
    unreadCount: unreadNotifications.length,
    unreadNotifications,
  };
};
