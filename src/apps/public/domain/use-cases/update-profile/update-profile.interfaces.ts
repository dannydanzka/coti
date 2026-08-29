/**
 * Update Profile Use Case Interfaces
 */

import type { UseCaseErrorResponse } from '@use-case-error';

/**
 * La forma de error del caso de uso es la estándar; el alias existe para que
 * los helpers de `@use-case-error` se instancien con un nombre propio del caso
 * de uso, igual que en el resto del dominio.
 */
export type UpdateProfileErrorResponse = UseCaseErrorResponse;
