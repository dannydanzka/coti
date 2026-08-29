/**
 * UserFilters Component Tests
 *
 * Spanish locale mandatory.
 */

import { assertRole, assertRoleCount, renderWithProviders } from '@testing';

import { UserFilters } from './UserFilters';

const defaultProps = {
  handleOpenCreateModal: vi.fn(),
  isOwner: true,
  onRoleChange: vi.fn(),
  onSearchChange: vi.fn(),
  onStatusChange: vi.fn(),
  roleFilter: 'all' as const,
  searchTerm: '',
  statusFilter: 'all' as const,
};

describe('UserFilters', () => {
  it('renders search and filters', () => {
    renderWithProviders(<UserFilters {...(defaultProps as any)} />);
    assertRole('textbox');
  });

  it('renders create button for owner', () => {
    renderWithProviders(<UserFilters {...(defaultProps as any)} />);
    assertRoleCount('button');
  });
});
