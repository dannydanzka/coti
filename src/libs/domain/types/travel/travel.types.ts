/**
 * Travel Domain Types
 *
 * Simple unions for the trip planning domain context.
 * Following DOMAIN-OBJECTS-STANDARDS: Types = Simple Values (Primitives)
 *
 * These mirror the Prisma enums verbatim (uppercase), unlike UserRole which is
 * lowercased for the UI. Keeping them identical avoids a mapper layer and matches
 * the unions already declared in the projection module.
 */

/** @prisma enum EstadoViaje */
export type TripStatus = 'BORRADOR' | 'AHORRANDO' | 'COMPLETADO';

/** @prisma enum Prioridad */
export type Prioridad = 'MUST_GO' | 'WOULD_BE_NICE';

/** @prisma enum Temporada */
export type TemporadaNivel = 'BAJA' | 'MEDIA' | 'ALTA';

/** Wizard steps, in order. Step 8 is the savings box, which lives at /dashboard. */
export type WizardStep =
  'define' | 'style' | 'attractions' | 'projection' | 'plan' | 'start' | 'activate';
