/**
 * AppDrawer Constants
 */

import { createElement } from 'react';
import { Home, PiggyBank, UserRound } from 'lucide-react';

import { ROUTES } from '@constants';

import type { DrawerNavigationItem } from './AppDrawer.interfaces';

/** Sólo se listan pantallas que existen: el resto del producto está por construirse. */
export const DRAWER_NAVIGATION_ITEMS: DrawerNavigationItem[] = [
  {
    href: ROUTES.PUBLIC.HOME,
    icon: createElement(Home, { size: 20 }),
    id: 'home',
    label: 'Inicio',
  },
  {
    href: ROUTES.PUBLIC.DASHBOARD,
    icon: createElement(PiggyBank, { size: 20 }),
    id: 'dashboard',
    label: 'Mi cajita',
  },
  {
    href: `${ROUTES.PUBLIC.DASHBOARD}/profile`,
    icon: createElement(UserRound, { size: 20 }),
    id: 'profile',
    label: 'Mi perfil',
  },
];

export const UI_TEXT = {
  DEFAULT_NAME: 'Usuario',
} as const;
