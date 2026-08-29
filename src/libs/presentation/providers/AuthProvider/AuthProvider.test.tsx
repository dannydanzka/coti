/**
 * AuthProvider Component Tests
 *
 * Tests initialization, login, signup, logout flows.
 * Spanish locale mandatory.
 */

const mockDispatchLogin = vi.fn();
const mockDispatchLogout = vi.fn();
const mockDispatchSignup = vi.fn();
const mockDispatchRestoreSession = vi.fn();
const mockDispatchResetAuthState = vi.fn();

const mockAuthDispatchReturn = {
  dispatchLogin: mockDispatchLogin,
  dispatchLogout: mockDispatchLogout,
  dispatchResetAuthState: mockDispatchResetAuthState,
  dispatchRestoreSession: mockDispatchRestoreSession,
  dispatchSignup: mockDispatchSignup,
};

vi.mock('./hooks', () => ({
  useAuthDispatch: () => mockAuthDispatchReturn,
}));

const mockPush = vi.fn();
const mockRouterReturn = { push: mockPush };

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouterReturn,
}));

const mockSelectCurrentUser = vi.fn();
const mockSelectIsAuthenticated = vi.fn();

vi.mock('@redux', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    selectCurrentUser: () => mockSelectCurrentUser(),
    selectIsAuthenticated: () => mockSelectIsAuthenticated(),
  };
});

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useSelector: (selector: (...args: unknown[]) => unknown) => selector({}),
  };
});

vi.mock('@helpers', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    handleRequest: vi.fn(),
  };
});

import { useContext } from 'react';

import { assertTestId, renderWithProviders, screen, user, waitFor } from '@testing';
import { handleRequest } from '@helpers';
import { setupServiceMock } from '@testing/helpers';

import { AuthContext, AuthProvider } from './AuthProvider';

const { mockError, mockRejection } = setupServiceMock();

