/**
 * User Mapper Tests
 *
 * Tests user entity transformation from API data.
 * Spanish locale mandatory.
 */

import { transformUser, transformUserFull } from './user.mapper';

describe('transformUser', () => {
  it('transforms API data to UserEntity', () => {
    const apiData = {
      city: 'Guadalajara',
      createdAt: '2025-01-15T10:00:00Z',
      email: 'maria@ejemplo.com',
      firstName: 'María',
      id: 'user-1',
      isActive: true,
      lastLoginAt: '2025-01-20T08:00:00Z',
      lastName: 'García',
      phone: '+52 33 1234 5678',
      role: 'participant',
      state: 'Jalisco',
      updatedAt: '2025-01-20T08:00:00Z',
    };

    const result = transformUser(apiData as never);

    expect(result.id).toBe('user-1');
    expect(result.email).toBe('maria@ejemplo.com');
    expect(result.firstName).toBe('María');
    expect(result.lastName).toBe('García');
    expect(result.role).toBe('participant');
    expect(result.isActive).toBe(true);
    expect(result.city).toBe('Guadalajara');
    expect(result.state).toBe('Jalisco');
    expect(result.phone).toBe('+52 33 1234 5678');
    expect(result.passwordHash).toBe('');
    expect(result.deletedAt).toBeNull();
    expect(result.deletedBy).toBeNull();
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.lastLoginAt).toBeInstanceOf(Date);
  });

  it('handles null optional fields', () => {
    const apiData = {
      createdAt: '2025-01-15T10:00:00Z',
      email: 'jose@ejemplo.com',
      firstName: 'José',
      id: 'user-2',
      isActive: true,
      lastLoginAt: null,
      lastName: 'López',
      role: 'admin',
      updatedAt: '2025-01-15T10:00:00Z',
    };

    const result = transformUser(apiData as never);

    expect(result.lastLoginAt).toBeNull();
    expect(result.city).toBeNull();
    expect(result.state).toBeNull();
    expect(result.phone).toBeNull();
  });
});

describe('transformUserFull', () => {
  it('transforms full user data', () => {
    const userData = {
      age: 28,
      bio: 'Participante activa',
      city: 'Monterrey',
      country: 'México',
      createdAt: '2025-01-15T10:00:00Z',
      deletedAt: null,
      deletedBy: null,
      email: 'maria@ejemplo.com',
      firstName: 'María',
      id: 'user-1',
      isActive: true,
      lastLoginAt: '2025-01-20T08:00:00Z',
      lastName: 'García',
      neighborhood: 'Centro',
      number: '123',
      phone: '+52 81 1234 5678',
      photoUrl: 'https://example.com/photo.jpg',
      role: 'participant',
      state: 'Nuevo León',
      street: 'Av. Principal',
      updatedAt: '2025-01-20T08:00:00Z',
      zipCode: '64000',
    };

    const result = transformUserFull(userData as never);

    expect(result.passwordHash).toBe('');
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
    expect(result.deletedAt).toBeNull();
  });

  it('handles deletedAt date', () => {
    const userData = {
      createdAt: '2025-01-15T10:00:00Z',
      deletedAt: '2025-02-01T10:00:00Z',
      email: 'borrado@ejemplo.com',
      firstName: 'Usuario',
      id: 'user-3',
      isActive: false,
      lastLoginAt: null,
      lastName: 'Borrado',
      role: 'participant',
      updatedAt: '2025-02-01T10:00:00Z',
    };

    const result = transformUserFull(userData as never);

    expect(result.deletedAt).toBeInstanceOf(Date);
  });
});
