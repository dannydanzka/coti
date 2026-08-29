/**
 * useUserManager Interfaces
 *
 * TypeScript interfaces for hooks.
 */

import type { UseFormReturn } from 'react-hook-form';

import type { UseDataTableReturn } from '@hooks';
import type { UserRole } from '@domain-types';

import type { ChangePasswordFormData } from '../components/PasswordModal/PasswordModal.interfaces';
import type {
  ConfirmModalData,
  PasswordModalData,
  RoleFilter,
  StatusFilter,
  UserItem,
  UserSortField,
} from '../UserManagerScreen.interfaces';
import type {
  CreateUserFormData,
  EditUserFormData,
} from '../components/UserFormModal/UserFormModal.interfaces';

export interface UseUserManagerReturn {
  users: UserItem[];
  loading: boolean;
  hasFilters: boolean;
  table: UseDataTableReturn<UserItem, UserSortField>;

  searchTerm: string;
  roleFilter: RoleFilter;
  statusFilter: StatusFilter;

  isModalOpen: boolean;
  isEditing: boolean;
  isEditingSelf: boolean;
  editingUserId: string | null;
  createForm: UseFormReturn<CreateUserFormData>;
  editForm: UseFormReturn<EditUserFormData>;
  isSaving: boolean;

  confirmModal: ConfirmModalData;
  isDeleting: boolean;

  passwordModal: PasswordModalData;
  passwordForm: UseFormReturn<ChangePasswordFormData>;
  isChangingPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  showFormPassword: boolean;
  showFormConfirmPassword: boolean;

  processingUserId: string | null;
  isOwner: boolean;

  stats: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
    regularUsers: number;
    activationRate: number;
  };

  setRoleFilter: (value: RoleFilter) => void;
  setSearchTerm: (value: string) => void;
  setStatusFilter: (value: StatusFilter) => void;

  handleOpenCreateModal: () => void;
  handleOpenEditModal: (user: UserItem) => void;
  handleCloseModal: () => void;
  handleSaveUser: () => Promise<void>;
  handleToggleStatus: (userId: string, currentStatus: boolean, userName: string) => Promise<void>;
  handleOpenDeleteConfirm: (user: UserItem) => void;
  handleCloseConfirmModal: () => void;
  handleOpenPasswordModal: (user: UserItem) => void;
  handleClosePasswordModal: () => void;
  handleChangePassword: () => Promise<void>;
  handleToggleNewPasswordVisibility: () => void;
  handleToggleConfirmPasswordVisibility: () => void;
  handleToggleFormPasswordVisibility: () => void;
  handleToggleFormConfirmPasswordVisibility: () => void;
  handleModalContentClick: (event: React.MouseEvent) => void;

  canEditUser: (userId: string, userRole: UserRole, userEmail?: string) => boolean;
  canToggleUserStatus: (
    userId: string,
    userRole: UserRole,
    userIsActive: boolean,
    userEmail?: string
  ) => boolean;
  canDeleteUser: (
    userId: string,
    userRole: UserRole,
    userIsActive: boolean,
    userEmail?: string
  ) => boolean;
  getUserRoleLabel: (role: UserRole) => string;

  createEditHandler: (user: UserItem) => () => void;
  createToggleHandler: (userId: string, currentStatus: boolean, userName: string) => () => void;
  createDeleteHandler: (user: UserItem) => () => void;
  createPasswordHandler: (user: UserItem) => () => void;
}
