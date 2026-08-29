/**
 * Create User Use Case
 *
 *
 * Business logic for creating admin users with validation and authorization.
 */

import { createValidationError, handleUseCaseError, UseCaseErrorResponse } from '@use-case-error';
import { hashPassword, validateAndGetUser } from '@helpers';
import { USER_ROLES, USER_ROLES_ARRAY } from '@constants';
import { userRepository } from '@repositories';
import type { UserRole } from '@domain-types';

import type {
  CreateUserErrorResponse,
  CreateUserParams,
  CreateUserResponse,
  ValidationResult,
} from './create-user.interfaces';

const validateRequiredFields = (params: CreateUserParams): ValidationResult | null => {
  const { email, firstName, lastName, password, role } = params;

  if (!email || !firstName || !lastName || !password || !role) {
    return {
      context: {
        missingFields: {
          email: !email,
          firstName: !firstName,
          lastName: !lastName,
          password: !password,
          role: !role,
        },
      },
      error: 'errors.user.missingFields',
      isValid: false,
    };
  }
  return null;
};

const validateUserRole = (role: UserRole): ValidationResult | null => {
  if (!USER_ROLES_ARRAY.includes(role)) {
    return {
      context: { field: 'role', validRoles: USER_ROLES_ARRAY, value: role },
      error: 'errors.user.invalidRole',
      isValid: false,
    };
  }
  return null;
};

const validateEmailFormat = (email: string): ValidationResult | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      context: { field: 'email', value: email },
      error: 'errors.user.invalidEmailFormat',
      isValid: false,
    };
  }
  return null;
};

const validatePasswordLength = (password: string): ValidationResult | null => {
  if (password.length < 8) {
    return {
      context: { currentLength: password.length, field: 'password', minLength: 8 },
      error: 'errors.user.passwordTooShort',
      isValid: false,
    };
  }
  return null;
};

const validateNameFields = (firstName: string, lastName: string): ValidationResult | null => {
  if (firstName.trim().length < 2) {
    return {
      context: { field: 'firstName', value: firstName },
      error: 'errors.user.firstNameTooShort',
      isValid: false,
    };
  }
  if (lastName.trim().length < 2) {
    return {
      context: { field: 'lastName', value: lastName },
      error: 'errors.user.lastNameTooShort',
      isValid: false,
    };
  }
  return null;
};

const validateUserInput = (params: CreateUserParams): ValidationResult => {
  const { email, firstName, lastName, password, role } = params;

  const requiredError = validateRequiredFields(params);
  if (requiredError) return requiredError;

  const roleError = validateUserRole(role);
  if (roleError) return roleError;

  const emailError = validateEmailFormat(email);
  if (emailError) return emailError;

  const passwordError = validatePasswordLength(password);
  if (passwordError) return passwordError;

  const nameError = validateNameFields(firstName, lastName);
  if (nameError) return nameError;

  return { isValid: true };
};

/**
 * Validates business rules and checks for deleted users
 */
const checkExistingUser = async (
  email: string
): Promise<{
  canCreate: boolean;
  existingDeletedUser?: { id: string };
  error?: string;
  context?: Record<string, unknown>;
}> => {
  const activeUser = await userRepository.findByEmail(email);
  if (activeUser) {
    return {
      canCreate: false,
      context: { existingUserId: activeUser.id, field: 'email', value: email },
      error: 'errors.user.emailAlreadyActive',
    };
  }

  const deletedUser = await userRepository.findByEmailIncludingDeleted(email);
  if (deletedUser?.deletedAt) {
    return {
      canCreate: true,
      existingDeletedUser: { id: deletedUser.id },
    };
  }

  return { canCreate: true };
};

/**
 * Execute create user with comprehensive business validation
 * If email belongs to a soft-deleted user, reactivates that user instead
 */
export const executeCreateUser = async (params: CreateUserParams): Promise<CreateUserResponse> => {
  try {
    const validationResult = validateUserInput(params);
    if (!validationResult.isValid) {
      return createValidationError<CreateUserErrorResponse>(
        { key: validationResult.error ?? 'errors.generic.badRequest' },
        validationResult.context?.['field'] as string,
        validationResult.context?.['value']
      );
    }

    const authResult = await validateAndGetUser<CreateUserErrorResponse>(params.request, [
      USER_ROLES.ADMIN,
    ]);
    if (!authResult.success) {
      return authResult.error;
    }

    const { email, firstName, lastName, password, role } = params;

    const existingUserCheck = await checkExistingUser(email);
    if (!existingUserCheck.canCreate) {
      return createValidationError<CreateUserErrorResponse>(
        { key: existingUserCheck.error ?? 'errors.generic.badRequest' },
        existingUserCheck.context?.['field'] as string,
        existingUserCheck.context?.['value']
      );
    }

    const passwordHash = await hashPassword(password, { saltRounds: 12 });

    if (existingUserCheck.existingDeletedUser) {
      const reactivatedUser = await userRepository.reactivate(
        existingUserCheck.existingDeletedUser.id,
        {
          firstName,
          isActive: params.isActive ?? true,
          lastName,
          passwordHash,
          phone: params.phone ?? null,
          role,
        }
      );

      return {
        data: reactivatedUser,
        message: 'Usuario reactivado exitosamente',
        success: true,
      };
    }

    const newUser = await userRepository.create({
      age: params.age,
      email,
      firstName,
      isActive: params.isActive ?? true,
      lastName,
      password: passwordHash,
      phone: params.phone,
      role,
    });

    return {
      data: newUser,
      message: 'Usuario creado exitosamente',
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<UseCaseErrorResponse>(error, 'executeCreateUser');
  }
};
