/**
 * Count Users By Role Use Case
 *
 *
 * Business logic for counting users grouped by role.
 */

import { handleUseCaseError } from '@use-case-error';
import { USER_ROLES } from '@constants';
import { userRepository } from '@repositories';
import type { UserRole } from '@domain-types';
import { validateAndGetUser } from '@helpers';

import type {
  CountUsersByRoleErrorResponse,
  CountUsersByRoleParams,
  CountUsersByRoleResponse,
} from './count-users-by-role.interfaces';

/**
 * Input validation with business rules
 */
const validateRoleCountInput = (params: CountUsersByRoleParams): void => {
  if (!params.request) {
    throw new Error('Request es requerido para autenticación');
  }
};

/**
 * Initialize count object with all roles set to 0
 */
const initializeRoleCounts = (): Record<UserRole, number> => ({
  [USER_ROLES.OWNER]: 0,
  [USER_ROLES.ADMIN]: 0,
  [USER_ROLES.PARTICIPANT]: 0,
});

/**
 * Execute count users by role with admin authorization
 */
export const executeCountUsersByRole = async (
  params: CountUsersByRoleParams
): Promise<CountUsersByRoleResponse> => {
  try {
    validateRoleCountInput(params);

    const authResult = await validateAndGetUser<CountUsersByRoleErrorResponse>(params.request, [
      USER_ROLES.ADMIN,
    ]);

    if (!authResult.success) {
      return authResult.error;
    }

    const activeOnly = params.activeOnly !== false;

    const countByRole = initializeRoleCounts();

    const roles = Object.values(USER_ROLES) as UserRole[];
    await Promise.all(
      roles.map(async (role) => {
        countByRole[role] = await userRepository.count({
          role,
          ...(activeOnly && { isActive: true }),
        });
      })
    );

    const total = Object.values(countByRole).reduce((sum, count) => sum + count, 0);

    return {
      data: {
        activeOnly,
        countByRole,
        total,
      },
      success: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return handleUseCaseError<CountUsersByRoleErrorResponse>(error, 'executeCountUsersByRole');
  }
};
