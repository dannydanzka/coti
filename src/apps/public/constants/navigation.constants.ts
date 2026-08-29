/**
 * Public Navigation Constants
 *
 * Text constants and configuration for public navigation components.
 * DearAdry header and navigation configuration.
 */

import { PUBLIC_ROUTES } from './public.constants';

export const NAVBAR_UI_TEXT = {
  CTA_ENROLL: 'Inscripciones',
  CTA_MEMBERS: 'Miembros',
  LOGO_TEXT: 'DEAR ADRY',
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
export const MEET_SECTION_IDS = {
  PACKAGES: 'paquetes',
  STORY: 'historia',
} as const;

/** Anchor to the active meet's packages section on the home landing. */
export const MEET_PACKAGES_ANCHOR = `/#${MEET_SECTION_IDS.PACKAGES}`;

/**
 * sessionStorage key holding a meet checkout interrupted by the auth wall
 * ({ packageId, route, dedicationText }) so it resumes after login/signup.
 */
export const PENDING_MEET_CHECKOUT_STORAGE_KEY = 'pendingMeetCheckout';

/**
 * True when a post-auth redirect points at the meet (Mango) packages flow, so
 * auth screens can swap in meet-specific copy instead of the generic invite.
 */
export const isMeetOriginRedirect = (redirect?: string | null): boolean =>
  Boolean(redirect?.includes(`#${MEET_SECTION_IDS.PACKAGES}`));

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
    id: 'meet',
    isActive: true,
    order: 2,
    title: 'Mango',
    url: MEET_PACKAGES_ANCHOR,
  },
  {
    id: 'books',
    isActive: true,
    order: 3,
    title: 'Libros',
    url: PUBLIC_ROUTES.BOOKS,
  },
  {
    id: 'rally',
    isActive: true,
    order: 4,
    title: 'Rally',
    url: PUBLIC_ROUTES.RALLY,
  },
  {
    id: 'about',
    isActive: true,
    order: 5,
    title: 'Sobre Dear Adry',
    url: PUBLIC_ROUTES.ABOUT,
  },
  {
    id: 'contact',
    isActive: true,
    order: 6,
    title: 'Contacto',
    url: PUBLIC_ROUTES.CONTACT,
  },
  {
    id: 'signup',
    isActive: true,
    order: 7,
    title: 'Registro',
    url: PUBLIC_ROUTES.SIGNUP,
  },
  {
    id: 'login',
    isActive: true,
    order: 8,
    title: 'Login',
    url: PUBLIC_ROUTES.LOGIN,
  },
] as const;
