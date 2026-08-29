/**
 * Delete User Use Case
 *
 *
 * Business logic for deleting users with validation and authorization.
 */

import {
  createForbiddenError,
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

  /**
   * Sólo el OWNER puede borrar a un administrador. La versión anterior exigía
   * `currentUser.role === ADMIN` y acto seguido prohibía borrar admins a
   * cualquiera, así que ningún administrador podía eliminarse jamás.
   */
  if (targetUser.role === USER_ROLES.ADMIN && currentUser.role !== USER_ROLES.OWNER) {
    return {
      error: 'errors.user.adminDeleteForbidden',
      status: HTTP_STATUS.FORBIDDEN,
      valid: false,
    };
  }

  if (targetUser.role === USER_ROLES.OWNER) {
    return {
      error: 'errors.user.ownerDeleteProtected',
      status: HTTP_STATUS.FORBIDDEN,
      valid: false,
    };
  }

  return { valid: true };
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
      return createForbiddenError<DeleteUserErrorResponse>({
        key: businessValidation.error ?? 'errors.generic.forbidden',
      });
    }

    /**
     * No hace falta comprobar dependencias: todo lo que cuelga de un usuario
     * (`Viaje`, `PlanDeAhorro` y sus hijos) está declarado `onDelete: Cascade`
     * en el esquema, así que Postgres se encarga.
     */
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
