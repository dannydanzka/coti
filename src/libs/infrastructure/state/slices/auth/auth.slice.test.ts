vi.mock('@services/auth/auth.service', () => ({
  AuthService: {
    login: vi.fn(),
    logout: vi.fn(),
  },
}));

vi.mock('@services/auth/signup.service', () => ({
  SignupService: {
    register: vi.fn(),
  },
}));

vi.mock('@services/public/users/users.service', () => ({
  PublicUsersService: {
    updatePhoto: vi.fn(),
  },
}));

vi.mock('@utils/auth/logout', () => ({
  logout: vi.fn().mockReturnValue('/iniciar-sesion'),
}));

vi.mock('@domain', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    transformAuthUser: vi.fn((u: Record<string, unknown>) => u),
  };
});

import { AppError } from '@app-error';
import { AuthService } from '@services/auth/auth.service';
import { configureStore } from '@reduxjs/toolkit';
import { PublicUsersService } from '@services/public/users/users.service';
import { SignupService } from '@services/auth/signup.service';

import {
  authSlice,
  clearAuthError,
  loginUser,
  logoutUser,
  resetAuthState,
  restoreSession,
  signupUser,
  updateUserPhoto,
  updateUserPhotoThunk,
  updateUserProfile,
} from './auth.slice';

const { reducer: authReducer } = authSlice;

const createTestStore = () =>
  configureStore({
    reducer: { auth: authReducer },
  });

