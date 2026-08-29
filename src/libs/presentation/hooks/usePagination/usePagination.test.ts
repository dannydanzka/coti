import { act, renderHook } from '@testing-library/react';

import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('initializes with defaults', () => {
    const { result } = renderHook(() => usePagination(100));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.itemsPerPage).toBe(20);
    expect(result.current.totalPages).toBe(5);
  });

  it('initializes with custom limit', () => {
    const { result } = renderHook(() => usePagination(50, { defaultLimit: 25 }));

    expect(result.current.itemsPerPage).toBe(25);
    expect(result.current.totalPages).toBe(2);
  });

  it('navigates to specific page', () => {
    const { result } = renderHook(() => usePagination(100));

    act(() => result.current.setPage(3));
    expect(result.current.currentPage).toBe(3);
  });

  it('clamps page within bounds', () => {
    const { result } = renderHook(() => usePagination(60));

    act(() => result.current.setPage(999));
    expect(result.current.currentPage).toBe(3);

    act(() => result.current.setPage(-1));
    expect(result.current.currentPage).toBe(1);
  });

  it('navigates with prev/next', () => {
    const { result } = renderHook(() => usePagination(100));

    act(() => result.current.goToNextPage());
    expect(result.current.currentPage).toBe(2);

    act(() => result.current.goToPrevPage());
    expect(result.current.currentPage).toBe(1);
  });

  it('navigates to first/last page', () => {
    const { result } = renderHook(() => usePagination(100));

    act(() => result.current.goToLastPage());
    expect(result.current.currentPage).toBe(5);

    act(() => result.current.goToFirstPage());
    expect(result.current.currentPage).toBe(1);
  });

  it('changes items per page and resets to page 1', () => {
    const { result } = renderHook(() => usePagination(100));

    act(() => result.current.setPage(3));
    act(() => result.current.setItemsPerPage(25));
    expect(result.current.itemsPerPage).toBe(25);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(4);
  });

  it('calculates correct start/end indices', () => {
    const { result } = renderHook(() => usePagination(50));

    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(20);

    act(() => result.current.setPage(3));
    expect(result.current.startIndex).toBe(40);
    expect(result.current.endIndex).toBe(50);
  });

  it('paginates items', () => {
    const { result } = renderHook(() => usePagination(5, { defaultLimit: 3 }));

    const items = ['a', 'b', 'c', 'd', 'e'];
    expect(result.current.paginate(items)).toEqual(['a', 'b', 'c']);

    act(() => result.current.setPage(2));
    expect(result.current.paginate(items)).toEqual(['d', 'e']);
  });

  it('handles zero items', () => {
    const { result } = renderHook(() => usePagination(0));

    expect(result.current.totalPages).toBe(1);
    expect(result.current.currentPage).toBe(1);
  });
});
