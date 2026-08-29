/**
 * Users Slice — thunk operation coverage
 *
 * Dispatches every user thunk through a real store with mocked services so the
 * async `operation` bodies + transformUser + fulfilled reducers execute.
 */

vi.mock('@services', () => ({
  UsersService: {
    changePassword: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    getAll: vi.fn(),
    update: vi.fn(),
  },
}));

import { configureStore } from '@reduxjs/toolkit';
import { UsersService } from '@services';

import {
  changeUserPasswordAction,
  createUserAction,
  deleteUserAction,
  deleteUserWithConfirmationAction,
  fetchUsersAction,
  toggleUserStatusAction,
  toggleUserStatusWithNotificationAction,
  updateUserAction,
  usersSlice,
} from './users.slice';

const service = vi.mocked(UsersService);

const makeStore = () => configureStore({ reducer: { users: usersSlice.reducer } });

const user = (id = 'user-1', overrides: Record<string, unknown> = {}) =>
  ({
    createdAt: '2026-01-01',
    email: 'maria.garcia@test.com',
    firstName: 'María',
    id,
    isActive: true,
    lastName: 'García',
    role: 'participant',
    updatedAt: '2026-01-01',
    ...overrides,
  }) as never;

describe('Users Slice — thunks', () => {
  it('fetchUsersAction maps users + pagination', async () => {
    service.getAll.mockResolvedValueOnce({
      pagination: { page: 1, pageSize: 10, total: 1 },
      users: [user()],
    } as never);
    const store = makeStore();

    await store.dispatch(fetchUsersAction());

    expect(service.getAll).toHaveBeenCalled();
    expect(store.getState().users.users).toHaveLength(1);
  });

  it('deleteUserAction calls delete and returns the id', async () => {
    service.delete.mockResolvedValueOnce(undefined);
    const store = makeStore();

    await store.dispatch(deleteUserAction('user-1'));

    expect(service.delete).toHaveBeenCalledWith('user-1');
  });

  it('deleteUserWithConfirmationAction calls delete', async () => {
    service.delete.mockResolvedValueOnce(undefined);
    const store = makeStore();

    await store.dispatch(deleteUserWithConfirmationAction('user-1'));

    expect(service.delete).toHaveBeenCalledWith('user-1');
  });

  it('toggleUserStatusAction updates with the flipped status', async () => {
    service.update.mockResolvedValueOnce(user('user-1', { isActive: false }));
    const store = makeStore();

    await store.dispatch(toggleUserStatusAction({ currentStatus: true, userId: 'user-1' }));

    expect(service.update).toHaveBeenCalledWith('user-1', { isActive: false });
  });

  it('toggleUserStatusWithNotificationAction updates with the flipped status', async () => {
    service.update.mockResolvedValueOnce(user('user-1', { isActive: true }));
    const store = makeStore();

    await store.dispatch(
      toggleUserStatusWithNotificationAction({ currentStatus: false, userId: 'user-1' })
    );

    expect(service.update).toHaveBeenCalledWith('user-1', { isActive: true });
  });

  it('createUserAction creates + transforms the user', async () => {
    service.create.mockResolvedValueOnce(user('user-new'));
    const store = makeStore();

    await store.dispatch(
      createUserAction({
        email: 'jose.lopez@test.com',
        firstName: 'José',
        lastName: 'López',
        password: 'secret123',
        role: 'admin',
      } as never)
    );

    expect(service.create).toHaveBeenCalled();
  });

  it('updateUserAction updates + transforms the user', async () => {
    service.update.mockResolvedValueOnce(user('user-1', { firstName: 'Maria José' }));
    const store = makeStore();

    await store.dispatch(updateUserAction({ data: { firstName: 'Maria José' }, userId: 'user-1' }));

    expect(service.update).toHaveBeenCalledWith('user-1', { firstName: 'Maria José' });
  });

  it('changeUserPasswordAction calls changePassword', async () => {
    service.changePassword.mockResolvedValueOnce(undefined);
    const store = makeStore();

    await store.dispatch(
      changeUserPasswordAction({ newPassword: 'nuevaClave1', userId: 'user-1' })
    );

    expect(service.changePassword).toHaveBeenCalledWith('user-1', 'nuevaClave1');
  });
});
