/**
 * Request Password Reset Use Case Tests
 *
 * Essential tests for password reset request initiation.
 * Tests email validation and security (no email enumeration).
 * No hay proveedor de correo: lo observable es la creación del token.
 * Spanish locale mandatory.
 */

import { expectFailure, expectSuccessData } from '@testing/helpers';
import { prisma } from '@database';

import { executeRequestPasswordReset } from './request-password-reset.use-case';

vi.mock('@database', () => ({
  prisma: {
    passwordResetToken: {
      create: vi.fn(),
      updateMany: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('@helpers/validation/env-var-validator', () => ({
  getEnvVar: vi.fn(() => 'http://localhost:3000'),
}));

describe('executeRequestPasswordReset', () => {
  const validEmail = 'maria.garcia@example.com';
  const mockUserId = 'user-123';

  const mockUser = {
    email: validEmail,
    firstName: 'María',
    id: mockUserId,
    isActive: true,
  };

  beforeEach(() => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as never);
    vi.mocked(prisma.passwordResetToken.updateMany).mockResolvedValue({ count: 0 });
    vi.mocked(prisma.passwordResetToken.create).mockResolvedValue({
      id: 'token-123',
      token: 'generated-token',
    } as never);
  });

  describe('Input Validation', () => {
    it('rejects missing email', async () => {
      expectFailure(await executeRequestPasswordReset({ email: '' }), 'requerido');
    });

    it('rejects invalid email format', async () => {
      expectFailure(await executeRequestPasswordReset({ email: 'invalid-email' }), 'válido');
    });
  });

  describe('Security (No Email Enumeration)', () => {
    it('returns success even for non-existent email', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null);
      const data = expectSuccessData(
        await executeRequestPasswordReset({ email: 'nonexistent@example.com' })
      );
      expect(data?.message).toContain('Si el correo está registrado');
    });

    it('returns same message for inactive user', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
        ...mockUser,
        isActive: false,
      } as never);
      const data = expectSuccessData(await executeRequestPasswordReset({ email: validEmail }));
      expect(data).toBeDefined();
    });

    it('no crea token para un usuario inactivo', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
        ...mockUser,
        isActive: false,
      } as never);
      await executeRequestPasswordReset({ email: validEmail });
      expect(prisma.passwordResetToken.create).not.toHaveBeenCalled();
    });
  });

  describe('Success Path', () => {
    it('invalida los tokens previos y crea uno nuevo para un usuario activo', async () => {
      expectSuccessData(await executeRequestPasswordReset({ email: validEmail }));
      expect(prisma.passwordResetToken.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ userId: mockUserId }) })
      );
      expect(prisma.passwordResetToken.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ userId: mockUserId }),
        })
      );
    });

    it('retorna mensaje genérico de éxito', async () => {
      const data = expectSuccessData(await executeRequestPasswordReset({ email: validEmail }));
      expect(data?.message).toContain('Si el correo está registrado');
    });

    it('invalida tokens previos antes de crear nuevo', async () => {
      await executeRequestPasswordReset({ email: validEmail });
      expect(prisma.passwordResetToken.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ usedAt: expect.any(Date) }),
          where: expect.objectContaining({ usedAt: null, userId: mockUserId }),
        })
      );
    });
  });
});
