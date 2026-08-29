/**
 * Auth Validation Schema Types
 *
 * Type definitions inferred from Zod schemas.
 */

import type { z } from 'zod';

import type { registerValidationSchema, shippingAddressValidationSchema } from './auth.schemas';

export type RegisterFormData = z.infer<typeof registerValidationSchema>;
export type ShippingAddressFormData = z.infer<typeof shippingAddressValidationSchema>;
