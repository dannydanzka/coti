/**
 * User Repository Tests
 *
 * Tests for Prisma-based user repository implementation.
 * Uses mocked Prisma client for isolated testing.
 */

vi.mock('@database', () => ({
  prisma: {
    user: {
      count: vi.fn(),
      create: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
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
  bio: 'Descripción de prueba',
  city: 'Ciudad de México',
  country: 'México',
  createdAt: new Date(),
  deletedAt: null,
  deletedBy: null,
  email: 'maria@ejemplo.com',
  firstName: 'María',
  id: 'user-1',
  isActive: true,
  lastLoginAt: new Date(),
  lastName: 'García',
  neighborhood: 'Coyoacán',
  number: '123',
  passwordHash: 'hashed-password',
  phone: '+521234567890',
  photoUrl: null,
  role: 'PARTICIPANT' as const,
  state: 'CDMX',
  street: 'Calle Principal',
  updatedAt: new Date(),
  zipCode: '04000',
};

describe('userRepository', () => {
  describe('findById', () => {
    it('debería encontrar usuario por ID', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);

      const result = await userRepository.findById('user-1');

      expect(result).toBeDefined();
      expect(result?.id).toBe('user-1');
      expect(result?.firstName).toBe('María');
    });

    it('debería retornar null para ID inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      const result = await userRepository.findById('user-inexistente');

      expect(result).toBeNull();
    });

    it('debería retornar null para usuario eliminado', async () => {
      const deletedUser = { ...mockUser, deletedAt: new Date() };
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(deletedUser);

      const result = await userRepository.findById('user-1');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('debería encontrar usuario por email', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);

      const result = await userRepository.findByEmail('maria@ejemplo.com');

      expect(result).toBeDefined();
      expect(result?.email).toBe('maria@ejemplo.com');
    });

    it('debería retornar null para email inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      const result = await userRepository.findByEmail('noexiste@ejemplo.com');

      expect(result).toBeNull();
    });
  });

  describe('findByRole', () => {
    it('debería encontrar usuarios por rol', async () => {
      vi.mocked(prismaMock.user.findMany).mockResolvedValueOnce([mockUser]);

      const result = await userRepository.findByRole('participant');

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
    });
  });

  describe('create', () => {
    it('debería crear nuevo usuario', async () => {
      const newUser = { ...mockUser, id: 'new-user-id' };
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);
      vi.mocked(prismaMock.user.create).mockResolvedValueOnce(newUser);

      const result = await userRepository.create({
        email: 'nuevo@ejemplo.com',
        firstName: 'Juan',
        lastName: 'López',
        password: 'hashed-password',
        role: 'participant',
      });

      expect(result.id).toBe('new-user-id');
      expect(prismaMock.user.create).toHaveBeenCalled();
    });

    it('debería lanzar error para email duplicado', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);

      await expect(
        userRepository.create({
          email: 'maria@ejemplo.com',
          firstName: 'Otro',
          lastName: 'Usuario',
          password: 'hashed-password',
          role: 'participant',
        })
      ).rejects.toThrow('Ya existe un usuario con este email');
    });
  });

  describe('update', () => {
    it('debería actualizar usuario existente', async () => {
      const updatedUser = { ...mockUser, firstName: 'María José' };
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
      vi.mocked(prismaMock.user.update).mockResolvedValueOnce(updatedUser);

      const result = await userRepository.update({
        firstName: 'María José',
        id: 'user-1',
      });

      expect(result.firstName).toBe('María José');
    });

    it('debería lanzar error para usuario inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      await expect(userRepository.update({ id: 'user-inexistente' })).rejects.toThrow(
        'Usuario no encontrado'
      );
    });

    it('debería lanzar error para email duplicado en actualización', async () => {
      const otherUser = { ...mockUser, email: 'otro@ejemplo.com', id: 'user-2' };
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
      vi.mocked(prismaMock.user.findFirst).mockResolvedValueOnce(otherUser);

      await expect(
        userRepository.update({ email: 'otro@ejemplo.com', id: 'user-1' })
      ).rejects.toThrow('Ya existe un usuario con este email');
    });
  });

  describe('delete', () => {
    it('debería eliminar usuario (soft delete)', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
      vi.mocked(prismaMock.user.update).mockResolvedValueOnce({
        ...mockUser,
        deletedAt: new Date(),
        isActive: false,
      });

      await expect(userRepository.delete('user-1')).resolves.not.toThrow();

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        data: expect.objectContaining({ isActive: false }),
        where: { id: 'user-1' },
      });
    });

    it('debería lanzar error para usuario inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      await expect(userRepository.delete('user-inexistente')).rejects.toThrow(
        'Usuario no encontrado'
      );
    });
  });

  describe('exists', () => {
    it('debería retornar true para usuario existente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);

      const result = await userRepository.exists('user-1');

      expect(result).toBe(true);
    });

    it('debería retornar false para usuario inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      const result = await userRepository.exists('user-inexistente');

      expect(result).toBe(false);
    });
  });

  describe('emailExists', () => {
    it('debería retornar true para email existente', async () => {
      vi.mocked(prismaMock.user.findFirst).mockResolvedValueOnce(mockUser);

      const result = await userRepository.emailExists('maria@ejemplo.com');

      expect(result).toBe(true);
    });

    it('debería retornar false para email inexistente', async () => {
      vi.mocked(prismaMock.user.findFirst).mockResolvedValueOnce(null);

      const result = await userRepository.emailExists('nuevo@ejemplo.com');

      expect(result).toBe(false);
    });
  });

  describe('count', () => {
    it('debería contar usuarios sin filtros', async () => {
      vi.mocked(prismaMock.user.count).mockResolvedValueOnce(50);

      const result = await userRepository.count();

      expect(result).toBe(50);
    });

    it('debería contar usuarios con filtro de rol', async () => {
      vi.mocked(prismaMock.user.count).mockResolvedValueOnce(20);

      const result = await userRepository.count({ role: 'participant' });

      expect(result).toBe(20);
    });
  });

  describe('findMany', () => {
    it('debería encontrar usuarios con paginación', async () => {
      vi.mocked(prismaMock.user.findMany).mockResolvedValueOnce([mockUser]);
      vi.mocked(prismaMock.user.count).mockResolvedValueOnce(1);

      const result = await userRepository.findMany({}, { limit: 10, page: 1 });

      expect(result.users).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('updateProfile', () => {
    it('debería actualizar perfil del usuario', async () => {
      const updatedUser = { ...mockUser, city: 'Guadalajara', state: 'Jalisco' };
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
      vi.mocked(prismaMock.user.update).mockResolvedValueOnce(updatedUser);

      const result = await userRepository.updateProfile('user-1', {
        city: 'Guadalajara',
        number: '456',
        state: 'Jalisco',
        street: 'Nueva Calle',
        zipCode: '44100',
      });

      expect(result.city).toBe('Guadalajara');
      expect(result.state).toBe('Jalisco');
    });

    it('debería lanzar error para usuario inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      await expect(
        userRepository.updateProfile('user-inexistente', {
          city: 'Guadalajara',
          number: '456',
          state: 'Jalisco',
          street: 'Nueva Calle',
          zipCode: '44100',
        })
      ).rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('updatePassword', () => {
    it('debería actualizar contraseña', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
      vi.mocked(prismaMock.user.update).mockResolvedValueOnce(mockUser);

      await expect(
        userRepository.updatePassword('user-1', 'new-hashed-password')
      ).resolves.not.toThrow();

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        data: { passwordHash: 'new-hashed-password' },
        where: { id: 'user-1' },
      });
    });

    it('debería lanzar error para usuario inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      await expect(userRepository.updatePassword('user-inexistente', 'hash')).rejects.toThrow(
        'Usuario no encontrado'
      );
    });

    it('debería lanzar error para usuario eliminado', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce({
        ...mockUser,
        deletedAt: new Date(),
      });

      await expect(userRepository.updatePassword('user-1', 'hash')).rejects.toThrow(
        'Usuario no encontrado'
      );
    });
  });

  describe('findByEmailIncludingDeleted', () => {
    it('debería encontrar usuario eliminado por email', async () => {
      const deletedUser = { ...mockUser, deletedAt: new Date() };
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(deletedUser);

      const result = await userRepository.findByEmailIncludingDeleted('maria@ejemplo.com');

      expect(result).toBeDefined();
      expect(result?.email).toBe('maria@ejemplo.com');
    });

    it('debería retornar null para email inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      const result = await userRepository.findByEmailIncludingDeleted('noexiste@ejemplo.com');

      expect(result).toBeNull();
    });
  });

  describe('getRecentlyCreated', () => {
    it('debería retornar usuarios creados recientemente', async () => {
      vi.mocked(prismaMock.user.findMany).mockResolvedValueOnce([mockUser]);

      const result = await userRepository.getRecentlyCreated(7);

      expect(result).toHaveLength(1);
      expect(result[0]?.firstName).toBe('María');
    });
  });

  describe('reactivate', () => {
    it('debería reactivar usuario eliminado', async () => {
      const deletedUser = { ...mockUser, deletedAt: new Date(), isActive: false };
      const reactivatedUser = { ...mockUser, deletedAt: null, isActive: true };
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(deletedUser);
      vi.mocked(prismaMock.user.update).mockResolvedValueOnce(reactivatedUser);

      const result = await userRepository.reactivate('user-1', {
        firstName: 'María',
        lastName: 'García',
        passwordHash: 'new-hash',
        role: 'participant',
      });

      expect(result.isActive).toBe(true);
      expect(result.deletedAt).toBeNull();
    });

    it('debería lanzar error para usuario inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      await expect(
        userRepository.reactivate('user-999', {
          firstName: 'José',
          lastName: 'López',
          passwordHash: 'hash',
          role: 'participant',
        })
      ).rejects.toThrow('Usuario no encontrado');
    });

    it('debería lanzar error si usuario no está eliminado', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);

      await expect(
        userRepository.reactivate('user-1', {
          firstName: 'María',
          lastName: 'García',
          passwordHash: 'hash',
          role: 'participant',
        })
      ).rejects.toThrow('no está eliminado');
    });
  });

  describe('search', () => {
    it('debería buscar usuarios por término', async () => {
      vi.mocked(prismaMock.user.findMany).mockResolvedValueOnce([mockUser]);
      vi.mocked(prismaMock.user.count).mockResolvedValueOnce(1);

      const result = await userRepository.search('María', { limit: 10, page: 1 });

      expect(result.users).toHaveLength(1);
    });
  });

  describe('findMany con filtros avanzados', () => {
    it('debería filtrar por isActive', async () => {
      vi.mocked(prismaMock.user.findMany).mockResolvedValueOnce([mockUser]);
      vi.mocked(prismaMock.user.count).mockResolvedValueOnce(1);

      const result = await userRepository.findMany({ isActive: true }, { limit: 10, page: 1 });

      expect(result.users).toHaveLength(1);
    });

    it('debería filtrar por rango de fechas', async () => {
      vi.mocked(prismaMock.user.findMany).mockResolvedValueOnce([]);
      vi.mocked(prismaMock.user.count).mockResolvedValueOnce(0);

      const result = await userRepository.findMany(
        {
          createdAfter: new Date('2025-01-01'),
          createdBefore: new Date('2025-12-31'),
        },
        { limit: 10, page: 1 }
      );

      expect(result.users).toHaveLength(0);
      expect(result.pagination.totalPages).toBe(0);
    });
  });

  describe('count con filtros avanzados', () => {
    it('debería contar con isActive', async () => {
      vi.mocked(prismaMock.user.count).mockResolvedValueOnce(40);

      const result = await userRepository.count({ isActive: true });

      expect(result).toBe(40);
    });

    it('debería contar con searchTerm', async () => {
      vi.mocked(prismaMock.user.count).mockResolvedValueOnce(5);

      const result = await userRepository.count({ searchTerm: 'García' });

      expect(result).toBe(5);
    });
  });

  describe('update con campos opcionales', () => {
    it('debería actualizar campos de dirección', async () => {
      const updatedUser = { ...mockUser, city: 'Monterrey', street: 'Av. Juárez' };
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
      vi.mocked(prismaMock.user.findFirst).mockResolvedValueOnce(null);
      vi.mocked(prismaMock.user.update).mockResolvedValueOnce(updatedUser);

      const result = await userRepository.update({
        city: 'Monterrey',
        id: 'user-1',
        street: 'Av. Juárez',
      });

      expect(result.city).toBe('Monterrey');
    });

    it('debería lanzar error para usuario eliminado', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce({
        ...mockUser,
        deletedAt: new Date(),
      });

      await expect(userRepository.update({ firstName: 'Nuevo', id: 'user-1' })).rejects.toThrow(
        'Usuario no encontrado'
      );
    });
  });

  describe('findByEmail para usuario eliminado', () => {
    it('debería retornar null para usuario eliminado', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce({
        ...mockUser,
        deletedAt: new Date(),
      });

      const result = await userRepository.findByEmail('maria@ejemplo.com');

      expect(result).toBeNull();
    });
  });
});
