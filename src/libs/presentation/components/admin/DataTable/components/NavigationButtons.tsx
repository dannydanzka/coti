'use client';

/**
 * NavigationButtons - First/Prev/Next/Last pagination buttons
 */

import { useTranslation } from 'react-i18next';

import type { NavigationButtonsProps } from './components.interfaces';
import { PaginationButton } from '../../AdminPagination';

export const NavigationButtons = ({
  currentPage,
  onFirstPage,
  onLastPage,
  onNextPage,
  onPrevPage,
  totalPages,
}: NavigationButtonsProps) => {
  const { t } = useTranslation();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;

  return {
    First: (
      <PaginationButton
        aria-label={t('pagination.firstPage')}
        disabled={isFirstPage}
        type='button'
        onClick={onFirstPage}
      >
        «
      </PaginationButton>
    ),
    Last: (
      <PaginationButton
        aria-label={t('pagination.lastPage')}
        disabled={isLastPage}
        type='button'
        onClick={onLastPage}
      >
        »
      </PaginationButton>
    ),
    Next: (
      <PaginationButton
        aria-label={t('pagination.nextPage')}
        disabled={isLastPage}
        type='button'
        onClick={onNextPage}
      >
        ›
      </PaginationButton>
    ),
    Prev: (
      <PaginationButton
        aria-label={t('pagination.previousPage')}
        disabled={isFirstPage}
        type='button'
        onClick={onPrevPage}
      >
        ‹
      </PaginationButton>
    ),
  };
};
