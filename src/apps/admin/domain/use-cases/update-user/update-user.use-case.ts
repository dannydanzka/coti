/**
 * Update User Use Case
 *
 *
 * Business logic for updating user information with validation and authorization.
 */

import { createNotFoundError, createValidationError, handleUseCaseError } from '@use-case-error';
import { USER_ROLES } from '@constants';
import { userRepository } from '@repositories';
import { validateAndGetUser } from '@helpers';

import type {
  UpdateUserErrorResponse,
  UpdateUserParams,
  UpdateUserResponse,
  UserChangeDetails,
} from './update-user.interfaces';

/**
 * Validate input parameters with business rules
 */
const validateInput = (params: UpdateUserParams): void => {
  if (!params.request) {
    throw new Error('Request es requerido para autenticación');
  }

  if (!params.id || typeof params.id !== 'string') {
    throw new Error('ID de usuario es requerido y debe ser una cadena válida');
  }

  if (!params.updates || typeof params.updates !== 'object') {
    throw new Error('Los datos de actualización son requeridos');
  }

  const hasUpdates = Object.keys(params.updates).some(
    (key) => params.updates[key as keyof typeof params.updates] !== undefined
  );
  if (!hasUpdates) {
    throw new Error('Se debe proporcionar al menos un campo para actualizar');
  }
};

/**
 * Validate self-update restrictions
 */
const validateSelfUpdateRestrictions = (
  isSelfUpdate: boolean,
  params: UpdateUserParams,
  existingUser: { id: string; role: string }
) => {
  if (!isSelfUpdate) return { isValid: true };

  if (params.updates.isActive === false) {
    return {
      context: { rule: 'self-deactivation', userId: params.id },
      error: 'errors.user.cannotDeactivateSelf',
      isValid: false,
    };
  }

  if (params.updates.role && params.updates.role !== existingUser.role) {
    return {
      context: {
        currentRole: existingUser.role,
        newRole: params.updates.role,
        rule: 'self-role-change',
        userId: params.id,
      },
      error: 'errors.user.cannotChangeSelfRole',
      isValid: false,
    };
  }

  const allowedSelfUpdateFields = ['firstName', 'lastName', 'email'];
  const restrictedFields = Object.keys(params.updates).filter(
    (field) => !allowedSelfUpdateFields.includes(field)
  );
  if (restrictedFields.length > 0) {
    throw new Error(
      `No puedes actualizar estos campos en tu propio perfil: ${restrictedFields.join(', ')}`
    );
  }

  return { isValid: true };
};

/**
 * Validate admin-specific rules
 */
const validateAdminRules = async (
  isUpdatingAdmin: boolean,
  isSelfUpdate: boolean,
  isCurrentUserAdmin: boolean,
  params: UpdateUserParams,
  currentUser: { role: string }
) => {
  const isCurrentUserOwnerOrAdmin = currentUser.role === USER_ROLES.OWNER || isCurrentUserAdmin;

  if (isUpdatingAdmin && !isSelfUpdate && !isCurrentUserOwnerOrAdmin) {
    return {
      context: { currentUserRole: currentUser.role, rule: 'admin-protection', userId: params.id },
      error: 'errors.user.adminModifyForbidden',
      isValid: false,
    };
  }

  if (params.updates.role === USER_ROLES.ADMIN && !isCurrentUserOwnerOrAdmin) {
    return {
      context: { currentUserRole: currentUser.role, rule: 'admin-role-assignment' },
      error: 'errors.user.adminRoleAssignmentForbidden',
      isValid: false,
    };
  }

  if (isUpdatingAdmin && params.updates.role && params.updates.role !== USER_ROLES.ADMIN) {
    const adminUsers = await userRepository.findByRole(USER_ROLES.ADMIN);
    if (adminUsers.length <= 1) {
      const ownerUsers = await userRepository.findByRole(USER_ROLES.OWNER);
      if (ownerUsers.length === 0) {
        throw new Error('errors.user.lastAdminProtection');
      }
    }
  }

  return { isValid: true };
};

/**
 * Comprehensive business rules validation
 */
const validateBusinessRules = async (
  params: UpdateUserParams,
  existingUser: {
    id: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
  },
  currentUser: { id: string; role: string; firstName?: string; lastName?: string }
): Promise<{ isValid: boolean; error?: string; context?: unknown }> => {
  const isSelfUpdate = existingUser.id === currentUser?.id;
  const isUpdatingAdmin = existingUser.role === USER_ROLES.ADMIN;
  const isCurrentUserAdmin = currentUser?.role === USER_ROLES.ADMIN;

  const selfUpdateValidation = validateSelfUpdateRestrictions(isSelfUpdate, params, existingUser);
  if (!selfUpdateValidation.isValid) return selfUpdateValidation;

  const adminValidation = await validateAdminRules(
    isUpdatingAdmin,
    isSelfUpdate,
    isCurrentUserAdmin,
    params,
    currentUser
  );
  if (!adminValidation.isValid) return adminValidation;

  return { isValid: true };
};

