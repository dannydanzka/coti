'use client';

/**
 * UserManagerScreen
 *
 * Admin screen for managing platform users with CRUD operations.
 * Uses DataTable for centralized sorting and pagination.
 */

import { Key, Pencil, Trash2 } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

import {
  AdminActionsContainer,
  AdminStatItem,
  AdminStatsBar,
  AdminTableCell,
  AdminTableRow,
  DataTable,
  LazyFallback,
  PageTitle,
  RoleBadge,
  ScreenContainer,
  StatusBadge,
} from '@components';
import { Button, ToggleActiveButton } from '@dannydanzka/sovereignty-ui';

import { formatDate, STATS_CONFIG } from './UserManagerScreen.constants';
import { UserFilters } from './components';
import type { UserItem } from './UserManagerScreen.interfaces';
import { useUserManager } from './hooks';

const ConfirmDeleteModal = dynamic(
  () => import('./components/ConfirmDeleteModal').then((m) => ({ default: m.ConfirmDeleteModal })),
  { loading: () => <LazyFallback />, ssr: false }
);

const PasswordModal = dynamic(
  () => import('./components/PasswordModal').then((m) => ({ default: m.PasswordModal })),
  { loading: () => <LazyFallback />, ssr: false }
);

const UserFormModal = dynamic(
  () => import('./components/UserFormModal').then((m) => ({ default: m.UserFormModal })),
  { loading: () => <LazyFallback />, ssr: false }
);

export const UserManagerScreen = () => {
  const { t } = useTranslation();
  const {
    canDeleteUser,
    canEditUser,
    canToggleUserStatus,
    confirmModal,
    createDeleteHandler,
    createEditHandler,
    createForm,
    createPasswordHandler,
    createToggleHandler,
    editForm,
    handleChangePassword,
    handleCloseConfirmModal,
    handleCloseModal,
    handleClosePasswordModal,
    handleOpenCreateModal,
    handleSaveUser,
    handleToggleConfirmPasswordVisibility,
    handleToggleFormConfirmPasswordVisibility,
    handleToggleFormPasswordVisibility,
    handleToggleNewPasswordVisibility,
    hasFilters,
    isChangingPassword,
    isDeleting,
    isEditing,
    isEditingSelf,
    isModalOpen,
    isOwner,
    isSaving,
    loading,
    passwordForm,
    passwordModal,
    processingUserId,
    roleFilter,
    searchTerm,
    setRoleFilter,
    setSearchTerm,
    setStatusFilter,
    showConfirmPassword,
    showFormConfirmPassword,
    showFormPassword,
    showNewPassword,
    stats,
    statusFilter,
    table,
  } = useUserManager();

  const renderStats = () => (
    <AdminStatsBar>
      {STATS_CONFIG.map(({ key, label, variant }) => (
        <AdminStatItem key={key} label={label} value={stats[key]} variant={variant} />
      ))}
    </AdminStatsBar>
  );

  const renderUserActions = useCallback(
    (user: UserItem, isProcessing: boolean) => (
      <AdminActionsContainer>
        {canEditUser(user.id, user.role, user.email) && (
          <Button
            disabled={isProcessing}
            icon={<Pencil size={14} />}
            iconOnly
            size='sm'
            title={t('common.edit')}
            variant='ghost'
            onClick={createEditHandler(user)}
          />
        )}
        {canEditUser(user.id, user.role, user.email) && (
          <Button
            disabled={isProcessing}
            icon={<Key size={14} />}
            iconOnly
            size='sm'
            title={t('admin.users.changePasswordLower')}
            variant='accent'
            onClick={createPasswordHandler(user)}
          />
        )}
        {canToggleUserStatus(user.id, user.role, user.isActive, user.email) && (
          <ToggleActiveButton
            isActive={user.isActive}
            isLoading={isProcessing}
            onClick={createToggleHandler(
              user.id,
              user.isActive,
              `${user.firstName} ${user.lastName}`
            )}
          />
        )}
        {canDeleteUser(user.id, user.role, user.isActive, user.email) && (
          <Button
            disabled={isProcessing}
            icon={<Trash2 size={14} />}
            iconOnly
            size='sm'
            title={t('modal.deleteButton')}
            variant='danger'
            onClick={createDeleteHandler(user)}
          />
        )}
      </AdminActionsContainer>
    ),
    [
      canDeleteUser,
      canEditUser,
      canToggleUserStatus,
      createDeleteHandler,
      createEditHandler,
      createPasswordHandler,
      createToggleHandler,
      t,
    ]
  );

  const renderTableRow = useCallback(
    (user: UserItem) => {
      const isProcessing = processingUserId === user.id;
      const fullName = `${user.firstName} ${user.lastName}`.trim() || 'Sin nombre';
      return (
        <AdminTableRow $processing={isProcessing} key={user.id}>
          <AdminTableCell>{fullName}</AdminTableCell>
          <AdminTableCell>{user.email}</AdminTableCell>
          <AdminTableCell>
            <RoleBadge role={user.role} />
          </AdminTableCell>
          <AdminTableCell>
            <StatusBadge status={user.isActive ? 'active' : 'inactive'} />
          </AdminTableCell>
          <AdminTableCell>{formatDate(user.createdAt)}</AdminTableCell>
          <AdminTableCell>{renderUserActions(user, isProcessing)}</AdminTableCell>
        </AdminTableRow>
      );
    },
    [processingUserId, renderUserActions]
  );

  const renderModals = () => (
    <>
      <UserFormModal
        createForm={createForm}
        editForm={editForm}
        handleCloseModal={handleCloseModal}
        handleSaveUser={handleSaveUser}
        handleToggleConfirmPasswordVisibility={handleToggleFormConfirmPasswordVisibility}
        handleTogglePasswordVisibility={handleToggleFormPasswordVisibility}
        isEditing={isEditing}
        isEditingSelf={isEditingSelf}
        isModalOpen={isModalOpen}
        isOwner={isOwner}
        isSaving={isSaving}
        showConfirmPassword={showFormConfirmPassword}
        showPassword={showFormPassword}
      />
      <ConfirmDeleteModal
        confirmModal={confirmModal}
        handleCloseConfirmModal={handleCloseConfirmModal}
        isDeleting={isDeleting}
      />
      <PasswordModal
        handleChangePassword={handleChangePassword}
        handleClosePasswordModal={handleClosePasswordModal}
        handleToggleConfirmPasswordVisibility={handleToggleConfirmPasswordVisibility}
        handleToggleNewPasswordVisibility={handleToggleNewPasswordVisibility}
        isChangingPassword={isChangingPassword}
        passwordForm={passwordForm}
        passwordModal={passwordModal}
        showConfirmPassword={showConfirmPassword}
        showNewPassword={showNewPassword}
      />
    </>
  );

  if (loading && table.paginatedItems.length === 0) {
    return null;
  }

  return (
    <ScreenContainer>
      <PageTitle>{t('admin.users.title')}</PageTitle>
      {renderStats()}
      <UserFilters
        handleOpenCreateModal={handleOpenCreateModal}
        isOwner={isOwner}
        roleFilter={roleFilter}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onRoleChange={setRoleFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />
      <DataTable
        emptyFilteredMessage={t('admin.users.noUsersFiltered')}
        emptyMessage={t('admin.users.noUsers')}
        entityName='usuario'
        entityNamePlural='usuarios'
        hasFilters={hasFilters}
        itemsPerPageOptions={[20, 40, 60, 100]}
        renderRow={renderTableRow}
        table={table}
      />

      {renderModals()}
    </ScreenContainer>
  );
};
