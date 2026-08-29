/**
 * Auth Domain Types
 *
 * Simple types and unions for authentication domain context.
 * Following DOMAIN-OBJECTS-STANDARDS: Types = Simple Values (Primitives)
 *
 */

export type AuthProvider = 'local' | 'google' | 'facebook' | 'github';
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error' | 'expired';
export type AuthTokenType = 'access' | 'refresh' | 'reset_password' | 'verify_email';
export type AuthSessionStatus = 'active' | 'expired' | 'revoked' | 'invalid';
