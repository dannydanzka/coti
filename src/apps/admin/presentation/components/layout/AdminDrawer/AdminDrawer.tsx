/**
 * AdminDrawer Component
 *
 * Slide-in navigation drawer for admin users.
 * Includes user header with role badge and admin navigation items.
 */

'use client';

import { LogOut, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { FEATURE_FLAGS, ROUTES, USER_ROLES } from '@constants';
import { useAuth } from '@hooks';

import { ADMIN_NAVIGATION_ITEMS, DRAWER_UI_TEXT } from './AdminDrawer.constants';
import type { AdminDrawerProps, AdminNavigationItem } from './AdminDrawer.interfaces';

import {
  CloseButton,
  DrawerContainer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  LogoutButton,
  NavBadge,
  NavItem,
  NavLinkStyled,
  NavList,
  NavSection,
  RoleBadge,
  RoleLabel,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  UserSection,
} from './AdminDrawer.styled';

export const AdminDrawer = ({ className, isOpen, onClose }: AdminDrawerProps) => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  const handleOverlayClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleLogout = useCallback(async () => {
    handleClose();
    await logout();
  }, [handleClose, logout]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const getUserInitials = useCallback(() => {
    if (!user?.firstName) return '?';
    const firstInitial = user.firstName?.[0] ?? '';
    const lastInitial = user.lastName?.[0] ?? '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
  }, [user?.firstName, user?.lastName]);

  const getRoleLabel = useCallback(() => {
    if (user?.role === USER_ROLES.OWNER) return DRAWER_UI_TEXT.OWNER;
    return DRAWER_UI_TEXT.ADMIN;
  }, [user?.role]);

  const visibleNavItems = useMemo(
    () =>
      ADMIN_NAVIGATION_ITEMS.filter(
        (item) => !item.featureFlag || FEATURE_FLAGS[item.featureFlag as keyof typeof FEATURE_FLAGS]
      ),
    []
  );

  const isPathActive = useCallback(
    (href: string): boolean => {
      if (href === ROUTES.ADMIN.ROOT && pathname === ROUTES.ADMIN.ROOT) return true;
      if (href !== ROUTES.ADMIN.ROOT && pathname.startsWith(href)) return true;
      return false;
    },
    [pathname]
  );

  const renderUserHeader = () => (
    <DrawerHeader>
      <CloseButton aria-label={DRAWER_UI_TEXT.CLOSE} type='button' onClick={handleClose}>
        <X size={20} />
      </CloseButton>

      <UserSection>
        <UserAvatar>{getUserInitials()}</UserAvatar>

        <UserInfo>
          <UserName>
            {`${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Admin'}
          </UserName>
          <UserRole>{user?.email ?? ''}</UserRole>
        </UserInfo>

        <RoleBadge>
          <RoleLabel>{getRoleLabel()}</RoleLabel>
        </RoleBadge>
      </UserSection>
    </DrawerHeader>
  );

  const renderNavItem = (item: AdminNavigationItem) => {
    const isActive = isPathActive(item.href);

    return (
      <NavItem key={item.id}>
        <NavLinkStyled
          $isActive={isActive}
          as={Link}
          href={item.href}
          prefetch={false}
          onClick={handleClose}
        >
          {item.icon}
          {item.label}
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </NavLinkStyled>
      </NavItem>
    );
  };

  const renderNavigation = () => (
    <NavSection>
      <NavList>{visibleNavItems.map(renderNavItem)}</NavList>
    </NavSection>
  );

  const renderFooter = () => (
    <DrawerFooter>
      <LogoutButton type='button' onClick={handleLogout}>
        <LogOut />
        {DRAWER_UI_TEXT.LOGOUT}
      </LogoutButton>
    </DrawerFooter>
  );

  if (!isOpen && !isClosing) return null;

  return (
    <>
      <DrawerOverlay $isClosing={isClosing} onClick={handleOverlayClick} />
      <DrawerContainer $isClosing={isClosing} className={className} role='dialog'>
        {renderUserHeader()}
        {renderNavigation()}
        {renderFooter()}
      </DrawerContainer>
    </>
  );
};
