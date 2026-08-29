/**
 * Authorization Helper Interfaces
 *
 *
 * Type definitions for authorization helpers.
 */

/**
 * Result type for successful authorization
 */
export interface AuthSuccess {
  success: true;
  user: {
    id: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

/**
 * Result type for failed authorization
 */
export interface AuthFailure<T> {
  success: false;
  error: T;
}

/**
 * Union type for authorization result
 */
export type AuthResult<T> = AuthSuccess | AuthFailure<T>;
