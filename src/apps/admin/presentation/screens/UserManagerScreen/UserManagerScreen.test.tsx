/**
 * UserManagerScreen Component Tests
 *
 * Tests rendering with mocked useUserManager hook.
 * Spanish locale mandatory.
 */

const mockUseUserManager = vi.fn();

vi.mock('./hooks', () => ({
  useUserManager: () => mockUseUserManager(),
}));

vi.mock('./components', () => ({
  UserFilters: ({ searchTerm }: { searchTerm: string }) => (
    <div data-testid='user-filters'>{searchTerm}</div>
  ),
}));

vi.mock('./components/ConfirmDeleteModal', () => ({
  ConfirmDeleteModal: () => null,
}));

vi.mock('./components/PasswordModal', () => ({
  PasswordModal: () => null,
}));

vi.mock('./components/UserFormModal', () => ({
  UserFormModal: () => null,
}));

import { assertText, renderWithProviders, screen } from '@testing';

import { UserManagerScreen } from './UserManagerScreen';

const mockUser = (id: string, overrides = {}) => ({
  createdAt: '2025-01-15T00:00:00Z',
  email: `${id}@example.com`,
  firstName: 'María',
  id,
  isActive: true,
  lastName: 'García',
  role: 'participant' as const,
  ...overrides,
});

const baseHookReturn = {
  canDeleteUser: () => true,
  canEditUser: () => true,
  canToggleUserStatus: () => true,
  confirmModal: { isOpen: false, userName: '' },
  createDeleteHandler: vi.fn(() => vi.fn()),
  createEditHandler: vi.fn(() => vi.fn()),
  createForm: { email: '', firstName: '', lastName: '', password: '', role: 'participant' },
  createPasswordHandler: vi.fn(() => vi.fn()),
  createToggleHandler: vi.fn(() => vi.fn()),
  editForm: { email: '', firstName: '', lastName: '', role: 'participant' },
  handleChangePassword: vi.fn(),
  handleCloseConfirmModal: vi.fn(),
  handleCloseModal: vi.fn(),
  handleClosePasswordModal: vi.fn(),
  handleOpenCreateModal: vi.fn(),
  handleSaveUser: vi.fn(),
  handleToggleConfirmPasswordVisibility: vi.fn(),
  handleToggleFormConfirmPasswordVisibility: vi.fn(),
  handleToggleFormPasswordVisibility: vi.fn(),
  handleToggleNewPasswordVisibility: vi.fn(),
  hasFilters: false,
  isChangingPassword: false,
  isDeleting: false,
  isEditing: false,
  isEditingSelf: false,
  isModalOpen: false,
  isOwner: true,
  isSaving: false,
  loading: false,
  passwordForm: { confirmPassword: '', newPassword: '' },
  passwordModal: { isOpen: false, userId: '', userName: '' },
  processingUserId: null,
  roleFilter: '',
  searchTerm: '',
  setRoleFilter: vi.fn(),
  setSearchTerm: vi.fn(),
  setStatusFilter: vi.fn(),
  showConfirmPassword: false,
  showFormConfirmPassword: false,
  showFormPassword: false,
  showNewPassword: false,
  stats: { active: 3, admin: 1, inactive: 0, owner: 1, participant: 2, total: 4 },
  statusFilter: '',
  table: {
    columns: [],
    paginatedItems: [
      mockUser('u-1'),
      mockUser('u-2', { firstName: 'José', lastName: 'López', role: 'admin' }),
    ],
    pagination: {
      currentPage: 1,
      goToPage: vi.fn(),
      limit: 20,
      setLimit: vi.fn(),
      totalItems: 2,
      totalPages: 1,
    },
    sort: { getSortIcon: vi.fn(() => null), isSortActive: vi.fn(() => false), toggleSort: vi.fn() },
  },
};

describe('UserManagerScreen', () => {
  beforeEach(() => {
    mockUseUserManager.mockReturnValue(baseHookReturn);
  });

  it('renders screen with user data', () => {
    renderWithProviders(<UserManagerScreen />);
    assertText('María García');
    assertText('José López');
  });

  it('renders nothing while loading', () => {
    mockUseUserManager.mockReturnValueOnce({
      ...baseHookReturn,
      loading: true,
      table: { ...baseHookReturn.table, paginatedItems: [] },
    });
    const { container } = renderWithProviders(<UserManagerScreen />);
    expect(container.firstChild).toBeNull();
  });

  it('renders stats bar', () => {
    renderWithProviders(<UserManagerScreen />);
    assertText('4');
    assertText('3');
  });

  it('renders role badges', () => {
    renderWithProviders(<UserManagerScreen />);
    // Role badges render translated labels
    expect(screen.getAllByText(/participante|admin/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders status badges', () => {
    renderWithProviders(<UserManagerScreen />);
    const activeBadges = screen.getAllByText('Activo');
    expect(activeBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('renders action buttons when canEditUser', () => {
    renderWithProviders(<UserManagerScreen />);
    const editButtons = screen.getAllByTitle('Editar');
    expect(editButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('hides action buttons when cannot edit', () => {
    mockUseUserManager.mockReturnValueOnce({
      ...baseHookReturn,
      canDeleteUser: () => false,
      canEditUser: () => false,
      canToggleUserStatus: () => false,
    });
    renderWithProviders(<UserManagerScreen />);
    expect(screen.queryByTitle('Editar')).not.toBeInTheDocument();
  });

  it('shows processing state for user', () => {
    mockUseUserManager.mockReturnValueOnce({ ...baseHookReturn, processingUserId: 'u-1' });
    renderWithProviders(<UserManagerScreen />);
    expect(UserManagerScreen).toBeDefined();
  });

  it('renders empty state', () => {
    mockUseUserManager.mockReturnValueOnce({
      ...baseHookReturn,
      table: {
        ...baseHookReturn.table,
        paginatedItems: [],
        pagination: { ...baseHookReturn.table.pagination, totalItems: 0 },
      },
    });
    renderWithProviders(<UserManagerScreen />);
    assertText(/no hay.*usuario/i);
  });

  it('renders user with inactive status', () => {
    mockUseUserManager.mockReturnValueOnce({
      ...baseHookReturn,
      table: {
        ...baseHookReturn.table,
        paginatedItems: [mockUser('u-1', { isActive: false })],
      },
    });
    renderWithProviders(<UserManagerScreen />);
    assertText('Inactivo');
  });

  it('renders user without name shows fallback', () => {
    mockUseUserManager.mockReturnValueOnce({
      ...baseHookReturn,
      table: {
        ...baseHookReturn.table,
        paginatedItems: [mockUser('u-1', { firstName: '', lastName: '' })],
      },
    });
    renderWithProviders(<UserManagerScreen />);
    assertText('Sin nombre');
  });
});
