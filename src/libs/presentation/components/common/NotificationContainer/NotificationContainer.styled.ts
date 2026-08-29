/**
 * NotificationContainer
 *
 * Styled components for NotificationContainer.
 */

import styled from 'styled-components';

import { spacing } from '@constants';

import type { ToastWrapperProps } from './NotificationContainer.styled.interfaces';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  pointer-events: none;
  position: fixed;
  right: ${spacing.md};
  top: ${spacing.md};
  z-index: 1200;
`;

export const ToastWrapper = styled.div<ToastWrapperProps>`
  pointer-events: auto;
`;
