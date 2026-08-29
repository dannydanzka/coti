/**
 * AuthProvider Constants
 *
 * Configuration for JWT authentication management.
 */

export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_COOKIE_NAME = 'auth-token';
/** Cookie max age: 7 days in seconds */
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
/** JWT structure: header.payload.signature */
export const JWT_PARTS_COUNT = 3;
