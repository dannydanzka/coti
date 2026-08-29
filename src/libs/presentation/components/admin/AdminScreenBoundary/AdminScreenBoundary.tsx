/**
 * AdminScreenBoundary Component
 *
 * Declarative boundary that handles loading/error states for admin screens.
 * Eliminates repetitive if/else boilerplate in every admin screen.
 *
 * Usage:
 * <AdminScreenBoundary title={t('admin.kits.title')} isLoading={isLoading} error={error}>
 *   {renderStats()}
 *   {renderFilters()}
 *   <DataTable ... />
 * </AdminScreenBoundary>
 */

'use client';

import { AdminErrorState } from '../AdminStates/AdminStates';
import type { AdminScreenBoundaryProps } from './AdminScreenBoundary.interfaces';

import { PageTitle, ScreenContainer } from '../AdminPageLayout/AdminPageLayout.styled';

export const AdminScreenBoundary = ({
  children,
  error,
  errorAction,
  isLoading,
  title,
}: AdminScreenBoundaryProps) => {
  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <ScreenContainer>
        <PageTitle>{title}</PageTitle>
        <AdminErrorState action={errorAction} message={error} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <PageTitle>{title}</PageTitle>
      {children}
    </ScreenContainer>
  );
};
