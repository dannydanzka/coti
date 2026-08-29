/**
 * Get Users Use Case
 *
 *
 * Business logic for retrieving users with filtering, pagination, and search.
 */

import { handleUseCaseError } from '@use-case-error';
import { PAGINATION, USER_ROLES } from '@constants';
import type { UserEntity } from '@interfaces';
import { userRepository } from '@repositories';
import type { UserRole } from '@domain-types';
import { validateAndGetUser } from '@helpers';

import type {
  EnhancedUserEntity,
  GetUsersErrorResponse,
  GetUsersParams,
  GetUsersResponse,
} from './get-users.interfaces';

/**
 * Input validation with business rules
 */
const validateInput = (params: GetUsersParams): void => {
  if (!params.request) {
    throw new Error('Request es requerido para autenticación');
  }
};

/**
 * Business validation & parameter parsing
 */
const parseAndValidateParams = (params: GetUsersParams) => {
  const page = params.page && params.page > 0 ? params.page : 1;
  if (params.page && params.page < 1) {
    throw new Error('El número de página debe ser mayor a 0');
  }

  if (params.limit && (params.limit < 1 || params.limit > PAGINATION.MAX_LIMIT)) {
    throw new Error(`El límite debe estar entre 1 y ${PAGINATION.MAX_LIMIT}`);
  }
  const limit = params.limit ? Math.min(params.limit, PAGINATION.MAX_LIMIT) : PAGINATION.MAX_LIMIT;

  if (params.role && !Object.values(USER_ROLES).includes(params.role as UserRole)) {
    throw new Error('Rol de usuario no válido');
  }

  const isActive =
    params.isActive === 'true' ? true : params.isActive === 'false' ? false : undefined;

  const allowedSortFields = ['createdAt', 'name', 'email', 'role', 'lastLoginAt', 'updatedAt'];
  const sortBy = allowedSortFields.includes(params.sortBy || '')
    ? params.sortBy || 'createdAt'
    : 'createdAt';
  const sortOrder: 'asc' | 'desc' = params.sortOrder === 'asc' ? 'asc' : 'desc';

  return {
    isActive,
    limit,
    page,
    role: params.role,
    search: params.search?.trim(),
    sortBy,
    sortOrder,
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

  if (params.search) {
    filters['searchTerm'] = params.search;
  }

  return filters;
};

/**
 * Business logic: Can user be deleted?
 */
const canUserBeDeleted = (user: Record<string, unknown>, currentUserId: string): boolean => {
  if (user['id'] === currentUserId) return false;

  if (user['role'] === USER_ROLES.ADMIN) return false;

  // Note: This would be checked with actual business data in real implementation
  return true;
};

/**
 * Business logic: Can user be updated?
 */
const canUserBeUpdated = (user: Record<string, unknown>, currentUserId: string): boolean => {
  if (user['id'] === currentUserId) return true;

  return true;
};

/**
 * Builds comprehensive pagination information
 */
const buildPaginationInfo = (
  repoPagination: { total: number; totalPages: number },
  params: ReturnType<typeof parseAndValidateParams>
) => {
  return {
    hasNextPage: params.page < repoPagination.totalPages,
    hasPrevPage: params.page > 1,
    limit: params.limit,
    page: params.page,
    total: repoPagination.total,
    totalPages: repoPagination.totalPages,
  };
};

/**
 * Build response data object
 */
const buildResponseData = (
  processedUsers: EnhancedUserEntity[],
  paginationInfo: ReturnType<typeof buildPaginationInfo>,
  parsedParams: ReturnType<typeof parseAndValidateParams>
) => ({
  filters: {
    ...(parsedParams.isActive !== undefined && { isActive: parsedParams.isActive }),
    ...(parsedParams.role && { role: parsedParams.role }),
    ...(parsedParams.search && { search: parsedParams.search }),
  },
  pagination: paginationInfo,
  sorting: {
    sortBy: parsedParams.sortBy,
    sortOrder: parsedParams.sortOrder,
  },
  users: processedUsers,
});

/**
 * Execute get users with admin authorization
 */
export const executeGetUsers = async (params: GetUsersParams): Promise<GetUsersResponse> => {
  try {
    validateInput(params);

    const authResult = await validateAndGetUser<GetUsersErrorResponse>(params.request, [
      USER_ROLES.ADMIN,
    ]);

    if (!authResult.success) {
      return authResult.error;
    }

    const parsedParams = parseAndValidateParams(params);

    const filters = buildRepositoryFilters(parsedParams);

    const pagination = {
      limit: parsedParams.limit,
      page: parsedParams.page,
    };

    const result = await userRepository.findMany(filters, pagination);

    const currentUser = authResult.user;

    const processedUsers: EnhancedUserEntity[] = result.users.map((user: UserEntity) => ({
      ...user,
      canBeDeleted: canUserBeDeleted(user as unknown as Record<string, unknown>, currentUser.id),
      canBeUpdated: canUserBeUpdated(user as unknown as Record<string, unknown>, currentUser.id),
      displayName: `${user.firstName} ${user.lastName} (${user.role})`.trim(),
      isCurrentUser: user.id === currentUser.id,
    }));

    const paginationInfo = buildPaginationInfo(result.pagination, parsedParams);

    return {
      data: buildResponseData(processedUsers, paginationInfo, parsedParams),
      success: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return handleUseCaseError<GetUsersErrorResponse>(error, 'executeGetUsers');
  }
};
