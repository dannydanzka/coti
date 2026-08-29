/**
 * AppDrawerNav Component
 *
 * Navigation section with menu items and tooltips.
 */

'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { ROUTES } from '@constants';

import type { AppDrawerNavProps, DrawerNavItem } from './AppDrawerNav.interfaces';

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
} from './AppDrawerNav.styled';

export const AppDrawerNav = ({ isCollapsed, items, onNavClick }: AppDrawerNavProps) => {
  const pathname = usePathname();

  const isPathActive = useCallback(
    (href: string): boolean => {
      /** Root-level hrefs match exactly — otherwise '/' (and '/dashboard') light up on every subpath. */
      if (href === ROUTES.PUBLIC.HOME || href === ROUTES.PUBLIC.DASHBOARD) {
        return pathname === href;
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const renderNavItem = (item: DrawerNavItem) => {
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
      <NavList $isCollapsed={isCollapsed}>{items.map(renderNavItem)}</NavList>
    </NavSection>
  );
};
