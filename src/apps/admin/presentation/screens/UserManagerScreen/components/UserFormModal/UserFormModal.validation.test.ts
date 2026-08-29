/**
 * UserFormModal Validation Tests
 *
 * Tests for Zod validation schemas.
 * Spanish locale error messages.
 */

import { createUserSchema, editUserSchema } from './UserFormModal.validation';

describe('UserFormModal Validation', () => {
  describe('createUserSchema', () => {
    const validData = {
      confirmPassword: 'password123',
      email: 'maria.garcia@ejemplo.com',
      firstName: 'María',
      lastName: 'García',
      password: 'password123',
      role: 'participant' as const,
    };

    it('acepta datos válidos', () => {
      const result = createUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rechaza email vacío', () => {
      const result = createUserSchema.safeParse({ ...validData, email: '' });
      expect(result.success).toBe(false);
    });

    it('rechaza email inválido', () => {
      const result = createUserSchema.safeParse({ ...validData, email: 'no-email' });
      expect(result.success).toBe(false);
    });

    it('rechaza nombre vacío', () => {
      const result = createUserSchema.safeParse({ ...validData, firstName: '' });
      expect(result.success).toBe(false);
    });

    it('rechaza apellido vacío', () => {
      const result = createUserSchema.safeParse({ ...validData, lastName: '' });
      expect(result.success).toBe(false);
    });

    it('rechaza contraseña corta', () => {
      const result = createUserSchema.safeParse({
        ...validData,
        confirmPassword: '1234567',
        password: '1234567',
      });
      expect(result.success).toBe(false);
    });

    it('rechaza contraseñas que no coinciden', () => {
      const result = createUserSchema.safeParse({
        ...validData,
        confirmPassword: 'diferente123',
      });
      expect(result.success).toBe(false);
    });

    it('rechaza rol inválido', () => {
      const result = createUserSchema.safeParse({ ...validData, role: 'superadmin' });
      expect(result.success).toBe(false);
    });

    it('acepta rol admin', () => {
      const result = createUserSchema.safeParse({ ...validData, role: 'admin' });
      expect(result.success).toBe(true);
    });
  });

  describe('editUserSchema', () => {
    const validData = {
      email: 'jose.lopez@ejemplo.com',
      firstName: 'José',
      lastName: 'López',
      role: 'admin' as const,
    };

    it('acepta datos válidos', () => {
      const result = editUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rechaza email vacío', () => {
      const result = editUserSchema.safeParse({ ...validData, email: '' });
      expect(result.success).toBe(false);
    });

    it('rechaza nombre vacío', () => {
      const result = editUserSchema.safeParse({ ...validData, firstName: '' });
      expect(result.success).toBe(false);
    });

    it('no requiere contraseña', () => {
      const result = editUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
