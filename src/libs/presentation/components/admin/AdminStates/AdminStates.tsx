/**
 * AdminStates Components
 *
 * Reusable state components for admin screens.
 */

'use client';

import { AlertCircle, Database } from 'lucide-react';

import type {
  AdminEmptyStateProps,
  AdminErrorStateProps,
  AdminInfoMessageProps,
} from './AdminStates.interfaces';

import {
  EmptyAction,
  EmptyContainer,
  EmptyIcon,
  EmptyMessage,
  EmptyTitle,
  ErrorAction,
  ErrorContainer,
  ErrorIcon,
  ErrorMessage,
  ErrorTitle,
  InfoMessage as StyledInfoMessage,
} from './AdminStates.styled';

export const AdminEmptyState = ({
  action,
  className,
  icon,
  message = 'No hay datos disponibles.',
  title = 'Sin datos',
}: AdminEmptyStateProps) => (
  <EmptyContainer className={className}>
    <EmptyIcon>{icon ?? <Database />}</EmptyIcon>
    <EmptyTitle>{title}</EmptyTitle>
    <EmptyMessage>{message}</EmptyMessage>
    {action && <EmptyAction>{action}</EmptyAction>}
  </EmptyContainer>
);

export const AdminErrorState = ({
  action,
  className,
  message = 'Ha ocurrido un error. Por favor, intenta de nuevo.',
  title = 'Error',
}: AdminErrorStateProps) => (
  <ErrorContainer className={className}>
    <ErrorIcon>
      <AlertCircle />
    </ErrorIcon>
    <ErrorTitle>{title}</ErrorTitle>
    <ErrorMessage>{message}</ErrorMessage>
    {action && <ErrorAction>{action}</ErrorAction>}
  </ErrorContainer>
);

export const AdminInfoMessage = ({
  children,
  className,
  variant = 'info',
}: AdminInfoMessageProps) => (
  <StyledInfoMessage $variant={variant} className={className}>
    {children}
  </StyledInfoMessage>
);

export {
  EmptyAction,
  EmptyContainer,
  EmptyIcon,
  EmptyMessage,
  EmptyTitle,
  ErrorAction,
  ErrorContainer,
  ErrorIcon,
  ErrorMessage,
  ErrorTitle,
  InfoMessage,
} from './AdminStates.styled';
