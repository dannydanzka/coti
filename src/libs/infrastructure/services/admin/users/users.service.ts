/**
 * Users Service (Admin Context)
 *
 * Data access layer for user operations following Clean Architecture.
 * Handles all user-related API calls. Data transformations handled by callers.
 *
 */

import { apiConfig } from '@config';
import type { ApiResponse } from '@domain-types';
import type { CreateUserRequest, UpdateUserRequest, UserApiData } from '@interfaces';
import { handleRequest } from '@helpers';

import type {
  CountByRoleResponse,
  GetUsersApiResponse,
  UserQueryParams,
} from './users.service.interfaces';

export const UsersService = {
  /**
   * Change user password
   */
  async changePassword(userId: string, newPassword: string): Promise<void> {
    const endpoint = `${apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS}/${userId}/password`;

    const response = await handleRequest({
      body: { newPassword },
      customDefaultErrorMessage: 'No se pudo cambiar la contraseña',
      endpoint,
      method: 'PUT',
      timeout: 10000,
    });

    const typedResponse = response as ApiResponse;
    if (!typedResponse.success) {
      throw new Error(typedResponse.error ?? 'No se pudo cambiar la contraseña');
    }
  },
  async create(userData: CreateUserRequest): Promise<UserApiData> {
    const response = await handleRequest({
      body: userData as unknown as Record<string, unknown>,
      customDefaultErrorMessage: 'No se pudo crear el usuario',
      endpoint: apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS,
      method: 'POST',
      timeout: 10000,
    });

    const typedResponse = response as ApiResponse<UserApiData>;
    if (!typedResponse.success || !typedResponse.data) {
      throw new Error(typedResponse.error ?? 'No se pudo crear el usuario');
    }

    return typedResponse.data;
  },
  async delete(userId: string): Promise<void> {
    const endpoint = `${apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS}/${userId}`;

    const response = await handleRequest({
      customDefaultErrorMessage: 'No se pudo eliminar el usuario',
      endpoint,
      method: 'DELETE',
      timeout: 8000,
    });

    const typedResponse = response as ApiResponse;
    if (!typedResponse.success) {
      throw new Error(typedResponse.error ?? 'No se pudo eliminar el usuario');
    }
  },
  async getAll(params?: UserQueryParams): Promise<GetUsersApiResponse> {
    const searchParams = new URLSearchParams();

    if (params) {
      if (params.page !== undefined) searchParams.set('page', String(params.page));
      if (params.limit !== undefined) searchParams.set('limit', String(params.limit));
      if (params.search) searchParams.set('search', params.search);
      if (params.role) searchParams.set('role', params.role);
      if (params.isActive !== undefined) searchParams.set('isActive', params.isActive);
      if (params.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
    }

    const query = searchParams.toString();
    const endpoint = `${apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS}${query ? `?${query}` : ''}`;

    const response = await handleRequest({
      customDefaultErrorMessage: 'No se pudieron cargar los usuarios',
      endpoint,
      method: 'GET',
      timeout: 10000,
    });

    const typedResponse = response as ApiResponse<GetUsersApiResponse>;
    if (!typedResponse.success || !typedResponse.data?.users) {
      return {
        filters: {},
        pagination: {
          hasNextPage: false,
          hasPrevPage: false,
          limit: 20,
          page: 1,
          total: 0,
          totalPages: 1,
        },
        sorting: { sortBy: 'createdAt', sortOrder: 'desc' },
        users: [],
      };
    }

    return typedResponse.data;
  },
  async getById(userId: string): Promise<UserApiData> {
    const endpoint = `${apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS}/${userId}`;

    const response = await handleRequest({
      customDefaultErrorMessage: 'No se pudo cargar el usuario',
      endpoint,
      method: 'GET',
      timeout: 8000,
    });

    const typedResponse = response as ApiResponse<UserApiData>;
    if (!typedResponse.success || !typedResponse.data) {
      throw new Error(typedResponse.error ?? 'Usuario no encontrado');
    }

    return typedResponse.data;
  },
  async getCountByRole(activeOnly = true): Promise<CountByRoleResponse> {
    const endpoint = `${apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS}/count-by-role?activeOnly=${activeOnly}`;

    const response = await handleRequest({
      customDefaultErrorMessage: 'No se pudo obtener el conteo de usuarios',
      endpoint,
      method: 'GET',
      timeout: 8000,
    });

    const typedResponse = response as ApiResponse<CountByRoleResponse>;
    if (!typedResponse.success || !typedResponse.data) {
      return {
        activeOnly,
        countByRole: { admin: 0, owner: 0, participant: 0 },
        total: 0,
      };
    }

    return typedResponse.data;
  },
  async update(userId: string, userData: Partial<UpdateUserRequest>): Promise<UserApiData> {
    const endpoint = `${apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS}/${userId}`;

    const response = await handleRequest({
      body: userData,
      customDefaultErrorMessage: 'No se pudo actualizar el usuario',
      endpoint,
      method: 'PUT',
      timeout: 10000,
    });

    const typedResponse = response as ApiResponse<{ user: UserApiData }>;
    if (!typedResponse.success || !typedResponse.data?.user) {
      throw new Error(typedResponse.error ?? 'No se pudo actualizar el usuario');
    }

    return typedResponse.data.user;
  },
};
