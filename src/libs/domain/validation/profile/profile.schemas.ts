/**
 * Profile Validation Schemas
 *
 * Shared Zod schemas for profile-related operations.
 * Used by both API routes and frontend forms.
 */

import { z } from 'zod';

export const updateProfileBodySchema = z.object({
  age: z.number().int().min(1).max(120).optional(),
  bio: z.string().max(200, 'La biografía no puede exceder 200 caracteres').optional(),
  city: z.string().max(100),
  country: z.string().max(100).optional(),
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .trim()
    .optional(),
  lastName: z
    .string()
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(50, 'Los apellidos no pueden exceder 50 caracteres')
    .trim()
    .optional(),
  neighborhood: z.string().max(100).optional(),
  number: z.string().max(20),
  phone: z.string().max(20, 'El teléfono no puede exceder 20 caracteres').optional(),
  photoUrl: z.string().max(500).optional(),
  state: z.string().max(100),
  street: z.string().max(150),
  zipCode: z.string().max(10),
});
