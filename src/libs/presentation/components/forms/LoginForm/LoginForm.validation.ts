/**
 * LoginForm Zod Validation Schema
 */

import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'auth.validation.emailRequired')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'auth.validation.emailInvalid'),
  password: z
    .string()
    .min(1, 'auth.validation.passwordRequired')
    .min(8, 'auth.validation.passwordMinLength'),
});
