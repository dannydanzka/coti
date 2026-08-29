/**
 * AppDrawer Component
 *
 * Collapsible sidebar for authenticated users.
 * Features:
 * - Desktop: Fixed sidebar that pushes content, collapsible
 * - Mobile: Overlay drawer with close button
 * - Tooltips when collapsed
 * - Active state highlighting
 * - Landing page color scheme
 */

'use client';

import { useCallback } from 'react';

import { useAuth } from '@hooks';

import { AppDrawerFooter } from './components/AppDrawerFooter';
import { AppDrawerHeader } from './components/AppDrawerHeader';
import { AppDrawerNav } from './components/AppDrawerNav';
import type { AppDrawerProps } from './AppDrawer.interfaces';
import { DRAWER_NAVIGATION_ITEMS, UI_TEXT } from './AppDrawer.constants';

import { SidebarContainer, SidebarOverlay } from './AppDrawer.styled';

export const AppDrawer = ({
  isCollapsed,
  isMobileOpen,
  onCollapsedChange,
  onMobileClose,
}: AppDrawerProps) => {
  const { logout, user } = useAuth();

  const handleToggleCollapse = useCallback(() => {
    onCollapsedChange(!isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const handleLogout = useCallback(async () => {
    onMobileClose();
    await logout();
  }, [logout, onMobileClose]);

  const handleNavClick = useCallback(() => {
    onMobileClose();
  }, [onMobileClose]);

  const getUserInitials = useCallback(() => {
    if (!user?.firstName) return '?';
    const firstInitial = user.firstName?.[0] ?? '';
    const lastInitial = user.lastName?.[0] ?? '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
  }, [user?.firstName, user?.lastName]);

  const getUserName = useCallback(() => {
    const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
    return fullName || UI_TEXT.DEFAULT_NAME;
  }, [user?.firstName, user?.lastName]);

  return (
    <>
      <SidebarOverlay $isVisible={isMobileOpen} onClick={onMobileClose} />
      <SidebarContainer $isCollapsed={isCollapsed} $isMobileOpen={isMobileOpen}>
        <AppDrawerHeader
          isCollapsed={isCollapsed}
          userEmail={user?.email ?? ''}
          userInitials={getUserInitials()}
          userName={getUserName()}
          onMobileClose={onMobileClose}
          onToggleCollapse={handleToggleCollapse}
        />
        <AppDrawerNav
          isCollapsed={isCollapsed}
          items={DRAWER_NAVIGATION_ITEMS}
          onNavClick={handleNavClick}
        />
        <AppDrawerFooter isCollapsed={isCollapsed} onLogout={handleLogout} />
      </SidebarContainer>
    </>
  );
};
