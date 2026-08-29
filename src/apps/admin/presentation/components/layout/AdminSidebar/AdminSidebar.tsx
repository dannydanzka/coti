/**
 * AdminSidebar Component
 *
 * Collapsible sidebar for admin panel.
 * Features:
 * - Desktop: Fixed sidebar that pushes content, collapsible
 * - Mobile: Overlay drawer with close button
 * - Tooltips when collapsed
 * - Active state highlighting
 */

'use client';

import { useCallback, useMemo } from 'react';

import { FEATURE_FLAGS, USER_ROLES } from '@constants';
import { useAuth } from '@hooks';

import { ADMIN_NAV_ITEMS, UI_TEXT } from './AdminSidebar.constants';
import { AdminSidebarFooter } from './components/AdminSidebarFooter';
import { AdminSidebarHeader } from './components/AdminSidebarHeader';
import { AdminSidebarNav } from './components/AdminSidebarNav';
import type { AdminSidebarProps } from './AdminSidebar.interfaces';

import { SidebarContainer, SidebarOverlay } from './AdminSidebar.styled';

export const AdminSidebar = ({
  isCollapsed,
  isMobileOpen,
  onCollapsedChange,
  onMobileClose,
}: AdminSidebarProps) => {
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

  const getRoleLabel = useCallback(() => {
    if (user?.role === USER_ROLES.OWNER) return UI_TEXT.OWNER;
    return UI_TEXT.ADMIN;
  }, [user?.role]);

  const visibleNavItems = useMemo(
    () =>
      ADMIN_NAV_ITEMS.filter(
        (item) => !item.featureFlag || FEATURE_FLAGS[item.featureFlag as keyof typeof FEATURE_FLAGS]
      ),
    []
  );

  return (
    <>
      <SidebarOverlay $isVisible={isMobileOpen} onClick={onMobileClose} />
      <SidebarContainer $isCollapsed={isCollapsed} $isMobileOpen={isMobileOpen}>
        <AdminSidebarHeader
          isCollapsed={isCollapsed}
          roleLabel={getRoleLabel()}
          userEmail={user?.email ?? ''}
          userInitials={getUserInitials()}
          userName={getUserName()}
          onMobileClose={onMobileClose}
          onToggleCollapse={handleToggleCollapse}
        />
        <AdminSidebarNav
          isCollapsed={isCollapsed}
          items={visibleNavItems}
          onNavClick={handleNavClick}
        />
        <AdminSidebarFooter isCollapsed={isCollapsed} onLogout={handleLogout} />
      </SidebarContainer>
    </>
  );
};
