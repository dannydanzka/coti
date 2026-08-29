/**
 * Middleware Constants
 */

export const PUBLIC_AUTH_ROUTES = ['/', '/login', '/admin/login'] as const;
export const PUBLIC_PAGES = [
  '/nosotros',
  '/como-funciona',
  '/contact',
  '/preguntas-frecuentes',
  '/privacy',
  '/cookies',
  '/galeria',
  '/registro-exitoso',
] as const;
export const AUTH_PAGES = ['/login', '/admin/login'] as const;
export const ADMIN_ROLES = ['owner', 'admin'];
