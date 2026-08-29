/**
 * Reset Password Use Case
 *
 * Business logic for completing password reset process.
 * Validates token, checks expiration, and updates password.
 */

import { createValidationError, handleUseCaseError } from '@use-case-error';
import { hashPassword } from '@helpers';
import { HTTP_STATUS } from '@constants';
import { prisma } from '@database';

import type {
  PasswordValidationResult,
  ResetPasswordErrorResponse,
  ResetPasswordParams,
  ResetPasswordResult,
} from './reset-password.interfaces';

const BCRYPT_ROUNDS = 12;

const PASSWORD_RULES = {
  hasLowercase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecial: /[!@#$%^&*(),.?":{}|<>]/,
  hasUppercase: /[A-Z]/,
  minLength: 8,
};

/**
 * Validate password meets security requirements
 */
const validatePasswordStrength = (password: string): PasswordValidationResult => {
  if (!password) {
    return { i18nKey: 'errors.auth.passwordRequired', isValid: false };
  }
  if (password.length < PASSWORD_RULES.minLength) {
    return {
      i18nKey: 'errors.auth.passwordMinLength',
      isValid: false,
      params: { minLength: PASSWORD_RULES.minLength },
    };
  }
  if (!PASSWORD_RULES.hasUppercase.test(password)) {
    return { i18nKey: 'errors.auth.passwordRequiresUppercase', isValid: false };
  }
  if (!PASSWORD_RULES.hasLowercase.test(password)) {
    return { i18nKey: 'errors.auth.passwordRequiresLowercase', isValid: false };
  }
  if (!PASSWORD_RULES.hasNumber.test(password)) {
    return { i18nKey: 'errors.auth.passwordRequiresNumber', isValid: false };
  }
  if (!PASSWORD_RULES.hasSpecial.test(password)) {
    return { i18nKey: 'errors.auth.passwordRequiresSpecial', isValid: false };
  }
  return { isValid: true };
};

/**
 * Execute password reset with token validation
 */
export const executeResetPassword = async (
  params: ResetPasswordParams
): Promise<ResetPasswordResult> => {
  try {
    const { confirmPassword, newPassword, token } = params;

    if (!token) {
      return createValidationError<ResetPasswordErrorResponse>(
        { key: 'errors.auth.passwordResetTokenMissing' },
        'token'
      );
    }

    if (!newPassword || !confirmPassword) {
      return createValidationError<ResetPasswordErrorResponse>(
        { key: 'errors.auth.passwordRequiredForReset' },
        'newPassword'
      );
    }

    if (newPassword !== confirmPassword) {
      return createValidationError<ResetPasswordErrorResponse>(
        { key: 'errors.auth.passwordMismatch' },
        'confirmPassword'
      );
    }

    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return createValidationError<ResetPasswordErrorResponse>(
        {
          key: passwordValidation.i18nKey ?? 'errors.auth.passwordInvalid',
          params: passwordValidation.params,
        },
        'newPassword'
      );
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return createValidationError<ResetPasswordErrorResponse>(
        { key: 'errors.auth.passwordResetTokenInvalid' },
        'token'
      );
    }

    if (resetToken.usedAt) {
      return createValidationError<ResetPasswordErrorResponse>(
        { key: 'errors.auth.passwordResetTokenUsed' },
        'token'
      );
    }

    if (new Date() > resetToken.expiresAt) {
      return createValidationError<ResetPasswordErrorResponse>(
        { key: 'errors.auth.passwordResetTokenExpired' },
        'token'
      );
    }

    const user = await prisma.user.findUnique({
      select: { id: true, isActive: true },
      where: { id: resetToken.userId },
    });

    if (!user?.isActive) {
      return createValidationError<ResetPasswordErrorResponse>(
        { key: 'errors.auth.passwordResetAccountInactive' },
        'token'
      );
    }

    const hashedPassword = await hashPassword(newPassword, { saltRounds: BCRYPT_ROUNDS });

    await prisma.$transaction([
      prisma.user.update({
        data: { passwordHash: hashedPassword },
        where: { id: user.id },
      }),
      prisma.passwordResetToken.update({
        data: { usedAt: new Date() },
        where: { id: resetToken.id },
      }),
    ]);

    return {
      data: {
        message: 'Tu contraseña ha sido actualizada exitosamente.',
      },
      status: HTTP_STATUS.OK,
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<ResetPasswordErrorResponse>(error, 'executeResetPassword');
  }
};
