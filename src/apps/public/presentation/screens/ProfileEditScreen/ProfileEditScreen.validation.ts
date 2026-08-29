/**
 * ProfileEditScreen Zod Validation Schema
 */

import { z } from 'zod';

import { FIELD_LIMITS } from '@constants';

export const profileEditFormSchema = z.object({
  age: z.number().min(1).max(120).optional(),
  bio: z.string().max(FIELD_LIMITS.BIO, `Máximo ${FIELD_LIMITS.BIO} caracteres`),
  city: z.string().max(FIELD_LIMITS.CITY, `Máximo ${FIELD_LIMITS.CITY} caracteres`),
  country: z.string(),
  firstName: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(FIELD_LIMITS.FIRST_NAME, `Máximo ${FIELD_LIMITS.FIRST_NAME} caracteres`),
  lastName: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .max(FIELD_LIMITS.LAST_NAME, `Máximo ${FIELD_LIMITS.LAST_NAME} caracteres`),
  neighborhood: z
    .string()
    .max(FIELD_LIMITS.NEIGHBORHOOD, `Máximo ${FIELD_LIMITS.NEIGHBORHOOD} caracteres`),
  number: z.string().max(FIELD_LIMITS.NUMBER, `Máximo ${FIELD_LIMITS.NUMBER} caracteres`),
  phone: z.string().max(FIELD_LIMITS.PHONE, `Máximo ${FIELD_LIMITS.PHONE} caracteres`),
  state: z.string().max(FIELD_LIMITS.STATE, `Máximo ${FIELD_LIMITS.STATE} caracteres`),
  street: z.string().max(FIELD_LIMITS.STREET, `Máximo ${FIELD_LIMITS.STREET} caracteres`),
  zipCode: z.string().max(FIELD_LIMITS.ZIP_CODE, `Máximo ${FIELD_LIMITS.ZIP_CODE} caracteres`),
});