const TestConsumer = () => {
  const auth = useContext(AuthContext);
  if (!auth) return <div>Sin contexto</div>;
  return (
    <div>
      <div data-testid='loading'>{auth.isLoading ? 'Cargando' : 'Listo'}</div>
      <div data-testid='authenticated'>{auth.isAuthenticated ? 'Sí' : 'No'}</div>
      <div data-testid='user'>{auth.user?.firstName ?? 'Sin usuario'}</div>
      <button data-testid='login' onClick={() => auth.login('maria@test.com', 'pass123')}>
        Login
      </button>
      <button data-testid='logout' onClick={() => auth.logout()}>
        Logout
      </button>
      <button
        data-testid='signup'
        onClick={() =>
          auth.signup({
            email: 'nueva@test.com',
            firstName: 'Ana',
            lastName: 'López',
            password: 'pass123',
          })
        }
      >
        Signup
      </button>
      <button data-testid='refresh' onClick={auth.refreshAuth}>
        Refresh
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    mockSelectCurrentUser.mockReturnValue(null);
    mockSelectIsAuthenticated.mockReturnValue(false);
    vi.mocked(handleRequest).mockResolvedValue({ success: false });
  });

  it('exports AuthProvider component', () => {
    expect(AuthProvider).toBeDefined();
    expect(typeof AuthProvider).toBe('function');
  });

  it('exports AuthContext', () => {
    expect(AuthContext).toBeDefined();
  });

  it('renders children', () => {
    renderWithProviders(
      <AuthProvider>
        <div data-testid='child'>Contenido</div>
      </AuthProvider>
    );
    assertTestId('child');
  });

  it('initializes without token', async () => {
    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Listo');
    });
    expect(mockDispatchResetAuthState).toHaveBeenCalled();
  });

  it('initializes with invalid token', async () => {
    localStorage.setItem('auth_token', 'invalid-token');

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Listo');
    });
    expect(mockDispatchResetAuthState).toHaveBeenCalled();
  });

  it('initializes with valid token and completes init', async () => {
    const payload = { exp: Math.floor(Date.now() / 1000) + 3600, userId: 'u-1' };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;
    localStorage.setItem('auth_token', token);

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Valid token triggers fetchAndRestoreUser → handleRequest returns { success: false } by default → resets auth
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Listo');
    });
    // With default mock returning { success: false }, dispatchResetAuthState is called
    expect(mockDispatchResetAuthState).toHaveBeenCalled();
  });

  it('clears token when API returns failure', async () => {
    const payload = { exp: Math.floor(Date.now() / 1000) + 3600, userId: 'u-1' };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;
    localStorage.setItem('auth_token', token);

    mockError();

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(
      () => {
        expect(mockDispatchResetAuthState).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
    // localStorage may return null or undefined in jsdom
    expect(localStorage.getItem('auth_token')).toBeFalsy();
  });

  it('handles API error during restore', async () => {
    const payload = { exp: Math.floor(Date.now() / 1000) + 3600, userId: 'u-1' };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;
    localStorage.setItem('auth_token', token);

    mockRejection('Red no disponible');

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockDispatchResetAuthState).toHaveBeenCalled();
    });
  });

  it('handles login success', async () => {
    const userEvent = user.setup();
    mockDispatchLogin.mockResolvedValueOnce({ token: 'jwt-token', user: { firstName: 'María' } });

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('Listo'));

    await userEvent.click(screen.getByTestId('login'));

    expect(mockDispatchLogin).toHaveBeenCalledWith({
      email: 'maria@test.com',
      password: 'pass123',
    });
  });

  it('handles login without token (error)', async () => {
    const userEvent = user.setup();
    mockDispatchLogin.mockResolvedValueOnce({ token: null });

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('Listo'));

    await userEvent.click(screen.getByTestId('login'));
    expect(mockDispatchLogin).toHaveBeenCalled();
  });

  it('handles login exception', async () => {
    const userEvent = user.setup();
    mockDispatchLogin.mockRejectedValueOnce(new Error('Credenciales inválidas'));

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('Listo'));

    await userEvent.click(screen.getByTestId('login'));
    expect(mockDispatchLogin).toHaveBeenCalled();
  });

  it('handles signup success', async () => {
    const userEvent = user.setup();
    mockDispatchSignup.mockResolvedValueOnce({});

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('Listo'));

    await userEvent.click(screen.getByTestId('signup'));
    expect(mockDispatchSignup).toHaveBeenCalled();
  });

  it('handles signup error', async () => {
    const userEvent = user.setup();
    mockDispatchSignup.mockRejectedValueOnce(new Error('Email ya existe'));

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('Listo'));

    await userEvent.click(screen.getByTestId('signup'));
    expect(mockDispatchSignup).toHaveBeenCalled();
  });

  it('handles logout success', async () => {
    const userEvent = user.setup();
    mockDispatchLogout.mockResolvedValueOnce({ redirectTo: '/login' });

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('Listo'));

    await userEvent.click(screen.getByTestId('logout'));
    expect(mockDispatchLogout).toHaveBeenCalled();
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/login'));
  });

  it('handles logout error', async () => {
    const userEvent = user.setup();
    mockDispatchLogout.mockRejectedValueOnce(new Error('Error de red'));

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('Listo'));

    await userEvent.click(screen.getByTestId('logout'));
    await waitFor(() => expect(mockDispatchResetAuthState).toHaveBeenCalled());
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/login'));
  });

  it('handles expired token', async () => {
    const payload = { exp: Math.floor(Date.now() / 1000) - 3600, userId: 'u-1' };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;
    localStorage.setItem('auth_token', token);

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockDispatchResetAuthState).toHaveBeenCalled();
    });
  });

  it('handles token without userId', async () => {
    const payload = { exp: Math.floor(Date.now() / 1000) + 3600 };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;
    localStorage.setItem('auth_token', token);

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockDispatchResetAuthState).toHaveBeenCalled();
    });
  });

  it('handles malformed JWT payload', async () => {
    localStorage.setItem('auth_token', 'header.invalidbase64!@#.signature');

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockDispatchResetAuthState).toHaveBeenCalled();
    });
  });

  it('refreshAuth triggers reinitialization', async () => {
    const userEvent = user.setup();

    renderWithProviders(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('Listo'));

    await userEvent.click(screen.getByTestId('refresh'));
    expect(mockDispatchResetAuthState).toHaveBeenCalled();
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      mockSelectCurrentUser.mockReturnValue({ firstName: 'María', id: 'u-1' });
      mockSelectIsAuthenticated.mockReturnValue(true);
    });

    it('provides userId from user', async () => {
      renderWithProviders(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('María'));
      await waitFor(() => expect(screen.getByTestId('authenticated')).toHaveTextContent('Sí'));
    });
  });
});
