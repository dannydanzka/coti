/**
 * Users Redux Slice
 *
 * Manages user state and CRUD operations for the admin panel.
 * Uses centralized error handling and loading management via thunkHandler.
 * Based on centralized async pattern adapted for Redux Toolkit.
 *
 */

import { createManagedThunk } from '@thunks';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ServerPagination, UserQueryParams } from '@services';
import { transformUser } from '@domain';
import type { UserEntity } from '@interfaces';
import type { UserRole } from '@domain-types';
import { UsersService } from '@services';

import type { UsersState } from './users.slice.interfaces';

const DEFAULT_SERVER_PAGINATION: ServerPagination = {
  hasNextPage: false,
  hasPrevPage: false,
  limit: 20,
  page: 1,
  total: 0,
  totalPages: 1,
};

const initialState: UsersState = {
  lastUpdated: null,
  selectedUsers: [],
  serverPagination: DEFAULT_SERVER_PAGINATION,
  users: [],
};

export const fetchUsersAction = createManagedThunk<
  { serverPagination: ServerPagination; users: UserEntity[] },
  UserQueryParams | void
>({
  actionName: 'users/fetchUsers',
  operation: async (params) => {
    const apiData = await UsersService.getAll(params || undefined);
    return {
      serverPagination: apiData.pagination,
      users: apiData.users.map(transformUser),
    };
  },
});

export const deleteUserAction = createManagedThunk<string, string>({
  actionName: 'users/deleteUser',
  operation: async (userId: string) => {
    await UsersService.delete(userId);
    return userId;
  },
  showSuccessNotification: true,
  successMessage: () => 'Usuario eliminado correctamente',
});

export const toggleUserStatusAction = createManagedThunk<
  { updatedData: UserEntity; userId: string },
  { userId: string; currentStatus: boolean }
>({
  actionName: 'users/toggleUserStatus',
  operation: async ({ currentStatus, userId }) => {
    const apiData = await UsersService.update(userId, { isActive: !currentStatus });
    const updatedUser = transformUser(apiData);
    return { updatedData: updatedUser, userId };
  },
});

export const deleteUserWithConfirmationAction = createManagedThunk<
  { message: string; userId: string },
  string
>({
  actionName: 'users/deleteUserWithConfirmation',
  operation: async (userId: string) => {
    await UsersService.delete(userId);
    return { message: 'Usuario eliminado correctamente', userId };
  },
  showSuccessNotification: true,
  successMessage: (result) => result.message,
});

export const createUserAction = createManagedThunk<
  UserEntity,
  {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
  }
>({
  actionName: 'users/createUser',
  operation: async (userData) => {
    const apiData = await UsersService.create(userData);
    return transformUser(apiData);
  },
  showSuccessNotification: true,
  successMessage: () => 'Usuario creado correctamente',
});

export const updateUserAction = createManagedThunk<
  UserEntity,
  {
    userId: string;
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      role?: UserRole;
      isActive?: boolean;
    };
  }
>({
  actionName: 'users/updateUser',
  operation: async ({ data, userId }) => {
    const apiData = await UsersService.update(userId, data);
    return transformUser(apiData);
  },
  showSuccessNotification: true,
  successMessage: () => 'Usuario actualizado correctamente',
});

export const toggleUserStatusWithNotificationAction = createManagedThunk<
  { message: string; updatedData: UserEntity; userId: string },
  { userId: string; currentStatus: boolean }
>({
  actionName: 'users/toggleUserStatusWithNotification',
  operation: async ({ currentStatus, userId }) => {
    const apiData = await UsersService.update(userId, { isActive: !currentStatus });
    const updatedUser = transformUser(apiData);
    const statusText = !currentStatus ? 'activado' : 'desactivado';
    return {
      message: `Usuario ${statusText} correctamente`,
      updatedData: updatedUser,
      userId,
    };
  },
  showSuccessNotification: true,
  successMessage: (result) => result.message,
});

export const changeUserPasswordAction = createManagedThunk<
  { message: string },
  { userId: string; newPassword: string }
>({
  actionName: 'users/changeUserPassword',
  operation: async ({ newPassword, userId }) => {
    await UsersService.changePassword(userId, newPassword);
    return { message: 'Contraseña actualizada correctamente' };
  },
  showSuccessNotification: true,
  successMessage: (result) => result.message,
});

export const usersSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.serverPagination = action.payload.serverPagination;
      state.lastUpdated = new Date().toISOString();
    });

    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      state.users = state.users.filter((user: UserEntity) => user.id !== action.payload);
      state.selectedUsers = state.selectedUsers.filter((id: string) => id !== action.payload);
    });

    builder.addCase(deleteUserWithConfirmationAction.fulfilled, (state, action) => {
      state.users = state.users.filter((user: UserEntity) => user.id !== action.payload.userId);
      state.selectedUsers = state.selectedUsers.filter(
        (id: string) => id !== action.payload.userId
      );
    });

    builder.addCase(createUserAction.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });

    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      const userIndex = state.users.findIndex((user: UserEntity) => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload };
      }
    });

    builder.addCase(toggleUserStatusAction.fulfilled, (state, action) => {
      const { updatedData, userId } = action.payload;
      const userIndex = state.users.findIndex((user: UserEntity) => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedData };
      }
    });

    builder.addCase(toggleUserStatusWithNotificationAction.fulfilled, (state, action) => {
      const { updatedData, userId } = action.payload;
      const userIndex = state.users.findIndex((user: UserEntity) => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedData };
      }
    });
  },
  initialState,
  name: 'users',
  reducers: {
    clearSelectedUsersAction: (state) => {
      state.selectedUsers = [];
    },
    selectUserAction: (state, action: PayloadAction<string>) => {
      if (!state.selectedUsers.includes(action.payload)) {
        state.selectedUsers.push(action.payload);
      }
    },
    unselectUserAction: (state, action: PayloadAction<string>) => {
      state.selectedUsers = state.selectedUsers.filter((id) => id !== action.payload);
    },
  },
});

export const { clearSelectedUsersAction, selectUserAction, unselectUserAction } =
  usersSlice.actions;
