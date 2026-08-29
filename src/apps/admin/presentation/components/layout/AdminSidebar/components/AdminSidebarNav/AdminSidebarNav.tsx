/**
 * AdminSidebarNav Component
 *
 * Navigation section with menu items and tooltips.
 */

'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { ROUTES } from '@constants';

import type { AdminNavItem, AdminSidebarNavProps } from './AdminSidebarNav.interfaces';

import {
  NavBadge,
  NavIcon,
  NavItem,
  NavItemWrapper,
  NavLabel,
  NavLink,
  NavList,
  NavSection,
  Tooltip,
} from './AdminSidebarNav.styled';

export const AdminSidebarNav = ({ isCollapsed, items, onNavClick }: AdminSidebarNavProps) => {
  const pathname = usePathname();

  const isPathActive = useCallback(
    (href: string): boolean => {
      if (href === ROUTES.ADMIN.ROOT && pathname === ROUTES.ADMIN.ROOT) return true;
      if (href !== ROUTES.ADMIN.ROOT && pathname.startsWith(href)) return true;
      return false;
    },
    [pathname]
  );

  const renderNavItem = (item: AdminNavItem) => {
    const isActive = isPathActive(item.href);

    return (
      <NavItem key={item.id}>
        <NavItemWrapper>
          <NavLink
            $isActive={isActive}
            $isCollapsed={isCollapsed}
            as={Link}
            href={item.href}
            prefetch={false}
            onClick={onNavClick}
          >
            <NavIcon>{item.icon}</NavIcon>
            <NavLabel $isCollapsed={isCollapsed}>{item.label}</NavLabel>
            {item.badge && <NavBadge $isCollapsed={isCollapsed}>{item.badge}</NavBadge>}
          </NavLink>
          {isCollapsed && <Tooltip>{item.label}</Tooltip>}
        </NavItemWrapper>
      </NavItem>
    );
  };

  return (
    <NavSection>
      <NavList>{items.map(renderNavItem)}</NavList>
    </NavSection>
  );
};
