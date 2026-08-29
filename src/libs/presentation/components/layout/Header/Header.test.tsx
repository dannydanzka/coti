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

vi.mock('@assets/branding/Logo.svg', () => ({
  default: () => <svg data-testid='logo' />,
}));

import { assertTestId, assertTexts, renderWithProviders, screen } from '@testing';
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

      assertTestId('logo');
    });

    it('renders nav buttons on non-home pages', () => {
      renderWithProviders(<Header variant='public' />);

      assertTexts(['Inscripciones', 'Miembros']);
    });
  });

  describe('Home (meet landing) Variant', () => {
    beforeEach(() => {
      vi.mocked(useAuth).mockReturnValue({ logout: vi.fn(), user: null } as never);
      mockUsePathname.mockReturnValue('/');
    });

    it('renders the Mango nav with the reserve CTA', () => {
      renderWithProviders(<Header variant='public' />);

      assertTexts([
        'Inicio',
        'Mango',
        'Libros',
        'Rally',
        'Sobre Dear Adry',
        'Contacto',
        'Apartar mi ejemplar',
      ]);
    });
  });

  describe('Authenticated Variant', () => {
    const mockOnMenuClick = vi.fn();

    beforeEach(() => {
      vi.mocked(useAuth).mockReturnValue({ logout: vi.fn(), user: mockUser } as never);
    });

    it('renders menu button', () => {
      renderWithProviders(<Header variant='authenticated' onMenuClick={mockOnMenuClick} />);

      expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument();
    });
  });

  describe('Admin Variant', () => {
    const mockOnMenuClick = vi.fn();

    beforeEach(() => {
      vi.mocked(useAuth).mockReturnValue({ logout: vi.fn(), user: mockUser } as never);
    });

    it('renders admin nav links and user info', () => {
      renderWithProviders(<Header variant='admin' onMenuClick={mockOnMenuClick} />);

      assertTexts(['Dashboard', 'Kits', 'Eventos', 'Evidencias', 'María González', 'admin']);
    });
  });
});
