/**
 * User Entity Functions Tests - Global
 *
 * Tests for user entity helper functions.
 * Spanish locale test data per project standards.
 */

import type { UserEntity } from '@entities';

import {
  activateUser,
  canManageRole,
  canUserLogin,
  createUserEntity,
  deactivateUser,
  getUserDisplayName,
  getUserSecurityInfo,
  hasRolePermission,
  isAdmin,
  isOwner,
  isParticipant,
  isUserActive,
  isUserDeleted,
  recordSuccessfulLogin,
  updateUserEntity,
} from './user.entity';

const mockUser = (overrides: Partial<UserEntity> = {}): UserEntity => ({
  age: 28,
  bio: null,
  city: 'Ciudad de México',
  country: 'México',
  createdAt: new Date('2025-01-01'),
  deletedAt: null,
  deletedBy: null,
  email: 'maria.garcia@ejemplo.com',
  firstName: 'María',
  id: 'user-1',
  isActive: true,
  lastLoginAt: new Date('2025-06-01'),
  lastName: 'García',
  neighborhood: null,
  number: null,
  passwordHash: 'hashed',
  phone: '+521234567890',
  photoUrl: null,
  role: 'participant',
  state: 'CDMX',
  street: 'Av. Reforma',
  updatedAt: new Date('2025-06-01'),
  zipCode: '06600',
  ...overrides,
});

