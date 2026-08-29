/**
 * Get User By ID Use Case
 *
 *
 * Business logic for retrieving a single user by ID with admin authorization.
 */

import {
  createAuthorizationError,
  createNotFoundError,
  handleUseCaseError,
  UseCaseErrorResponse,
} from '@use-case-error';
import { createValidator, validateAndGetUser } from '@helpers';
import { HTTP_STATUS, USER_ROLES } from '@constants';
import type { UserEntity } from '@interfaces';
import { userRepository } from '@repositories';

import type {
  EnrichedUserEntity,
  GetUserByIdErrorResponse,
  GetUserByIdParams,
  GetUserByIdResponse,
} from './get-user-by-id.interfaces';

/**
 * Validates user access permissions based on roles and business rules
 */
const validateUserAccess = (
  currentUser: { id: string; role: string },
  targetUser: { id: string; role: string; firstName: string; lastName: string }
): { canAccess: boolean; reason?: string } => {
  if (currentUser.role === USER_ROLES.ADMIN) {
    return { canAccess: true };
  }

  if (currentUser.role === USER_ROLES.ADMIN) {
    if (currentUser.id === targetUser.id) {
      return { canAccess: true };
    }

    if (targetUser.role === USER_ROLES.ADMIN) {
      return {
        canAccess: false,
        reason: 'No tienes permisos para acceder a la información de usuarios administradores',
      };
    }

    return { canAccess: true };
  }

  if (currentUser.id === targetUser.id) {
    return { canAccess: true };
  }

  return {
    canAccess: false,
    reason: 'Solo puedes acceder a tu propia información de usuario',
  };
};

/**
 * Determines if the current user can edit the target user
 */
const canUserBeEdited = (
  targetUser: { id: string; role: string },
  currentUser: { id: string; role: string }
): boolean => {
  if (currentUser.role === USER_ROLES.ADMIN) {
    return true;
  }

  if (currentUser.id === targetUser.id) {
    return true;
  }

  if (currentUser.role === USER_ROLES.ADMIN && targetUser.role !== USER_ROLES.ADMIN) {
    return true;
  }

  return false;
};

/**
 * Determines if the current user can delete the target user
 */
const canUserBeDeleted = (
  targetUser: { id: string; role: string },
  currentUser: { id: string; role: string }
): boolean => {
  if (currentUser.id === targetUser.id) {
    return false;
  }

  if (targetUser.role === USER_ROLES.ADMIN) {
    return false;
  }

  if (currentUser.role === USER_ROLES.ADMIN) {
    return true;
  }

  return false;
};

/**
 * Returns user-friendly role display name
 */
const getDisplayRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    [USER_ROLES.ADMIN]: 'Administrador',
    [USER_ROLES.PARTICIPANT]: 'Participante',
    [USER_ROLES.OWNER]: 'Owner',
  };

  return roleMap[role] || 'Usuario';
};

/**
 * Formats last activity timestamp
 */
const formatLastActivity = (lastLoginAt?: Date | string): string => {
  if (!lastLoginAt) {
    return 'Nunca';
  }

  const date = new Date(lastLoginAt);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'Hace menos de una hora';
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  }
};

/**
 * Enriches user data with additional business information
 */
const enrichUserData = (
  user: UserEntity,
  currentUser: { id: string; role: string }
): EnrichedUserEntity => {
  const baseEnriched = {
    ...user,
    canBeDeleted: canUserBeDeleted(user, currentUser),
    canBeEdited: canUserBeEdited(user, currentUser),
    displayRole: getDisplayRole(user.role),
    isCurrentUser: user.id === currentUser.id,
    lastActivityFormatted: formatLastActivity(user.lastLoginAt || undefined),
  };

  if (currentUser.role !== USER_ROLES.ADMIN && user.id !== currentUser.id) {
    const { lastLoginAt: _removed, ...sanitized } = baseEnriched;
    return {
      ...sanitized,
      email: '***@***.***',
      lastLoginAt: null,
    };
  }

  return baseEnriched;
};

/**
 * Execute get user by ID with comprehensive validation
 */
export const executeGetUserById = async (
  params: GetUserByIdParams
): Promise<GetUserByIdResponse | GetUserByIdErrorResponse> => {
  try {
    const validator = createValidator<GetUserByIdParams>();
    const validate = validator.compose(validator.required('request'), validator.requiredId('id'));

    const validationError = validate(params);
    if (validationError) {
      return validationError;
    }

    const authResult = await validateAndGetUser<GetUserByIdErrorResponse>(params.request, [
      USER_ROLES.ADMIN,
      USER_ROLES.ADMIN,
    ]);
    if (!authResult.success) {
      return authResult.error;
    }

    const user = await userRepository.findById(params.id);

    if (!user) {
      return createNotFoundError<GetUserByIdErrorResponse>('Usuario', params.id);
    }

    const accessValidation = validateUserAccess(authResult.user, user);
    if (!accessValidation.canAccess) {
      return createAuthorizationError<GetUserByIdErrorResponse>(
        accessValidation.reason || 'Acceso denegado'
      );
    }

    const enrichedUser = enrichUserData(user, authResult.user);

    return {
      data: enrichedUser,
      status: HTTP_STATUS.OK,
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<UseCaseErrorResponse>(error, 'executeGetUserById');
  }
};
