/**
 * DataTable Component Tests
 *
 * Verifies loading branch (returns null when empty + loading), empty branch,
 * filtered-empty branch, and row rendering + pagination. Spanish locale.
 */

import { assertTestId, assertText, renderWithProviders } from '@testing';
import type { UseDataTableReturn } from '@hooks';

import { DataTable } from './DataTable';

interface Row {
  id: string;
  name: string;
}

const buildTable = (overrides: Partial<UseDataTableReturn<Row, 'name'>> = {}) =>
  ({
    columns: [
      {
        field: 'name',
        header: 'Nombre',
        sortable: false,
      },
    ],
    filteredItems: overrides.paginatedItems ?? [],
    paginatedItems: overrides.paginatedItems ?? [],
    pagination: {
      currentPage: 1,
      endIndex: overrides.paginatedItems?.length ?? 0,
      goToFirstPage: vi.fn(),
      goToLastPage: vi.fn(),
      goToNextPage: vi.fn(),
      goToPrevPage: vi.fn(),
      handleItemsPerPageChange: vi.fn(),
      itemsPerPage: 10,
      setPage: vi.fn(),
      startIndex: 0,
      totalPages: 1,
    },
    sort: {
      getSortIcon: vi.fn(() => ''),
      isSortActive: vi.fn(() => false),
      toggleSort: vi.fn(),
    },
    totalItems: overrides.paginatedItems?.length ?? 0,
    ...overrides,
  }) as unknown as UseDataTableReturn<Row, 'name'>;

const renderRow = (item: Row) => (
  <tr data-testid={`row-${item.id}`} key={item.id}>
    <td>{item.name}</td>
  </tr>
);

describe('DataTable', () => {
  it('returns null when loading and no items (GlobalLoading owns the overlay)', () => {
    const { container } = renderWithProviders(
      <DataTable isLoading renderRow={renderRow} table={buildTable()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders empty message when not loading and no items', () => {
    renderWithProviders(<DataTable renderRow={renderRow} table={buildTable()} />);

    assertText('No hay registros');
  });

  it('renders filtered-empty message when filters are active', () => {
    renderWithProviders(<DataTable hasFilters renderRow={renderRow} table={buildTable()} />);

    assertText(/No se encontraron registros/i);
  });

  it('renders rows when items are present', () => {
    const table = buildTable({
      paginatedItems: [
        { id: '1', name: 'María García' },
        { id: '2', name: 'José López' },
      ],
    });

    renderWithProviders(<DataTable renderRow={renderRow} table={table} />);

    assertTestId('row-1');
    assertTestId('row-2');
    assertText('María García');
    assertText('José López');
  });

  it('still renders rows while loading if items already exist (avoids flash)', () => {
    const table = buildTable({
      paginatedItems: [{ id: '1', name: 'María García' }],
    });

    renderWithProviders(<DataTable isLoading renderRow={renderRow} table={table} />);

    assertTestId('row-1');
  });
});
