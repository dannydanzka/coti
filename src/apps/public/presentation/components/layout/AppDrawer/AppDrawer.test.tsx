/**
 * AppDrawer Component Tests
 *
 * Spanish locale mandatory.
 */

const mockLogout = vi.fn();

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    usePathname: () => '/dashboard',
  };
});

vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      logout: mockLogout,
      user: {
        email: 'maria@coti.mx',
        firstName: 'María',
        id: '1',
        lastName: 'García',
        role: 'participant',
      },
    })),
  };
});

import { assertRole, assertTexts, renderWithProviders, screen, userEvent } from '@testing';

import { AppDrawer } from './AppDrawer';

const defaultProps = {
  isCollapsed: false,
  isMobileOpen: false,
  onCollapsedChange: vi.fn(),
  onMobileClose: vi.fn(),
};

describe('AppDrawer', () => {
  it('muestra al usuario y sus iniciales', () => {
    renderWithProviders(<AppDrawer {...defaultProps} />);

    assertTexts(['María García', 'maria@coti.mx', 'MG']);
  });

  it('lista sólo las rutas que existen', () => {
    renderWithProviders(<AppDrawer {...defaultProps} />);

    assertTexts(['Mi cajita', 'Mi perfil']);
  });

  it('el avatar alterna el colapso', async () => {
    const onCollapsedChange = vi.fn();
    renderWithProviders(<AppDrawer {...defaultProps} onCollapsedChange={onCollapsedChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Colapsar menú' }));

    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it('estando colapsado, el avatar ofrece expandir', () => {
    renderWithProviders(<AppDrawer {...defaultProps} isCollapsed />);

    assertRole('button', { name: 'Expandir menú' });
  });

  it('cerrar sesión cierra el cajón antes de salir', async () => {
    const onMobileClose = vi.fn();
    renderWithProviders(<AppDrawer {...defaultProps} onMobileClose={onMobileClose} />);

    await userEvent.click(screen.getByRole('button', { name: 'Cerrar Sesión' }));

    expect(onMobileClose).toHaveBeenCalled();
    expect(mockLogout).toHaveBeenCalled();
  });

  it('elegir una ruta cierra el cajón en móvil', async () => {
    const onMobileClose = vi.fn();
    renderWithProviders(<AppDrawer {...defaultProps} isMobileOpen onMobileClose={onMobileClose} />);

    await userEvent.click(screen.getByRole('link', { name: 'Mi perfil' }));

    expect(onMobileClose).toHaveBeenCalled();
  });
});
