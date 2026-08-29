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
  EVENTS: '/dashboard/events',
  ORDERS: '/dashboard/orders',
  PAYMENTS: '/dashboard/payments',
  PROFILE: '/dashboard/profile',
} as const;

export const NAVBAR_UI_TEXT = {
  CTA_DASHBOARD: 'Mi cuenta',
  CTA_ENROLL: 'Inscripciones',
  CTA_MEMBERS: 'Miembros',
  CTA_RESERVE: 'Apartar mi ejemplar',
  LOGO_TEXT: 'DEAR ADRY',
  MOBILE_MENU_TOGGLE: 'Toggle navigation menu',
  SEARCH_BUTTON_LABEL: 'Buscar',
  SEARCH_PLACEHOLDER: 'Buscar...',
} as const;

/** Anchor to the active meet's packages section on the home landing (id="paquetes"). */
export const MANGO_PACKAGES_ANCHOR = `${PUBLIC_ROUTES.HOME}#paquetes`;

/**
 * Home-only header navigation (Mango meet landing). Other public pages keep the
 * minimal Rally header (Inscripciones / Miembros); this richer nav renders only
 * on the home route. Mirrors the Mango landing mock.
 */
export const HOME_NAV_ITEMS = [
  { href: PUBLIC_ROUTES.HOME, label: 'Inicio' },
  { href: MANGO_PACKAGES_ANCHOR, label: 'Mango' },
  { href: PUBLIC_ROUTES.BOOKS, label: 'Libros' },
  { href: PUBLIC_ROUTES.RALLY, label: 'Rally' },
  { href: PUBLIC_ROUTES.ABOUT, label: 'Sobre Dear Adry' },
  { href: PUBLIC_ROUTES.CONTACT, label: 'Contacto' },
] as const;

export const HEADER_ROUTES = {
  ENROLLMENT: PUBLIC_ROUTES.SIGNUP,
  HOME: PUBLIC_ROUTES.HOME,
  LOGIN: PUBLIC_ROUTES.LOGIN,
} as const;

export const FOOTER_LINKS = {
  ABOUT: [
    { href: PUBLIC_ROUTES.HOME, label: 'Inicio' },
    { href: PUBLIC_ROUTES.BOOKS, label: 'Libros' },
    { href: PUBLIC_ROUTES.RALLY, label: 'Rally' },
    { href: PUBLIC_ROUTES.ABOUT, label: 'Sobre Dear Adry' },
    { href: PUBLIC_ROUTES.GALLERY, label: 'Galería' },
    { href: PUBLIC_ROUTES.SPONSORS, label: 'Nuestros Aliados' },
  ],
  LEGAL: [
    { href: PUBLIC_ROUTES.TERMS, label: 'Términos y Condiciones' },
    { href: PUBLIC_ROUTES.PRIVACY, label: 'Aviso de Privacidad' },
    { href: PUBLIC_ROUTES.COOKIES, label: 'Política de Cookies' },
  ],
  SUPPORT: [
    { href: PUBLIC_ROUTES.CONTACT, label: 'Contacto' },
    { href: PUBLIC_ROUTES.FAQ, label: 'Preguntas Frecuentes' },
  ],
} as const;

export const FOOTER_LINKS_AUTHENTICATED = {
  ABOUT: [
    { href: AUTHENTICATED_ROUTES.DASHBOARD, label: 'Mi Dashboard' },
    { href: AUTHENTICATED_ROUTES.EVENTS, label: 'Mis Eventos' },
    { href: PUBLIC_ROUTES.SPONSORS, label: 'Nuestros Aliados' },
  ],
  ACCOUNT: [
    { href: AUTHENTICATED_ROUTES.PROFILE, label: 'Mi Perfil' },
    { href: AUTHENTICATED_ROUTES.ORDERS, label: 'Mis Reuniones' },
    { href: AUTHENTICATED_ROUTES.PAYMENTS, label: 'Mis Pagos' },
  ],
  LEGAL: [
    { href: PUBLIC_ROUTES.TERMS, label: 'Términos y Condiciones' },
    { href: PUBLIC_ROUTES.PRIVACY, label: 'Aviso de Privacidad' },
    { href: PUBLIC_ROUTES.COOKIES, label: 'Política de Cookies' },
  ],
  SUPPORT: [
    { href: PUBLIC_ROUTES.CONTACT, label: 'Contacto' },
    { href: PUBLIC_ROUTES.FAQ, label: 'Preguntas Frecuentes' },
  ],
} as const;

export const SOCIAL_LINKS = {
  EMAIL: 'mailto:dearadry@gmail.com',
  FACEBOOK: 'https://facebook.com/dear.adry',
  INSTAGRAM: 'https://instagram.com/dear.adry',
  LINKEDIN: 'https://linkedin.com/company/dear.adry',
  TIKTOK: 'https://tiktok.com/@dear.adry',
  YOUTUBE: 'https://youtube.com/@dear.adry',
} as const;

export const FOOTER_UI_TEXT = {
  BRAND_NAME: 'DearAdry',
  COPYRIGHT: '© 2026 DearAdry. Todos los derechos reservados.',
  SECTION_ABOUT: 'Acerca de',
  SECTION_ACCOUNT: 'Mi Cuenta',
  SECTION_LEGAL: 'Legal',
  SECTION_NAVIGATION: 'Navegación',
  SECTION_SUPPORT: 'Soporte',
} as const;
