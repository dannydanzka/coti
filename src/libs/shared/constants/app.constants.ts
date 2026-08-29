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

/**
 * Brand assets served from `public/brand/`.
 * Source of truth: `assets/branding/` (see `public/brand/README.md`).
 */
export const BRAND_ASSETS = {
  APP_ICON: '/brand/app-icon.png',
  HERO: '/brand/hero-atardecer.jpg',
  LOGO: '/brand/logo.png',
  LOGO_HORIZONTAL: '/brand/logo-horizontal.png',
  MASCOT: '/brand/mascot.png',
  SCENES: {
    AHORRAR: '/brand/scenes/ahorrar.jpg',
    CAJITA: '/brand/scenes/cajita.png',
    LLEGAR: '/brand/scenes/llegar.jpg',
    PIRAMIDE: '/brand/scenes/piramide.png',
    PUEBLO: '/brand/scenes/pueblo.png',
    SONAR: '/brand/scenes/sonar.jpg',
  },
} as const;

export const BRAND_UI_TEXT = {
  LOGO_ALT: 'Coti',
  MASCOT_ALT: 'Coti, el coatí viajero, leyendo un mapa',
  TAGLINE: 'Proyecta tu viaje. Ahorra con Coti.',
} as const;
