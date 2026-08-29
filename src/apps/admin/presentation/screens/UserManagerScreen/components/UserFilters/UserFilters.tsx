/**
 * UserFilters
 *
 * UserFilters component.
 */

'use client';

import type { MouseEvent } from 'react';
import { useCallback, useMemo } from 'react';
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { AdminDropdown, AdminSearch } from '@components';
import { Button } from '@dannydanzka/sovereignty-ui';

import type { RoleFilter, StatusFilter, UserFiltersProps } from './UserFilters.interfaces';

export const UserFilters = ({
  handleOpenCreateModal,
  isOwner,
  onRoleChange,
  onSearchChange,
  onStatusChange,
  roleFilter,
  searchTerm,
  statusFilter,
}: UserFiltersProps) => {
  const { t } = useTranslation();
  const roleOptions = useMemo(() => {
    const options = [
      { label: t('admin.users.allRoles'), value: '' },
      { label: t('admin.users.roles.admin'), value: 'admin' },
      { label: t('admin.users.roles.participant'), value: 'participant' },
    ];

    if (isOwner) {
      options.splice(1, 0, { label: t('admin.users.roles.owner'), value: 'owner' });
    }

    return options;
  }, [isOwner, t]);

  const statusOptions = [
    { label: t('admin.users.allStatuses'), value: '' },
    { label: t('admin.users.statuses.active'), value: 'active' },
    { label: t('admin.users.statuses.inactive'), value: 'inactive' },
  ];

  const handleRoleChange = useCallback(
    (value: string) => {
      onRoleChange(value as RoleFilter);
    },
    [onRoleChange]
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      onStatusChange(value as StatusFilter);
    },
    [onStatusChange]
  );

  const handleCreateClick = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      handleOpenCreateModal();
    },
    [handleOpenCreateModal]
  );

  return (
    <AdminSearch
      placeholder={t('admin.users.searchPlaceholder')}
      value={searchTerm}
      onChange={onSearchChange}
    >
      <AdminDropdown
        options={roleOptions}
        placeholder={t('admin.users.allRoles')}
        value={roleFilter}
        onChange={handleRoleChange}
      />

      <AdminDropdown
        options={statusOptions}
        placeholder={t('admin.users.allStatuses')}
        value={statusFilter}
        onChange={handleStatusChange}
      />

      <Button icon={<UserPlus size={16} />} variant='primary' onClick={handleCreateClick}>
        {t('admin.users.create')}
      </Button>
    </AdminSearch>
  );
};
