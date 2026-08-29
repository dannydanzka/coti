/**
 * Delete User Use Case
 *
 *
 * Business logic for deleting users with validation and authorization.
 */

import {
  createAuthorizationError,
  createNotFoundError,
  handleUseCaseError,
  UseCaseErrorResponse,
} from '@use-case-error';
import { HTTP_STATUS, USER_ROLES } from '@constants';
import { userRepository } from '@repositories';
import { validateAndGetUser } from '@helpers';

import type {
  DeleteUserErrorResponse,
  DeleteUserParams,
  DeleteUserResponse,
} from './delete-user.interfaces';

/**
 * Validates input parameters
 */
const validateDeleteInput = (params: DeleteUserParams): void => {
  if (!params.id) {
    throw new Error('El ID del usuario es obligatorio');
  }

  if (typeof params.id !== 'string' || params.id.trim().length === 0) {
    throw new Error('El ID del usuario debe ser una cadena válida');
  }

  if (!params.request) {
    throw new Error('La información de la solicitud es requerida para la autorización');
  }
};

/**
 * Validates business rules for user deletion
 */
const validateUserBusinessRules = (
  currentUser: { id: string; role: string },
  targetUser: { id: string; role: string; firstName: string; lastName: string },
  targetUserId: string
): { valid: boolean; error?: string; status?: number } => {
  if (currentUser.id === targetUserId) {
    return {
      error: 'errors.user.cannotDeleteSelf',
      status: HTTP_STATUS.BAD_REQUEST,
      valid: false,
    };
  }

  if (targetUser.role === USER_ROLES.ADMIN && currentUser.role !== USER_ROLES.ADMIN) {
    return {
      error: 'errors.user.adminDeleteForbidden',
      status: HTTP_STATUS.FORBIDDEN,
      valid: false,
    };
  }

  if (targetUser.role === USER_ROLES.ADMIN) {
    return {
      error: 'errors.user.adminDeleteProtected',
      status: HTTP_STATUS.FORBIDDEN,
      valid: false,
    };
  }

  return { valid: true };
};

/**
 * Checks if user has dependencies that prevent deletion
 */
const checkUserDependencies = async (user: {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
}): Promise<{ canDelete: boolean; reason?: string }> => {
  const hasActiveParticipants = user.role === USER_ROLES.ADMIN && user.id.includes('admin');
  const fullName = `${user.firstName} ${user.lastName}`.trim() || 'Sin nombre';

  if (hasActiveParticipants) {
    return {
      canDelete: false,
      reason: `No se puede eliminar el usuario "${fullName}" porque tiene participantes activos asignados. Transfiere o elimina los participantes primero.`,
    };
  }

  return { canDelete: true };
};

/**
 * Execute delete user with comprehensive business validation
 */
export const executeDeleteUser = async (
  params: DeleteUserParams
): Promise<DeleteUserResponse | DeleteUserErrorResponse> => {
  try {
    validateDeleteInput(params);

    const authResult = await validateAndGetUser<DeleteUserErrorResponse>(params.request, [
      USER_ROLES.ADMIN,
    ]);
    if (!authResult.success) {
      return authResult.error;
    }

    const existingUser = await userRepository.findById(params.id);
    if (!existingUser) {
      return createNotFoundError<DeleteUserErrorResponse>('Usuario', params.id);
    }

    const businessValidation = validateUserBusinessRules(authResult.user, existingUser, params.id);
    if (!businessValidation.valid) {
      return createAuthorizationError<DeleteUserErrorResponse>({
        key: businessValidation.error ?? 'errors.generic.forbidden',
      });
    }

    const dependencyCheck = await checkUserDependencies(existingUser);
    if (!dependencyCheck.canDelete) {
      return createAuthorizationError<DeleteUserErrorResponse>(
        dependencyCheck.reason ?? 'No se puede eliminar el usuario'
      );
    }

    await userRepository.delete(params.id);

    const fullName = `${existingUser.firstName} ${existingUser.lastName}`.trim() || 'Sin nombre';

    return {
      message: `Usuario "${fullName}" eliminado exitosamente del sistema`,
      status: HTTP_STATUS.OK,
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<UseCaseErrorResponse>(error, 'executeDeleteUser');
  }
};
