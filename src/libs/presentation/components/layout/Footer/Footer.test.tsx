/**
 * Footer Component Tests
 *
 * Spanish locale mandatory.
 */

vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      isAuthenticated: false,
      isLoading: false,
    })),
    useLayoutBgColor: vi.fn(() => ({
      layoutBgColor: null,
    })),
  };
});

import { assertRoleCount, assertSelector, assertTextCount, renderWithProviders } from '@testing';

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders brand name', () => {
    renderWithProviders(<Footer />);
    assertTextCount(/DearAdry/);
  });

  it('renders footer element', () => {
    const { container } = renderWithProviders(<Footer />);
    assertSelector(container, 'footer');
  });

  it('renders social links', () => {
    renderWithProviders(<Footer />);
    assertRoleCount('link');
  });
});
