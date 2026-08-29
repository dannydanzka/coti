/**
 * UserManagerScreen Interfaces
 */

import type { UseFormReturn } from 'react-hook-form';

import type { ServerPagination, UserQueryParams } from '@services';
import type { UseDataTableReturn } from '@hooks';
import type { UserRole } from '@domain-types';

import type { ChangePasswordFormData } from './components/PasswordModal/PasswordModal.interfaces';
import type {
  CreateUserFormData,
  EditUserFormData,
} from './components/UserFormModal/UserFormModal.interfaces';

export type RoleFilter = '' | UserRole;
export type StatusFilter = '' | 'active' | 'inactive';

export type UserSortField = 'actions' | 'createdAt' | 'email' | 'isActive' | 'name' | 'role';

export interface UserFormData {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
}

export interface ConfirmModalData {
  isOpen: boolean;
  title: string;
  message: string;
  userId: string | null;
  variant: 'danger' | 'warning' | 'info';
  confirmText: string;
  onConfirm: () => void;
}

export interface PasswordModalData {
  isOpen: boolean;
  userId: string | null;
  userName: string;
}

export interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface UseUserConfirmModalProps {
  deleteUserWithConfirmation: (userId: string) => Promise<unknown>;
  loadUsers: () => void;
  toggleUserStatusWithNotification: (userId: string, currentStatus: boolean) => Promise<unknown>;
}

export interface UseUserConfirmModalReturn {
  confirmModal: ConfirmModalData;
  handleCloseConfirmModal: () => void;
  handleOpenDeleteConfirm: (user: UserItem) => void;
  handleToggleStatus: (userId: string, currentStatus: boolean, userName: string) => Promise<void>;
  isDeleting: boolean;
  processingUserId: string | null;
}

export interface UseUserFiltersProps {
  isOwner: boolean;
  loadUsers: (params?: UserQueryParams) => void;
  serverPagination: ServerPagination;
  users: UserItem[];
}

export interface UseUserFiltersReturn {
  hasFilters: boolean;
  roleFilter: RoleFilter;
  searchTerm: string;
  setRoleFilter: (filter: RoleFilter) => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  statusFilter: StatusFilter;
  table: UseDataTableReturn<UserItem, UserSortField>;
}

export interface UseUserFormModalProps {
  createUser: (data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
  }) => Promise<{ success: boolean; error?: string }>;
  currentUserId?: string;
  isOwner: boolean;
  loadUsers: () => void;
  updateUser: (
    userId: string,
    data: { email: string; firstName: string; lastName: string; role?: UserRole }
  ) => Promise<{ success: boolean; error?: string }>;
}

export interface UseUserFormModalReturn {
  createForm: UseFormReturn<CreateUserFormData>;
  editForm: UseFormReturn<EditUserFormData>;
  editingUserId: string | null;
  handleCloseModal: () => void;
  handleOpenCreateModal: () => void;
  handleOpenEditModal: (user: UserItem) => void;
  handleSaveUser: () => Promise<void>;
  handleToggleConfirmPasswordVisibility: () => void;
  handleTogglePasswordVisibility: () => void;
  isEditing: boolean;
  isEditingSelf: boolean;
  isModalOpen: boolean;
  isSaving: boolean;
  showConfirmPassword: boolean;
  showPassword: boolean;
}

export interface UseUserPasswordModalProps {
  changeUserPassword: (
    userId: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export interface UseUserPasswordModalReturn {
  handleChangePassword: () => Promise<void>;
  handleClosePasswordModal: () => void;
  handleOpenPasswordModal: (user: UserItem) => void;
  handleToggleConfirmPasswordVisibility: () => void;
  handleToggleNewPasswordVisibility: () => void;
  isChangingPassword: boolean;
  passwordForm: UseFormReturn<ChangePasswordFormData>;
  passwordModal: PasswordModalData;
  showConfirmPassword: boolean;
  showNewPassword: boolean;
}
