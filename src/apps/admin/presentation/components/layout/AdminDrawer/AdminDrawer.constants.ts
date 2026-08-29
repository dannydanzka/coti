/**
 * AdminDrawer Constants
 */

import { Home, Users } from 'lucide-react';
import { createElement } from 'react';

import type { AdminNavigationItem } from './AdminDrawer.interfaces';

export const ADMIN_NAVIGATION_ITEMS: AdminNavigationItem[] = [
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

export const DRAWER_UI_TEXT = {
  ADMIN: 'Administrador',
  CLOSE: 'Cerrar menú',
  LOGOUT: 'Cerrar Sesión',
  OWNER: 'Propietario',
} as const;
