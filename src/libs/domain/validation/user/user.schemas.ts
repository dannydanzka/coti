/**
 * User Management Validation Schemas
 *
 * Zod validation schemas for user-related forms.
 * Used with React Hook Form for consistent validation.
 */

import { z } from 'zod';

export const createUserValidationSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .email('El formato del correo electrónico no es válido')
    .max(255, 'El correo no puede exceder 255 caracteres')
    .trim(),
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'La contraseña no puede exceder 128 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una minúscula, una mayúscula y un número'
    ),
  role: z.enum(['owner', 'admin', 'participant'], {
    invalid_type_error: 'Rol inválido',
    required_error: 'El rol es obligatorio',
  }),
});

export const updateUserValidationSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .email('El formato del correo electrónico no es válido')
    .max(255, 'El correo no puede exceder 255 caracteres')
    .trim(),
  isActive: z.boolean({ required_error: 'El estado es obligatorio' }),
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  role: z.enum(['owner', 'admin', 'participant'], {
    invalid_type_error: 'Rol inválido',
    required_error: 'El rol es obligatorio',
  }),
});

/**
 * API-side schemas (server validation — firstName/lastName separate)
 */
export const createUserBodySchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .email('El formato del correo electrónico no es válido')
    .max(255, 'El correo no puede exceder 255 caracteres')
    .trim(),
  firstName: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .trim(),
  isActive: z.boolean().optional().default(true),
  lastName: z
    .string({ required_error: 'Los apellidos son obligatorios' })
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(50, 'Los apellidos no pueden exceder 50 caracteres')
    .trim(),
  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'La contraseña no puede exceder 128 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una minúscula, una mayúscula y un número'
    ),
  phone: z.string().max(20).optional(),
  role: z.enum(['owner', 'admin', 'participant'], {
    invalid_type_error: 'Rol inválido',
    required_error: 'El rol es obligatorio',
  }),
});

export const updateUserPasswordValidationSchema = z
  .object({
    confirmPassword: z.string({ required_error: 'Confirma la nueva contraseña' }),
    currentPassword: z.string({ required_error: 'La contraseña actual es obligatoria' }),
    newPassword: z
      .string({ required_error: 'La nueva contraseña es obligatoria' })
      .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
      .max(128, 'La contraseña no puede exceder 128 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una minúscula, una mayúscula y un número'
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword'],
  });
