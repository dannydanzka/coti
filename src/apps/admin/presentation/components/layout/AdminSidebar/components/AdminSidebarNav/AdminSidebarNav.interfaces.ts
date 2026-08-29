/**
 * AdminSidebarNav Component Interfaces
 */

import type { ReactNode } from 'react';

export interface AdminNavItem {
  badge?: number;
  href: string;
  icon: ReactNode;
  id: string;
  label: string;
}

export interface AdminSidebarNavProps {
  isCollapsed: boolean;
  items: AdminNavItem[];
  onNavClick: () => void;
}
