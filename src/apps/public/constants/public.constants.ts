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

export const PARTICIPANTS_ERROR_MESSAGES = {
  FETCH_ERROR: 'Error al cargar participantes',
  REFRESH_ERROR: 'Error al actualizar participantes',
} as const;

export const SIGNUP_SUCCESS_BG_COLOR = brandColor.signupSuccessBg;
