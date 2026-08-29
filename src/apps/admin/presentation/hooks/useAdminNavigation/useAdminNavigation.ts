/**
 * useAdminNavigation Hook
 *
 * Custom hook for managing admin panel navigation items with role-based access control.
 * Filters navigation items based on current user's role.
 */

import { useMemo } from 'react';

import { hasRole } from '@utils';

import type {
  NavigationItemConfig,
  UseAdminNavigationReturn,
} from './useAdminNavigation.interfaces';

export const useAdminNavigation = (): UseAdminNavigationReturn => {
  /**
   * Navigation items configuration with role-based filtering
   */
  const navigationItems: NavigationItemConfig[] = useMemo(
    () => [
      {
        icon: 'BarChart3',
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin',
        roles: ['admin', 'admin'],
      },
      {
        icon: 'Mic',
        id: 'participants',
        label: 'Participantes',
        path: '/admin/participants',
        roles: ['admin', 'admin'],
      },
      {
        icon: 'Trophy',
        id: 'categories',
        label: 'Categorías',
        path: '/admin/categories',
        roles: ['admin'],
      },
      {
        icon: 'Calendar',
        id: 'years',
        label: 'Años',
        path: '/admin/years',
        roles: ['admin'],
      },
      {
        icon: 'Vote',
        id: 'voting',
        label: 'Votaciones',
        path: '/admin/voting',
        roles: ['admin'],
      },
      {
        icon: 'TrendingUp',
        id: 'reports',
        label: 'Reportes',
        path: '/admin/reports',
        roles: ['admin'],
      },
      {
        icon: 'Users',
        id: 'managers',
        label: 'Managers',
        path: '/admin/managers',
        roles: ['admin'],
      },
      {
        icon: 'Users',
        id: 'users',
        label: 'Usuarios Admin',
        path: '/admin/users',
        roles: ['admin'],
      },
    ],
    []
  );

  /**
   * Filter navigation items based on user role
   */
  const visibleNavItems = useMemo(() => {
    return navigationItems.filter((item) => {
      if (!item.roles) return true;
      return item.roles.some((role) => hasRole(role));
    });
  }, [navigationItems]);

  return {
    navigationItems,
    visibleNavItems,
  };
};
