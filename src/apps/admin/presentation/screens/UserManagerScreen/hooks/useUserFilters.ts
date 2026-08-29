/**
 * useUserFilters
 *
 * Hook for user filtering with server-side pagination, sorting, and search.
 * Builds a UseDataTableReturn-compatible object from server responses.
 */

'use client';

import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { UseDataTableReturn } from '@hooks';
import { USER_ROLES } from '@constants';
import type { UserQueryParams } from '@services';

import type {
  RoleFilter,
  StatusFilter,
  UserItem,
  UserSortField,
  UseUserFiltersProps,
  UseUserFiltersReturn,
} from '../UserManagerScreen.interfaces';
import { USER_COLUMNS } from '../UserManagerScreen.constants';

const SEARCH_DEBOUNCE_MS = 300;

const SORT_ICONS = {
  asc: '\u2191',
  desc: '\u2193',
  inactive: '\u2195',
} as const;

export const useUserFilters = ({
  isOwner,
  loadUsers,
  serverPagination,
  users,
}: UseUserFiltersProps): UseUserFiltersReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [sortField, setSortField] = useState<UserSortField>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const debouncedSearchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    if (debouncedSearchRef.current) clearTimeout(debouncedSearchRef.current);
    debouncedSearchRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debouncedSearchRef.current) clearTimeout(debouncedSearchRef.current);
    };
  }, [searchTerm]);

  const buildQueryParams = useCallback((): UserQueryParams => {
    const params: UserQueryParams = {
      limit: itemsPerPage,
      page: currentPage,
    };

    if (debouncedSearch) params.search = debouncedSearch;
    if (roleFilter) params.role = roleFilter;
    if (statusFilter) params.isActive = statusFilter === 'active' ? 'true' : 'false';

    const sortByMap: Record<string, string> = {
      createdAt: 'createdAt',
      email: 'email',
      name: 'name',
      role: 'role',
    };
    if (sortByMap[sortField]) {
      params.sortBy = sortByMap[sortField];
      params.sortOrder = sortDirection;
    }

    return params;
  }, [
    currentPage,
    debouncedSearch,
    itemsPerPage,
    roleFilter,
    sortDirection,
    sortField,
    statusFilter,
  ]);

  useEffect(() => {
    loadUsers(buildQueryParams());
  }, [buildQueryParams, loadUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [roleFilter, statusFilter]);

  const filteredItems = useMemo(() => {
    if (!isOwner) {
      return users.filter((user) => user.role !== USER_ROLES.OWNER);
    }
    return users;
  }, [isOwner, users]);

  const toggleSort = useCallback(
    (field: UserSortField) => {
      if (sortField === field) {
        setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
      setCurrentPage(1);
    },
    [sortField]
  );

  const getSortIcon = useCallback(
    (field: UserSortField): string => {
      if (sortField !== field) return SORT_ICONS.inactive;
      return sortDirection === 'asc' ? SORT_ICONS.asc : SORT_ICONS.desc;
    },
    [sortField, sortDirection]
  );

  const isSortActive = useCallback(
    (field: UserSortField): boolean => sortField === field,
    [sortField]
  );

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const goToFirstPage = useCallback(() => setCurrentPage(1), []);
  const goToLastPage = useCallback(
    () => setCurrentPage(serverPagination.totalPages),
    [serverPagination.totalPages]
  );
  const goToPrevPage = useCallback(() => setCurrentPage((p) => Math.max(1, p - 1)), []);
  const goToNextPage = useCallback(
    () => setCurrentPage((p) => Math.min(serverPagination.totalPages, p + 1)),
    [serverPagination.totalPages]
  );

  const handleItemsPerPageChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  }, []);

  const table: UseDataTableReturn<UserItem, UserSortField> = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + filteredItems.length, serverPagination.total);

    return {
      columns: USER_COLUMNS,
      filteredItems,
      paginatedItems: filteredItems,
      pagination: {
        createPageHandler: (page: number) => () => setPage(page),
        currentPage,
        endIndex,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPrevPage,
        handleItemsPerPageChange,
        handlePageClick: () => {},
        itemsPerPage,
        paginate: <T>(items: T[]) => items,
        setItemsPerPage,
        setPage,
        startIndex,
        totalPages: serverPagination.totalPages,
      },
      sort: {
        createSortHandler: (field: UserSortField) => () => toggleSort(field),
        getComparator: () => () => 0,
        getSortIcon,
        handleSortClick: () => {},
        isSortActive,
        setSortField,
        sortDirection,
        sortField,
        toggleSort,
      },
      totalItems: serverPagination.total,
    };
  }, [
    currentPage,
    filteredItems,
    getSortIcon,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,
    handleItemsPerPageChange,
    isSortActive,
    itemsPerPage,
    serverPagination.total,
    serverPagination.totalPages,
    setPage,
    sortDirection,
    sortField,
    toggleSort,
  ]);

  const hasFilters = Boolean(searchTerm || roleFilter || statusFilter);

  return {
    hasFilters,
    roleFilter,
    searchTerm,
    setRoleFilter,
    setSearchTerm,
    setStatusFilter,
    statusFilter,
    table,
  };
};
