/**
 * Application Constants
 *
 * Core application configuration and metadata constants.
 * Configuration values are loaded from environment variables with fallbacks.
 *
 */

export const COUNTRIES = [
  'México',
  'Argentina',
  'Colombia',
  'España',
  'Chile',
  'Perú',
  'Venezuela',
  'Ecuador',
  'Bolivia',
  'Uruguay',
  'Paraguay',
  'Costa Rica',
  'Panamá',
  'República Dominicana',
  'Puerto Rico',
  'Estados Unidos',
] as const;

export const RESERVED_SLUGS = ['public', 'admin', 'api', 'events', 'auth', 'signup', 'challenges'];

/**
 */
export const ROUTES = {
  ADMIN: {
    DASHBOARD: '/admin',
    ROOT: '/admin',
    USERS: '/admin/users',
  },
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  PUBLIC: {
    DASHBOARD: '/dashboard',
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
} as const;

/**
 * Feature Flags
 *
 * BOOKS: When true, exposes the participant Books module (catalog + reader + checkout).
 * LETTERS: When true, exposes the participant Letters module (compose + history).
 */
export const FEATURE_FLAGS = {
  BOOKS: process.env['NEXT_PUBLIC_FEATURE_BOOKS'] === 'true',
  LETTERS: process.env['NEXT_PUBLIC_FEATURE_LETTERS'] === 'true',
} as const;

/**
 * Bypass account for features behind a flag.
 */
export const DEV_USER_EMAIL = 'dev@coti.mx';

export const APP_METADATA = {
  DESCRIPTION:
    'Proyecta cuánto necesitas ahorrar para tu próximo viaje y dale seguimiento a tu avance en la cajita de ahorro',
  PROFILE_EDIT_TITLE: 'Editar Perfil - Coti',
  TITLE: 'Coti — Proyecta tu viaje. Ahorra con Coti.',
} as const;
