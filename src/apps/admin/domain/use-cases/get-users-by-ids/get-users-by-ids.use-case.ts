/**
 * Get Users By IDs Use Case
 *
 *
 * Business logic for retrieving multiple users by their IDs.
 */

import { handleUseCaseError, UseCaseErrorResponse } from '@use-case-error';
import { USER_ROLES } from '@constants';
import type { UserEntity } from '@interfaces';
import { userRepository } from '@repositories';
import { validateAndGetUser } from '@helpers';

import type {
  GetUsersByIdsErrorResponse,
  GetUsersByIdsParams,
  GetUsersByIdsResponse,
} from './get-users-by-ids.interfaces';

const MAX_BATCH_SIZE = 100;

const CUID_REGEX = /^[a-z0-9]{25}$/;

/**
 * Input validation with business rules
 */
const validateInput = (params: GetUsersByIdsParams): void => {
  if (!params.request) {
    throw new Error('Request es requerido para autenticación');
  }

  if (!params.ids || params.ids.length === 0) {
    throw new Error('Al menos un ID de usuario es requerido');
  }

  if (params.ids.length > MAX_BATCH_SIZE) {
    throw new Error(`Máximo ${MAX_BATCH_SIZE} IDs de usuario permitidos por solicitud`);
  }
};

/**
 * Validate ID formats
 */
const validateIdFormats = (ids: string[]): string[] => {
  const invalidIds = ids.filter((id) => !CUID_REGEX.test(id));

  if (invalidIds.length > 0) {
    throw new Error(`Formato de ID de usuario inválido: ${invalidIds.join(', ')}`);
  }

  return ids;
};

/**
 * Fetch users by IDs from repository
 */
const fetchUsersByIds = async (ids: string[]): Promise<UserEntity[]> => {
  const userPromises = ids.map((id) => userRepository.findById(id));
  const users = await Promise.all(userPromises);

  return users.filter((user): user is UserEntity => user !== null);
};

/**
 * Build response data with found/not found information
 */
const buildResponseData = (users: UserEntity[], requestedIds: string[]) => {
  const foundIds = users.map((user) => user.id);
  const notFoundIds = requestedIds.filter((id) => !foundIds.includes(id));

  return {
    found: users.length,
    notFound: notFoundIds,
    requested: requestedIds.length,
    users,
  };
};

/**
 * Execute get users by IDs with admin authorization
 */
export const executeGetUsersByIds = async (
  params: GetUsersByIdsParams
): Promise<GetUsersByIdsResponse> => {
  try {
    validateInput(params);

    const authResult = await validateAndGetUser<GetUsersByIdsErrorResponse>(params.request, [
      USER_ROLES.ADMIN,
      USER_ROLES.OWNER,
    ]);

    if (!authResult.success) {
      return authResult.error;
    }

    const flattenedIds = params.ids.flatMap((id) => id.split(','));
    const validIds = validateIdFormats(flattenedIds);

    const users = await fetchUsersByIds(validIds);

    const responseData = buildResponseData(users, validIds);

    return {
      data: responseData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return handleUseCaseError<UseCaseErrorResponse>(error, 'executeGetUsersByIds');
  }
};
