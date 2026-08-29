/**
 * ForgotPasswordForm Component Interfaces
 */

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
}
