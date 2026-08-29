/**
 * Middleware Constants
 */

export const PUBLIC_AUTH_ROUTES = ['/', '/login'] as const;
export const PUBLIC_PAGES = ['/signup', '/forgot-password', '/reset-password'] as const;
export const AUTH_PAGES = ['/login'] as const;
export const ADMIN_ROLES = ['owner', 'admin'];