describe('Auth Slice', () => {
  it('exports thunks', () => {
    expect(loginUser).toBeDefined();
    expect(signupUser).toBeDefined();
    expect(logoutUser).toBeDefined();
    expect(updateUserPhotoThunk).toBeDefined();
  });

  it('exports slice', () => {
    expect(authSlice.name).toBe('auth');
  });

  it('exports reducer', () => {
    expect(authReducer).toBeDefined();
    expect(typeof authReducer).toBe('function');
  });

  it('has correct initial state shape', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('isAuthenticated');
    expect(state).toHaveProperty('isLoading');
    expect(state).toHaveProperty('error');
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  describe('sync reducers', () => {
    it('clearAuthError clears error', () => {
      const stateWithError = {
        error: 'Error de prueba',
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
      const state = authReducer(stateWithError, clearAuthError());
      expect(state.error).toBeNull();
    });

    it('resetAuthState resets to initial', () => {
      const loggedInState = {
        error: null,
        isAuthenticated: true,
        isLoading: false,
        user: { id: 'u-1' },
      };
      const state = authReducer(loggedInState as never, resetAuthState());
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it('restoreSession sets authenticated user', () => {
      const initialState = authReducer(undefined, { type: '@@INIT' });
      const mockUser = {
        email: 'maria@ejemplo.com',
        firstName: 'María',
        id: 'u-1',
        lastName: 'García',
        role: 'participant',
      };
      const state = authReducer(initialState, restoreSession(mockUser as never));
      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.email).toBe('maria@ejemplo.com');
    });

    it('updateUserPhoto updates photo on user', () => {
      const loggedInState = {
        error: null,
        isAuthenticated: true,
        isLoading: false,
        user: { id: 'u-1', photoUrl: null },
      };
      const state = authReducer(loggedInState as never, updateUserPhoto('https://foto.jpg'));
      expect(state.user?.photoUrl).toBe('https://foto.jpg');
    });

    it('updateUserProfile merges profile fields', () => {
      const loggedInState = {
        error: null,
        isAuthenticated: true,
        isLoading: false,
        user: { firstName: 'María', id: 'u-1', lastName: 'García' },
      };
      const state = authReducer(loggedInState as never, updateUserProfile({ firstName: 'Ana' }));
      expect(state.user?.firstName).toBe('Ana');
      expect(state.user?.lastName).toBe('García');
    });
  });

  describe('extraReducers (thunk fulfilled/pending/rejected)', () => {
    const mockUser = {
      email: 'maria@ejemplo.com',
      firstName: 'María',
      id: 'u-1',
      lastName: 'García',
      photoUrl: null,
      role: 'participant',
    };

    it('loginUser.pending sets loading', () => {
      const state = authReducer(undefined, { type: 'auth/loginUser/pending' });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('loginUser.fulfilled sets authenticated', () => {
      const state = authReducer(undefined, {
        payload: { token: 'jwt-token', user: mockUser },
        type: 'auth/loginUser/fulfilled',
      });
      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.email).toBe('maria@ejemplo.com');
      expect(state.isLoading).toBe(false);
    });

    it('loginUser.rejected sets error', () => {
      const state = authReducer(undefined, {
        payload: { message: 'Credenciales inválidas' },
        type: 'auth/loginUser/rejected',
      });
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe('Credenciales inválidas');
    });

    it('logoutUser.fulfilled clears auth state', () => {
      const loggedInState = {
        error: null,
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
      };
      const state = authReducer(loggedInState as never, {
        payload: { redirectTo: '/login' },
        type: 'auth/logoutUser/fulfilled',
      });
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it('updateUserPhotoThunk.fulfilled updates user photo', () => {
      const loggedInState = {
        error: null,
        isAuthenticated: true,
        isLoading: false,
        user: { ...mockUser },
      };
      const state = authReducer(loggedInState as never, {
        payload: { photoUrl: 'https://nueva-foto.jpg' },
        type: 'auth/updateUserPhoto/fulfilled',
      });
      expect(state.user?.photoUrl).toBe('https://nueva-foto.jpg');
    });

    it('updateUserPhotoThunk.fulfilled does nothing without user', () => {
      const noUserState = { error: null, isAuthenticated: false, isLoading: false, user: null };
      const state = authReducer(noUserState, {
        payload: { photoUrl: 'https://nueva-foto.jpg' },
        type: 'auth/updateUserPhoto/fulfilled',
      });
      expect(state.user).toBeNull();
    });

    it('loginUser.rejected uses default message when payload undefined', () => {
      const state = authReducer(undefined, {
        type: 'auth/loginUser/rejected',
      });
      expect(state.error).toBe('Error al iniciar sesión');
    });

    it('loginUser.fulfilled without user sets user to null', () => {
      const state = authReducer(undefined, {
        payload: { token: 'jwt-token' },
        type: 'auth/loginUser/fulfilled',
      });
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toBeNull();
    });

    it('logoutUser.pending sets loading', () => {
      const state = authReducer(undefined, { type: 'auth/logoutUser/pending' });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('logoutUser.rejected sets error', () => {
      const state = authReducer(undefined, {
        payload: { message: 'Error de red' },
        type: 'auth/logoutUser/rejected',
      });
      expect(state.error).toBe('Error de red');
    });

    it('logoutUser.rejected uses default message when payload undefined', () => {
      const state = authReducer(undefined, {
        type: 'auth/logoutUser/rejected',
      });
      expect(state.error).toBe('Error al cerrar sesión');
    });

    it('updateUserPhoto does nothing without user', () => {
      const noUserState = { error: null, isAuthenticated: false, isLoading: false, user: null };
      const state = authReducer(noUserState, updateUserPhoto('https://foto.jpg'));
      expect(state.user).toBeNull();
    });

    it('updateUserProfile does nothing without user', () => {
      const noUserState = { error: null, isAuthenticated: false, isLoading: false, user: null };
      const state = authReducer(noUserState, updateUserProfile({ firstName: 'Test' }));
      expect(state.user).toBeNull();
    });
  });

  describe('thunk operations', () => {
    const mockUser = {
      email: 'maria@ejemplo.com',
      firstName: 'María',
      id: 'u-1',
      lastName: 'García',
      photoUrl: null,
      role: 'participant',
    };

    describe('loginUser operation', () => {
      it('stores token and sets user on success', async () => {
        vi.mocked(AuthService.login).mockResolvedValueOnce({
          token: 'jwt-abc',
          user: mockUser,
        } as never);

        const store = createTestStore();
        await store.dispatch(loginUser({ email: 'maria@ejemplo.com', password: 'pass123' }));

        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(true);
        expect(state.user?.email).toBe('maria@ejemplo.com');
      });

      it('handles login without token', async () => {
        vi.mocked(AuthService.login).mockResolvedValueOnce({
          token: null,
          user: null,
        } as never);

        const store = createTestStore();
        await store.dispatch(loginUser({ email: 'maria@ejemplo.com', password: 'pass123' }));

        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(true);
        expect(state.user).toBeNull();
      });

      it('handles login without user (token only)', async () => {
        vi.mocked(AuthService.login).mockResolvedValueOnce({
          token: 'jwt-abc',
          user: null,
        } as never);

        const store = createTestStore();
        await store.dispatch(loginUser({ email: 'maria@ejemplo.com', password: 'pass123' }));

        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(true);
        expect(state.user).toBeNull();
      });

      it('sets error on login failure', async () => {
        vi.mocked(AuthService.login).mockRejectedValueOnce(new Error('Credenciales inválidas'));

        const store = createTestStore();
        await store.dispatch(loginUser({ email: 'maria@ejemplo.com', password: 'wrong' }));

        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBeTruthy();
      });

      it('prefers AppError content.fallback when i18n key is carried in message', async () => {
        const appError = new AppError(
          { fallback: 'Credenciales incorrectas', raw: {} },
          'errors.auth.invalidCredentials'
        );
        vi.mocked(AuthService.login).mockRejectedValueOnce(appError);

        const store = createTestStore();
        await store.dispatch(loginUser({ email: 'maria@ejemplo.com', password: 'wrong' }));

        const state = store.getState().auth;
        expect(state.error).toBe('Credenciales incorrectas');
      });

      it('uses AppError.message as fallback when content has no fallback', async () => {
        const appError = new AppError(null, 'Error de conexión');
        vi.mocked(AuthService.login).mockRejectedValueOnce(appError);

        const store = createTestStore();
        await store.dispatch(loginUser({ email: 'maria@ejemplo.com', password: 'wrong' }));

        const state = store.getState().auth;
        expect(state.error).toBe('Error de conexión');
      });
    });

    describe('signupUser operation', () => {
      it('completes signup successfully', async () => {
        vi.mocked(SignupService.register).mockResolvedValueOnce({
          data: { email: 'nueva@ejemplo.com', firstName: 'Ana', lastName: 'López', userId: 'u-2' },
          success: true,
        } as never);

        const store = createTestStore();
        const result = await store.dispatch(
          signupUser({
            email: 'nueva@ejemplo.com',
            firstName: 'Ana',
            lastName: 'López',
            password: 'pass123',
          })
        );

        expect(result.type).toContain('fulfilled');
      });

      it('throws when response.success is false', async () => {
        vi.mocked(SignupService.register).mockResolvedValueOnce({
          error: 'Email ya registrado',
          success: false,
        } as never);

        const store = createTestStore();
        const result = await store.dispatch(
          signupUser({
            email: 'nueva@ejemplo.com',
            firstName: 'Ana',
            lastName: 'López',
            password: 'pass123',
          })
        );

        expect(result.type).toContain('rejected');
      });

      it('uses fallback when response.data is null', async () => {
        vi.mocked(SignupService.register).mockResolvedValueOnce({
          data: null,
          success: true,
        } as never);

        const store = createTestStore();
        const result = await store.dispatch(
          signupUser({
            email: 'nueva@ejemplo.com',
            firstName: 'Ana',
            lastName: 'López',
            password: 'pass123',
          })
        );

        expect(result.type).toContain('fulfilled');
        const { payload } = result as { payload: { email: string } };
        expect(payload.email).toBe('nueva@ejemplo.com');
      });
    });

    describe('logoutUser operation', () => {
      it('calls logout and returns redirectTo', async () => {
        vi.mocked(AuthService.logout).mockResolvedValueOnce(undefined);

        const store = createTestStore();
        await store.dispatch(logoutUser());

        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(false);
      });
    });

    describe('updateUserPhotoThunk operation', () => {
      it('resolves when response has success true', async () => {
        vi.mocked(PublicUsersService.updatePhoto).mockResolvedValueOnce({
          success: true,
        });

        const store = createTestStore();
        const result = await store.dispatch(updateUserPhotoThunk('https://nueva-foto.jpg'));

        expect(result.type).toContain('fulfilled');
      });

      it('rejects when response does not have success true', async () => {
        vi.mocked(PublicUsersService.updatePhoto).mockResolvedValueOnce({
          success: false,
        });

        const store = createTestStore();
        const result = await store.dispatch(updateUserPhotoThunk('https://foto.jpg'));

        expect(result.type).toContain('rejected');
      });

      it('rejects when response is null', async () => {
        vi.mocked(PublicUsersService.updatePhoto).mockResolvedValueOnce(null);

        const store = createTestStore();
        const result = await store.dispatch(updateUserPhotoThunk('https://foto.jpg'));

        expect(result.type).toContain('rejected');
      });
    });
  });
});
