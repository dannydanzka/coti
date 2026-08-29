/**
 * Authentication Validation Schemas
 *
 * Zod validation schemas for authentication-related forms.
 * Used with React Hook Form for consistent validation.
 */

import { z } from 'zod';

export const loginValidationSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .email('El formato del correo electrónico no es válido')
    .trim(),
  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const changePasswordValidationSchema = z
  .object({
    confirmPassword: z.string({ required_error: 'Confirma la nueva contraseña' }),
    currentPassword: z.string({ required_error: 'La contraseña actual es obligatoria' }),
    newPassword: z
      .string({ required_error: 'La nueva contraseña es obligatoria' })
      .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una minúscula, una mayúscula y un número'
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword'],
  });

export const forgotPasswordValidationSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .email('El formato del correo electrónico no es válido')
    .trim(),
});

export const resetPasswordValidationSchema = z
  .object({
    confirmPassword: z.string({ required_error: 'Confirma la nueva contraseña' }),
    password: z
      .string({ required_error: 'La nueva contraseña es obligatoria' })
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una minúscula, una mayúscula y un número'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword'],
  });

const passwordSchema = z
  .string({ required_error: 'La contraseña es obligatoria' })
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
  .regex(/\d/, 'La contraseña debe contener al menos un número')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial');

export const registerValidationSchema = z
  .object({
    confirmEmail: z
      .string({ required_error: 'Confirma el correo electrónico' })
      .email('El formato del correo electrónico no es válido')
      .trim(),
    confirmPassword: z.string({ required_error: 'Confirma la contraseña' }),
    email: z
      .string({ required_error: 'El correo electrónico es obligatorio' })
      .email('El formato del correo electrónico no es válido')
      .trim(),
    firstName: z
      .string({ required_error: 'El nombre es obligatorio' })
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .trim(),
    lastName: z
      .string({ required_error: 'Los apellidos son obligatorios' })
      .min(2, 'Los apellidos deben tener al menos 2 caracteres')
      .trim(),
    password: passwordSchema,
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'Los correos electrónicos no coinciden',
    path: ['confirmEmail'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

/**
 * API-side schemas (server validation — no confirmEmail/confirmPassword fields)
 */
export const signupBodySchema = z.object({
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
  lastName: z
    .string({ required_error: 'Los apellidos son obligatorios' })
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(50, 'Los apellidos no pueden exceder 50 caracteres')
    .trim(),
  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'La contraseña no puede exceder 128 caracteres'),
});

export const loginBodySchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .email('El formato del correo electrónico no es válido')
    .trim(),
  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(1, 'La contraseña es obligatoria'),
});

export const resetPasswordBodySchema = z.object({
  confirmPassword: z.string({ required_error: 'Confirma la nueva contraseña' }),
  newPassword: z
    .string({ required_error: 'La nueva contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'La contraseña no puede exceder 128 caracteres'),
  token: z.string({ required_error: 'El token es obligatorio' }).min(1, 'Token inválido'),
});

export const shippingAddressValidationSchema = z.object({
  city: z
    .string({ required_error: 'La colonia es obligatoria' })
    .min(2, 'La colonia debe tener al menos 2 caracteres')
    .trim(),
  exteriorNumber: z
    .string({ required_error: 'El número exterior es obligatorio' })
    .min(1, 'El número exterior es obligatorio')
    .trim(),
  interiorNumber: z.string().trim().optional(),
  postalCode: z
    .string({ required_error: 'El código postal es obligatorio' })
    .regex(/^\d{5}$/, 'El código postal debe tener 5 dígitos'),
  references: z.string().trim().optional(),
  state: z
    .string({ required_error: 'El estado es obligatorio' })
    .min(2, 'El estado debe tener al menos 2 caracteres')
    .trim(),
  street: z
    .string({ required_error: 'La calle es obligatoria' })
    .min(3, 'La calle debe tener al menos 3 caracteres')
    .trim(),
});
