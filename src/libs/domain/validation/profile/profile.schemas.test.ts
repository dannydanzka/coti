import { updateProfileBodySchema } from './profile.schemas';

describe('Profile Validation Schemas', () => {
  describe('updateProfileBodySchema', () => {
    const validProfile = {
      city: 'Ciudad de México',
      number: '123',
      state: 'CDMX',
      street: 'Avenida Reforma',
      zipCode: '11560',
    };

    it('validates complete profile', () => {
      expect(updateProfileBodySchema.safeParse(validProfile).success).toBe(true);
    });

    it('validates with all optional fields', () => {
      const result = updateProfileBodySchema.safeParse({
        ...validProfile,
        age: 30,
        bio: 'Participante activa',
        country: 'México',
        firstName: 'María',
        lastName: 'García',
        phone: '+52 55 1234 5678',
      });
      expect(result.success).toBe(true);
    });

    it('rejects age over 120', () => {
      expect(updateProfileBodySchema.safeParse({ ...validProfile, age: 150 }).success).toBe(false);
    });

    it('rejects bio over 200 chars', () => {
      expect(
        updateProfileBodySchema.safeParse({ ...validProfile, bio: 'a'.repeat(201) }).success
      ).toBe(false);
    });

    it('rejects short firstName', () => {
      expect(updateProfileBodySchema.safeParse({ ...validProfile, firstName: 'A' }).success).toBe(
        false
      );
    });
  });
});
