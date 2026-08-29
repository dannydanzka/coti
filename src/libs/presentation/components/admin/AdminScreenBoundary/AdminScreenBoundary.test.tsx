/**
 * AdminScreenBoundary Component Tests
 *
 * Verifies the unified loading behaviour (returns null while loading) plus
 * error and success branches. Spanish locale mandatory.
 */

import { assertTestId, assertText, renderWithProviders, screen } from '@testing';

import { AdminScreenBoundary } from './AdminScreenBoundary';

describe('AdminScreenBoundary', () => {
  it('returns null while loading (GlobalLoading owns the overlay)', () => {
    const { container } = renderWithProviders(
      <AdminScreenBoundary isLoading title='Usuarios'>
        <div data-testid='children'>contenido</div>
      </AdminScreenBoundary>
    );

    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('children')).not.toBeInTheDocument();
  });

  it('renders error state with title when error is provided', () => {
    renderWithProviders(
      <AdminScreenBoundary error='No se pudo cargar' isLoading={false} title='Usuarios'>
        <div data-testid='children'>contenido</div>
      </AdminScreenBoundary>
    );

    assertText('Usuarios');
    assertText('No se pudo cargar');
    expect(screen.queryByTestId('children')).not.toBeInTheDocument();
  });

  it('renders children with title on success', () => {
    renderWithProviders(
      <AdminScreenBoundary isLoading={false} title='Usuarios'>
        <div data-testid='children'>contenido</div>
      </AdminScreenBoundary>
    );

    assertText('Usuarios');
    assertTestId('children');
  });

  it('prioritises loading over error (loading wins)', () => {
    const { container } = renderWithProviders(
      <AdminScreenBoundary error='Ignorado' isLoading title='Usuarios'>
        <div>niño</div>
      </AdminScreenBoundary>
    );

    expect(container.firstChild).toBeNull();
  });
});
