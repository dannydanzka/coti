/**
 * ProfileEditScreen Validation Tests
 *
 * Tests for Zod validation schema.
 * Spanish locale error messages.
 */

import { profileEditFormSchema } from './ProfileEditScreen.validation';

describe('ProfileEditScreen Validation', () => {
  const validData = {
    bio: 'Apasionada por el bienestar',
    city: 'Ciudad de México',
    country: 'México',
    firstName: 'María',
    lastName: 'García',
    neighborhood: 'Coyoacán',
    number: '123',
    phone: '+521234567890',
    state: 'CDMX',
    street: 'Av. Reforma',
    zipCode: '06600',
  };

  it('acepta datos válidos', () => {
    const result = profileEditFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rechaza nombre vacío', () => {
    const result = profileEditFormSchema.safeParse({ ...validData, firstName: '' });
    expect(result.success).toBe(false);
  });

  it('rechaza apellido vacío', () => {
    const result = profileEditFormSchema.safeParse({ ...validData, lastName: '' });
    expect(result.success).toBe(false);
  });

  it('acepta campos opcionales vacíos', () => {
    const result = profileEditFormSchema.safeParse({
      ...validData,
      bio: '',
      neighborhood: '',
      number: '',
      phone: '',
    });
    expect(result.success).toBe(true);
  });

  it('acepta age válido', () => {
    const result = profileEditFormSchema.safeParse({ ...validData, age: 28 });
    expect(result.success).toBe(true);
  });

  it('rechaza age fuera de rango', () => {
    const result = profileEditFormSchema.safeParse({ ...validData, age: 0 });
    expect(result.success).toBe(false);
  });
});
