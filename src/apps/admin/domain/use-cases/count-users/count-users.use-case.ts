/**
 * Count Users Use Case
 *
 *
 * Business logic for counting users with optional filters.
 */

import { CommonValidators, validateAndGetUser } from '@helpers';
import { handleUseCaseError } from '@use-case-error';
import { USER_ROLES, USER_ROLES_ARRAY } from '@constants';
import { userRepository } from '@repositories';
import type { UserRole } from '@domain-types';

import type {
  CountUsersErrorResponse,
  CountUsersParams,
  CountUsersResponse,
} from './count-users.interfaces';

/**
 * Business validation & parameter parsing
 */
const parseAndValidateParams = (params: CountUsersParams) => {
  if (params.role && !USER_ROLES_ARRAY.includes(params.role as UserRole)) {
    throw new Error('Rol de usuario no válido');
  }

  const isActive =
    params.isActive === 'true' ? true : params.isActive === 'false' ? false : undefined;
  const isVerified =
    params.isVerified === 'true' ? true : params.isVerified === 'false' ? false : undefined;

  return {
    isActive,
    isVerified,
    role: params.role,
  };
};

/**
 * Builds repository filters from parsed parameters
 */
const buildRepositoryFilters = (params: ReturnType<typeof parseAndValidateParams>) => {
  const filters: Record<string, unknown> = {};

  if (params.role) {
    filters['role'] = params.role;
  }

  if (params.isActive !== undefined) {
    filters['isActive'] = params.isActive;
  }

  if (params.isVerified !== undefined) {
    filters['isVerified'] = params.isVerified;
  }

  return filters;
};

/**
 * Build applied filters response
 */
const buildAppliedFilters = (params: ReturnType<typeof parseAndValidateParams>) => {
  const applied: { role?: UserRole; isActive?: boolean; isVerified?: boolean } = {};

  if (params.role) {
    applied.role = params.role as UserRole;
  }
  if (params.isActive !== undefined) {
    applied.isActive = params.isActive;
  }
  if (params.isVerified !== undefined) {
    applied.isVerified = params.isVerified;
  }

  return applied;
};

/**
 * Execute count users with admin authorization
 */
export const executeCountUsers = async (params: CountUsersParams): Promise<CountUsersResponse> => {
  try {
    const requestError = CommonValidators.requiredRequest(params);
    if (requestError) {
      return { ...requestError, timestamp: new Date().toISOString() };
    }

    const authResult = await validateAndGetUser<CountUsersErrorResponse>(params.request, [
      USER_ROLES.ADMIN,
    ]);
    if (!authResult.success) {
      return authResult.error;
    }

    const parsedParams = parseAndValidateParams(params);
    const filters = buildRepositoryFilters(parsedParams);
    const count = await userRepository.count(filters);
    const hasFilters = Object.keys(filters).length > 0;

    return {
      data: {
        count,
        ...(hasFilters && { filters: buildAppliedFilters(parsedParams) }),
      },
      success: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const errorResponse = handleUseCaseError<CountUsersErrorResponse>(error, 'executeCountUsers');
    return { ...errorResponse, timestamp: new Date().toISOString() };
  }
};
