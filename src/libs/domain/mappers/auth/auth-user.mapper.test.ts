import { transformAuthUser } from './auth-user.mapper';

describe('transformAuthUser', () => {
  const baseUser = {
    createdAt: '2026-01-15T00:00:00Z',
    email: 'maria@ejemplo.com',
    firstName: 'María',
    id: 'u-1',
    isActive: true,
    lastLoginAt: '2026-03-01T00:00:00Z',
    lastName: 'García',
    phone: '+52 55 1234 5678',
    role: 'participant' as const,
    updatedAt: '2026-02-01T00:00:00Z',
  };

  it('transforms basic user data', () => {
    const result = transformAuthUser(baseUser as never);
    expect(result.id).toBe('u-1');
    expect(result.email).toBe('maria@ejemplo.com');
    expect(result.firstName).toBe('María');
    expect(result.lastName).toBe('García');
    expect(result.role).toBe('participant');
    expect(result.isActive).toBe(true);
  });

  it('preserves ISO date strings', () => {
    const result = transformAuthUser(baseUser as never);
    expect(result.createdAt).toBe('2026-01-15T00:00:00Z');
    expect(result.updatedAt).toBe('2026-02-01T00:00:00Z');
    expect(result.lastLoginAt).toBe('2026-03-01T00:00:00Z');
  });

  it('converts Date objects to ISO strings', () => {
    const withDates = {
      ...baseUser,
      createdAt: new Date('2026-01-15T00:00:00Z'),
      updatedAt: new Date('2026-02-01T00:00:00Z'),
    };
    const result = transformAuthUser(withDates as never);
    expect(result.createdAt).toBe('2026-01-15T00:00:00.000Z');
  });

  it('uses fallback date when createdAt is null', () => {
    const result = transformAuthUser({ ...baseUser, createdAt: null } as never);
    expect(result.createdAt).toBe('1970-01-01T00:00:00.000Z');
  });

  it('handles null lastLoginAt', () => {
    const result = transformAuthUser({ ...baseUser, lastLoginAt: null } as never);
    expect(result.lastLoginAt).toBeNull();
  });

  it('maps extended fields with defaults', () => {
    const result = transformAuthUser(baseUser as never);
    expect(result.age).toBeNull();
    expect(result.bio).toBeNull();
    expect(result.city).toBeNull();
    expect(result.street).toBeNull();
    expect(result.photoUrl).toBeNull();
    expect(result.passwordHash).toBe('');
    expect(result.deletedAt).toBeNull();
    expect(result.deletedBy).toBeNull();
  });

  it('maps extended fields when present', () => {
    const extended = {
      ...baseUser,
      age: 30,
      bio: 'Participante activa',
      city: 'Ciudad de México',
      photoUrl: 'https://storage.example.com/photo.jpg',
      state: 'CDMX',
      street: 'Avenida Reforma',
      zipCode: '11560',
    };
    const result = transformAuthUser(extended as never);
    expect(result.age).toBe(30);
    expect(result.bio).toBe('Participante activa');
    expect(result.city).toBe('Ciudad de México');
    expect(result.photoUrl).toBe('https://storage.example.com/photo.jpg');
  });
});
