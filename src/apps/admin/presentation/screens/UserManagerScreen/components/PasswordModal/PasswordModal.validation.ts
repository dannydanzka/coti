/**
 * PasswordModal Zod Validation Schema
 */

import { z } from 'zod';

import { FIELD_LIMITS } from '@constants';

export const changePasswordSchema = z
  .object({
    confirmPassword: z.string().min(1, 'Confirma la contraseña'),
    newPassword: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .max(FIELD_LIMITS.PASSWORD_MAX, `Máximo ${FIELD_LIMITS.PASSWORD_MAX} caracteres`),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
