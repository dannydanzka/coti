/**
 * Reset Password Use Case Tests
 *
 * Essential tests for password reset completion.
 * Tests token validation, password strength, and security rules.
 * Spanish locale mandatory.
 */

import { expectFailure, expectSuccessData } from '@testing/helpers';
import { prisma } from '@database';

import { executeResetPassword } from './reset-password.use-case';

vi.mock('@database', () => ({
  prisma: {
    $transaction: vi.fn(),
    passwordResetToken: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('executeResetPassword', () => {
  const validToken = 'valid-reset-token-123';
  const validPassword = 'SecureP@ss123!';
  const mockUserId = 'user-123';

  const mockResetToken = {
    expiresAt: new Date(Date.now() + 3600000),
    id: 'token-123',
    token: validToken,
    usedAt: null,
    userId: mockUserId,
  };

  const mockUser = {
    id: mockUserId,
    isActive: true,
  };

  beforeEach(() => {
    vi.mocked(prisma.passwordResetToken.findUnique).mockResolvedValue(mockResetToken as never);
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as never);
    vi.mocked(prisma.$transaction).mockResolvedValue([{}, {}]);
  });

  describe('Input Validation', () => {
    it('rejects missing token', async () => {
      expectFailure(
        await executeResetPassword({
          confirmPassword: validPassword,
          newPassword: validPassword,
          token: '',
        }),
        'Token'
      );
    });

    it('rejects mismatched passwords', async () => {
      expectFailure(
        await executeResetPassword({
          confirmPassword: 'DifferentP@ss123!',
          newPassword: validPassword,
          token: validToken,
        }),
        'no coinciden'
      );
    });
  });

  describe('Password Strength Validation', () => {
    it('rejects password shorter than 8 characters', async () => {
      expectFailure(
        await executeResetPassword({
          confirmPassword: 'Abc1@',
          newPassword: 'Abc1@',
          token: validToken,
        }),
        '8 caracteres'
      );
    });

    it('rejects password without uppercase', async () => {
      expectFailure(
        await executeResetPassword({
          confirmPassword: 'lowercase123!',
          newPassword: 'lowercase123!',
          token: validToken,
        }),
        'mayúscula'
      );
    });
  });

  describe('Token Validation', () => {
    it('rejects invalid token', async () => {
      vi.mocked(prisma.passwordResetToken.findUnique).mockResolvedValueOnce(null);
      expectFailure(
        await executeResetPassword({
          confirmPassword: validPassword,
          newPassword: validPassword,
          token: 'invalid-token',
        }),
        'inválido'
      );
    });

    it('rejects already used token', async () => {
      vi.mocked(prisma.passwordResetToken.findUnique).mockResolvedValueOnce({
        ...mockResetToken,
        usedAt: new Date(),
      } as never);
      expectFailure(
        await executeResetPassword({
          confirmPassword: validPassword,
          newPassword: validPassword,
          token: validToken,
        }),
        'ya fue utilizado'
      );
    });

    it('rejects expired token', async () => {
      vi.mocked(prisma.passwordResetToken.findUnique).mockResolvedValueOnce({
        ...mockResetToken,
        expiresAt: new Date(Date.now() - 3600000),
      } as never);
      expectFailure(
        await executeResetPassword({
          confirmPassword: validPassword,
          newPassword: validPassword,
          token: validToken,
        }),
        'expirado'
      );
    });
  });

  describe('Success Cases', () => {
    it('resets password with valid data', async () => {
      const data = expectSuccessData(
        await executeResetPassword({
          confirmPassword: validPassword,
          newPassword: validPassword,
          token: validToken,
        })
      );
      expect(data?.message).toContain('exitosamente');
    });

    it('executes transaction to update password', async () => {
      await executeResetPassword({
        confirmPassword: validPassword,
        newPassword: validPassword,
        token: validToken,
      });
      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });
});
