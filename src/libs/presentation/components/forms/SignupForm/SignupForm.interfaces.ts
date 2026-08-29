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
  onSubmit: (data: SignupFormData) => Promise<void>;
}
