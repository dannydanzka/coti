/**
 * Login Use Case
 *
 *
 * Business logic for user authentication with JWT generation and session management.
 */

import { authRepository } from '@repositories';
import { createAppError } from '@app-error';
import { createAuthorizationError, handleUseCaseError } from '@use-case-error';
import { createValidator, getEnvVar, signToken } from '@helpers';
import { HTTP_STATUS } from '@constants';
import type { UserEntity } from '@interfaces';

import type { LoginErrorResponse, LoginParams, LoginResponse } from './login.interfaces';

/**
 * Validates account status
 */
const validateAccountStatus = (user: UserEntity): { isValid: boolean; errorKey?: string } => {
  if (!user.isActive) {
    return { errorKey: 'errors.auth.accountDeactivated', isValid: false };
  }

  return { isValid: true };
};

/**
 * Generates JWT token with user data
 */
const generateJWTToken = (user: UserEntity, secret: string, expiresIn: string): string => {
  return signToken(
    {
      email: user.email,
      firstName: user.firstName,
      isActive: user.isActive,
      lastName: user.lastName,
      role: user.role,
      userId: user.id,
    },
    secret,
    { expiresIn }
  );
};

/**
 * Formats user data for response (excludes sensitive fields)
 */
const formatUserResponse = (user: UserEntity): Omit<UserEntity, 'passwordHash'> => {
  return {
    age: user.age,
    bio: user.bio,
    city: user.city,
    country: user.country,
    createdAt: user.createdAt,
    deletedAt: user.deletedAt,
    deletedBy: user.deletedBy,
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    lastName: user.lastName,
    neighborhood: user.neighborhood,
    number: user.number,
    phone: user.phone,
    photoUrl: user.photoUrl,
    role: user.role,
    state: user.state,
    street: user.street,
    updatedAt: user.updatedAt,
    zipCode: user.zipCode,
  };
};

/**
 * Execute user login authentication with comprehensive validation
 */
export const executeLogin = async (
  params: LoginParams
): Promise<LoginResponse | LoginErrorResponse> => {
  try {
    const validator = createValidator<LoginParams>();
    const validate = validator.compose(
      validator.required('email', 'Email es requerido'),
      validator.required('password', 'Contraseña es requerida'),
      validator.email('email'),
      validator.minLength('password', 6, 'La contraseña debe tener al menos 6 caracteres'),
      validator.maxLength('email', 254, 'El email no puede exceder 254 caracteres')
    );
    /**
     * Inline validator messages above are kept as ES text; `createValidator` is
     * shared across many use cases and predates the i18n migration. Post-validation
     * errors below carry i18n keys.
     */

    const validationError = validate(params);
    if (validationError) {
      return validationError;
    }

    const email = params.email.toLowerCase().trim();
    const { password } = params;

    const user = await authRepository.authenticateUser({ email, password });
    if (!user) {
      return createAuthorizationError<LoginErrorResponse>(
        { key: 'errors.auth.invalidCredentials' },
        'invalid_credentials'
      );
    }

    const accountValidation = validateAccountStatus(user);
    if (!accountValidation.isValid) {
      return createAuthorizationError<LoginErrorResponse>(
        { key: accountValidation.errorKey ?? 'errors.auth.accountInvalid' },
        'account_status'
      );
    }

    const jwtSecret = getEnvVar('JWT_SECRET');
    if (!jwtSecret) {
      return handleUseCaseError<LoginErrorResponse>(
        createAppError({}, 'errors.auth.configMissing'),
        'executeLogin'
      );
    }

    await authRepository.updateLastLogin(user.id, new Date());

    const expiresIn =
      getEnvVar('SESSION_TIMEOUT', { defaultValue: '24h', required: false }) || '24h';
    const token = generateJWTToken(user, jwtSecret, expiresIn);

    const userResponse = formatUserResponse(user);

    return {
      data: {
        expiresIn,
        token,
        user: userResponse,
      },
      status: HTTP_STATUS.OK,
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<LoginErrorResponse>(error, 'executeLogin');
  }
};
