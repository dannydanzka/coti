/**
 * SignupForm Component Interfaces
 *
 * Type definitions for signup form component.
 */

export interface SignupFormData {
  email: string;
  emailConfirm: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

export interface SignupFormProps {
  /** Oculta título y subtítulo cuando la pantalla ya los pinta afuera de la tarjeta. */
  hideHeader?: boolean;
  onSubmit: (data: SignupFormData) => Promise<void>;
}
