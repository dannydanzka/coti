/**
 * API Constants
 *
 * Constants related to API configuration and endpoints.
 */

export const API_CONFIG = {
  BASE_URL: process.env['NEXT_PUBLIC_API_URL'] || '/api',
  RETRY_ATTEMPTS: 3,
  TIMEOUT: 30000,
  VERSION: 'v1',
} as const;

export const API_ENDPOINTS = {
  ADMIN: {
    USERS: {
      CREATE: '/admin/users',
      DELETE: '/admin/users/{id}',
      GET_ALL: '/admin/users',
      GET_BY_ID: '/admin/users/{id}',
      UPDATE: '/admin/users/{id}',
    },
  },
  API_BASE: {
    ENDPOINTS: {
      ADMIN: {
        USERS: '/api/admin/users',
      },
      AUTH: {
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        ME: '/api/auth/me',
      },
    },
  },
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  HEALTH: '/health',
} as const;
