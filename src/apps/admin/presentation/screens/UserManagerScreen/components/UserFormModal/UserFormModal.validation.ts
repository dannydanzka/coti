/**
 * UserFormModal Zod Validation Schemas
 */

import { z } from 'zod';

import { FIELD_LIMITS } from '@constants';

export const createUserSchema = z
  .object({
    confirmPassword: z.string().min(1, 'Confirma la contraseña'),
    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('Email no válido')
      .max(FIELD_LIMITS.EMAIL, `Máximo ${FIELD_LIMITS.EMAIL} caracteres`),
    firstName: z
      .string()
      .min(1, 'El nombre es requerido')
      .max(FIELD_LIMITS.FIRST_NAME, `Máximo ${FIELD_LIMITS.FIRST_NAME} caracteres`),
    lastName: z
      .string()
      .min(1, 'El apellido es requerido')
      .max(FIELD_LIMITS.LAST_NAME, `Máximo ${FIELD_LIMITS.LAST_NAME} caracteres`),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .max(FIELD_LIMITS.PASSWORD_MAX, `Máximo ${FIELD_LIMITS.PASSWORD_MAX} caracteres`),
    role: z.enum(['admin', 'participant']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const editUserSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email no válido')
    .max(FIELD_LIMITS.EMAIL, `Máximo ${FIELD_LIMITS.EMAIL} caracteres`),
  firstName: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(FIELD_LIMITS.FIRST_NAME, `Máximo ${FIELD_LIMITS.FIRST_NAME} caracteres`),
  lastName: z
    .string()
    .min(1, 'El apellido es requerido')
    .max(FIELD_LIMITS.LAST_NAME, `Máximo ${FIELD_LIMITS.LAST_NAME} caracteres`),
  role: z.enum(['admin', 'participant']),
});
