/**
 * AdminLayout Component Tests
 *
 * Tests rendering states: loading, unauthenticated, authenticated admin.
 * Spanish locale mandatory.
 */

const mockAdminRouter = vi.hoisted(() => ({
  back: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
}));

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    redirect: vi.fn(),
    usePathname: () => '/admin',
    useRouter: () => mockAdminRouter,
  };
});

vi.mock('@hooks', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@apps/admin/hooks', () => ({
  useAdminNavigation: vi.fn(() => ({
    visibleNavItems: [
      { icon: 'BarChart3', id: 'dashboard', label: 'Dashboard', path: '/admin' },
      { icon: 'Users', id: 'users', label: 'Usuarios', path: '/admin/users' },
    ],
  })),
}));

import { assertEmpty, assertText, assertTexts, renderWithProviders } from '@testing';
import { useAuth } from '@hooks';

import { AdminLayout } from './AdminLayout';

const mockAdminUser = {
  email: 'maria@coti.mx',
  firstName: 'María',
  id: '1',
  lastName: 'González',
  role: 'admin' as const,
};

describe('AdminLayout', () => {
  beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      disconnect() {}
      observe() {}
      unobserve() {}
    } as unknown as typeof global.IntersectionObserver;
  });

  describe('Loading State', () => {
    it('renders loading message', () => {
      vi.mocked(useAuth).mockReturnValueOnce({
        isAuthenticated: false,
        isLoading: true,
        logout: vi.fn(),
        user: null,
      } as never);

      renderWithProviders(<AdminLayout>Content</AdminLayout>);
      assertText('Cargando...');
    });
  });

  describe('Unauthenticated', () => {
    it('returns null when user is not admin', () => {
      vi.mocked(useAuth).mockReturnValueOnce({
        isAuthenticated: true,
        isLoading: false,
        logout: vi.fn(),
        user: { ...mockAdminUser, role: 'participant' } as never,
      } as never);

      const { container } = renderWithProviders(<AdminLayout>Content</AdminLayout>);

      assertEmpty(container);
    });
  });

  describe('Authenticated Admin', () => {
    beforeEach(() => {
      vi.mocked(useAuth).mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        logout: vi.fn(),
        user: mockAdminUser,
      } as never);
    });

    it('renders children and user info', () => {
      renderWithProviders(<AdminLayout>Contenido Admin</AdminLayout>);
      assertTexts([
        'Contenido Admin',
        'María González',
        'Administrador',
        'Dashboard',
        'Usuarios',
        'MG',
      ]);
    });
  });
});
