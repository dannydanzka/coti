/**
 * List Destinos Use Case
 *
 * Catálogo curado completo: 18 destinos con temporadas y atracciones. Es lo
 * que alimenta los pasos 1 y 3 del wizard.
 */

import { destinoRepository } from '@repositories';
import { handleUseCaseError } from '@use-case-error';

import type { ListDestinosErrorResponse, ListDestinosResponse } from './list-destinos.interfaces';

export const executeListDestinos = async (): Promise<
  ListDestinosErrorResponse | ListDestinosResponse
> => {
  try {
    const destinos = await destinoRepository.findAll();
    return { data: { destinos }, success: true };
  } catch (error) {
    return handleUseCaseError<ListDestinosErrorResponse>(error, 'executeListDestinos');
  }
};
