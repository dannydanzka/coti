/**
 * Request Password Reset Use Case
 *
 * Business logic for initiating password reset process.
 * Generates a secure token and stores it.
 *
 * NO envía correo: el proyecto no tiene proveedor de email. Fuera de producción
 * el enlace se escribe en el log del servidor para poder recorrer el flujo; en
 * producción el token queda creado pero nadie lo recibe (ver Deudas conocidas).
 *
 * Security: Always returns success message even if email not found (prevents enumeration)
 */

import { randomBytes } from 'crypto';

import { createValidator, getEnvVar } from '@helpers';
import { handleUseCaseError } from '@use-case-error';
import { HTTP_STATUS } from '@constants';
import { logInfo } from '@logger';
import { prisma } from '@database';

import type {
  RequestPasswordResetErrorResponse,
  RequestPasswordResetParams,
  RequestPasswordResetResult,
} from './request-password-reset.interfaces';

const TOKEN_EXPIRY_HOURS = 1;
const TOKEN_LENGTH_BYTES = 32;

/**
 * Generate secure random token
 */
const generateSecureToken = (): string => {
  return randomBytes(TOKEN_LENGTH_BYTES).toString('hex');
};

/**
 * Calculate token expiration date
 */
const calculateExpirationDate = (): Date => {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + TOKEN_EXPIRY_HOURS);
  return expiration;
};

/**
 * Build password reset URL
 */
const buildResetUrl = (token: string): string => {
  const port = process.env['PORT'] || '3000';
  const baseUrl = getEnvVar('NEXT_PUBLIC_BASE_URL', {
    defaultValue: `http://localhost:${port}`,
    required: false,
  });
  return `${baseUrl}/reset-password?token=${token}`;
};

/**
 * Execute request password reset with security-first approach
 */
export const executeRequestPasswordReset = async (
  params: RequestPasswordResetParams
): Promise<RequestPasswordResetResult> => {
  try {
    const validator = createValidator<RequestPasswordResetParams>();
    const validate = validator.compose(
      validator.required('email', 'El correo electrónico es requerido'),
      validator.email('email')
    );

    const validationError = validate(params);
    if (validationError) {
      return validationError;
    }

    const email = params.email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      select: { email: true, firstName: true, id: true, isActive: true },
      where: { email },
    });

    if (user?.isActive) {
      await prisma.passwordResetToken.updateMany({
        data: { usedAt: new Date() },
        where: { usedAt: null, userId: user.id },
      });

      const token = generateSecureToken();
      const expiresAt = calculateExpirationDate();

      await prisma.passwordResetToken.create({
        data: {
          expiresAt,
          token,
          userId: user.id,
        },
      });

      if (process.env['NODE_ENV'] !== 'production') {
        logInfo(`Enlace de recuperación: ${buildResetUrl(token)}`, 'executeRequestPasswordReset');
      }
    }

    return {
      data: {
        message:
          'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.',
      },
      status: HTTP_STATUS.OK,
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<RequestPasswordResetErrorResponse>(
      error,
      'executeRequestPasswordReset'
    );
  }
};
