/**
 * Travel Validation Schemas
 *
 * Zod compartido entre las rutas API y el wizard de planeación.
 */

import { z } from 'zod';

const estiloNivelSchema = z.enum(['ECONOMICO', 'MEDIO', 'COMODO']);
const ritmoSchema = z.enum(['RELAJADO', 'MEDIO', 'INTENSO']);
const frecuenciaSchema = z.enum(['SEMANAL', 'QUINCENAL', 'MENSUAL', 'TRIMESTRAL']);
const prioridadSchema = z.enum(['MUST_GO', 'WOULD_BE_NICE']);

export const createViajeBodySchema = z.object({
  aportacion: z.number().int().min(1).max(1_000_000),
  atracciones: z
    .array(z.object({ atraccionId: z.string().min(1), prioridad: prioridadSchema }))
    .max(50),
  destinoId: z.string().min(1),
  estiloAlojamiento: estiloNivelSchema,
  estiloComida: estiloNivelSchema,
  fechaSalida: z.string().datetime({ message: 'La fecha de salida debe ser ISO 8601' }),
  frecuencia: frecuenciaSchema,
  meta: z.number().int().min(1).max(10_000_000),
  montoInicial: z.number().int().min(0).max(10_000_000),
  noches: z.number().int().min(1).max(90),
  personas: z.number().int().min(1).max(10),
  recordatorios: z.boolean(),
  ritmo: ritmoSchema,
});

export const registrarAporteBodySchema = z.object({
  monto: z.number().int().min(1, 'El aporte debe ser mayor a cero').max(10_000_000),
  nota: z.string().max(120).optional(),
});
