/**
 * useAuthDispatch Hook Interfaces
 *
 * Type definitions for authentication dispatch operations.
 */

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
