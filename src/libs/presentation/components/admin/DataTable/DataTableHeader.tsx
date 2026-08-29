'use client';

/**
 * DataTableHeader Component
 *
 * Renders table headers with sorting capability.
 */

import { useCallback } from 'react';

import { AdminSortIcon, AdminTableHead, AdminTableHeader, AdminTableRow } from '../AdminTable';
import type { DataTableHeaderProps } from './DataTable.interfaces';
import { SortableHeader } from '../AdminSortableHeader';

export const DataTableHeader = <T, TField extends string>({
  columns,
  getSortIcon,
  isSortActive,
  onSort,
}: DataTableHeaderProps<T, TField>) => {
  const handleSort = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>) => {
      const field = e.currentTarget.dataset['field'] as TField | undefined;
      if (field) {
        onSort(field);
      }
    },
    [onSort]
  );

  return (
    <AdminTableHead>
      <AdminTableRow>
        {columns.map((column) => {
          const isSortable = column.sortable !== false && column.key;

          if (isSortable) {
            return (
              <SortableHeader
                $active={isSortActive(column.key)}
                $width={column.width}
                data-field={column.key}
                key={column.key}
                onClick={handleSort}
              >
                {column.label} <AdminSortIcon>{getSortIcon(column.key)}</AdminSortIcon>
              </SortableHeader>
            );
          }

          return (
            <AdminTableHeader $width={column.width} key={column.key}>
              {column.label}
            </AdminTableHeader>
          );
        })}
      </AdminTableRow>
    </AdminTableHead>
  );
};
