'use client';

/**
 * useTableSort Hook
 *
 * Centralized hook for table sorting state and handlers.
 * Eliminates duplication across admin screens.
 */

import type { MouseEvent } from 'react';
import { useCallback, useState } from 'react';

import type {
  TableSortDirection,
  UseTableSortOptions,
  UseTableSortReturn,
} from './useTableSort.interfaces';

const SORT_ICONS = {
  asc: '\u2191',
  desc: '\u2193',
  inactive: '\u2195',
} as const;

export const useTableSort = <TField extends string>(
  options: UseTableSortOptions<TField>
): UseTableSortReturn<TField> => {
  const { defaultDirection = 'asc', defaultField } = options;

  const [sortField, setSortFieldState] = useState<TField>(defaultField);
  const [sortDirection, setTableSortDirection] = useState<TableSortDirection>(defaultDirection);

  const setSortField = useCallback((field: TField) => {
    setSortFieldState(field);
    setTableSortDirection('asc');
  }, []);

  const toggleSort = useCallback(
    (field: TField) => {
      if (sortField === field) {
        setTableSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortFieldState(field);
        setTableSortDirection('asc');
      }
    },
    [sortField]
  );

  const handleSortClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const field = event.currentTarget.dataset['sortField'] as TField | undefined;
      if (field) toggleSort(field);
    },
    [toggleSort]
  );

  const createSortHandler = useCallback((field: TField) => () => toggleSort(field), [toggleSort]);

  const getSortIcon = useCallback(
    (field: TField): string => {
      if (sortField !== field) return SORT_ICONS.inactive;
      return sortDirection === 'asc' ? SORT_ICONS.asc : SORT_ICONS.desc;
    },
    [sortField, sortDirection]
  );

  const isSortActive = useCallback(
    (field: TField): boolean => {
      return sortField === field;
    },
    [sortField]
  );

  const getComparator = useCallback(
    <T>(
      getFieldValue: (item: T, field: TField) => string | number | boolean | Date | null | undefined
    ) => {
      return (a: T, b: T): number => {
        const aValue = getFieldValue(a, sortField);
        const bValue = getFieldValue(b, sortField);

        let comparison = 0;

        const aNull = aValue === null || aValue === undefined;
        const bNull = bValue === null || bValue === undefined;

        if (aNull && bNull) {
          comparison = 0;
        } else if (aNull) {
          comparison = 1;
        } else if (bNull) {
          comparison = -1;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          comparison = Number(bValue) - Number(aValue);
        } else {
          comparison = (aValue as number) - (bValue as number);
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      };
    },
    [sortField, sortDirection]
  );

  return {
    createSortHandler,
    getComparator,
    getSortIcon,
    handleSortClick,
    isSortActive,
    setSortField,
    sortDirection,
    sortField,
    toggleSort,
  };
};
