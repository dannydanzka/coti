/**
 * InjectAuthorizationHeader Component Interfaces
 *
 * Interfaces specific to the injectAuthorizationHeader helper component.
 * Currently uses primitive types, but defined for consistency and future expansion.
 */

export interface AuthorizationConfig {
  tokenKey?: string;
  headerFormat?: 'Bearer' | 'Token' | string;
}
