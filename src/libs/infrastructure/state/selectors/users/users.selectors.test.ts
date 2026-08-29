import type { RootState } from '../../store';
import {
  selectActiveUsers,
  selectAdminUsers,
  selectInactiveUsers,
  selectRegularUsers,
  selectStaleUsers,
  selectUsers,
  selectUsersByRole,
  selectUsersError,
  selectUsersLoading,
  selectUsersLoadingState,
  selectUsersSearch,
  selectUsersSortedByCreatedAt,
  selectUsersSortedByName,
  selectUsersStats,
  selectUsersWithoutLogin,
} from './users.selectors';

const mockUser = (overrides = {}) => ({
  createdAt: '2026-01-15T00:00:00Z',
  email: 'maria@ejemplo.com',
  firstName: 'María',
  id: 'u-1',
  isActive: true,
  lastLoginAt: '2026-03-01T00:00:00Z',
  lastName: 'García',
  role: 'participant',
  ...overrides,
});

const createState = (users: ReturnType<typeof mockUser>[] = [], overrides = {}): RootState =>
  ({
    global: {
      activeLoaders: {},
      notifications: [],
    },
    users: {
      selectedUsers: [],
      serverPagination: { total: users.length },
      users,
      ...overrides,
    },
  }) as unknown as RootState;

describe('Users Selectors', () => {
  describe('basic selectors', () => {
    it('selectUsers returns all users', () => {
      const state = createState([mockUser(), mockUser({ id: 'u-2' })]);
      expect(selectUsers(state)).toHaveLength(2);
    });

    it('selectUsersLoading returns false by default', () => {
      const state = createState();
      expect(selectUsersLoading(state)).toBe(false);
    });

    it('selectUsersError returns null when no errors', () => {
      const state = createState();
      expect(selectUsersError(state)).toBeNull();
    });
  });

  describe('role filter selectors', () => {
    const mixed = createState([
      mockUser({ id: 'u-1', role: 'participant' }),
      mockUser({ id: 'u-2', role: 'admin' }),
      mockUser({ id: 'u-3', role: 'owner' }),
    ]);

    it('selectActiveUsers filters active', () => {
      const state = createState([
        mockUser({ isActive: true }),
        mockUser({ id: 'u-2', isActive: false }),
      ]);
      expect(selectActiveUsers(state)).toHaveLength(1);
    });

    it('selectAdminUsers includes admin and owner', () => {
      expect(selectAdminUsers(mixed)).toHaveLength(2);
    });

    it('selectRegularUsers filters participants', () => {
      expect(selectRegularUsers(mixed)).toHaveLength(1);
    });

    it('selectInactiveUsers filters inactive', () => {
      const state = createState([
        mockUser({ isActive: false }),
        mockUser({ id: 'u-2', isActive: true }),
      ]);
      expect(selectInactiveUsers(state)).toHaveLength(1);
    });

    it('selectUsersByRole filters by specific role', () => {
      expect(selectUsersByRole(mixed, 'admin')).toHaveLength(1);
    });
  });

  describe('sort selectors', () => {
    it('selectUsersSortedByName sorts alphabetically', () => {
      const state = createState([
        mockUser({ firstName: 'Carlos', lastName: 'Ruiz' }),
        mockUser({ firstName: 'Ana', id: 'u-2', lastName: 'López' }),
      ]);
      const sorted = selectUsersSortedByName(state);
      expect(sorted[0]?.firstName).toBe('Ana');
    });

    it('selectUsersSortedByCreatedAt sorts newest first', () => {
      const state = createState([
        mockUser({ createdAt: '2026-01-01T00:00:00Z' }),
        mockUser({ createdAt: '2026-03-01T00:00:00Z', id: 'u-2' }),
      ]);
      const sorted = selectUsersSortedByCreatedAt(state);
      expect(sorted[0]?.id).toBe('u-2');
    });
  });

  describe('activity selectors', () => {
    it('selectUsersWithoutLogin filters users without login', () => {
      const state = createState([
        mockUser({ lastLoginAt: null }),
        mockUser({ id: 'u-2', lastLoginAt: '2026-03-01T00:00:00Z' }),
      ]);
      expect(selectUsersWithoutLogin(state)).toHaveLength(1);
    });

    it('selectStaleUsers includes users without login and old logins', () => {
      const state = createState([
        mockUser({ lastLoginAt: null }),
        mockUser({ id: 'u-2', lastLoginAt: '2025-01-01T00:00:00Z' }),
        mockUser({ id: 'u-3', lastLoginAt: new Date().toISOString() }),
      ]);
      expect(selectStaleUsers(state)).toHaveLength(2);
    });
  });

  describe('selectUsersStats', () => {
    it('computes all stats', () => {
      const state = createState([
        mockUser({ isActive: true, role: 'participant' }),
        mockUser({ id: 'u-2', isActive: true, role: 'admin' }),
        mockUser({ id: 'u-3', isActive: false, role: 'participant' }),
      ]);
      const stats = selectUsersStats(state);
      expect(stats.total).toBe(3);
      expect(stats.active).toBe(2);
      expect(stats.inactive).toBe(1);
      expect(stats.admins).toBe(1);
      expect(stats.regularUsers).toBe(2);
      expect(stats.activationRate).toBeCloseTo(66.67, 0);
    });

    it('handles empty users', () => {
      const state = createState([]);
      const stats = selectUsersStats(state);
      expect(stats.activationRate).toBe(0);
    });
  });

  describe('selectUsersLoadingState', () => {
    it('computes ready state', () => {
      const state = createState([mockUser()]);
      const loadingState = selectUsersLoadingState(state);
      expect(loadingState.isReady).toBe(true);
      expect(loadingState.hasData).toBe(true);
    });

    it('computes empty state', () => {
      const state = createState([]);
      const loadingState = selectUsersLoadingState(state);
      expect(loadingState.isEmptyState).toBe(true);
    });
  });

  describe('selectUsersSearch', () => {
    it('filters by name', () => {
      const state = createState([
        mockUser({ firstName: 'María', lastName: 'García' }),
        mockUser({ firstName: 'Carlos', id: 'u-2', lastName: 'Ruiz' }),
      ]);
      expect(selectUsersSearch(state, 'maría')).toHaveLength(1);
    });

    it('filters by email', () => {
      const state = createState([mockUser({ email: 'jose@ejemplo.com' })]);
      expect(selectUsersSearch(state, 'jose')).toHaveLength(1);
    });

    it('returns all on empty search', () => {
      const state = createState([mockUser(), mockUser({ id: 'u-2' })]);
      expect(selectUsersSearch(state, '')).toHaveLength(2);
    });
  });
});
