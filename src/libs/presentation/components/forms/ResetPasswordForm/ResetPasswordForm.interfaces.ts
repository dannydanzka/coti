/**
 * ResetPasswordForm Component Interfaces
 */

import type { z } from 'zod';

import type { resetPasswordValidationSchema } from '@validation';

export type ResetPasswordFormData = z.infer<typeof resetPasswordValidationSchema>;

export interface ResetPasswordFormProps {
  onSubmit: (data: { confirmPassword: string; password: string }) => Promise<void>;
}