describe('User Entity Functions', () => {
  describe('createUserEntity', () => {
    it('crea entidad con id y timestamps', () => {
      const { createdAt, id, updatedAt, ...data } = mockUser();
      void id;
      void createdAt;
      void updatedAt;
      const entity = createUserEntity(data);
      expect(entity.id).toContain('user_');
      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.updatedAt).toBeInstanceOf(Date);
      expect(entity.firstName).toBe('María');
    });
  });

  describe('updateUserEntity', () => {
    it('actualiza campos y updatedAt', () => {
      const user = mockUser();
      const updated = updateUserEntity(user, { firstName: 'Ana' });
      expect(updated.firstName).toBe('Ana');
      expect(updated.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('isUserActive', () => {
    it('retorna true para usuario activo', () => {
      expect(isUserActive(mockUser())).toBe(true);
    });

    it('retorna false para usuario inactivo', () => {
      expect(isUserActive(mockUser({ isActive: false }))).toBe(false);
    });

    it('retorna false para usuario eliminado', () => {
      expect(isUserActive(mockUser({ deletedAt: new Date() }))).toBe(false);
    });
  });

  describe('canUserLogin', () => {
    it('permite login a usuario activo', () => {
      expect(canUserLogin(mockUser())).toBe(true);
    });

    it('rechaza login a usuario inactivo', () => {
      expect(canUserLogin(mockUser({ isActive: false }))).toBe(false);
    });
  });

  describe('getUserDisplayName', () => {
    it('retorna nombre completo', () => {
      expect(getUserDisplayName(mockUser())).toBe('María García');
    });

    it('retorna email prefix cuando no hay nombre', () => {
      expect(getUserDisplayName(mockUser({ firstName: '', lastName: '' }))).toBe('maria.garcia');
    });
  });

  describe('hasRolePermission', () => {
    it('owner tiene permiso para todo', () => {
      const owner = mockUser({ role: 'owner' });
      expect(hasRolePermission(owner, 'owner')).toBe(true);
      expect(hasRolePermission(owner, 'admin')).toBe(true);
      expect(hasRolePermission(owner, 'participant')).toBe(true);
    });

    it('admin no tiene permiso de owner', () => {
      const admin = mockUser({ role: 'admin' });
      expect(hasRolePermission(admin, 'owner')).toBe(false);
      expect(hasRolePermission(admin, 'admin')).toBe(true);
      expect(hasRolePermission(admin, 'participant')).toBe(true);
    });

    it('participant solo tiene permiso de participant', () => {
      const participant = mockUser({ role: 'participant' });
      expect(hasRolePermission(participant, 'owner')).toBe(false);
      expect(hasRolePermission(participant, 'admin')).toBe(false);
      expect(hasRolePermission(participant, 'participant')).toBe(true);
    });
  });

  describe('deactivateUser', () => {
    it('desactiva usuario con deletedBy', () => {
      const deactivated = deactivateUser(mockUser(), 'admin-1');
      expect(deactivated.isActive).toBe(false);
      expect(deactivated.deletedAt).toBeInstanceOf(Date);
      expect(deactivated.deletedBy).toBe('admin-1');
    });
  });

  describe('activateUser', () => {
    it('reactiva usuario', () => {
      const inactive = mockUser({ deletedAt: new Date(), deletedBy: 'admin-1', isActive: false });
      const activated = activateUser(inactive);
      expect(activated.isActive).toBe(true);
      expect(activated.deletedAt).toBeNull();
      expect(activated.deletedBy).toBeNull();
    });
  });

  describe('recordSuccessfulLogin', () => {
    it('actualiza lastLoginAt', () => {
      const user = mockUser({ lastLoginAt: null });
      const updated = recordSuccessfulLogin(user);
      expect(updated.lastLoginAt).toBeInstanceOf(Date);
    });
  });

  describe('getUserSecurityInfo', () => {
    it('retorna seguro para usuario activo con login', () => {
      const info = getUserSecurityInfo(mockUser());
      expect(info.isSecure).toBe(true);
      expect(info.issues).toHaveLength(0);
      expect(info.lastActivity).toBeInstanceOf(Date);
    });

    it('reporta usuario inactivo', () => {
      const info = getUserSecurityInfo(mockUser({ isActive: false }));
      expect(info.isSecure).toBe(false);
      expect(info.issues).toContain('Usuario inactivo');
    });

    it('reporta usuario eliminado', () => {
      const info = getUserSecurityInfo(mockUser({ deletedAt: new Date() }));
      expect(info.issues).toContain('Usuario eliminado');
    });

    it('reporta sin login previo', () => {
      const info = getUserSecurityInfo(mockUser({ lastLoginAt: null }));
      expect(info.issues).toContain('Nunca se ha conectado');
    });
  });

  describe('canManageRole', () => {
    it('owner puede gestionar todo', () => {
      const owner = mockUser({ role: 'owner' });
      expect(canManageRole(owner, 'admin')).toBe(true);
      expect(canManageRole(owner, 'participant')).toBe(true);
      expect(canManageRole(owner, 'owner')).toBe(true);
    });

    it('admin solo puede gestionar participantes', () => {
      const admin = mockUser({ role: 'admin' });
      expect(canManageRole(admin, 'participant')).toBe(true);
      expect(canManageRole(admin, 'admin')).toBe(false);
      expect(canManageRole(admin, 'owner')).toBe(false);
    });

    it('participant no puede gestionar a nadie', () => {
      const participant = mockUser({ role: 'participant' });
      expect(canManageRole(participant, 'participant')).toBe(false);
    });
  });

  describe('role checks', () => {
    it('isOwner', () => {
      expect(isOwner(mockUser({ role: 'owner' }))).toBe(true);
      expect(isOwner(mockUser({ role: 'admin' }))).toBe(false);
    });

    it('isAdmin', () => {
      expect(isAdmin(mockUser({ role: 'admin' }))).toBe(true);
      expect(isAdmin(mockUser({ role: 'participant' }))).toBe(false);
    });

    it('isParticipant', () => {
      expect(isParticipant(mockUser({ role: 'participant' }))).toBe(true);
      expect(isParticipant(mockUser({ role: 'owner' }))).toBe(false);
    });
  });

  describe('isUserDeleted', () => {
    it('retorna true para usuario eliminado', () => {
      expect(isUserDeleted(mockUser({ deletedAt: new Date() }))).toBe(true);
    });

    it('retorna false para usuario no eliminado', () => {
      expect(isUserDeleted(mockUser())).toBe(false);
    });
  });
});
