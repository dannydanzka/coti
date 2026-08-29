vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    AlertTriangle: ({ size = 24 }: { size?: number }) => (
      <div data-size={size} data-testid='alert-triangle-icon'>
        AlertTriangle
      </div>
    ),
    Bug: ({ size = 24 }: { size?: number }) => (
      <div data-size={size} data-testid='bug-icon'>
        Bug
      </div>
    ),
    Home: ({ size = 24 }: { size?: number }) => (
      <div data-size={size} data-testid='home-icon'>
        Home
      </div>
    ),
    RefreshCw: ({ size = 24 }: { size?: number }) => (
      <div data-size={size} data-testid='refresh-icon'>
        RefreshCw
      </div>
    ),
  };
});

Object.defineProperty(window, 'location', {
  value: {
    href: 'https://test.com/error-page',
    reload: vi.fn(),
  },
  writable: true,
});

import { assertText, assertTextCount, render, screen, user } from '@testing';
import type { ErrorInfo } from '@error-provider';

import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  const mockResetError = vi.fn();

  const defaultError: ErrorInfo = {
    category: 'unknown',
    id: 'error-1',
    message: 'Error procesando datos de María García',
    severity: 'medium',
    stack: 'Error: Error procesando datos\n    at test (test.js:1:1)',
    timestamp: 1640995200000,
  };

  beforeEach(() => {
    mockResetError.mockClear();
    vi.mocked(window.location.reload).mockClear();
    global.alert = vi.fn();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders error fallback with title and message', () => {
    render(<ErrorFallback error={defaultError} resetError={mockResetError} />);

    assertTextCount(/error inesperado/i);
    assertText('Intentar de nuevo');
  });

  it('displays critical error title for high severity', () => {
    const criticalError: ErrorInfo = {
      ...defaultError,
      message: 'Fallo crítico en sistema de José Martínez',
      severity: 'critical',
    };

    render(<ErrorFallback error={criticalError} resetError={mockResetError} />);

    assertText('Error Crítico');
  });

  it('shows appropriate message for network errors', () => {
    const networkError: ErrorInfo = {
      ...defaultError,
      category: 'network',
      message: 'Error de conexión para usuario Ana López',
    };

    render(<ErrorFallback error={networkError} resetError={mockResetError} />);

    assertText(/problema de conectividad/i);
  });

  it('executes reset action when try again clicked', async () => {
    const userEvent = user.setup();

    render(<ErrorFallback error={defaultError} resetError={mockResetError} />);

    await userEvent.click(screen.getByText('Intentar de nuevo'));

    expect(mockResetError).toHaveBeenCalledOnce();
  });

  it('reloads page when refresh button clicked', async () => {
    const userEvent = user.setup();

    render(<ErrorFallback error={defaultError} resetError={mockResetError} />);

    await userEvent.click(screen.getByText('Refrescar página'));

    expect(window.location.reload).toHaveBeenCalledOnce();
  });
});
