/**
 * AdminSearch Component
 *
 * Unified search input with filter bar for admin screens.
 * Provides consistent search UX across all admin tables.
 *
 * @example
 * ```tsx
 * <AdminSearch
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   placeholder="Buscar eventos..."
 * >
 *   <AdminDropdown /> // Optional filters
 * </AdminSearch>
 * ```
 */

'use client';

import { type ChangeEvent, useCallback } from 'react';

import type { AdminSearchProps } from './AdminSearch.interfaces';

import { FilterBar, SearchInput } from './AdminSearch.styled';

export const AdminSearch = ({
  children,
  className,
  onChange,
  placeholder = 'Buscar...',
  value,
}: AdminSearchProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <FilterBar className={className}>
      <SearchInput placeholder={placeholder} type='text' value={value} onChange={handleChange} />
      {children}
    </FilterBar>
  );
};
