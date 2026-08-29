/**
 * PublicShell Component
 *
 * Reusable shell component for public pages.
 * Provides consistent structure with navigation, title, subtitle, and content.
 */

'use client';

import type { PublicShellProps } from './PublicShell.interfaces';

import {
  PageContainer,
  PageContent,
  PageHeader,
  PageSubtitle,
  PageTitle,
} from './PublicShell.styled';

/**
 * PublicShell Component
 */
export const PublicShell = ({
  children,
  className,
  subtitle = '',
  title = '',
}: PublicShellProps) => {
  return (
    <PageContainer className={className}>
      <PageContent>
        {(title || subtitle) && (
          <PageHeader>
            {title && <PageTitle>{title}</PageTitle>}
            {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
          </PageHeader>
        )}

        {children}
      </PageContent>
    </PageContainer>
  );
};
