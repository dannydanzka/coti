/**
 * UserFilters Interfaces
 *
 * Simplified interface using global AdminDropdown API.
 */

import type { UserRole } from '@domain-types';

export type RoleFilter = '' | UserRole;
export type StatusFilter = '' | 'active' | 'inactive';

export interface UserFiltersProps {
  handleOpenCreateModal: () => void;
  isOwner: boolean;
  onRoleChange: (value: RoleFilter) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  roleFilter: RoleFilter;
  searchTerm: string;
  statusFilter: StatusFilter;
}
