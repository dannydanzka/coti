'use client';

/**
 * DataTablePagination Component
 *
 * Centralized pagination controls for admin tables.
 */

import { useTranslation } from 'react-i18next';

import type { DataTablePaginationProps } from './DataTable.interfaces';
import { NavigationButtons, PageNumbers, PerPageSelector } from './components';
import { PaginationContainer, PaginationControls, PaginationInfo } from '../AdminPagination';

export const DataTablePagination = ({
  currentPage,
  endIndex,
  entityName,
  entityNamePlural,
  itemsPerPage,
  itemsPerPageOptions,
  onFirstPage,
  onItemsPerPageChange,
  onLastPage,
  onNextPage,
  onPageChange,
  onPrevPage,
  startIndex,
  totalItems,
  totalPages,
}: DataTablePaginationProps) => {
  const { t } = useTranslation();
  const displayName = totalItems === 1 ? entityName : entityNamePlural;
  const nav = NavigationButtons({
    currentPage,
    onFirstPage,
    onLastPage,
    onNextPage,
    onPrevPage,
    totalPages,
  });

  return (
    <PaginationContainer>
      <PaginationInfo>
        {t('pagination.showing')} {totalItems === 0 ? 0 : startIndex + 1}-{endIndex}{' '}
        {t('pagination.of')} {totalItems} {displayName}
      </PaginationInfo>

      <PaginationControls>
        <PerPageSelector
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onItemsPerPageChange={onItemsPerPageChange}
        />
        {nav.First}
        {nav.Prev}
        <PageNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        {nav.Next}
        {nav.Last}
      </PaginationControls>
    </PaginationContainer>
  );
};
