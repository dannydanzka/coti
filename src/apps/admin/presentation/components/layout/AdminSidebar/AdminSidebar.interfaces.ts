/**
 * AdminSidebar Component Interfaces
 */

import type { ReactNode } from 'react';

export interface AdminSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  onMobileClose: () => void;
}

export interface AdminNavItem {
  badge?: number;
  featureFlag?: string;
  href: string;
  icon: ReactNode;
  id: string;
  label: string;
}
