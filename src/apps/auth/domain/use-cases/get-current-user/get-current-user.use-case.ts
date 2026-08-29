/**
 * Get Current User Use Case
 *
 *
 * Business logic for retrieving current user profile from JWT token.
 */

import { authRepository } from '@repositories';
import { CommonValidators, getEnvVar, verifyToken } from '@helpers';
import { createAppError } from '@app-error';
import {
  createAuthorizationError,
  createNotFoundError,
  createValidationError,
  handleUseCaseError,
} from '@use-case-error';
import { HTTP_STATUS } from '@constants';
import type { JWTPayload } from '@middleware';
import type { UserEntity } from '@interfaces';

import type {
  GetCurrentUserErrorResponse,
  GetCurrentUserParams,
  GetCurrentUserResponse,
  PayloadValidationResult,
  SessionMetadata,
  TokenExtractionResult,
} from './get-current-user.interfaces';

/**
 * Extracts and validates token from Authorization header
 */
const extractToken = (request: Request): TokenExtractionResult => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return { i18nKey: 'errors.auth.authHeaderRequired', isValid: false };
  }

  if (!authHeader.startsWith('Bearer ')) {
    return { i18nKey: 'errors.auth.tokenFormatInvalid', isValid: false };
  }

  const token = authHeader.replace('Bearer ', '').trim();

  if (!token || token.length === 0) {
    return { i18nKey: 'errors.auth.tokenMissing', isValid: false };
  }

  if (token.length < 10) {
    return { i18nKey: 'errors.auth.tokenTooShort', isValid: false };
  }

  if (token.length > 2000) {
    return { i18nKey: 'errors.auth.tokenTooLong', isValid: false };
  }

  return { isValid: true, token };
};

/**
 * Verifies JWT token and extracts payload
 */
const verifyJWTToken = (
  token: string,
  secret: string
): {
  isValid: boolean;
  payload?: JWTPayload;
} => {
  const result = verifyToken<JWTPayload>(token, secret);
  return {
    isValid: result.valid,
    payload: result.payload,
  };
};

/**
 * Validates JWT payload structure
 */
const validateTokenPayload = (payload: JWTPayload): PayloadValidationResult => {
  if (!payload.userId) {
    return {
      field: 'userId',
      i18nKey: 'errors.auth.tokenPayloadUserIdMissing',
      isValid: false,
    };
  }

  if (!payload.email) {
    return {
      field: 'email',
      i18nKey: 'errors.auth.tokenPayloadEmailMissing',
      isValid: false,
    };
  }

  if (!payload.role) {
    return {
      field: 'role',
      i18nKey: 'errors.auth.tokenPayloadRoleMissing',
      isValid: false,
    };
  }

  return { isValid: true };
};

/**
 * Validates user account status
 */
const validateUserAccount = (user: UserEntity): { isValid: boolean; i18nKey?: string } => {
  if (!user.isActive) {
    return { i18nKey: 'errors.auth.accountDeactivated', isValid: false };
  }

  return { isValid: true };
};

/**
 * Formats user profile for secure response (excludes sensitive fields)
 */
const formatUserProfile = (user: UserEntity): Omit<UserEntity, 'passwordHash'> => {
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
 * Generates session metadata from JWT payload
 */
const generateSessionMetadata = (payload: JWTPayload): SessionMetadata => {
  return {
    sessionType: 'jwt_stateless',
    tokenExpiresAt: payload.exp || 0,
    tokenIssuedAt: payload.iat || 0,
  };
};

/**
 * Execute get current user with comprehensive validation
 */
export const executeGetCurrentUser = async (
  params: GetCurrentUserParams
): Promise<GetCurrentUserResponse | GetCurrentUserErrorResponse> => {
  try {
    const requestError = CommonValidators.requiredRequest(params);
    if (requestError) {
      return requestError;
    }

    if (typeof params.request.headers?.get !== 'function') {
      return createValidationError<GetCurrentUserErrorResponse>(
        { key: 'errors.auth.requestHeadersUnavailable' },
        'request.headers'
      );
    }

    const tokenResult = extractToken(params.request);
    if (!tokenResult.isValid) {
      return createAuthorizationError<GetCurrentUserErrorResponse>({
        key: tokenResult.i18nKey ?? 'errors.auth.tokenInvalid',
      });
    }

    const jwtSecret = getEnvVar('JWT_SECRET');
    if (!jwtSecret) {
      return handleUseCaseError<GetCurrentUserErrorResponse>(
        createAppError({}, 'errors.auth.configMissing'),
        'executeGetCurrentUser'
      );
    }

    if (!tokenResult.token) {
      return createAuthorizationError<GetCurrentUserErrorResponse>({
        key: 'errors.auth.tokenMissing',
      });
    }

    const jwtResult = verifyJWTToken(tokenResult.token, jwtSecret);
    if (!jwtResult.isValid) {
      return createAuthorizationError<GetCurrentUserErrorResponse>({
        key: 'errors.auth.tokenInvalid',
      });
    }

    if (!jwtResult.payload) {
      return createAuthorizationError<GetCurrentUserErrorResponse>({
        key: 'errors.auth.tokenPayloadInvalid',
      });
    }

    const payloadValidation = validateTokenPayload(jwtResult.payload);
    if (!payloadValidation.isValid) {
      return createValidationError<GetCurrentUserErrorResponse>(
        { key: payloadValidation.i18nKey ?? 'errors.auth.tokenInvalid' },
        payloadValidation.field
      );
    }

    const user = await authRepository.findUserById(jwtResult.payload.userId);
    if (!user) {
      return createNotFoundError<GetCurrentUserErrorResponse>('Usuario', jwtResult.payload.userId);
    }

    const accountValidation = validateUserAccount(user);
    if (!accountValidation.isValid) {
      return createAuthorizationError<GetCurrentUserErrorResponse>(
        { key: accountValidation.i18nKey ?? 'errors.auth.accountInvalid' },
        'account_status'
      );
    }

    const userProfile = formatUserProfile(user);
    const sessionMetadata = generateSessionMetadata(jwtResult.payload);

    return {
      data: {
        session: sessionMetadata,
        user: userProfile,
      },
      status: HTTP_STATUS.OK,
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<GetCurrentUserErrorResponse>(error, 'executeGetCurrentUser');
  }
};
