vi.mock('@hooks', () => ({
  useAuth: vi.fn().mockReturnValue({
    user: { email: 'admin@dearadry.com', id: 'user-1', role: 'owner' },
  }),
  useDataTable: vi.fn().mockReturnValue({
    currentPage: 1,
    paginatedItems: [],
    totalPages: 1,
  }),
  useUsers: vi.fn().mockReturnValue({
    changeUserPassword: vi.fn(),
    createUser: vi.fn(),
    deleteUserWithConfirmation: vi.fn(),
    loadUsers: vi.fn(),
    loading: { isLoading: false },
    serverPagination: null,
    stats: { active: 5, inactive: 1, total: 6 },
    toggleUserStatusWithNotification: vi.fn(),
    updateUser: vi.fn(),
    users: [
      { email: 'maria@ejemplo.com', id: 'u-1', isActive: true, role: 'admin' },
      { email: 'jose@ejemplo.com', id: 'u-2', isActive: true, role: 'participant' },
    ],
  }),
}));

vi.mock('@constants', () => ({
  USER_ROLES: { ADMIN: 'admin', OWNER: 'owner', PARTICIPANT: 'participant' },
}));

vi.mock('../UserManagerScreen.constants', () => ({
  PROTECTED_USER_EMAILS: ['protected@dearadry.com'],
}));

vi.mock('./useUserConfirmModal', () => ({
  useUserConfirmModal: vi.fn().mockReturnValue({
    confirmModal: { isOpen: false, title: '' },
    handleCloseConfirmModal: vi.fn(),
    handleOpenDeleteConfirm: vi.fn(),
    handleToggleStatus: vi.fn(),
    isDeleting: false,
    processingUserId: null,
  }),
}));

vi.mock('./useUserFilters', () => ({
  useUserFilters: vi.fn().mockReturnValue({
    hasFilters: false,
    roleFilter: '',
    searchTerm: '',
    setRoleFilter: vi.fn(),
    setSearchTerm: vi.fn(),
    setStatusFilter: vi.fn(),
    statusFilter: '',
    table: { currentPage: 1, paginatedItems: [], totalPages: 1 },
  }),
}));

vi.mock('./useUserFormModal', () => ({
  useUserFormModal: vi.fn().mockReturnValue({
    createForm: {},
    editForm: {},
    editingUserId: null,
    handleCloseModal: vi.fn(),
    handleOpenCreateModal: vi.fn(),
    handleOpenEditModal: vi.fn(),
    handleSaveUser: vi.fn(),
    handleToggleConfirmPasswordVisibility: vi.fn(),
    handleTogglePasswordVisibility: vi.fn(),
    isEditing: false,
    isEditingSelf: false,
    isModalOpen: false,
    isSaving: false,
    showConfirmPassword: false,
    showPassword: false,
  }),
}));

vi.mock('./useUserPasswordModal', () => ({
  useUserPasswordModal: vi.fn().mockReturnValue({
    handleChangePassword: vi.fn(),
    handleClosePasswordModal: vi.fn(),
    handleOpenPasswordModal: vi.fn(),
    handleToggleConfirmPasswordVisibility: vi.fn(),
    handleToggleNewPasswordVisibility: vi.fn(),
    isChangingPassword: false,
    passwordForm: {},
    passwordModal: { isOpen: false },
    showConfirmPassword: false,
    showNewPassword: false,
  }),
}));

import { act, renderHook } from '@testing-library/react';

import { useUserManager } from './useUserManager';

describe('useUserManager', () => {
  it('retorna interfaz completa', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.isOwner).toBe(true);
    expect(result.current.users).toHaveLength(2);
    expect(result.current.stats).toEqual({ active: 5, inactive: 1, total: 6 });
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.isEditing).toBe(false);
    expect(result.current.isSaving).toBe(false);
    expect(result.current.isDeleting).toBe(false);
  });

  it('getUserRoleLabel retorna label en español', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.getUserRoleLabel('admin')).toBe('Administrador');
    expect(result.current.getUserRoleLabel('owner')).toBe('Propietario');
    expect(result.current.getUserRoleLabel('participant')).toBe('Participante');
  });

  it('canEditUser bloquea edición de owner', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.canEditUser('u-1', 'owner')).toBe(false);
  });

  it('canEditUser permite edición de admin', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.canEditUser('u-1', 'admin')).toBe(true);
  });

  it('canEditUser bloquea protected email excepto self/owner', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.canEditUser('u-other', 'admin', 'protected@dearadry.com')).toBe(true);
  });

  it('canToggleUserStatus bloquea auto-toggle', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.canToggleUserStatus('user-1', 'admin')).toBe(false);
  });

  it('canToggleUserStatus bloquea owner', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.canToggleUserStatus('u-other', 'owner')).toBe(false);
  });

  it('canToggleUserStatus bloquea protected email', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.canToggleUserStatus('u-other', 'admin', 'protected@dearadry.com')).toBe(
      false
    );
  });

  it('canDeleteUser bloquea auto-delete', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.canDeleteUser('user-1', 'admin')).toBe(false);
  });

  it('canDeleteUser bloquea owner', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.canDeleteUser('u-other', 'owner')).toBe(false);
  });

  it('createEditHandler retorna función', () => {
    const { result } = renderHook(() => useUserManager());

    const handler = result.current.createEditHandler({ id: 'u-1' } as never);
    expect(typeof handler).toBe('function');
  });

  it('createDeleteHandler retorna función', () => {
    const { result } = renderHook(() => useUserManager());

    const handler = result.current.createDeleteHandler({ id: 'u-1' } as never);
    expect(typeof handler).toBe('function');
  });

  it('createToggleHandler retorna función', () => {
    const { result } = renderHook(() => useUserManager());

    const handler = result.current.createToggleHandler('u-1', true, 'María');
    expect(typeof handler).toBe('function');
  });

  it('createPasswordHandler retorna función', () => {
    const { result } = renderHook(() => useUserManager());

    const handler = result.current.createPasswordHandler({ id: 'u-1' } as never);
    expect(typeof handler).toBe('function');
  });

  it('handleModalContentClick detiene propagación', () => {
    const { result } = renderHook(() => useUserManager());

    const mockEvent = { stopPropagation: vi.fn() } as unknown as React.MouseEvent;
    act(() => {
      result.current.handleModalContentClick(mockEvent);
    });
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('expone filters y modals', () => {
    const { result } = renderHook(() => useUserManager());

    expect(result.current.hasFilters).toBe(false);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.roleFilter).toBe('');
    expect(result.current.statusFilter).toBe('');
    expect(result.current.confirmModal).toBeDefined();
    expect(result.current.passwordModal).toBeDefined();
  });
});
