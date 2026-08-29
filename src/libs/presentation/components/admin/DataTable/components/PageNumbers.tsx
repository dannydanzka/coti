'use client';

/**
 * PageNumbers - Renders pagination page number buttons with ellipsis
 */

import { useCallback, useMemo } from 'react';

import { ELLIPSIS_TYPES } from './components.constants';
import type { PageNumbersProps } from './components.interfaces';
import { PaginationButton, PaginationEllipsis } from '../../AdminPagination';

const MAX_VISIBLE_PAGES = 5;

export const PageNumbers = ({ currentPage, onPageChange, totalPages }: PageNumbersProps) => {
  const visiblePages = useMemo(() => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);
    if (start > 2) pages.push(ELLIPSIS_TYPES.START);
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push(ELLIPSIS_TYPES.END);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const pageStr = e.currentTarget.dataset['page'];
      if (pageStr) {
        onPageChange(Number(pageStr));
      }
    },
    [onPageChange]
  );

  return (
    <>
      {visiblePages.map((page) => {
        if (page === ELLIPSIS_TYPES.START || page === ELLIPSIS_TYPES.END) {
          return <PaginationEllipsis key={page}>...</PaginationEllipsis>;
        }
        return (
          <PaginationButton
            $active={currentPage === page}
            data-page={page}
            key={page}
            type='button'
            onClick={handlePageClick}
          >
            {page}
          </PaginationButton>
        );
      })}
    </>
  );
};
