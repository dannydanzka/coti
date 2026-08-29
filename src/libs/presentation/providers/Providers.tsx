/**
 * Main Providers Component
 *
 * Combines all global providers for the application.
 * GlobalLoading and NotificationContainer integrated directly using Redux
 * to avoid circular dependencies with hooks.
 */

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

import { BRAND_ASSETS, BRAND_UI_TEXT } from '@constants';
import {
  dequeueNotification,
  selectIsAdmin,
  selectIsAnyLoading,
  selectNotifications,
} from '@redux';
import { GlobalStyles } from '@styles';
import { NotificationToast } from '@dannydanzka/sovereignty-ui';

import { ErrorProvider } from './ErrorProvider';
import { I18nProvider } from './I18nProvider';
import { ModalContainer } from '../components/common/ModalContainer';
import type { ProvidersProps } from './Providers.interfaces';
import { ReduxProvider } from './ReduxProvider';

import {
  Container as NotificationContainerStyled,
  ToastWrapper,
} from '../components/common/NotificationContainer/NotificationContainer.styled';
import {
  LoadingContainer,
  LoadingMascot,
  LoadingOverlay,
  LogoWrapper,
} from '../components/common/GlobalLoading/GlobalLoading.styled';

/**
 * GlobalLoading integrated directly in Providers to avoid circular dependency.
 * Uses Redux selector directly (allowed in providers as infrastructure layer).
 *
 * Note: Hidden for admin users - admin has its own loading overlay with dark theme.
 * Checks both pathname AND user role to prevent flash during redirects.
 */
const GlobalLoadingOverlay: React.FC = () => {
  const pathname = usePathname();
  const isLoading = useSelector(selectIsAnyLoading);
  const isAdmin = useSelector(selectIsAdmin);

  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute || isAdmin) {
    return null;
  }

  return (
    <LoadingOverlay $isVisible={isLoading}>
      <LoadingContainer>
        <LogoWrapper>
          <LoadingMascot alt={BRAND_UI_TEXT.MASCOT_ALT} src={BRAND_ASSETS.MASCOT} />
        </LogoWrapper>
      </LoadingContainer>
    </LoadingOverlay>
  );
};

/**
 * NotificationContainer integrated directly in Providers to avoid circular dependency.
 * Uses Redux selector and dispatch directly (allowed in providers as infrastructure layer).
 * Auto-dismiss logic lives here to persist across component unmounts.
 */
const NotificationContainerOverlay: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    notifications.forEach((notification) => {
      if (!timeoutRefs.current.has(notification.id)) {
        const duration = notification.displayDuration ?? 5000;
        if (duration > 0) {
          const timeout = setTimeout(() => {
            dispatch(dequeueNotification({ notificationId: notification.id }));
            timeoutRefs.current.delete(notification.id);
          }, duration);
          timeoutRefs.current.set(notification.id, timeout);
        }
      }
    });

    const currentIds = new Set(notifications.map((n) => n.id));
    timeoutRefs.current.forEach((timeout, id) => {
      if (!currentIds.has(id)) {
        clearTimeout(timeout);
        timeoutRefs.current.delete(id);
      }
    });
  }, [notifications, dispatch]);

  useEffect(() => {
    const currentTimeouts = timeoutRefs.current;
    return () => {
      currentTimeouts.forEach((timeout) => clearTimeout(timeout));
      currentTimeouts.clear();
    };
  }, []);

  const handleCloseToast = useCallback(
    (id: string) => () => {
      const timeout = timeoutRefs.current.get(id);
      if (timeout) {
        clearTimeout(timeout);
        timeoutRefs.current.delete(id);
      }
      dispatch(dequeueNotification({ notificationId: id }));
    },
    [dispatch]
  );

  if (notifications.length === 0) {
    return null;
  }

  return (
    <NotificationContainerStyled>
      {notifications.map((notification) => (
        <ToastWrapper $isClosing={false} key={notification.id}>
          <NotificationToast
            notification={{
              id: notification.id,
              message: notification.message,
              title: notification.title,
              type: notification.type,
            }}
            onClose={handleCloseToast(notification.id)}
          />
        </ToastWrapper>
      ))}
    </NotificationContainerStyled>
  );
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <I18nProvider>
        <ErrorProvider>
          <GlobalStyles />
          {children}
          <GlobalLoadingOverlay />
          <NotificationContainerOverlay />
          <ModalContainer />
        </ErrorProvider>
      </I18nProvider>
    </ReduxProvider>
  );
};
