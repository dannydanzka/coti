/**
 * Public Page Constants
 *
 * Text constants and configuration for public page content.
 * Routes and navigation for Coti public pages.
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
  FACEBOOK: 'https://facebook.com/dear.adry',
  INSTAGRAM: 'https://instagram.com/dear.adry',
  LINKEDIN: 'https://linkedin.com/company/dear.adry',
  TIKTOK: 'https://tiktok.com/@dear.adry',
  YOUTUBE: 'https://youtube.com/@dear.adry',
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

export const PARTICIPANTS_ERROR_MESSAGES = {
  FETCH_ERROR: 'Error al cargar participantes',
  REFRESH_ERROR: 'Error al actualizar participantes',
} as const;

export const SIGNUP_SUCCESS_BG_COLOR = brandColor.signupSuccessBg;
