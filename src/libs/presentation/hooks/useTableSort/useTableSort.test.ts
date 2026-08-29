import { act, renderHook } from '@testing-library/react';

import { useTableSort } from './useTableSort';

type TestField = 'name' | 'date' | 'status';

describe('useTableSort', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useTableSort<TestField>({ defaultField: 'name' }));

    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('initializes with custom direction', () => {
    const { result } = renderHook(() =>
      useTableSort<TestField>({ defaultDirection: 'desc', defaultField: 'date' })
    );

    expect(result.current.sortField).toBe('date');
    expect(result.current.sortDirection).toBe('desc');
  });

  it('toggles sort direction on same field', () => {
    const { result } = renderHook(() => useTableSort<TestField>({ defaultField: 'name' }));

    act(() => result.current.toggleSort('name'));
    expect(result.current.sortDirection).toBe('desc');

    act(() => result.current.toggleSort('name'));
    expect(result.current.sortDirection).toBe('asc');
  });

  it('resets to asc when changing field', () => {
    const { result } = renderHook(() =>
      useTableSort<TestField>({ defaultDirection: 'desc', defaultField: 'name' })
    );

    act(() => result.current.toggleSort('date'));
    expect(result.current.sortField).toBe('date');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('sets field directly with setSortField', () => {
    const { result } = renderHook(() => useTableSort<TestField>({ defaultField: 'name' }));

    act(() => result.current.setSortField('status'));
    expect(result.current.sortField).toBe('status');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('returns correct sort icon', () => {
    const { result } = renderHook(() => useTableSort<TestField>({ defaultField: 'name' }));

    expect(result.current.getSortIcon('name')).toBe('\u2191');
    expect(result.current.getSortIcon('date')).toBe('\u2195');
  });

  it('checks if sort is active', () => {
    const { result } = renderHook(() => useTableSort<TestField>({ defaultField: 'name' }));

    expect(result.current.isSortActive('name')).toBe(true);
    expect(result.current.isSortActive('date')).toBe(false);
  });

  it('creates comparator for sorting', () => {
    const { result } = renderHook(() => useTableSort<TestField>({ defaultField: 'name' }));

    const comparator = result.current.getComparator((item: { name: string }, field: TestField) =>
      field === 'name' ? item.name : ''
    );

    const items = [{ name: 'Carlos' }, { name: 'Ana' }, { name: 'Beatriz' }];
    const sorted = [...items].sort(comparator);
    expect(sorted[0]?.name).toBe('Ana');
    expect(sorted[2]?.name).toBe('Carlos');
  });

  it('comparator handles null values', () => {
    const { result } = renderHook(() => useTableSort<TestField>({ defaultField: 'name' }));

    const comparator = result.current.getComparator((item: { name: string | null }) => item.name);

    const items = [{ name: null }, { name: 'Ana' }, { name: null }];
    const sorted = [...items].sort(comparator);
    expect(sorted[0]?.name).toBe('Ana');
  });

  it('creates sort handler factory', () => {
    const { result } = renderHook(() => useTableSort<TestField>({ defaultField: 'name' }));

    const handler = result.current.createSortHandler('date');
    expect(typeof handler).toBe('function');

    act(() => handler());
    expect(result.current.sortField).toBe('date');
  });
});
