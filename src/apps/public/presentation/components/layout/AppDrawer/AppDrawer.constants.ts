/**
 * AppDrawer Constants
 */

import { createElement } from 'react';
import { Home, PiggyBank, Plane, UserRound } from 'lucide-react';

import { AUTHENTICATED_ROUTES, ROUTES } from '@constants';

import type { DrawerNavigationItem } from './AppDrawer.interfaces';

/**
 * Sólo se listan pantallas que existen. La portada queda fuera a propósito:
 * con sesión abierta redirige a la cajita, así que enlazarla sería un rebote.
 */
export const DRAWER_NAVIGATION_ITEMS: DrawerNavigationItem[] = [
  {
    href: ROUTES.PUBLIC.DASHBOARD,
    icon: createElement(Home, { size: 20 }),
    id: 'dashboard',
    label: 'Inicio',
  },
  {
    href: AUTHENTICATED_ROUTES.PLANNER,
    icon: createElement(Plane, { size: 20 }),
    id: 'planner',
    label: 'Mi viaje',
  },
  {
    href: AUTHENTICATED_ROUTES.CAJITA,
    icon: createElement(PiggyBank, { size: 20 }),
    id: 'cajita',
    label: 'Cajita de ahorro',
  },
  {
    href: AUTHENTICATED_ROUTES.PROFILE,
    icon: createElement(UserRound, { size: 20 }),
    id: 'profile',
    label: 'Mi perfil',
  },
];

export const UI_TEXT = {
  DEFAULT_NAME: 'Usuario',
} as const;
