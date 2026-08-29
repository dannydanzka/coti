import { renderHook } from '@testing-library/react';

import { useDataTable } from './useDataTable';

interface TestItem {
  id: string;
  name: string;
  age: number;
}

type TestField = 'name' | 'age';

const mockItems: TestItem[] = [
  { age: 30, id: '1', name: 'María' },
  { age: 25, id: '2', name: 'Carlos' },
  { age: 35, id: '3', name: 'Ana' },
  { age: 28, id: '4', name: 'José' },
  { age: 22, id: '5', name: 'Beatriz' },
];

const mockColumns = [
  { key: 'name' as TestField, label: 'Nombre', sortable: true },
  { key: 'age' as TestField, label: 'Edad', sortable: true },
];

describe('useDataTable', () => {
  it('initializes with items', () => {
    const { result } = renderHook(() =>
      useDataTable<TestItem, TestField>({
        columns: mockColumns,
        items: mockItems,
      })
    );

    expect(result.current.totalItems).toBe(5);
    expect(result.current.paginatedItems).toHaveLength(5);
  });

  it('sorts items', () => {
    const { result } = renderHook(() =>
      useDataTable<TestItem, TestField>({
        columns: mockColumns,
        getSortValue: (item, field) => (field === 'name' ? item.name : item.age),
        items: mockItems,
        sort: { defaultDirection: 'asc', defaultField: 'name' },
      })
    );

    expect(result.current.filteredItems[0]?.name).toBe('Ana');
  });

  it('filters items', () => {
    const { result } = renderHook(() =>
      useDataTable<TestItem, TestField>({
        columns: mockColumns,
        filterFn: (item) => item.age >= 28,
        items: mockItems,
      })
    );

    expect(result.current.totalItems).toBe(3);
  });

  it('provides pagination', () => {
    const { result } = renderHook(() =>
      useDataTable<TestItem, TestField>({
        columns: mockColumns,
        items: mockItems,
        pagination: { defaultLimit: 2 },
      })
    );

    expect(result.current.paginatedItems).toHaveLength(2);
    expect(result.current.pagination.totalPages).toBe(3);
  });

  it('provides sort state', () => {
    const { result } = renderHook(() =>
      useDataTable<TestItem, TestField>({
        columns: mockColumns,
        items: mockItems,
        sort: { defaultField: 'age' },
      })
    );

    expect(result.current.sort.sortField).toBe('age');
  });
});
