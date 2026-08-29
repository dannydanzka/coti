'use client';

/**
 * PerPageSelector - Items per page dropdown selector
 */

import { useTranslation } from 'react-i18next';

import { PerPageOption, PerPageSelect } from '../../AdminPagination';
import type { PerPageSelectorProps } from './components.interfaces';

export const PerPageSelector = ({
  itemsPerPage,
  itemsPerPageOptions,
  onItemsPerPageChange,
}: PerPageSelectorProps) => {
  const { t } = useTranslation();

  return (
    <PerPageSelect value={itemsPerPage} onChange={onItemsPerPageChange}>
      {itemsPerPageOptions.map((option) => (
        <PerPageOption key={option} value={option}>
          {option} {t('dataTable.perPageSuffix')}
        </PerPageOption>
      ))}
    </PerPageSelect>
  );
};
