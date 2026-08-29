/**
 * NotificationContainer
 *
 * NotificationContainer component.
 */

'use client';

import type { FC } from 'react';
import { useCallback } from 'react';

import { NotificationToast } from '@dannydanzka/sovereignty-ui';
import { useNotifications } from '@hooks';

import { Container, ToastWrapper } from './NotificationContainer.styled';

export const NotificationContainer: FC = () => {
  const { notifications, removeNotification } = useNotifications();

  const handleCloseToast = useCallback(
    (id: string) => () => {
      removeNotification(id);
    },
    [removeNotification]
  );

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Container>
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
    </Container>
  );
};
