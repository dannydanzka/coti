/**
 * AdminSidebar Constants
 */

import { Home, Users } from 'lucide-react';
import { createElement } from 'react';

import type { AdminNavItem } from './AdminSidebar.interfaces';

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: '/admin',
    icon: createElement(Home, { size: 20 }),
    id: 'dashboard',
    label: 'Dashboard',
  },
  {
    href: '/admin/users',
    icon: createElement(Users, { size: 20 }),
    id: 'users',
    label: 'Usuarios',
  },
];

export const UI_TEXT = {
  ADMIN: 'Administrador',
  DEFAULT_NAME: 'Admin',
  OWNER: 'Propietario',
} as const;
