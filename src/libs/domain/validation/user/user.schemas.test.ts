import {
  createUserBodySchema,
  createUserValidationSchema,
  updateUserPasswordValidationSchema,
  updateUserValidationSchema,
} from './user.schemas';

describe('User Validation Schemas', () => {
  describe('createUserValidationSchema', () => {
    const validUser = {
      email: 'maria@ejemplo.com',
      name: 'María García',
      password: 'Pass123abc',
      role: 'participant' as const,
    };

    it('validates complete user data', () => {
      expect(createUserValidationSchema.safeParse(validUser).success).toBe(true);
    });

    it('rejects invalid email', () => {
      expect(createUserValidationSchema.safeParse({ ...validUser, email: 'bad' }).success).toBe(
        false
      );
    });

    it('rejects short name', () => {
      expect(createUserValidationSchema.safeParse({ ...validUser, name: 'A' }).success).toBe(false);
    });

    it('rejects weak password', () => {
      expect(createUserValidationSchema.safeParse({ ...validUser, password: 'weak' }).success).toBe(
        false
      );
    });

    it('rejects invalid role', () => {
      expect(
        createUserValidationSchema.safeParse({ ...validUser, role: 'superadmin' }).success
      ).toBe(false);
    });

    it('accepts all valid roles', () => {
      expect(createUserValidationSchema.safeParse({ ...validUser, role: 'owner' }).success).toBe(
        true
      );
      expect(createUserValidationSchema.safeParse({ ...validUser, role: 'admin' }).success).toBe(
        true
      );
      expect(
        createUserValidationSchema.safeParse({ ...validUser, role: 'participant' }).success
      ).toBe(true);
    });
  });

  describe('updateUserValidationSchema', () => {
    const validUpdate = {
      email: 'jose@ejemplo.com',
      isActive: true,
      name: 'José López',
      role: 'admin' as const,
    };

    it('validates complete update data', () => {
      expect(updateUserValidationSchema.safeParse(validUpdate).success).toBe(true);
    });

    it('requires isActive field', () => {
      const { isActive: _a, ...noActive } = validUpdate;
      expect(updateUserValidationSchema.safeParse(noActive).success).toBe(false);
    });
  });

  describe('createUserBodySchema', () => {
    const validBody = {
      email: 'maria@ejemplo.com',
      firstName: 'María',
      lastName: 'García',
      password: 'Pass123abc',
      role: 'participant' as const,
    };

    it('validates API user creation body', () => {
      expect(createUserBodySchema.safeParse(validBody).success).toBe(true);
    });

    it('defaults isActive to true', () => {
      const result = createUserBodySchema.safeParse(validBody);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isActive).toBe(true);
      }
    });

    it('accepts optional phone', () => {
      expect(
        createUserBodySchema.safeParse({ ...validBody, phone: '+52 55 1234 5678' }).success
      ).toBe(true);
    });

    it('rejects password without uppercase', () => {
      expect(createUserBodySchema.safeParse({ ...validBody, password: 'pass123abc' }).success).toBe(
        false
      );
    });

    it('rejects password without number', () => {
      expect(
        createUserBodySchema.safeParse({ ...validBody, password: 'Passwordabc' }).success
      ).toBe(false);
    });
  });

  describe('updateUserPasswordValidationSchema', () => {
    it('validates matching passwords', () => {
      const result = updateUserPasswordValidationSchema.safeParse({
        confirmPassword: 'NewPass123',
        currentPassword: 'OldPass123',
        newPassword: 'NewPass123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects non-matching passwords', () => {
      const result = updateUserPasswordValidationSchema.safeParse({
        confirmPassword: 'Different123',
        currentPassword: 'OldPass123',
        newPassword: 'NewPass123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects short password', () => {
      const result = updateUserPasswordValidationSchema.safeParse({
        confirmPassword: 'Ab1',
        currentPassword: 'OldPass123',
        newPassword: 'Ab1',
      });
      expect(result.success).toBe(false);
    });
  });
});
