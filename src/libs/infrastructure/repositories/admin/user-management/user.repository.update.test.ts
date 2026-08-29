/**
 * userRepository — update / updateProfile / updatePassword branch coverage
 *
 * Exercises the field-by-field update builder (all optional branches), the
 * email-conflict guard, the not-found guards, and the updateProfile defaults
 * (`?? null` / conditional firstName/lastName spreads).
 */

vi.mock('@database', () => ({
  prisma: {
    user: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import { prisma } from '@database';

import { userRepository } from './user.repository';

const prismaMock = vi.mocked(prisma);

const mockUser = {
  age: 30,
  bio: 'Bio',
  city: 'CDMX',
  country: 'México',
  createdAt: new Date('2026-01-01'),
  deletedAt: null,
  deletedBy: null,
  email: 'maria@ejemplo.com',
  firstName: 'María',
  id: 'user-1',
  isActive: true,
  lastLoginAt: new Date('2026-01-01'),
  lastName: 'García',
  neighborhood: 'Coyoacán',
  number: '123',
  passwordHash: 'hash',
  phone: '+521234567890',
  photoUrl: null,
  role: 'PARTICIPANT' as const,
  state: 'CDMX',
  street: 'Calle 1',
  updatedAt: new Date('2026-01-01'),
  zipCode: '04000',
};

describe('userRepository.update', () => {
  it('builds the update data from every provided field', async () => {
    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
    vi.mocked(prismaMock.user.findFirst).mockResolvedValueOnce(null);
    vi.mocked(prismaMock.user.update).mockResolvedValueOnce(mockUser);

    await userRepository.update({
      age: 31,
      bio: 'Nueva bio',
      city: 'Guadalajara',
      country: 'México',
      email: 'NUEVA@Ejemplo.com',
      firstName: 'Mariana',
      id: 'user-1',
      isActive: false,
      lastLoginAt: new Date('2026-02-01'),
      lastName: 'Gómez',
      neighborhood: 'Centro',
      number: '99',
      phone: '+520000000000',
      photoUrl: 'https://img/p.jpg',
      role: 'admin',
      state: 'Jalisco',
      street: 'Av. Central',
      zipCode: '44100',
    } as never);

    const call = vi.mocked(prismaMock.user.update).mock.calls[0]?.[0] as {
      data: Record<string, unknown>;
    };
    expect(call.data['email']).toBe('nueva@ejemplo.com');
    expect(call.data['isActive']).toBe(false);
    expect(call.data['city']).toBe('Guadalajara');
    expect(call.data['photoUrl']).toBe('https://img/p.jpg');
  });

  it('throws when the user does not exist or is soft-deleted', async () => {
    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);
    await expect(userRepository.update({ id: 'missing' })).rejects.toThrow('Usuario no encontrado');

    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce({
      ...mockUser,
      deletedAt: new Date(),
    });
    await expect(userRepository.update({ id: 'user-1' })).rejects.toThrow('Usuario no encontrado');
  });

  it('throws when the new email belongs to another user', async () => {
    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
    vi.mocked(prismaMock.user.findFirst).mockResolvedValueOnce({ ...mockUser, id: 'other' });

    await expect(
      userRepository.update({ email: 'taken@ejemplo.com', id: 'user-1' })
    ).rejects.toThrow('Ya existe un usuario con este email');
  });

  it('sends an empty update when no fields change', async () => {
    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
    vi.mocked(prismaMock.user.update).mockResolvedValueOnce(mockUser);

    await userRepository.update({ id: 'user-1' });

    const call = vi.mocked(prismaMock.user.update).mock.calls[0]?.[0] as {
      data: Record<string, unknown>;
    };
    expect(call.data).toEqual({});
  });
});

describe('userRepository.updatePassword', () => {
  it('updates the password hash for an existing user', async () => {
    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
    vi.mocked(prismaMock.user.update).mockResolvedValueOnce(mockUser);

    await userRepository.updatePassword('user-1', 'new-hash');

    expect(prismaMock.user.update).toHaveBeenCalledWith({
      data: { passwordHash: 'new-hash' },
      where: { id: 'user-1' },
    });
  });

  it('throws when the user is missing or soft-deleted', async () => {
    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);
    await expect(userRepository.updatePassword('missing', 'h')).rejects.toThrow(
      'Usuario no encontrado'
    );
  });
});

describe('userRepository.updateProfile', () => {
  it('applies defaults and conditional name spreads', async () => {
    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
    vi.mocked(prismaMock.user.update).mockResolvedValueOnce(mockUser);

    await userRepository.updateProfile('user-1', {
      city: 'Monterrey',
      firstName: 'Ana',
      lastName: 'Ruiz',
      number: '5',
      state: 'NL',
      street: 'Calle 5',
      zipCode: '64000',
    });

    const call = vi.mocked(prismaMock.user.update).mock.calls[0]?.[0] as {
      data: Record<string, unknown>;
    };
    expect(call.data['country']).toBe('México');
    expect(call.data['age']).toBeNull();
    expect(call.data['firstName']).toBe('Ana');
  });

  it('omits firstName/lastName when not provided and throws when missing', async () => {
    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
    vi.mocked(prismaMock.user.update).mockResolvedValueOnce(mockUser);

    await userRepository.updateProfile('user-1', {
      city: 'CDMX',
      country: 'España',
      number: '1',
      state: 'CDMX',
      street: 'Calle 1',
      zipCode: '01000',
    });

    const call = vi.mocked(prismaMock.user.update).mock.calls[0]?.[0] as {
      data: Record<string, unknown>;
    };
    expect(call.data['country']).toBe('España');
    expect('firstName' in call.data).toBe(false);

    vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);
    await expect(userRepository.updateProfile('missing', { city: 'x' } as never)).rejects.toThrow(
      'Usuario no encontrado'
    );
  });
});
