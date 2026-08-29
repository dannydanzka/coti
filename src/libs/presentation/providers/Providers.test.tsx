/**
 * Providers Component Tests
 *
 * Tests render of main providers wrapper.
 * Spanish locale mandatory.
 */

vi.mock('./ErrorProvider', () => ({
  ErrorProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='error-provider'>{children}</div>
  ),
}));

vi.mock('./I18nProvider', () => ({
  I18nProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='i18n-provider'>{children}</div>
  ),
}));

vi.mock('../components/common/ModalContainer', () => ({
  ModalContainer: () => <div data-testid='modal-container' />,
}));

vi.mock('@styles', () => ({
  GlobalStyles: () => null,
}));

vi.mock('@assets/branding/Logo.svg', () => ({
  default: () => <div data-testid='logo' />,
}));

import { assertTestId, renderWithProviders } from '@testing';

import { Providers } from './Providers';

describe('Providers', () => {
  it('renders children within provider stack', () => {
    renderWithProviders(
      <Providers>
        <div data-testid='child'>Contenido</div>
      </Providers>
    );

    assertTestId('child');
  });

  it('renders error provider', () => {
    renderWithProviders(
      <Providers>
        <div>Contenido</div>
      </Providers>
    );

    assertTestId('error-provider');
  });

  it('renders i18n provider', () => {
    renderWithProviders(
      <Providers>
        <div>Contenido</div>
      </Providers>
    );

    assertTestId('i18n-provider');
  });
});
