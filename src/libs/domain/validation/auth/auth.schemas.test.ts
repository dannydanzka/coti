import {
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  loginBodySchema,
  loginValidationSchema,
  registerValidationSchema,
  resetPasswordBodySchema,
  resetPasswordValidationSchema,
  shippingAddressValidationSchema,
  signupBodySchema,
} from './auth.schemas';

describe('Auth Validation Schemas', () => {
  describe('loginValidationSchema', () => {
    it('validates correct login data', () => {
      const result = loginValidationSchema.safeParse({
        email: 'maria@ejemplo.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = loginValidationSchema.safeParse({
        email: 'not-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects short password', () => {
      const result = loginValidationSchema.safeParse({
        email: 'maria@ejemplo.com',
        password: '123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('changePasswordValidationSchema', () => {
    it('validates matching passwords', () => {
      const result = changePasswordValidationSchema.safeParse({
        confirmPassword: 'NewPass123',
        currentPassword: 'OldPass123',
        newPassword: 'NewPass123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects non-matching passwords', () => {
      const result = changePasswordValidationSchema.safeParse({
        confirmPassword: 'Different123',
        currentPassword: 'OldPass123',
        newPassword: 'NewPass123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects weak password', () => {
      const result = changePasswordValidationSchema.safeParse({
        confirmPassword: 'weak',
        currentPassword: 'OldPass123',
        newPassword: 'weak',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('forgotPasswordValidationSchema', () => {
    it('validates valid email', () => {
      const result = forgotPasswordValidationSchema.safeParse({ email: 'jose@ejemplo.com' });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = forgotPasswordValidationSchema.safeParse({ email: 'bad' });
      expect(result.success).toBe(false);
    });
  });

  describe('resetPasswordValidationSchema', () => {
    it('validates matching strong passwords', () => {
      const result = resetPasswordValidationSchema.safeParse({
        confirmPassword: 'NewPass123',
        password: 'NewPass123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects non-matching passwords', () => {
      const result = resetPasswordValidationSchema.safeParse({
        confirmPassword: 'Different123',
        password: 'NewPass123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('registerValidationSchema', () => {
    const validData = {
      confirmEmail: 'maria@ejemplo.com',
      confirmPassword: 'Pass123!@#',
      email: 'maria@ejemplo.com',
      firstName: 'María',
      lastName: 'García',
      password: 'Pass123!@#',
    };

    it('validates complete registration data', () => {
      const result = registerValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects non-matching emails', () => {
      const result = registerValidationSchema.safeParse({
        ...validData,
        confirmEmail: 'other@ejemplo.com',
      });
      expect(result.success).toBe(false);
    });

    it('rejects non-matching passwords', () => {
      const result = registerValidationSchema.safeParse({
        ...validData,
        confirmPassword: 'Different123!',
      });
      expect(result.success).toBe(false);
    });

    it('rejects password without special character', () => {
      const result = registerValidationSchema.safeParse({
        ...validData,
        confirmPassword: 'Pass1234',
        password: 'Pass1234',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('signupBodySchema', () => {
    it('validates API signup data', () => {
      const result = signupBodySchema.safeParse({
        email: 'maria@ejemplo.com',
        firstName: 'María',
        lastName: 'García',
        password: 'Password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects short firstName', () => {
      const result = signupBodySchema.safeParse({
        email: 'maria@ejemplo.com',
        firstName: 'M',
        lastName: 'García',
        password: 'Password123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('loginBodySchema', () => {
    it('validates login body', () => {
      const result = loginBodySchema.safeParse({
        email: 'maria@ejemplo.com',
        password: 'pass',
      });
      expect(result.success).toBe(true);
    });

    it('rejects empty password', () => {
      const result = loginBodySchema.safeParse({
        email: 'maria@ejemplo.com',
        password: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('resetPasswordBodySchema', () => {
    it('validates reset password body', () => {
      const result = resetPasswordBodySchema.safeParse({
        confirmPassword: 'NewPass123',
        newPassword: 'NewPass123',
        token: 'valid-token-123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing token', () => {
      const result = resetPasswordBodySchema.safeParse({
        confirmPassword: 'NewPass123',
        newPassword: 'NewPass123',
        token: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('shippingAddressValidationSchema', () => {
    const validAddress = {
      city: 'Polanco',
      exteriorNumber: '123',
      postalCode: '11560',
      state: 'Ciudad de México',
      street: 'Avenida Reforma',
    };

    it('validates complete address', () => {
      const result = shippingAddressValidationSchema.safeParse(validAddress);
      expect(result.success).toBe(true);
    });

    it('accepts optional fields', () => {
      const result = shippingAddressValidationSchema.safeParse({
        ...validAddress,
        interiorNumber: '4A',
        references: 'Frente al parque',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid postal code', () => {
      const result = shippingAddressValidationSchema.safeParse({
        ...validAddress,
        postalCode: '123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects missing street', () => {
      const { street: _s, ...noStreet } = validAddress;
      const result = shippingAddressValidationSchema.safeParse(noStreet);
      expect(result.success).toBe(false);
    });
  });
});
