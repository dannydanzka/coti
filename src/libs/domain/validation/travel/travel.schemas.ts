/**
 * Travel Validation Schemas
 *
 * Zod schemas for the trip planning domain, shared by API routes and forms.
 *
 * Convention (same as auth): `*BodySchema` validates an API payload,
 * `*ValidationSchema` backs a react-hook-form. Messages are i18n keys so the
 * form can translate them; the API falls back to them as plain text.
 */

import { z } from 'zod';

/** A contribution has to fit in an Int column and be a real amount of pesos. */
const MONTO_MAXIMO = 10_000_000;
const NOTA_MAX_LENGTH = 200;

export const registrarAporteBodySchema = z.object({
  monto: z
    .number({
      invalid_type_error: 'travel.validation.montoInvalido',
      required_error: 'travel.validation.montoRequerido',
    })
    .int('travel.validation.montoEntero')
    .positive('travel.validation.montoPositivo')
    .max(MONTO_MAXIMO, 'travel.validation.montoMaximo'),
  nota: z
    .string()
    .trim()
    .max(NOTA_MAX_LENGTH, 'travel.validation.notaMaxima')
    .optional()
    .nullable(),
});

export const registrarAporteValidationSchema = z.object({
  monto: z
    .string()
    .trim()
    .min(1, 'travel.validation.montoRequerido')
    .regex(/^\d+$/, 'travel.validation.montoEntero')
    .refine((valor) => Number(valor) > 0, 'travel.validation.montoPositivo')
    .refine((valor) => Number(valor) <= MONTO_MAXIMO, 'travel.validation.montoMaximo'),
  nota: z.string().trim().max(NOTA_MAX_LENGTH, 'travel.validation.notaMaxima').optional(),
});
