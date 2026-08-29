/**
 * Signup Use Case
 *
 * Business logic for participant self-registration.
 * DearAdry Model: No email verification, immediate account access.
 * User can explore events but cannot access challenges until kit delivered.
 *
 */

import { createValidationError, handleUseCaseError, UseCaseErrorResponse } from '@use-case-error';
import { getEnvVar, hashPassword, signToken } from '@helpers';
import { logError } from '@logger';
import { ResendEmailService } from '@email';
import { userRepository } from '@repositories';

import type {
  SignupErrorResponse,
  SignupParams,
  SignupResult,
  ValidationResult,
} from './signup.interfaces';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 2;
const BCRYPT_ROUNDS = 12;

const PASSWORD_RULES = {
  hasLowercase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecial: /[!@#$%^&*(),.?":{}|<>]/,
  hasUppercase: /[A-Z]/,
  minLength: 8,
};

const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { field: 'password', i18nKey: 'errors.auth.passwordRequired', isValid: false };
  }
  if (password.length < PASSWORD_RULES.minLength) {
    return {
      field: 'password',
      i18nKey: 'errors.auth.passwordMinLength',
      isValid: false,
      params: { minLength: PASSWORD_RULES.minLength },
    };
  }
  if (!PASSWORD_RULES.hasUppercase.test(password)) {
    return {
      field: 'password',
      i18nKey: 'errors.auth.passwordRequiresUppercase',
      isValid: false,
    };
  }
  if (!PASSWORD_RULES.hasLowercase.test(password)) {
    return {
      field: 'password',
      i18nKey: 'errors.auth.passwordRequiresLowercase',
      isValid: false,
    };
  }
  if (!PASSWORD_RULES.hasNumber.test(password)) {
    return {
      field: 'password',
      i18nKey: 'errors.auth.passwordRequiresNumber',
      isValid: false,
    };
  }
  if (!PASSWORD_RULES.hasSpecial.test(password)) {
    return {
      field: 'password',
      i18nKey: 'errors.auth.passwordRequiresSpecial',
      isValid: false,
    };
  }
  return { isValid: true };
};

const validateSignupInput = (params: SignupParams): ValidationResult => {
  const { email, firstName, lastName, password } = params;

  if (!email?.trim()) {
    return { field: 'email', i18nKey: 'errors.auth.emailRequired', isValid: false };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { field: 'email', i18nKey: 'errors.auth.emailInvalid', isValid: false };
  }
  if (!firstName?.trim()) {
    return { field: 'firstName', i18nKey: 'errors.auth.firstNameRequired', isValid: false };
  }
  if (firstName.trim().length < MIN_NAME_LENGTH) {
    return {
      field: 'firstName',
      i18nKey: 'errors.auth.firstNameTooShort',
      isValid: false,
      params: { minLength: MIN_NAME_LENGTH },
    };
  }
  if (!lastName?.trim()) {
    return { field: 'lastName', i18nKey: 'errors.auth.lastNameRequired', isValid: false };
  }
  if (lastName.trim().length < MIN_NAME_LENGTH) {
    return {
      field: 'lastName',
      i18nKey: 'errors.auth.lastNameTooShort',
      isValid: false,
      params: { minLength: MIN_NAME_LENGTH },
    };
  }

  return validatePassword(password);
};

/**
 * Checks if email already exists
 */
const checkEmailAvailability = async (
  email: string
): Promise<{
  isAvailable: boolean;
  errorKey?: string;
}> => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    return {
      errorKey: 'errors.auth.emailAlreadyRegistered',
      isAvailable: false,
    };
  }

  return { isAvailable: true };
};

/**
 * Execute signup for new participant
 */
export const executeSignup = async (params: SignupParams): Promise<SignupResult> => {
  try {
    const validationResult = validateSignupInput(params);
    if (!validationResult.isValid) {
      return createValidationError<SignupErrorResponse>(
        {
          key: validationResult.i18nKey ?? 'errors.auth.validationGeneric',
          params: validationResult.params,
        },
        validationResult.field
      );
    }

    const { email, firstName, lastName, password } = params;

    const emailCheck = await checkEmailAvailability(email);
    if (!emailCheck.isAvailable) {
      return createValidationError<SignupErrorResponse>(
        { key: emailCheck.errorKey ?? 'errors.auth.emailAlreadyRegistered' },
        'email'
      );
    }

    const hashedPassword = await hashPassword(password, { saltRounds: BCRYPT_ROUNDS });

    const newUser = await userRepository.create({
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      isActive: true,
      lastName: lastName.trim(),
      password: hashedPassword,
      role: 'participant',
    });

    const fullName = `${newUser.firstName} ${newUser.lastName}`.trim();

    ResendEmailService.sendWelcomeEmail(newUser.email, fullName || 'Usuario').catch(
      (emailError: unknown) => {
        logError(emailError, 'executeSignup.sendWelcomeEmail');
      }
    );

    /** Auto-login: issue the same JWT as login so the new user lands authenticated. */
    const jwtSecret = getEnvVar('JWT_SECRET');
    const expiresIn =
      getEnvVar('SESSION_TIMEOUT', { defaultValue: '24h', required: false }) || '24h';
    const token = jwtSecret
      ? signToken(
          {
            email: newUser.email,
            firstName: newUser.firstName,
            isActive: newUser.isActive,
            lastName: newUser.lastName,
            role: newUser.role,
            userId: newUser.id,
          },
          jwtSecret,
          { expiresIn }
        )
      : null;

    return {
      data: {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        token,
        user: {
          createdAt: newUser.createdAt,
          email: newUser.email,
          firstName: newUser.firstName,
          id: newUser.id,
          isActive: newUser.isActive,
          isVerified: true,
          lastLoginAt: null,
          lastName: newUser.lastName,
          role: newUser.role,
          updatedAt: newUser.updatedAt,
        },
        userId: newUser.id,
      },
      message: 'Cuenta creada exitosamente',
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<UseCaseErrorResponse>(error, 'executeSignup');
  }
};
