/**
 * Public Navigation Constants
 *
 * Text constants and configuration for public navigation components.
 * Coti header and navigation configuration.
 */

import { PUBLIC_ROUTES } from './public.constants';

export const NAVBAR_UI_TEXT = {
  CTA_ENROLL: 'Inscripciones',
  CTA_MEMBERS: 'Miembros',
  LOGO_TEXT: 'COTI',
  MOBILE_MENU_TOGGLE: 'Toggle navigation menu',
} as const;

export const NAVBAR_CONFIG = {
  DEFAULT_VARIANT: 'default',
  DROPDOWN_CLOSE_DELAY: 150,
  MOBILE_BREAKPOINT: 1024,
} as const;

export const NAVBAR_VARIANTS = {
  DEFAULT: 'default',
  SOLID: 'solid',
  TRANSPARENT: 'transparent',
} as const;

export const HEADER_ROUTES = {
  ENROLLMENT: PUBLIC_ROUTES.SIGNUP,
  HOME: PUBLIC_ROUTES.HOME,
  LOGIN: PUBLIC_ROUTES.LOGIN,
} as const;

/** DOM ids of the home landing's meet sections (scroll targets). */
export const HOME_SECTION_IDS = {
  PROJECTION: 'proyecta',
  STORY: 'historia',
} as const;

/** Ancla a la sección de proyección de la portada. */
export const PROJECTION_ANCHOR = `/#${HOME_SECTION_IDS.PROJECTION}`;

/**
 * True cuando un redirect posterior al login apunta al flujo de proyección, para
 * que las pantallas de autenticación ajusten el copy en vez del genérico.
 */
export const isProjectionOriginRedirect = (redirect?: string | null): boolean =>
  Boolean(redirect?.includes(`#${HOME_SECTION_IDS.PROJECTION}`));

/** Nav item ids shown only to guests (replaced by logout once authenticated). */
export const AUTH_GUEST_ONLY_NAV_IDS: readonly string[] = ['login', 'signup'];

/** Logout entry appended to the authenticated nav (onClick injected at runtime). */
export const LOGOUT_NAV_ITEM = {
  id: 'logout',
  isActive: true,
  order: 7,
  title: 'Cerrar Sesión',
  url: '#',
} as const;

export const PUBLIC_NAVIGATION_ITEMS = [
  {
    id: 'home',
    isActive: true,
    order: 1,
    title: 'Inicio',
    url: PUBLIC_ROUTES.HOME,
  },
  {
    id: 'projection',
    isActive: true,
    order: 2,
    title: 'Proyecta tu viaje',
    url: PROJECTION_ANCHOR,
  },
] as const;
