import { assertTestId, assertText, renderWithProviders, screen } from '@testing';

import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    renderWithProviders(<Button>Enviar</Button>);
    assertText('Enviar');
  });

  it('renders with icon on left', () => {
    renderWithProviders(<Button icon={<span data-testid='icon'>★</span>}>Con icono</Button>);
    assertTestId('icon');
  });

  it('renders with icon on right', () => {
    renderWithProviders(
      <Button icon={<span data-testid='icon'>★</span>} iconPosition='right'>
        Derecha
      </Button>
    );
    assertTestId('icon');
  });

  it('renders icon only mode', () => {
    renderWithProviders(<Button icon={<span data-testid='icon'>★</span>} iconOnly />);
    assertTestId('icon');
  });

  it('renders loading state', () => {
    renderWithProviders(<Button loading>Cargando</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders loading icon-only', () => {
    renderWithProviders(<Button iconOnly loading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders loading with custom icon', () => {
    renderWithProviders(
      <Button loading loadingIcon={<span data-testid='custom-loader'>⟳</span>}>
        Cargando
      </Button>
    );
    assertTestId('custom-loader');
  });

  it('renders loading with icon on right', () => {
    renderWithProviders(
      <Button iconPosition='right' loading>
        Cargando
      </Button>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders without icon', () => {
    renderWithProviders(<Button>Sin icono</Button>);
    assertText('Sin icono');
  });

  it('disables when disabled prop', () => {
    renderWithProviders(<Button disabled>Deshabilitado</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
