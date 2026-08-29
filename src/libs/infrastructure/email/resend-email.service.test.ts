/**
 * Resend Email Service Tests
 *
 * Tests email sending operations with mocked Resend API.
 * Spanish locale mandatory.
 */

import { ResendEmailService } from './resend-email.service';

const mockSend = vi.fn();

vi.mock('@config', () => ({
  DEFAULT_FROM_EMAIL: 'noreply@travelsavings.app',
  SYSTEM_EMAILS: { admin: 'admin@travelsavings.app' },
  isResendConfigured: vi.fn().mockReturnValue(true),
  renderEmailTemplate: vi.fn().mockResolvedValue('<html>Email</html>'),
  resend: {
    emails: {
      send: (...args: unknown[]) => mockSend(...args),
    },
  },
}));

vi.mock('./templates/contact/ContactEmail', () => ({
  ContactEmail: () => null,
}));

vi.mock('./templates/welcome/WelcomeEmail', () => ({
  WelcomeEmail: () => null,
}));

vi.mock('./templates/password-reset/PasswordResetEmail', () => ({
  PasswordResetEmail: () => null,
}));

vi.mock('./templates/payment/PaymentConfirmationEmail', () => ({
  PaymentConfirmationEmail: () => null,
}));

describe('ResendEmailService', () => {
  beforeEach(() => {
    mockSend.mockResolvedValue({ data: { id: 'msg-123' }, error: null });
  });

  describe('sendWelcomeEmail', () => {
    it('sends welcome email', async () => {
      const result = await ResendEmailService.sendWelcomeEmail('jose@ejemplo.com', 'José López');

      expect(result.success).toBe(true);
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('sends password reset email', async () => {
      const result = await ResendEmailService.sendPasswordResetEmail(
        'maria@ejemplo.com',
        'María',
        'https://travelsavings.app/reset?token=abc123'
      );

      expect(result.success).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('handles Resend API error', async () => {
      mockSend.mockResolvedValueOnce({
        data: null,
        error: { message: 'Error de API', name: 'api_error' },
      });

      const result = await ResendEmailService.sendWelcomeEmail('maria@ejemplo.com', 'María');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Error de API');
    });

    it('handles thrown exception', async () => {
      mockSend.mockRejectedValueOnce(new Error('Error de conexión'));

      const result = await ResendEmailService.sendWelcomeEmail('maria@ejemplo.com', 'María');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Error de conexión');
    });
  });
});
