/**
 * Authenticated Layout
 *
 * Envoltura de las rutas que exigen sesión, con la barra lateral colapsable.
 * En escritorio el cajón empuja el contenido; abajo del breakpoint lg se
 * vuelve un overlay que abre el botón de menú de la barra superior.
 *
 * Usa useAuth (AuthContext) como ÚNICA FUENTE DE VERDAD del estado de sesión;
 * el middleware ya bloquea el acceso, esto sólo evita el parpadeo de contenido
 * mientras resuelve. El estado de colapso se persiste en Redux.
 */

'use client';

import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { AppDrawer } from '@apps/public/presentation/components/layout';
import { Footer } from '@components';
import { PUBLIC_ROUTES } from '@apps/public/constants';
import Logo from '@assets/branding/Logo.svg';

import type { AuthenticatedLayoutProps } from './layout.interfaces';
import { useAuthenticatedLayout } from './hooks';

import {
  AuthenticatedContainer,
  LogoLink,
  MainContent,
  MobileMenuButton,
  PageContent,
  TopBar,
  TopBarCenter,
  TopBarLeft,
  TopBarRight,
} from './layout.styled';

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { t } = useTranslation();
  const {
    canAccess,
    handleCollapsedChange,
    handleMobileClose,
    handleMobileOpen,
    isAuthenticated,
    isLoading,
    isMobileOpen,
    isSidebarCollapsed,
  } = useAuthenticatedLayout();

  if (isLoading || !isAuthenticated || !canAccess) {
    return null;
  }

  return (
    <AuthenticatedContainer>
      <AppDrawer
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        onCollapsedChange={handleCollapsedChange}
        onMobileClose={handleMobileClose}
      />
      <MainContent $sidebarCollapsed={isSidebarCollapsed}>
        <TopBar>
          <TopBarLeft>
            <MobileMenuButton aria-label={t('common.openMenu')} onClick={handleMobileOpen}>
              <Menu size={24} />
            </MobileMenuButton>
          </TopBarLeft>
          <TopBarCenter>
            <LogoLink aria-label={t('common.goHome')} href={PUBLIC_ROUTES.HOME}>
              <Logo />
            </LogoLink>
          </TopBarCenter>
          <TopBarRight />
        </TopBar>
        <PageContent>{children}</PageContent>
        <Footer />
      </MainContent>
    </AuthenticatedContainer>
  );
};

export default AuthenticatedLayout;
