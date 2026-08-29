/**
 * Signup Service
 *
 * Data access layer for signup operations following Clean Architecture.
 * Coti: Challenge & Events vertical
 *
 * @pattern Service Layer - handleRequest wrapper
 */

import type { ApiResponse } from '@domain-types';
import { handleRequest } from '@helpers';

import type { SignupData, SignupResponse } from './signup.service.interfaces';

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
};
