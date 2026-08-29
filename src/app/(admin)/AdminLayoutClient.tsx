/**
 * layout
 *
 * Admin section layout with sidebar navigation.
 * Uses useAuth (AuthContext) as SINGLE SOURCE OF TRUTH for auth state.
 */

'use client';

import { Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { AdminSidebar } from '@apps/admin/presentation/components';
import { GlobalLoading } from '@components';
import { ROUTES, USER_ROLES } from '@constants';
import { useAuth } from '@hooks';

import type { AdminLayoutProps } from './layout.interfaces';

import {
  AdminLayoutContainer,
  MainContent,
  MobileMenuButton,
  PageContent,
  TopBar,
  TopBarLeft,
  TopBarTitle,
} from './layout.styled';

export const AdminLayoutClient = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    if (user?.role !== USER_ROLES.ADMIN && user?.role !== USER_ROLES.OWNER) {
      router.replace(ROUTES.PUBLIC.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, router, user?.role]);

  const handleCollapsedChange = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
  }, []);

  const handleMobileOpen = useCallback(() => {
    setIsMobileOpen(true);
  }, []);

  const handleMobileClose = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  if (
    isLoading ||
    !isAuthenticated ||
    (user?.role !== USER_ROLES.ADMIN && user?.role !== USER_ROLES.OWNER)
  ) {
    return <GlobalLoading forceVisible />;
  }

  return (
    <AdminLayoutContainer>
      <AdminSidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCollapsedChange={handleCollapsedChange}
        onMobileClose={handleMobileClose}
      />

      <MainContent $sidebarCollapsed={isCollapsed}>
        <TopBar>
          <TopBarLeft>
            <MobileMenuButton aria-label={t('common.openMenu')} onClick={handleMobileOpen}>
              <Menu size={24} />
            </MobileMenuButton>
            <TopBarTitle>{t('admin.panel')}</TopBarTitle>
          </TopBarLeft>
        </TopBar>

        <PageContent>{children}</PageContent>
      </MainContent>
    </AdminLayoutContainer>
  );
};
