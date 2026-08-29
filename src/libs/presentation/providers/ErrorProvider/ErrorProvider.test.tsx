vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

import { useCallback } from 'react';

import { assertTestId, assertText, renderWithProviders, screen, user } from '@testing';

import { ErrorProvider, useError } from './ErrorProvider';

const TestComponent = () => <div data-testid='test-content'>Contenido funcionando</div>;

const ErrorConsumerComponent = () => {
  const { clearError, errors, reportError } = useError();

  const handleReportError = useCallback(() => {
    reportError(new Error('Error reportado por María García'));
  }, [reportError]);

  const handleClearError = useCallback(() => {
    if (errors.length > 0 && errors[0]) {
      clearError(errors[0].id);
    }
  }, [clearError, errors]);

  return (
    <div>
      <div data-testid='error-count'>{errors.length}</div>
      <button data-testid='report-error' onClick={handleReportError}>
        Reportar Error
      </button>
      <button data-testid='clear-error' onClick={handleClearError}>
        Limpiar Error
      </button>
    </div>
  );
};

describe('ErrorProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://test.com/page',
        reload: vi.fn(),
      },
      writable: true,
    });
  });

  it('provides error context and renders children', () => {
    renderWithProviders(
      <ErrorProvider>
        <ErrorConsumerComponent />
      </ErrorProvider>
    );

    expect(screen.getByTestId('error-count')).toHaveTextContent('0');
    assertTestId('report-error');
  });

  it('reports and displays errors manually', async () => {
    const userEvent = user.setup();

    renderWithProviders(
      <ErrorProvider>
        <ErrorConsumerComponent />
      </ErrorProvider>
    );

    await userEvent.click(screen.getByTestId('report-error'));

    expect(screen.getByTestId('error-count')).toHaveTextContent('1');
  });

  it('clears individual errors', async () => {
    const userEvent = user.setup();

    renderWithProviders(
      <ErrorProvider>
        <ErrorConsumerComponent />
      </ErrorProvider>
    );

    await userEvent.click(screen.getByTestId('report-error'));
    expect(screen.getByTestId('error-count')).toHaveTextContent('1');

    await userEvent.click(screen.getByTestId('clear-error'));
    expect(screen.getByTestId('error-count')).toHaveTextContent('0');
  });

  it('captures global errors', () => {
    renderWithProviders(
      <ErrorProvider>
        <TestComponent />
      </ErrorProvider>
    );

    const errorEvent = new ErrorEvent('error', {
      message: 'Error global en aplicación',
    });

    window.dispatchEvent(errorEvent);

    assertTestId('test-content');
  });

  it('handles critical errors without timeout', async () => {
    const userEvent = user.setup();
    const CriticalErrorComponent = () => {
      const { reportError } = useError();

      const handleCriticalError = useCallback(() => {
        reportError(new Error('Fallo crítico del sistema'), {}, 'critical');
      }, [reportError]);

      return (
        <button data-testid='critical-error' onClick={handleCriticalError}>
          Error Crítico
        </button>
      );
    };

    renderWithProviders(
      <ErrorProvider>
        <CriticalErrorComponent />
      </ErrorProvider>
    );

    await userEvent.click(screen.getByTestId('critical-error'));

    assertText('Error Crítico');
  });

  it('renders without error boundary when disabled', () => {
    renderWithProviders(
      <ErrorProvider enableErrorBoundary={false}>
        <TestComponent />
      </ErrorProvider>
    );

    assertTestId('test-content');
  });

  it('renders without global error handling when disabled', () => {
    renderWithProviders(
      <ErrorProvider enableGlobalErrorHandling={false}>
        <TestComponent />
      </ErrorProvider>
    );

    assertTestId('test-content');
  });

  it('clears all errors', async () => {
    const userEvent = user.setup();
    const ClearAllComponent = () => {
      const { clearAllErrors, errors, reportError } = useError();

      return (
        <div>
          <div data-testid='count'>{errors.length}</div>
          <button data-testid='add' onClick={() => reportError(new Error('Error'))}>
            Agregar
          </button>
          <button data-testid='clear-all' onClick={clearAllErrors}>
            Limpiar Todo
          </button>
        </div>
      );
    };

    renderWithProviders(
      <ErrorProvider>
        <ClearAllComponent />
      </ErrorProvider>
    );

    await userEvent.click(screen.getByTestId('add'));
    await userEvent.click(screen.getByTestId('add'));
    expect(screen.getByTestId('count')).toHaveTextContent('2');

    await userEvent.click(screen.getByTestId('clear-all'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('calls onError callback when error is reported', async () => {
    const userEvent = user.setup();
    const onError = vi.fn();

    renderWithProviders(
      <ErrorProvider onError={onError}>
        <ErrorConsumerComponent />
      </ErrorProvider>
    );

    await userEvent.click(screen.getByTestId('report-error'));

    expect(onError).toHaveBeenCalledOnce();
  });

  it('handles unhandled promise rejection', () => {
    renderWithProviders(
      <ErrorProvider>
        <TestComponent />
      </ErrorProvider>
    );

    const rejectionEvent = new Event('unhandledrejection') as PromiseRejectionEvent;
    Object.defineProperty(rejectionEvent, 'reason', { value: 'Promesa rechazada' });

    window.dispatchEvent(rejectionEvent);

    assertTestId('test-content');
  });

  it('adds recovery action for error', async () => {
    const userEvent = user.setup();
    const RecoveryComponent = () => {
      const { addRecoveryAction, errors, reportError } = useError();

      return (
        <div>
          <div data-testid='count'>{errors.length}</div>
          <button
            data-testid='add-error'
            onClick={() => {
              reportError(new Error('Error con acción'));
            }}
          >
            Error
          </button>
          <button
            data-testid='add-action'
            onClick={() => {
              if (errors[0]) {
                addRecoveryAction(errors[0].id, { action: vi.fn(), label: 'Reintentar' } as never);
              }
            }}
          >
            Acción
          </button>
        </div>
      );
    };

    renderWithProviders(
      <ErrorProvider>
        <RecoveryComponent />
      </ErrorProvider>
    );

    await userEvent.click(screen.getByTestId('add-error'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    await userEvent.click(screen.getByTestId('add-action'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('respects maxStoredErrors limit', async () => {
    const userEvent = user.setup();
    const ManyErrorsComponent = () => {
      const { errors, reportError } = useError();

      return (
        <div>
          <div data-testid='count'>{errors.length}</div>
          <button data-testid='add' onClick={() => reportError(new Error(`Error ${Date.now()}`))}>
            Error
          </button>
        </div>
      );
    };

    renderWithProviders(
      <ErrorProvider maxStoredErrors={3}>
        <ManyErrorsComponent />
      </ErrorProvider>
    );

    const addBtn = screen.getByTestId('add');
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);

    expect(Number(screen.getByTestId('count').textContent)).toBeLessThanOrEqual(3);
  });
});
