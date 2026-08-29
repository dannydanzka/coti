'use client';

/**
 * useDataTable Hook
 *
 * Centralized hook that composes usePagination and useTableSort.
 * Provides a complete table state management solution.
 */

import { useMemo } from 'react';

import type { UseDataTableOptions, UseDataTableReturn } from './useDataTable.interfaces';
import { usePagination } from '../usePagination';
import { useTableSort } from '../useTableSort';

export const useDataTable = <T, TField extends string>(
  options: UseDataTableOptions<T, TField>
): UseDataTableReturn<T, TField> => {
  const {
    columns,
    filterFn,
    getSortValue,
    items,
    pagination: paginationOptions = {},
    sort: sortOptions,
  } = options;

  const sortableColumns = columns.filter((c) => c.sortable !== false && c.key);

  const defaultSortField = sortOptions?.defaultField ?? sortableColumns[0]?.key ?? ('' as TField);

  const sort = useTableSort<TField>({
    defaultDirection: sortOptions?.defaultDirection ?? 'desc',
    defaultField: defaultSortField,
  });

  const filteredItems = useMemo(() => {
    return filterFn ? items.filter(filterFn) : items;
  }, [items, filterFn]);

  const sortedItems = useMemo(() => {
    if (!getSortValue || sortableColumns.length === 0) {
      return filteredItems;
    }

    const comparator = sort.getComparator(getSortValue);
    return [...filteredItems].sort(comparator);
  }, [filteredItems, getSortValue, sort, sortableColumns.length]);

  const pagination = usePagination(sortedItems.length, {
    ...paginationOptions,
    resetDependencies: [
      ...(paginationOptions.resetDependencies ?? []),
      sort.sortField,
      sort.sortDirection,
    ],
  });

  const paginatedItems = pagination.paginate(sortedItems);

  return {
    columns,
    filteredItems: sortedItems,
    paginatedItems,
    pagination,
    sort,
    totalItems: sortedItems.length,
  };
};
