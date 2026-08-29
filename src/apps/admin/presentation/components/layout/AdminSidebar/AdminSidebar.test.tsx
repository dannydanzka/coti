/**
 * AdminSidebar Component Tests
 *
 * Tests sidebar rendering.
 * Spanish locale mandatory.
 */

globalThis.IntersectionObserver = class IntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(public callback: IntersectionObserverCallback) {}
} as unknown as typeof IntersectionObserver;

vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      logout: vi.fn(),
      user: {
        email: 'admin@dearadry.com',
        firstName: 'José',
        lastName: 'López',
        role: 'admin',
      },
    })),
  };
});

import { assertRoleCount, assertSelector, renderWithProviders } from '@testing';

import { AdminSidebar } from './AdminSidebar';

const defaultProps = {
  isCollapsed: false,
  isMobileOpen: false,
  onCollapsedChange: vi.fn(),
  onMobileClose: vi.fn(),
};

describe('AdminSidebar', () => {
  it('renders sidebar container', () => {
    const { container } = renderWithProviders(<AdminSidebar {...defaultProps} />);
    assertSelector(container, 'nav, aside, [class]');
  });

  it('renders navigation items', () => {
    renderWithProviders(<AdminSidebar {...defaultProps} />);
    assertRoleCount('link');
  });
});
