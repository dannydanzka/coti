/**
 * Auth Redux Slice
 *
 * Manages authentication state and operations.
 * Uses createManagedThunk for automatic loading states via activeLoaders.
 */

import { AuthService, PublicUsersService, SignupService } from '@services';
import { createManagedThunk } from '@thunks';
import { createSlice } from '@reduxjs/toolkit';
import { logout as authLogout } from '@utils';
import { transformAuthUser } from '@domain';

import type {
  AuthState,
  LoginThunkPayload,
  LoginThunkResult,
  SerializableAuthUser,
  SignupThunkPayload,
  SignupThunkResult,
} from './auth.slice.interfaces';

const initialState: AuthState = {
  error: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

/**
 * Login thunk - uses createManagedThunk for automatic loading
 * Stores token in localStorage and cookie on success
 * Error notification disabled - LoginScreen handles via showError()
 */
export const loginUser = createManagedThunk<LoginThunkResult, LoginThunkPayload>({
  actionName: 'auth/loginUser',
  operation: async (credentials) => {
    const result = await AuthService.login({
      email: credentials.email.trim(),
      password: credentials.password,
    });

    if (result.token && typeof window !== 'undefined') {
      localStorage.setItem('auth_token', result.token);
      document.cookie = `auth-token=${result.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    }

    return {
      token: result.token,
      user: result.user ? transformAuthUser(result.user) : undefined,
    };
  },
  showErrorNotification: false,
  showLoader: true,
  showSuccessNotification: false,
});

/**
 * Signup thunk - uses createManagedThunk for automatic loading
 * Creates new participant account
 * Error notification enabled via toast
 */
export const signupUser = createManagedThunk<SignupThunkResult, SignupThunkPayload>({
  actionName: 'auth/signupUser',
  operation: async (data) => {
    const response = await SignupService.register({
      email: data.email.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      password: data.password,
    });

    if (!response.success) {
      throw new Error(response.error || 'Error al crear la cuenta');
    }

    const token = response.data?.token ?? null;
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    }

    return {
      email: response.data?.email ?? data.email,
      firstName: response.data?.firstName ?? data.firstName,
      lastName: response.data?.lastName ?? data.lastName,
      token,
      user: response.data?.user ? transformAuthUser(response.data.user) : undefined,
      userId: response.data?.userId ?? '',
    };
  },
  showErrorNotification: true,
  showLoader: true,
  showSuccessNotification: false,
});

/**
 * Logout thunk - uses createManagedThunk for automatic loading
 * Clears all auth state and redirects to login
 */
export const logoutUser = createManagedThunk<{ redirectTo: string }, void>({
  actionName: 'auth/logoutUser',
  operation: async () => {
    await AuthService.logout();
    const redirectTo = authLogout();
    return { redirectTo };
  },
  showErrorNotification: true,
  showLoader: true,
  showSuccessNotification: false,
});

/**
 * Update user photo thunk
 */
export const updateUserPhotoThunk = createManagedThunk<{ photoUrl: string }, string>({
  actionName: 'auth/updateUserPhoto',
  operation: async (photoUrl) => {
    const response = await PublicUsersService.updatePhoto(photoUrl);
    if (response && typeof response === 'object' && 'success' in response && response.success) {
      return { photoUrl };
    }
    throw new Error('Error al actualizar la foto');
  },
  showErrorNotification: true,
  showLoader: false,
  showSuccessNotification: false,
});

export const authSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user ?? null;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      if (!action.payload.user) return;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      const payload = action.payload as { message: string } | undefined;
      state.error = payload?.message ?? 'Error al iniciar sesión';
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      const payload = action.payload as { message: string } | undefined;
      state.error = payload?.message ?? 'Error al cerrar sesión';
    });

    builder.addCase(updateUserPhotoThunk.fulfilled, (state, action) => {
      if (state.user) {
        state.user.photoUrl = action.payload.photoUrl;
      }
    });
  },
  initialState,
  name: 'auth',
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
    restoreSession: (state, action: { payload: SerializableAuthUser }) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },
    updateUserPhoto: (state, action: { payload: string }) => {
      if (state.user) {
        state.user.photoUrl = action.payload;
      }
    },
    updateUserProfile: (state, action: { payload: Partial<SerializableAuthUser> }) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
  },
});

export const {
  clearAuthError,
  resetAuthState,
  restoreSession,
  updateUserPhoto,
  updateUserProfile,
} = authSlice.actions;
