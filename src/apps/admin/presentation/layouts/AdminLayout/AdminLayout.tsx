/**
 * Admin Layout Component
 *
 * Main layout for admin panel with sidebar navigation, header, and route protection.
 * Protected route - redirects to login if not authenticated or not admin role.
 * Responsive design with mobile-friendly navigation.
 */

'use client';

import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
  Mic,
  TrendingUp,
  Trophy,
  Users,
  Vote,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { useAdminNavigation } from '@apps/admin/hooks';
import { useAuth } from '@hooks';
import { USER_ROLES } from '@constants';

import type { AdminLayoutProps } from './AdminLayout.interfaces';

import {
  HiddenToggleButton,
  LayoutContainer,
  LoadingMessage,
  LogoIcon,
  LogoText,
  MainContent,
  MenuToggle,
  NavIcon,
  NavItem,
  NavItemText,
  Overlay,
  PageContent,
  Sidebar,
  SidebarHeader,
  SidebarLogo,
  SidebarNav,
  TopBar,
  TopBarLeft,
  TopBarRight,
  UserAvatar,
  UserContainer,
  UserInfo,
  UserMenu,
  UserName,
  UserRole,
} from './AdminLayout.styled';

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, logout: authLogout, user } = useAuth();
  const { visibleNavItems } = useAdminNavigation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== USER_ROLES.ADMIN)) {
      redirect('/login');
    }
  }, [isAuthenticated, isLoading, user?.role]);

  /**
   * Icon mapping for navigation items
   */
  const iconMap: Record<string, React.ReactNode> = useMemo(
    () => ({
      BarChart3: <BarChart3 size={20} />,
      Calendar: <Calendar size={20} />,
      Mic: <Mic size={20} />,
      TrendingUp: <TrendingUp size={20} />,
      Trophy: <Trophy size={20} />,
      Users: <Users size={20} />,
      Vote: <Vote size={20} />,
    }),
    []
  );

  /**
   * Toggle sidebar collapse on desktop
   */
  const handleSidebarToggle = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  /**
   * Toggle mobile menu
   */
  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  /**
   * Close mobile menu when clicking overlay
   */
  const handleOverlayClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  /**
   * Handle logout
   */
  const handleLogout = useCallback(async () => {
    await authLogout();
    redirect('/login');
  }, [authLogout]);

  /**
   * Get user initials for avatar
   */
  const getUserInitials = useCallback(() => {
    if (!user) return 'U';
    const firstInitial = user.firstName?.[0] ?? '';
    const lastInitial = user.lastName?.[0] ?? '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || 'U';
  }, [user]);

  /**
   * Render sidebar header with logo
   */
  const renderSidebarHeader = () => (
    <SidebarHeader>
      <SidebarLogo $isCollapsed={sidebarCollapsed}>
        <LogoIcon>
          <Mic size={24} />
        </LogoIcon>
        <LogoText $isCollapsed={sidebarCollapsed}>{t('common.appName')}</LogoText>
      </SidebarLogo>
    </SidebarHeader>
  );

  /**
   * Render navigation items with role-based filtering
   */
  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const renderNavigation = () => (
    <SidebarNav>
      {visibleNavItems.map((item: { icon: string; id: string; label: string; path: string }) => (
        <NavItem
          $isActive={pathname === item.path}
          $isCollapsed={sidebarCollapsed}
          href={item.path}
          key={item.id}
          onClick={handleCloseMobileMenu}
        >
          <NavIcon>{iconMap[item.icon]}</NavIcon>
          <NavItemText $isCollapsed={sidebarCollapsed}>{item.label}</NavItemText>
        </NavItem>
      ))}
    </SidebarNav>
  );

  /**
   * Render sidebar with header and navigation
   */
  const renderSidebar = () => (
    <Sidebar $isCollapsed={sidebarCollapsed || !mobileMenuOpen}>
      {renderSidebarHeader()}
      {renderNavigation()}
    </Sidebar>
  );

  /**
   * Render top bar left section with menu toggles
   */
  const renderTopBarLeft = () => (
    <TopBarLeft>
      <MenuToggle onClick={handleMobileMenuToggle}>
        <Menu size={24} />
      </MenuToggle>
      <HiddenToggleButton onClick={handleSidebarToggle}>
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </HiddenToggleButton>
    </TopBarLeft>
  );

  /**
   * Render user menu with avatar and info
   */
  const renderUserMenu = () => (
    <TopBarRight>
      <UserMenu>
        <UserInfo onClick={handleLogout}>
          <UserAvatar>{getUserInitials()}</UserAvatar>
          <UserContainer>
            <UserName>{`${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || ''}</UserName>
            <UserRole>{user?.role === USER_ROLES.ADMIN ? 'Administrador' : 'Manager'}</UserRole>
          </UserContainer>
        </UserInfo>
      </UserMenu>
    </TopBarRight>
  );

  /**
   * Render top bar with left and right sections
   */
  const renderTopBar = () => (
    <TopBar>
      {renderTopBarLeft()}
      {renderUserMenu()}
    </TopBar>
  );

  /**
   * Render main content area
   */
  const renderMainContent = () => (
    <MainContent $sidebarCollapsed={sidebarCollapsed}>
      {renderTopBar()}
      <PageContent>{children}</PageContent>
    </MainContent>
  );

  if (isLoading) {
    return (
      <LayoutContainer>
        <PageContent>
          <LoadingMessage>{t('common.loading')}</LoadingMessage>
        </PageContent>
      </LayoutContainer>
    );
  }

  if (!isAuthenticated || user?.role !== USER_ROLES.ADMIN) {
    return null;
  }

  return (
    <LayoutContainer>
      {renderSidebar()}
      <Overlay $isVisible={mobileMenuOpen} onClick={handleOverlayClick} />
      {renderMainContent()}
    </LayoutContainer>
  );
};
