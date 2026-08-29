/**
 * UserManagerScreen Constants
 */

import type { ColumnConfig } from '@hooks';

import type {
  ConfirmModalData,
  PasswordModalData,
  UserItem,
  UserSortField,
} from './UserManagerScreen.interfaces';

export const ITEMS_PER_PAGE_OPTIONS = [20, 40, 60, 100] as const;

export const USER_COLUMNS: ColumnConfig<UserItem, UserSortField>[] = [
  { key: 'name', label: 'Nombre', sortable: true, width: '22%' },
  { key: 'email', label: 'Email', sortable: true, width: '25%' },
  { key: 'role', label: 'Rol', sortable: true, width: '120px' },
  { key: 'isActive', label: 'Estado', sortable: true, width: '100px' },
  { key: 'createdAt', label: 'Fecha de Creación', sortable: true, width: '140px' },
  { key: 'actions', label: 'Acciones', sortable: false, width: '180px' },
];

/**
 * Cuentas del seed que la UI nunca debe borrar ni desactivar: son las que
 * sostienen la demo del workshop. El servidor tiene sus propias guardas (rol
 * OWNER, auto-borrado); esta lista sólo esconde los botones.
 */
export const PROTECTED_USER_EMAILS = ['owner@coti.mx', 'admin@coti.mx', 'demo@coti.mx'];

export const INITIAL_CONFIRM_MODAL: ConfirmModalData = {
  confirmText: 'Confirmar',
  isOpen: false,
  message: '',
  onConfirm: () => {},
  title: '',
  userId: null,
  variant: 'danger',
};

export const INITIAL_PASSWORD_MODAL: PasswordModalData = {
  isOpen: false,
  userId: null,
  userName: '',
};

export const formatDate = (date: Date | string | null): string => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible = 5
): number[] => {
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
  const pages: number[] = [];
  for (let p = start; p <= end; p += 1) pages.push(p);
  return pages;
};

export type SortField = 'name' | 'email' | 'role' | 'isActive' | 'createdAt';

export type StatKey = 'total' | 'active' | 'inactive' | 'admins' | 'regularUsers';
type StatVariant = 'default' | 'success' | 'warning' | 'info';

export const STATS_CONFIG: { key: StatKey; label: string; variant?: StatVariant }[] = [
  { key: 'total', label: 'Total' },
  { key: 'active', label: 'Activos', variant: 'success' },
  { key: 'inactive', label: 'Inactivos', variant: 'warning' },
  { key: 'admins', label: 'Administradores', variant: 'info' },
  { key: 'regularUsers', label: 'Participantes', variant: 'default' },
];
