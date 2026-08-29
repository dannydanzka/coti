/**
 * Header Component Tests
 *
 * Tests public, authenticated, and admin variants.
 * Spanish locale mandatory.
 */

const { mockRouter, mockSearchParams, mockUsePathname } = vi.hoisted(() => ({
  mockRouter: { push: vi.fn(), refresh: vi.fn(), replace: vi.fn() },
  mockSearchParams: new URLSearchParams(),
  mockUsePathname: vi.fn(() => '/'),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
}));

vi.mock('@hooks', () => ({
  useAuth: vi.fn(),
  useLayoutBgColor: vi.fn(() => ({ layoutBgColor: null })),
}));

import { assertTexts, renderWithProviders, screen } from '@testing';
import { useAuth } from '@hooks';

import { Header } from './Header';

const mockUser = {
  firstName: 'María',
  id: '1',
  lastName: 'González',
  role: 'admin' as const,
};

describe('Header', () => {
  describe('Public Variant', () => {
    beforeEach(() => {
      vi.mocked(useAuth).mockReturnValue({ logout: vi.fn(), user: null } as never);
      mockUsePathname.mockReturnValue('/rally');
    });

    it('renders logo', () => {
      renderWithProviders(<Header variant='public' />);

      expect(screen.getByAltText('Coti')).toBeInTheDocument();
    });

    it('renders nav buttons on non-home pages', () => {
      renderWithProviders(<Header variant='public' />);

      assertTexts(['Crear cuenta', 'Entrar']);
    });
  });

  describe('Home Variant', () => {
    beforeEach(() => {
      vi.mocked(useAuth).mockReturnValue({ logout: vi.fn(), user: null } as never);
      mockUsePathname.mockReturnValue('/');
    });

    it('renders the home nav with the signup CTA', () => {
      renderWithProviders(<Header variant='public' />);

      assertTexts(['Inicio', 'Entrar', 'Planear mi viaje']);
    });
  });

  describe('Authenticated Variant', () => {
    const mockOnMenuClick = vi.fn();

    beforeEach(() => {
      vi.mocked(useAuth).mockReturnValue({ logout: vi.fn(), user: mockUser } as never);
    });

    it('renders the authenticated nav', () => {
      renderWithProviders(<Header variant='authenticated' onMenuClick={mockOnMenuClick} />);

      assertTexts(['Mi cajita', 'Mi perfil', 'María González']);
    });
  });

  describe('Admin Variant', () => {
    const mockOnMenuClick = vi.fn();

    beforeEach(() => {
      vi.mocked(useAuth).mockReturnValue({ logout: vi.fn(), user: mockUser } as never);
    });

    it('renders admin nav links and user info', () => {
      renderWithProviders(<Header variant='admin' onMenuClick={mockOnMenuClick} />);

      assertTexts(['Dashboard', 'Usuarios', 'María González', 'admin']);
    });
  });
});
