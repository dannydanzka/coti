'use client';

/**
 * usePagination Hook
 *
 * Centralized hook for pagination state and handlers.
 * Eliminates duplication across admin screens.
 */

import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { PAGINATION } from '@constants';

import type { UsePaginationOptions, UsePaginationReturn } from './usePagination.interfaces';

export const usePagination = (
  totalItems: number,
  options: UsePaginationOptions = {}
): UsePaginationReturn => {
  const {
    defaultLimit = PAGINATION.DEFAULT_LIMIT,
    defaultPage = PAGINATION.DEFAULT_PAGE,
    resetDependencies = [],
  } = options;

  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPageState] = useState(defaultLimit);

  const resetKey = JSON.stringify(resetDependencies);

  useEffect(() => {
    setCurrentPage(1);
  }, [resetKey, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / itemsPerPage)),
    [totalItems, itemsPerPage]
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const setPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
  );

  const setItemsPerPage = useCallback((limit: number) => {
    setItemsPerPageState(limit);
    setCurrentPage(1);
  }, []);

  const goToFirstPage = useCallback(() => setCurrentPage(1), []);

  const goToLastPage = useCallback(() => setCurrentPage(totalPages), [totalPages]);

  const goToPrevPage = useCallback(() => setCurrentPage((p) => Math.max(1, p - 1)), []);

  const goToNextPage = useCallback(
    () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
    [totalPages]
  );

  const handlePageClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { page } = event.currentTarget.dataset;
      if (page) setPage(Number(page));
    },
    [setPage]
  );

  const handleItemsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(event.target.value));
    },
    [setItemsPerPage]
  );

  const createPageHandler = useCallback((page: number) => () => setPage(page), [setPage]);

  const paginate = useCallback(
    <T>(items: T[]): T[] => {
      return items.slice(startIndex, endIndex);
    },
    [startIndex, endIndex]
  );

  return {
    createPageHandler,
    currentPage,
    endIndex,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,
    handleItemsPerPageChange,
    handlePageClick,
    itemsPerPage,
    paginate,
    setItemsPerPage,
    setPage,
    startIndex,
    totalPages,
  };
};
