/**
 * Signup Service
 *
 * Data access layer for signup operations following Clean Architecture.
 * DearAdry: Challenge & Events vertical
 *
 * @pattern Service Layer - handleRequest wrapper
 */

import type { ApiResponse } from '@domain-types';
import { handleRequest } from '@helpers';

import type {
  ResendVerificationData,
  SignupData,
  SignupResponse,
} from './signup.service.interfaces';

export const SignupService = {
  /**
   * Register new participant account
   */
  async register(data: SignupData): Promise<ApiResponse<SignupResponse>> {
    return (await handleRequest({
      body: data,
      endpoint: '/api/auth/signup',
      method: 'POST',
      timeout: 15000,
    })) as ApiResponse<SignupResponse>;
  },
  async resendVerification(
    data: ResendVerificationData
  ): Promise<ApiResponse<{ message: string }>> {
    return (await handleRequest({
      body: data,
      customDefaultErrorMessage: 'Error al reenviar el email de verificación',
      endpoint: '/api/auth/resend-verification',
      method: 'POST',
      timeout: 10000,
    })) as ApiResponse<{ message: string }>;
  },
};
