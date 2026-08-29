import {
  clearSelectedUsersAction,
  selectUserAction,
  unselectUserAction,
  usersSlice,
} from './users.slice';
import type { UsersState } from './users.slice.interfaces';

const { reducer: usersReducer } = usersSlice;

const mockUser = (id = 'u-1') => ({
  createdAt: '2026-01-01T00:00:00Z',
  email: 'maria@ejemplo.com',
  firstName: 'María',
  id,
  isActive: true,
  lastLoginAt: null,
  lastName: 'García',
  phone: null,
  role: 'participant' as const,
  updatedAt: '2026-01-01T00:00:00Z',
});

const baseState = {
  lastUpdated: null,
  selectedUsers: ['u-1'],
  serverPagination: {
    hasNextPage: false,
    hasPrevPage: false,
    limit: 20,
    page: 1,
    total: 2,
    totalPages: 1,
  },
  users: [mockUser('u-1'), mockUser('u-2')],
} as unknown as UsersState;

describe('Users Slice', () => {
  describe('sync reducers', () => {
    it('selectUserAction adds user to selection', () => {
      const state = usersReducer({ ...baseState, selectedUsers: [] }, selectUserAction('u-1'));
      expect(state.selectedUsers).toContain('u-1');
    });

    it('selectUserAction does not duplicate', () => {
      const state = usersReducer(baseState, selectUserAction('u-1'));
      expect(state.selectedUsers).toHaveLength(1);
    });

    it('unselectUserAction removes user from selection', () => {
      const state = usersReducer(baseState, unselectUserAction('u-1'));
      expect(state.selectedUsers).not.toContain('u-1');
    });

    it('clearSelectedUsersAction clears all', () => {
      const state = usersReducer(baseState, clearSelectedUsersAction());
      expect(state.selectedUsers).toHaveLength(0);
    });
  });

  describe('extraReducers (thunk fulfilled)', () => {
    it('fetchUsersAction.fulfilled sets users and pagination', () => {
      const newState = usersReducer(baseState, {
        payload: {
          serverPagination: {
            hasNextPage: true,
            hasPrevPage: false,
            limit: 20,
            page: 1,
            total: 50,
            totalPages: 3,
          },
          users: [mockUser('u-3')],
        },
        type: 'users/fetchUsers/fulfilled',
      });
      expect(newState.users).toHaveLength(1);
      expect(newState.users[0]?.id).toBe('u-3');
      expect(newState.serverPagination.total).toBe(50);
      expect(newState.lastUpdated).toBeDefined();
    });

    it('deleteUserAction.fulfilled removes user', () => {
      const newState = usersReducer(baseState, {
        payload: 'u-1',
        type: 'users/deleteUser/fulfilled',
      });
      expect(newState.users).toHaveLength(1);
      expect(newState.selectedUsers).not.toContain('u-1');
    });

    it('deleteUserWithConfirmationAction.fulfilled removes user', () => {
      const newState = usersReducer(baseState, {
        payload: { message: 'Eliminado', userId: 'u-1' },
        type: 'users/deleteUserWithConfirmation/fulfilled',
      });
      expect(newState.users).toHaveLength(1);
      expect(newState.selectedUsers).not.toContain('u-1');
    });

    it('createUserAction.fulfilled adds user', () => {
      const newUser = mockUser('u-new');
      const newState = usersReducer(baseState, {
        payload: newUser,
        type: 'users/createUser/fulfilled',
      });
      expect(newState.users).toHaveLength(3);
    });

    it('updateUserAction.fulfilled updates existing user', () => {
      const updated = { ...mockUser('u-1'), firstName: 'María Actualizada' };
      const newState = usersReducer(baseState, {
        payload: updated,
        type: 'users/updateUser/fulfilled',
      });
      expect(newState.users.find((u) => u.id === 'u-1')?.firstName).toBe('María Actualizada');
    });

    it('toggleUserStatusAction.fulfilled updates user', () => {
      const updated = { ...mockUser('u-1'), isActive: false };
      const newState = usersReducer(baseState, {
        payload: { updatedData: updated, userId: 'u-1' },
        type: 'users/toggleUserStatus/fulfilled',
      });
      expect(newState.users.find((u) => u.id === 'u-1')?.isActive).toBe(false);
    });

    it('toggleUserStatusWithNotificationAction.fulfilled updates user', () => {
      const updated = { ...mockUser('u-1'), isActive: false };
      const newState = usersReducer(baseState, {
        payload: { message: 'Desactivado', updatedData: updated, userId: 'u-1' },
        type: 'users/toggleUserStatusWithNotification/fulfilled',
      });
      expect(newState.users.find((u) => u.id === 'u-1')?.isActive).toBe(false);
    });

    it('updateUserAction.fulfilled handles non-existing user gracefully', () => {
      const updated = { ...mockUser('u-999'), firstName: 'Fantasma' };
      const newState = usersReducer(baseState, {
        payload: updated,
        type: 'users/updateUser/fulfilled',
      });
      expect(newState.users).toHaveLength(2);
    });

    it('toggleUserStatusAction.fulfilled handles non-existing user gracefully', () => {
      const updated = { ...mockUser('u-999'), isActive: false };
      const newState = usersReducer(baseState, {
        payload: { updatedData: updated, userId: 'u-999' },
        type: 'users/toggleUserStatus/fulfilled',
      });
      expect(newState.users).toHaveLength(2);
    });

    it('toggleUserStatusWithNotificationAction.fulfilled handles non-existing user', () => {
      const updated = { ...mockUser('u-999'), isActive: false };
      const newState = usersReducer(baseState, {
        payload: { message: 'Desactivado', updatedData: updated, userId: 'u-999' },
        type: 'users/toggleUserStatusWithNotification/fulfilled',
      });
      expect(newState.users).toHaveLength(2);
    });

    it('deleteUserAction.fulfilled removes from selection too', () => {
      const stateWithSelection = { ...baseState, selectedUsers: ['u-1', 'u-2'] };
      const newState = usersReducer(stateWithSelection, {
        payload: 'u-1',
        type: 'users/deleteUser/fulfilled',
      });
      expect(newState.selectedUsers).toEqual(['u-2']);
    });
  });

  describe('exports', () => {
    it('exports slice with correct name', () => {
      expect(usersSlice.name).toBe('users');
    });

    it('has correct initial state', () => {
      const state = usersReducer(undefined, { type: '@@INIT' });
      expect(state.users).toEqual([]);
      expect(state.selectedUsers).toEqual([]);
      expect(state.lastUpdated).toBeNull();
      expect(state.serverPagination).toBeDefined();
    });
  });
});
