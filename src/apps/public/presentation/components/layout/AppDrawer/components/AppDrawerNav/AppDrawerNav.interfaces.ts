/**
 * AppDrawerNav Component Interfaces
 */

import type { ReactNode } from 'react';

export interface DrawerNavItem {
  badge?: number | string;
  href: string;
  icon: ReactNode;
  id: string;
  label: string;
}

export interface AppDrawerNavProps {
  isCollapsed: boolean;
  items: DrawerNavItem[];
  onNavClick: () => void;
}
