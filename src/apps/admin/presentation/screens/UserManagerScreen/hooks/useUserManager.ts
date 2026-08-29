/**
 * useUserManager
 *
 * Orchestrator hook that composes specialized hooks for UserManagerScreen.
 * Uses useDataTable for centralized sorting and pagination.
 */

'use client';

import { useCallback, useMemo } from 'react';

import { useAuth, useUsers } from '@hooks';
import { USER_ROLES } from '@constants';
import type { UserRole } from '@domain-types';

import { PROTECTED_USER_EMAILS } from '../UserManagerScreen.constants';
import type { UserItem } from '../UserManagerScreen.interfaces';
import { useUserConfirmModal } from './useUserConfirmModal';
import { useUserFilters } from './useUserFilters';
import { useUserFormModal } from './useUserFormModal';
import type { UseUserManagerReturn } from './useUserManager.interfaces';
import { useUserPasswordModal } from './useUserPasswordModal';

export const useUserManager = (): UseUserManagerReturn => {
  const { user: currentUser } = useAuth();
  const {
    changeUserPassword,
    createUser,
    deleteUserWithConfirmation,
    loading,
    loadUsers,
    serverPagination,
    stats,
    toggleUserStatusWithNotification,
    updateUser,
    users,
  } = useUsers();

  const isOwner = currentUser?.role === USER_ROLES.OWNER;

  const adminCount = useMemo(
    () => users.filter((u) => u.role === USER_ROLES.ADMIN && u.isActive).length,
    [users]
  );

  const protectedUserIds = useMemo(() => {
    return new Set(users.filter((u) => PROTECTED_USER_EMAILS.includes(u.email)).map((u) => u.id));
  }, [users]);

  const filters = useUserFilters({ isOwner, loadUsers, serverPagination, users });

  const formModal = useUserFormModal({
    createUser,
    currentUserId: currentUser?.id,
    isOwner,
    loadUsers,
    updateUser,
  });

  const passwordModal = useUserPasswordModal({
    changeUserPassword,
  });

  const confirmModal = useUserConfirmModal({
    deleteUserWithConfirmation,
    loadUsers,
    toggleUserStatusWithNotification,
  });

  const getUserRoleLabel = useCallback((role: UserRole): string => {
    const roleLabels: Record<UserRole, string> = {
      admin: 'Administrador',
      owner: 'Propietario',
      participant: 'Participante',
    };
    return roleLabels[role] || role;
  }, []);

  const canEditUser = useCallback(
    (userId: string, userRole: UserRole, userEmail?: string): boolean => {
      if (userRole === USER_ROLES.OWNER) return false;
      if (userEmail && PROTECTED_USER_EMAILS.includes(userEmail)) {
        return userId === currentUser?.id || isOwner;
      }
      if (protectedUserIds.has(userId)) {
        return userId === currentUser?.id || isOwner;
      }
      return true;
    },
    [currentUser?.id, isOwner, protectedUserIds]
  );

  const canToggleUserStatus = useCallback(
    (userId: string, userRole: UserRole, userEmail?: string): boolean => {
      if (userId === currentUser?.id) return false;
      if (userRole === USER_ROLES.OWNER) return false;
      if (userEmail && PROTECTED_USER_EMAILS.includes(userEmail)) return false;
      if (protectedUserIds.has(userId)) return false;
      if (userRole === USER_ROLES.ADMIN && adminCount <= 1) return false;
      return true;
    },
    [currentUser?.id, protectedUserIds, adminCount]
  );

  const canDeleteUser = useCallback(
    (userId: string, userRole: UserRole, userEmail?: string): boolean => {
      if (userId === currentUser?.id) return false;
      if (userRole === USER_ROLES.OWNER) return false;
      if (userEmail && PROTECTED_USER_EMAILS.includes(userEmail)) return false;
      if (protectedUserIds.has(userId)) return false;
      if (userRole === USER_ROLES.ADMIN && adminCount <= 1) return false;
      return true;
    },
    [currentUser?.id, protectedUserIds, adminCount]
  );

  const createEditHandler = useCallback(
    (user: UserItem) => () => formModal.handleOpenEditModal(user),
    [formModal]
  );

  const createToggleHandler = useCallback(
    (userId: string, currentStatus: boolean, userName: string) => () =>
      confirmModal.handleToggleStatus(userId, currentStatus, userName),
    [confirmModal]
  );

  const createDeleteHandler = useCallback(
    (user: UserItem) => () => confirmModal.handleOpenDeleteConfirm(user),
    [confirmModal]
  );

  const createPasswordHandler = useCallback(
    (user: UserItem) => () => passwordModal.handleOpenPasswordModal(user),
    [passwordModal]
  );

  const handleModalContentClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  return {
    canDeleteUser,
    canEditUser,
    canToggleUserStatus,
    confirmModal: confirmModal.confirmModal,
    createDeleteHandler,
    createEditHandler,
    createForm: formModal.createForm,
    createPasswordHandler,
    createToggleHandler,
    editForm: formModal.editForm,
    editingUserId: formModal.editingUserId,
    getUserRoleLabel,
    handleChangePassword: passwordModal.handleChangePassword,
    handleCloseConfirmModal: confirmModal.handleCloseConfirmModal,
    handleCloseModal: formModal.handleCloseModal,
    handleClosePasswordModal: passwordModal.handleClosePasswordModal,
    handleModalContentClick,
    handleOpenCreateModal: formModal.handleOpenCreateModal,
    handleOpenDeleteConfirm: confirmModal.handleOpenDeleteConfirm,
    handleOpenEditModal: formModal.handleOpenEditModal,
    handleOpenPasswordModal: passwordModal.handleOpenPasswordModal,
    handleSaveUser: formModal.handleSaveUser,
    handleToggleConfirmPasswordVisibility: passwordModal.handleToggleConfirmPasswordVisibility,
    handleToggleFormConfirmPasswordVisibility: formModal.handleToggleConfirmPasswordVisibility,
    handleToggleFormPasswordVisibility: formModal.handleTogglePasswordVisibility,
    handleToggleNewPasswordVisibility: passwordModal.handleToggleNewPasswordVisibility,
    handleToggleStatus: confirmModal.handleToggleStatus,
    hasFilters: filters.hasFilters,
    isChangingPassword: passwordModal.isChangingPassword,
    isDeleting: confirmModal.isDeleting,
    isEditing: formModal.isEditing,
    isEditingSelf: formModal.isEditingSelf,
    isModalOpen: formModal.isModalOpen,
    isOwner,
    isSaving: formModal.isSaving,
    loading,
    passwordForm: passwordModal.passwordForm,
    passwordModal: passwordModal.passwordModal,
    processingUserId: confirmModal.processingUserId,
    roleFilter: filters.roleFilter,
    searchTerm: filters.searchTerm,
    setRoleFilter: filters.setRoleFilter,
    setSearchTerm: filters.setSearchTerm,
    setStatusFilter: filters.setStatusFilter,
    showConfirmPassword: passwordModal.showConfirmPassword,
    showFormConfirmPassword: formModal.showConfirmPassword,
    showFormPassword: formModal.showPassword,
    showNewPassword: passwordModal.showNewPassword,
    stats,
    statusFilter: filters.statusFilter,
    table: filters.table,
    users,
  };
};
