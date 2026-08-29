/**
 * Travel Slice Interfaces
 */

import type { CajitaApiData, SerializedCajita } from '@services';

export interface TravelState {
  /** Null both before the first load and when the user has no plan yet. */
  cajita: SerializedCajita | null;
  /** Id of an unfinished wizard draft, so the screen can offer to resume it. */
  borradorId: string | null;
  /** Distinguishes "not loaded yet" from "loaded and empty". */
  cargada: boolean;
  lastUpdated: string | null;
}

export type CajitaPayload = CajitaApiData;
