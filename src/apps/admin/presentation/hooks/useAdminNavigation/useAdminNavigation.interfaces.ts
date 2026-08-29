/**
 * useAdminNavigation Hook - Type Definitions
 *
 * Manages admin navigation items with role-based filtering
 */

import type { UserRole } from '@domain-types';

export interface NavigationItemConfig {
  icon: string;
  id: string;
  label: string;
  path: string;
  roles?: UserRole[];
}

export interface UseAdminNavigationReturn {
  navigationItems: NavigationItemConfig[];
  visibleNavItems: NavigationItemConfig[];
}
