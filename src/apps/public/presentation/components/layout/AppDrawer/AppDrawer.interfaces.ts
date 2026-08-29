/**
 * AppDrawer Component Interfaces
 *
 * Type definitions for the authenticated user sidebar/drawer.
 * Desktop: Fixed sidebar that pushes content, collapsible.
 * Mobile: Overlay drawer with close button.
 */

import type { SerializableAuthUser } from '@redux';

export interface DrawerNavigationItem {
  badge?: string | number;
  featureFlag?: string;
  href: string;
  icon: React.ReactNode;
  id: string;
  label: string;
  onClick?: () => void;
  requiresPaidEnrollment?: boolean;
}

export interface AppDrawerProps {
  className?: string;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  onMobileClose: () => void;
}

export interface DrawerUserHeaderProps {
  totalKm?: number;
  user: SerializableAuthUser | null;
}

export interface DrawerNavItemProps {
  isActive: boolean;
  isCollapsed: boolean;
  item: DrawerNavigationItem;
  onClose: () => void;
}
