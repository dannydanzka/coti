/**
 * Auth Service
 *
 * Data access layer for authentication operations following Clean Architecture.
 * Handles all auth-related API calls. Data transformations handled by callers.
 *
 */

import { apiConfig } from '@config';
import type { AuthApiResponse, AuthCredentials, AuthUserApiData, LoginApiData } from '@interfaces';
import { handleRequest } from '@helpers';

export const AuthService = {
  /**
   * Login user
   * Returns raw API data - transformation handled by caller
   */
  async login(credentials: AuthCredentials): Promise<LoginApiData> {
    const response = await handleRequest({
      body: credentials as unknown as Record<string, unknown>,
      customDefaultErrorMessage: 'Error al iniciar sesión',
      endpoint: apiConfig.API_BASE.ENDPOINTS.AUTH.LOGIN,
      method: 'POST',
      timeout: 10000,
    });

    const typedResponse = response as AuthApiResponse<LoginApiData> & { error?: string };
    if (!typedResponse.success || !typedResponse.data) {
      throw new Error(typedResponse.error || 'Error al iniciar sesión');
    }

    return typedResponse.data;
  },
  async logout(): Promise<void> {
    const response = await handleRequest({
      customDefaultErrorMessage: 'Error al cerrar sesión',
      endpoint: apiConfig.API_BASE.ENDPOINTS.AUTH.LOGOUT,
      method: 'POST',
      timeout: 5000,
    });

    const typedResponse = response as AuthApiResponse;
    if (!typedResponse.success) {
      throw new Error(typedResponse.error ?? 'No se pudo cerrar la sesión');
    }
  },
  async me(): Promise<AuthUserApiData> {
    const response = await handleRequest({
      customDefaultErrorMessage: 'Error al obtener información del usuario',
      endpoint: apiConfig.API_BASE.ENDPOINTS.AUTH.ME,
      method: 'GET',
      timeout: 8000,
    });

    const typedResponse = response as AuthApiResponse<AuthUserApiData>;
    if (!typedResponse.success || !typedResponse.data) {
      throw new Error(typedResponse.error ?? 'Usuario no encontrado');
    }

    return typedResponse.data;
  },
  async requestPasswordReset(email: string): Promise<void> {
    const response = await handleRequest({
      body: { email },
      endpoint: apiConfig.API_BASE.ENDPOINTS.AUTH.REQUEST_PASSWORD_RESET,
      method: 'POST',
    });

    const typedResponse = response as { error?: string; success: boolean };
    if (!typedResponse.success) {
      throw new Error(typedResponse.error);
    }
  },
  async resetPassword(data: {
    confirmPassword: string;
    newPassword: string;
    token: string;
  }): Promise<void> {
    const response = await handleRequest({
      body: data,
      endpoint: apiConfig.API_BASE.ENDPOINTS.AUTH.RESET_PASSWORD,
      method: 'POST',
    });

    const typedResponse = response as { error?: string; success: boolean };
    if (!typedResponse.success) {
      throw new Error(typedResponse.error);
    }
  },
};
