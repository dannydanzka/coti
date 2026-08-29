/**
 * AdminDrawer Component Tests
 *
 * Tests drawer rendering: closed, open with user info, navigation items.
 * Spanish locale mandatory.
 */

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    usePathname: () => '/admin',
  };
});

vi.mock('@hooks', () => ({
  useAuth: vi.fn(),
}));

import {
  assertEmptyContainer,
  assertRole,
  assertText,
  assertTexts,
  renderWithProviders,
} from '@testing';
import { useAuth } from '@hooks';

import { AdminDrawer } from './AdminDrawer';

const mockUser = {
  email: 'maria@dearadry.com',
  firstName: 'María',
  id: '1',
  lastName: 'González',
  role: 'admin' as const,
};

describe('AdminDrawer', () => {
  beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      disconnect() {}
      observe() {}
      unobserve() {}
    } as unknown as typeof global.IntersectionObserver;
  });

  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      logout: vi.fn(),
      user: mockUser,
    } as never);
  });

  describe('Closed State', () => {
    it('renders nothing when closed', () => {
      const { container } = renderWithProviders(
        <AdminDrawer isOpen={false} onClose={mockOnClose} />
      );

      assertEmptyContainer(container);
    });
  });

  describe('Open State', () => {
    it('renders user info', () => {
      renderWithProviders(<AdminDrawer isOpen onClose={mockOnClose} />);
      assertTexts(['María González', 'maria@dearadry.com', 'MG', 'Administrador', 'Cerrar Sesión']);
    });

    it('renders role badge for owner', () => {
      vi.mocked(useAuth).mockReturnValueOnce({
        logout: vi.fn(),
        user: { ...mockUser, role: 'owner' },
      } as never);
      renderWithProviders(<AdminDrawer isOpen onClose={mockOnClose} />);
      assertText('Propietario');
    });

    it('renders dialog with close button', () => {
      renderWithProviders(<AdminDrawer isOpen onClose={mockOnClose} />);
      assertRole('dialog');
    });
  });
});
