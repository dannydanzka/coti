/**
 * Change User Password Use Case
 *
 * Business logic for changing user passwords with validation and authorization.
 * Only Owner and Admin roles can change passwords. Owner can change anyone's password.
 * Admin can only change participant passwords.
 */

import {
  createAuthorizationError,
  createNotFoundError,
  createValidationError,
  handleUseCaseError,
  UseCaseErrorResponse,
} from '@use-case-error';
import { hashPassword, validateAndGetUser } from '@helpers';
import { USER_ROLES } from '@constants';
import { userRepository } from '@repositories';

import type {
  ChangeUserPasswordErrorResponse,
  ChangeUserPasswordParams,
  ChangeUserPasswordResponse,
} from './change-user-password.interfaces';

/**
 * Validates input parameters
 */
const validateInput = (params: ChangeUserPasswordParams): void => {
  if (!params.userId) {
    throw new Error('El ID del usuario es obligatorio');
  }

  if (typeof params.userId !== 'string' || params.userId.trim().length === 0) {
    throw new Error('El ID del usuario debe ser una cadena válida');
  }

  if (!params.newPassword) {
    throw new Error('La nueva contraseña es obligatoria');
  }

  if (params.newPassword.length < 8) {
    throw new Error('La contraseña debe tener al menos 8 caracteres');
  }

  if (!params.request) {
    throw new Error('La información de la solicitud es requerida para la autorización');
  }
};

/**
 * Validates authorization rules for password change
 */
const validateAuthorization = (
  currentUser: { id: string; role: string },
  targetUser: { id: string; role: string; firstName: string; lastName: string }
): { valid: boolean; error?: string } => {
  if (currentUser.role === USER_ROLES.OWNER) {
    return { valid: true };
  }

  if (targetUser.role === USER_ROLES.OWNER) {
    return {
      error: 'errors.user.passwordChangeOwnerForbidden',
      valid: false,
    };
  }

  if (targetUser.role === USER_ROLES.ADMIN && currentUser.id !== targetUser.id) {
    return {
      error: 'errors.user.passwordChangeAdminForbidden',
      valid: false,
    };
  }

  return { valid: true };
};

/**
 * Execute change user password with comprehensive business validation
 */
export const executeChangeUserPassword = async (
  params: ChangeUserPasswordParams
): Promise<ChangeUserPasswordResponse | ChangeUserPasswordErrorResponse> => {
  try {
    validateInput(params);

    const authResult = await validateAndGetUser<ChangeUserPasswordErrorResponse>(params.request, [
      USER_ROLES.OWNER,
      USER_ROLES.ADMIN,
    ]);
    if (!authResult.success) {
      return authResult.error;
    }

    const targetUser = await userRepository.findById(params.userId);
    if (!targetUser) {
      return createNotFoundError<ChangeUserPasswordErrorResponse>('Usuario', params.userId);
    }

    const authValidation = validateAuthorization(authResult.user, targetUser);
    if (!authValidation.valid) {
      return createAuthorizationError<ChangeUserPasswordErrorResponse>({
        key: authValidation.error ?? 'errors.generic.forbidden',
      });
    }

    const passwordHash = await hashPassword(params.newPassword, { saltRounds: 12 });
    await userRepository.updatePassword(params.userId, passwordHash);

    const fullName = `${targetUser.firstName} ${targetUser.lastName}`.trim() || 'Usuario';

    return {
      message: `Contraseña de "${fullName}" actualizada exitosamente`,
      success: true,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('8 caracteres')) {
      return createValidationError<ChangeUserPasswordErrorResponse>(error.message);
    }
    return handleUseCaseError<UseCaseErrorResponse>(error, 'executeChangeUserPassword');
  }
};
