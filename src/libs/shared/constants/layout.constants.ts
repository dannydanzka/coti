/**
 * Layout Constants
 *
 * Constants for shared layout components (Header, Footer).
 * Moved to libs because Header/Footer are used across multiple contexts.
 */

export const PUBLIC_ROUTES = {
  ABOUT: '/nosotros',
  BOOKS: '/libros',
  CONTACT: '/contact',
  COOKIES: '/cookies',
  ENROLLMENT: '/enrollment',
  EVENTS: '/events',
  FAQ: '/preguntas-frecuentes',
  GALLERY: '/galeria',
  HOME: '/',
  HOW_IT_WORKS: '/como-funciona',
  LOGIN: '/login',
  PRIVACY: '/privacy',
  RALLY: '/rally',
  SIGNUP: '/signup',
  SPONSORS: '/nuestros-aliados',
  TERMS: '/terms',
} as const;

export const AUTHENTICATED_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
} as const;

export const NAVBAR_UI_TEXT = {
  CTA_DASHBOARD: 'Mi cajita',
  CTA_PROFILE: 'Mi perfil',
  CTA_ENROLL: 'Crear cuenta',
  CTA_MEMBERS: 'Entrar',
  CTA_RESERVE: 'Planear mi viaje',
  LOGO_TEXT: 'COTI',
  MOBILE_MENU_TOGGLE: 'Toggle navigation menu',
  SEARCH_BUTTON_LABEL: 'Buscar',
  SEARCH_PLACEHOLDER: 'Buscar...',
} as const;

/**
 * Navegación del header sólo en la portada. Other public pages keep the
 * encabezado mínimo; esta navegación más completa se muestra sólo
 * on the home route. Refleja el mock de la portada.
 */
export const HOME_NAV_ITEMS = [
  { href: PUBLIC_ROUTES.HOME, label: 'Inicio' },
  { href: '/#historia', label: 'Cómo funciona' },
  { href: '/#proyecta', label: 'Proyecta tu viaje' },
] as const;

export const HEADER_ROUTES = {
  ENROLLMENT: PUBLIC_ROUTES.SIGNUP,
  HOME: PUBLIC_ROUTES.HOME,
  LOGIN: PUBLIC_ROUTES.LOGIN,
} as const;

export const FOOTER_LINKS = {
  ABOUT: [{ href: PUBLIC_ROUTES.HOME, label: 'Inicio' }],
  LEGAL: [],
  SUPPORT: [],
} as const;

export const FOOTER_LINKS_AUTHENTICATED = {
  ABOUT: [{ href: AUTHENTICATED_ROUTES.DASHBOARD, label: 'Mi Dashboard' }],
  ACCOUNT: [{ href: AUTHENTICATED_ROUTES.PROFILE, label: 'Mi Perfil' }],
  LEGAL: [],
  SUPPORT: [],
} as const;

export const SOCIAL_LINKS = {
  EMAIL: 'mailto:hola@coti.mx',
  FACEBOOK: 'https://facebook.com/coti.mx',
  INSTAGRAM: 'https://instagram.com/coti.mx',
  LINKEDIN: 'https://linkedin.com/company/coti',
  TIKTOK: 'https://tiktok.com/@coti.mx',
  YOUTUBE: 'https://youtube.com/@coti',
} as const;

export const FOOTER_UI_TEXT = {
  BRAND_NAME: 'Coti',
  COPYRIGHT: '© 2026 Coti. Todos los derechos reservados.',
  SECTION_ABOUT: 'Acerca de',
  SECTION_ACCOUNT: 'Mi Cuenta',
  SECTION_LEGAL: 'Legal',
  SECTION_NAVIGATION: 'Navegación',
  SECTION_SUPPORT: 'Soporte',
} as const;
