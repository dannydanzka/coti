/**
 * UserManagerScreen Helpers Tests
 *
 * Tests pure utility functions for user management.
 * Spanish locale mandatory.
 */

import {
  calculatePaginationRange,
  canDeleteUser,
  canEditUser,
  canToggleUserStatus,
  getDropdownPosition,
  getRoleLabel,
  getSortIcon,
  getStatusLabel,
  getUserRoleLabel,
} from './UserManagerScreen.helpers';

describe('UserManagerScreen Helpers', () => {
  describe('getUserRoleLabel', () => {
    it('returns label for admin', () => {
      expect(getUserRoleLabel('admin')).toBe('Administrador');
    });

    it('returns label for participant', () => {
      expect(getUserRoleLabel('participant')).toBe('Participante');
    });

    it('returns label for owner', () => {
      expect(getUserRoleLabel('owner')).toBe('Propietario');
    });
  });

  describe('getRoleLabel', () => {
    it('returns "Todos los roles" for empty', () => {
      expect(getRoleLabel(null as never)).toBe('Todos los roles');
    });

    it('returns role label', () => {
      expect(getRoleLabel('admin')).toBe('Administrador');
    });
  });

  describe('getStatusLabel', () => {
    it('returns "Todos los estados" for empty', () => {
      expect(getStatusLabel(null as never)).toBe('Todos los estados');
    });

    it('returns "Activos" for active', () => {
      expect(getStatusLabel('active')).toBe('Activos');
    });

    it('returns "Inactivos" for inactive', () => {
      expect(getStatusLabel('inactive')).toBe('Inactivos');
    });
  });

  describe('getSortIcon', () => {
    it('returns neutral icon for different field', () => {
      expect(getSortIcon('email', 'name', 'asc')).toBe('↕');
    });

    it('returns asc icon', () => {
      expect(getSortIcon('name', 'name', 'asc')).toBe('↑');
    });

    it('returns desc icon', () => {
      expect(getSortIcon('name', 'name', 'desc')).toBe('↓');
    });
  });

  describe('getDropdownPosition', () => {
    it('returns bottom when ref is null', () => {
      const ref = { current: null };
      expect(getDropdownPosition(ref)).toBe('bottom');
    });
  });

  describe('canEditUser', () => {
    it('returns false for owner', () => {
      expect(canEditUser('owner')).toBe(false);
    });

    it('returns true for admin', () => {
      expect(canEditUser('admin')).toBe(true);
    });

    it('returns true for participant', () => {
      expect(canEditUser('participant')).toBe(true);
    });
  });

  describe('canToggleUserStatus', () => {
    it('returns false for self', () => {
      expect(canToggleUserStatus('user-1', 'admin', 'user-1')).toBe(false);
    });

    it('returns false for owner', () => {
      expect(canToggleUserStatus('user-2', 'owner', 'user-1')).toBe(false);
    });

    it('returns true for other admin', () => {
      expect(canToggleUserStatus('user-2', 'admin', 'user-1')).toBe(true);
    });
  });

  describe('canDeleteUser', () => {
    it('returns false for self', () => {
      expect(canDeleteUser('user-1', 'admin', 'user-1')).toBe(false);
    });

    it('returns false for owner', () => {
      expect(canDeleteUser('user-2', 'owner', 'user-1')).toBe(false);
    });

    it('returns true for other user', () => {
      expect(canDeleteUser('user-2', 'participant', 'user-1')).toBe(true);
    });
  });

  describe('calculatePaginationRange', () => {
    it('returns correct range for first page', () => {
      const range = calculatePaginationRange(1, 10, 5);
      expect(range).toEqual([1, 2, 3, 4, 5]);
    });

    it('returns correct range for middle page', () => {
      const range = calculatePaginationRange(5, 10, 5);
      expect(range).toEqual([3, 4, 5, 6, 7]);
    });

    it('returns correct range for last page', () => {
      const range = calculatePaginationRange(10, 10, 5);
      expect(range).toEqual([6, 7, 8, 9, 10]);
    });

    it('returns all pages when total < max visible', () => {
      const range = calculatePaginationRange(1, 3, 5);
      expect(range).toEqual([1, 2, 3]);
    });
  });
});
