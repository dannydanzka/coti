/**
 * AdminPageLayout Component
 *
 * Standard layout wrapper for admin screens.
 * Provides consistent page structure with optional title.
 */

'use client';

import type { AdminPageLayoutProps } from './AdminPageLayout.interfaces';

import { PageTitle, PageWrapper, ScreenContainer } from './AdminPageLayout.styled';

export const AdminPageLayout = ({ children, className, title }: AdminPageLayoutProps) => {
  return (
    <PageWrapper className={className}>
      <ScreenContainer>
        {title && <PageTitle>{title}</PageTitle>}
        {children}
      </ScreenContainer>
    </PageWrapper>
  );
};

export {
  HeaderRow,
  PageTitle,
  PageWrapper,
  ScreenContainer,
  SectionTitle,
} from './AdminPageLayout.styled';
