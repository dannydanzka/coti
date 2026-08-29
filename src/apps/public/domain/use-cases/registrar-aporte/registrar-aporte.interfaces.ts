/**
 * Registrar Aporte Use Case Interfaces
 */

import type { NextRequest } from 'next/server';

import type { RegistroDeAhorroEntity } from '@entities';
import type { UseCaseErrorResponse } from '@use-case-error';

export interface RegistrarAporteParams {
  request: NextRequest;
  userId: string;
  monto: number;
  nota?: string | null;
}

export interface RegistrarAporteSuccessResponse {
  data: { registro: RegistroDeAhorroEntity };
  message: string;
  success: true;
}

export type RegistrarAporteErrorResponse = UseCaseErrorResponse;

export type RegistrarAporteResponse = RegistrarAporteSuccessResponse | RegistrarAporteErrorResponse;
