/**
 * useUsers Hook Tests
 *
 * Tests composed users hook (CRUD + actions + selection).
 * Spanish locale mandatory.
 */

import { renderHook } from '@testing-library/react';

import {
  useSelectedUsers,
  useUsers,
  useUsersError,
  useUsersLoading,
  useUsersState,
} from './useUsers';

const mockDispatch = vi.fn();

vi.mock('@hooks/useRedux', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn().mockReturnValue([]),
}));

vi.mock('@redux', () => ({
  changeUserPasswordAction: vi.fn(),
  clearAllNotifications: vi.fn(() => ({ type: 'clear' })),
  clearSelectedUsersAction: vi.fn(() => ({ type: 'clearSelected' })),
  createUserAction: vi.fn(),
  deleteUserWithConfirmationAction: vi.fn(),
  dequeueNotification: vi.fn(),
  fetchUsersAction: vi.fn(),
  selectSelectedUsers: vi.fn(),
  selectUserAction: vi.fn(),
  selectUsers: vi.fn(),
  selectUsersError: vi.fn(),
  selectUsersLoading: vi.fn(),
  selectUsersLoadingState: vi.fn(),
  selectUsersServerPagination: vi.fn(),
  selectUsersStats: vi.fn(),
  toggleUserStatusWithNotificationAction: vi.fn(),
  unselectUserAction: vi.fn(),
  updateUserAction: vi.fn(),
}));

describe('useUsers', () => {
  it('exposes all composed methods', () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.loadUsers).toBeDefined();
    expect(result.current.createUser).toBeDefined();
    expect(result.current.updateUser).toBeDefined();
    expect(result.current.deleteUserWithConfirmation).toBeDefined();
    expect(result.current.toggleUserStatus).toBeDefined();
    expect(result.current.changeUserPassword).toBeDefined();
    expect(result.current.selectUserById).toBeDefined();
    expect(result.current.unselectUserById).toBeDefined();
    expect(result.current.clearSelectedUsers).toBeDefined();
    expect(result.current.toggleUserStatusWithNotification).toBeDefined();
  });

  it('returns hasData false when no users', () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.hasData).toBe(false);
  });
});

describe('useUsersState', () => {
  it('returns users array', () => {
    const { result } = renderHook(() => useUsersState());
    expect(result.current).toEqual([]);
  });
});

describe('useUsersLoading', () => {
  it('returns loading state', () => {
    const { result } = renderHook(() => useUsersLoading());
    expect(result.current).toEqual([]);
  });
});

describe('useUsersError', () => {
  it('returns error state', () => {
    const { result } = renderHook(() => useUsersError());
    expect(result.current).toEqual([]);
  });
});

describe('useSelectedUsers', () => {
  it('returns selected users', () => {
    const { result } = renderHook(() => useSelectedUsers());
    expect(result.current).toEqual([]);
  });
});
