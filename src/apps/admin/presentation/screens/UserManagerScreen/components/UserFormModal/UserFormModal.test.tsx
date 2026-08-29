/**
 * UserFormModal Component Tests
 *
 * Tests modal open/closed and form fields.
 * Spanish locale mandatory.
 */

import { modal, renderWithProviders } from '@testing';

import { UserFormModal } from './UserFormModal';

const createMockForm = (defaults: Record<string, unknown> = {}) => ({
  formState: { errors: {} },
  setValue: vi.fn(),
  watch: vi.fn((field?: string) => (field ? (defaults[field] ?? '') : defaults)),
});

const defaultProps = {
  createForm: createMockForm({
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: 'participant',
  }) as never,
  editForm: createMockForm({
    email: '',
    firstName: '',
    lastName: '',
    role: 'participant',
  }) as never,
  handleCloseModal: vi.fn(),
  handleSaveUser: vi.fn(),
  handleToggleConfirmPasswordVisibility: vi.fn(),
  handleTogglePasswordVisibility: vi.fn(),
  isEditing: false,
  isEditingSelf: false,
  isModalOpen: false,
  isOwner: false,
  isSaving: false,
  showConfirmPassword: false,
  showPassword: false,
};

describe('UserFormModal', () => {
  it('returns null when closed', () => {
    const { container } = renderWithProviders(<UserFormModal {...defaultProps} />);
    modal.assertClosed(container);
  });

  it('renders modal when open', () => {
    renderWithProviders(<UserFormModal {...defaultProps} isModalOpen />);
    modal.assertOpen();
  });

  it('renders create form fields', () => {
    const { container } = renderWithProviders(<UserFormModal {...defaultProps} isModalOpen />);
    modal.assertFormFields(container);
  });

  it('renders edit form fields', () => {
    const { container } = renderWithProviders(
      <UserFormModal {...defaultProps} isEditing isModalOpen />
    );
    modal.assertFormFields(container);
  });
});
