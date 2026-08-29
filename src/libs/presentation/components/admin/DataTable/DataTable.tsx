'use client';

/**
 * DataTable Component
 *
 * Centralized table component for admin screens.
 * Handles sorting, pagination, and empty states.
 */

import { ITEMS_PER_PAGE_OPTIONS } from '@constants';

import {
  AdminTable,
  AdminTableBody,
  AdminTableEmptyCell,
  AdminTableRow,
  AdminTableWrapper,
} from '../AdminTable';
import { DataTableHeader } from './DataTableHeader';
import { DataTablePagination } from './DataTablePagination';
import type { DataTableProps } from './DataTable.interfaces';

export const DataTable = <T, TField extends string>({
  className,
  emptyFilteredMessage = 'No se encontraron registros con los filtros aplicados',
  emptyMessage = 'No hay registros',
  entityName = 'registro',
  entityNamePlural = 'registros',
  hasFilters = false,
  isLoading = false,
  itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS,
  renderRow,
  showPagination = true,
  table,
}: DataTableProps<T, TField>) => {
  const { columns, paginatedItems, pagination, sort, totalItems } = table;

  if (isLoading && paginatedItems.length === 0) {
    return null;
  }

  const renderEmptyState = () => (
    <AdminTableRow>
      <AdminTableEmptyCell colSpan={columns.length}>
        {hasFilters ? emptyFilteredMessage : emptyMessage}
      </AdminTableEmptyCell>
    </AdminTableRow>
  );

  const renderBody = () => (
    <AdminTableBody>
      {paginatedItems.length > 0
        ? paginatedItems.map((item, index) => renderRow(item, index))
        : renderEmptyState()}
    </AdminTableBody>
  );

  return (
    <>
      <AdminTableWrapper className={className}>
        <AdminTable>
          <DataTableHeader
            columns={columns}
            getSortIcon={sort.getSortIcon}
            isSortActive={sort.isSortActive}
            onSort={sort.toggleSort}
          />
          {renderBody()}
        </AdminTable>
      </AdminTableWrapper>
      {showPagination && totalItems > 0 && (
        <DataTablePagination
          currentPage={pagination.currentPage}
          endIndex={pagination.endIndex}
          entityName={entityName}
          entityNamePlural={entityNamePlural}
          itemsPerPage={pagination.itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          startIndex={pagination.startIndex}
          totalItems={totalItems}
          totalPages={pagination.totalPages}
          onFirstPage={pagination.goToFirstPage}
          onItemsPerPageChange={pagination.handleItemsPerPageChange}
          onLastPage={pagination.goToLastPage}
          onNextPage={pagination.goToNextPage}
          onPageChange={pagination.setPage}
          onPrevPage={pagination.goToPrevPage}
        />
      )}
    </>
  );
};
