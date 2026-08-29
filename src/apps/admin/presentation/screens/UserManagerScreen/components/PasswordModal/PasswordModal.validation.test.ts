vi.mock('@constants', () => ({
  FIELD_LIMITS: { PASSWORD_MAX: 128 },
}));

import { changePasswordSchema } from './PasswordModal.validation';

describe('changePasswordSchema', () => {
  it('accepts matching passwords', () => {
    const result = changePasswordSchema.safeParse({
      confirmPassword: 'Contraseña123',
      newPassword: 'Contraseña123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects mismatched passwords', () => {
    const result = changePasswordSchema.safeParse({
      confirmPassword: 'Diferente123',
      newPassword: 'Contraseña123',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short password', () => {
    const result = changePasswordSchema.safeParse({
      confirmPassword: 'abc',
      newPassword: 'abc',
    });
    expect(result.success).toBe(false);
  });
});
