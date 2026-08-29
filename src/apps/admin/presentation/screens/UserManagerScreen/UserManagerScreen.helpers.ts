/**
 * UserManagerScreen Helpers
 *
 * Pure utility functions for user management screen.
 */

import type { TableSortDirection } from '@hooks';
import type { UserRole } from '@domain-types';

import type { RoleFilter, StatusFilter, UserSortField } from './UserManagerScreen.interfaces';

const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrador',
  owner: 'Propietario',
  participant: 'Participante',
};

/**
 * Get display label for user role
 */
export const getUserRoleLabel = (role: UserRole): string => ROLE_LABELS[role] ?? role;

/**
 * Get display label for role filter
 */
export const getRoleLabel = (role: RoleFilter): string => {
  if (!role) return 'Todos los roles';
  return ROLE_LABELS[role] ?? role;
};

/**
 * Get display label for status filter
 */
export const getStatusLabel = (status: StatusFilter): string => {
  if (!status) return 'Todos los estados';
  return status === 'active' ? 'Activos' : 'Inactivos';
};

/**
 * Get sort icon based on current sort state
 */
export const getSortIcon = (
  field: UserSortField,
  currentSortField: UserSortField,
  sortOrder: TableSortDirection
): string => {
  if (currentSortField !== field) return '↕';
  return sortOrder === 'asc' ? '↑' : '↓';
};

/**
 * Get dropdown position based on available space
 */
export const getDropdownPosition = (
  ref: React.RefObject<HTMLDivElement | null>
): 'bottom' | 'top' => {
  if (!ref.current) return 'bottom';
  const rect = ref.current.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  return spaceBelow < 250 ? 'top' : 'bottom';
};

/**
 * Check if user can be edited
 */
export const canEditUser = (userRole: UserRole): boolean => userRole !== 'owner';

/**
 * Check if user status can be toggled
 */
export const canToggleUserStatus = (
  userId: string,
  userRole: UserRole,
  currentUserId: string | undefined
): boolean => {
  if (userId === currentUserId) return false;
  if (userRole === 'owner') return false;
  return true;
};

/**
 * Check if user can be deleted
 */
export const canDeleteUser = (
  userId: string,
  userRole: UserRole,
  currentUserId: string | undefined
): boolean => {
  if (userId === currentUserId) return false;
  if (userRole === 'owner') return false;
  return true;
};

/**
 * Calculate pagination range
 */
export const calculatePaginationRange = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages = 5
): number[] => {
  const pages: number[] = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return pages;
};