/**
 * Sanitize field value based on field type
 */
const sanitizeFieldValue = (field: string, value: unknown): unknown => {
  switch (field) {
    case 'firstName':
    case 'lastName':
      if (typeof value !== 'string' || value.trim().length < 2) {
        throw new Error(`El campo '${field}' debe tener al menos 2 caracteres`);
      }
      return value.trim();

    case 'email':
      if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error('El email debe tener un formato válido');
      }
      return value.toLowerCase().trim();

    case 'role': {
      const allowedRoles = Object.values(USER_ROLES) as string[];
      if (!allowedRoles.includes(value as string)) {
        throw new Error('Rol de usuario no válido');
      }
      return value;
    }

    case 'isActive':
      if (typeof value !== 'boolean') {
        throw new Error(`El campo '${field}' debe ser un valor booleano`);
      }
      return value;

    default:
      return value;
  }
};

/**
 * Validate and sanitize update data
 */
const validateAndSanitizeUpdates = (
  updates: UpdateUserParams['updates'],
  updateType: 'full' | 'partial' = 'full'
) => {
  const sanitizedUpdates: Record<string, unknown> = {};
  const allowedFields =
    updateType === 'full'
      ? ['firstName', 'lastName', 'email', 'role', 'isActive']
      : ['firstName', 'lastName', 'email', 'isActive'];

  for (const [field, value] of Object.entries(updates)) {
    if (value === undefined) continue;

    if (!allowedFields.includes(field)) {
      throw new Error(`Campo '${field}' no permitido para actualización de tipo '${updateType}'`);
    }

    sanitizedUpdates[field] = sanitizeFieldValue(field, value);
  }

  return sanitizedUpdates;
};

/**
 * Create summary of changes made
 */
const getChangeSummary = (
  oldUser: Record<string, unknown>,
  newUser: Record<string, unknown>
): UserChangeDetails[] => {
  const changes: UserChangeDetails[] = [];

  const fieldsToTrack = ['firstName', 'lastName', 'email', 'role', 'isActive'];

  fieldsToTrack.forEach((field) => {
    if (oldUser[field] !== newUser[field]) {
      changes.push({
        field,
        newValue: newUser[field],
        oldValue: oldUser[field],
      });
    }
  });

  return changes;
};

/**
 * Execute update user with comprehensive business validation
 */
export const executeUpdateUser = async (params: UpdateUserParams): Promise<UpdateUserResponse> => {
  try {
    validateInput(params);

    const authResult = await validateAndGetUser<UpdateUserErrorResponse>(params.request, [
      USER_ROLES.OWNER,
      USER_ROLES.ADMIN,
    ]);

    if (!authResult.success) {
      return authResult.error;
    }

    const existingUser = await userRepository.findById(params.id);
    if (!existingUser) {
      return createNotFoundError<UpdateUserErrorResponse>('Usuario', params.id);
    }

    const businessValidation = await validateBusinessRules(params, existingUser, authResult.user);
    if (!businessValidation.isValid) {
      return createValidationError<UpdateUserErrorResponse>({
        key: businessValidation.error ?? 'errors.generic.badRequest',
      });
    }

    const sanitizedUpdates = validateAndSanitizeUpdates(params.updates, params.updateType);

    if (sanitizedUpdates['email'] && sanitizedUpdates['email'] !== existingUser.email) {
      const emailExists = await userRepository.emailExists(
        sanitizedUpdates['email'] as string,
        params.id
      );
      if (emailExists) {
        return createValidationError<UpdateUserErrorResponse>(
          { key: 'errors.user.emailExists' },
          'email',
          sanitizedUpdates['email']
        );
      }
    }

    const updatedUser = await userRepository.update({
      ...sanitizedUpdates,
      id: params.id,
    });

    const changes = getChangeSummary(
      existingUser as unknown as Record<string, unknown>,
      updatedUser as unknown as Record<string, unknown>
    );

    return {
      data: {
        changes,
        updatedBy: `${authResult.user.firstName} ${authResult.user.lastName}`.trim() || 'Sistema',
        user: updatedUser,
      },
      message: 'Usuario actualizado exitosamente',
      success: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return handleUseCaseError<UpdateUserErrorResponse>(error, 'executeUpdateUser');
  }
};
