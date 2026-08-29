/**
 * List Destinos Use Case Interfaces
 */

import type { DestinoEntity } from '@interfaces';
import type { UseCaseErrorResponse } from '@use-case-error';

export interface ListDestinosResponse {
  data: { destinos: DestinoEntity[] };
  success: true;
}

export type ListDestinosErrorResponse = UseCaseErrorResponse;
