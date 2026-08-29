/**
 * AdminDrawer Component Interfaces
 *
 * Type definitions for the admin navigation drawer.
 */

import type { SerializableAuthUser } from '@redux';

export interface AdminNavigationItem {
  badge?: string | number;
  featureFlag?: string;
  href: string;
  icon: React.ReactNode;
  id: string;
  label: string;
  onClick?: () => void;
}

export interface AdminDrawerProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface AdminDrawerUserHeaderProps {
  user: SerializableAuthUser | null;
}

export interface AdminDrawerNavItemProps {
  isActive: boolean;
  item: AdminNavigationItem;
  onClose: () => void;
}
