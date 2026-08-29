/**
 * LoginForm Component Interfaces
 *
 * Type definitions for login form component.
 */

import type { z } from 'zod';

import type { loginFormSchema } from './LoginForm.validation';

export type LoginFormData = z.infer<typeof loginFormSchema>;

export interface LoginFormProps {
  hideForgotPassword?: boolean;
  hideHeader?: boolean;
  /** Returns error message if login fails, undefined if successful */
  onSubmit: (data: LoginFormData) => Promise<string | undefined>;
  /**
   * Target of the "create account" link. Defaults to '/signup'; pass a value to
   * forward the post-auth redirect so the origin context (por ejemplo, una campaña) survives.
   */
  signupHref?: string;
}
