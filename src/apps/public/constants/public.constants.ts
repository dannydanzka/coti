/**
 * Public Page Constants
 *
 * Text constants and configuration for public page content.
 * Routes and navigation for DearAdry public pages.
 */

import { brandColor } from '@constants';

export const PUBLIC_ROUTES = {
  ABOUT: '/nosotros',
  BOOKS: '/libros',
  CONTACT: '/contact',
  COOKIES: '/cookies',
  ENROLLMENT: '/enrollment',
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
  BOOKS: '/dashboard/books',
  DASHBOARD: '/dashboard',
  EVENTS: '/dashboard/events',
  ORDERS: '/dashboard/orders',
  PAYMENTS: '/dashboard/payments',
  PROFILE: '/dashboard/profile',
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
  ],
  ACCOUNT: [
    { href: AUTHENTICATED_ROUTES.PROFILE, label: 'Mi Perfil' },
    { href: AUTHENTICATED_ROUTES.PAYMENTS, label: 'Mis Pagos' },
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

export const PARTICIPANTS_ERROR_MESSAGES = {
  FETCH_ERROR: 'Error al cargar participantes',
  REFRESH_ERROR: 'Error al actualizar participantes',
} as const;

export const SIGNUP_SUCCESS_BG_COLOR = brandColor.signupSuccessBg;
