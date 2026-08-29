/**
 * ThunkHandler Utilities Tests
 *
 * Essential tests for thunk management following Essential Testing Philosophy.
 */

vi.mock('@reduxjs/toolkit', () => ({
  createAsyncThunk: (actionName: string, payloadCreator: any) => {
    const mockThunk = async (payload: any, thunkAPI: any) => {
      try {
        return await payloadCreator(payload, thunkAPI);
      } catch (error) {
        if (thunkAPI?.rejectWithValue) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    };

    (mockThunk as any).type = actionName;
    (mockThunk as any).pending = { type: `${actionName}/pending` };
    (mockThunk as any).fulfilled = { type: `${actionName}/fulfilled` };
    (mockThunk as any).rejected = { type: `${actionName}/rejected` };
    (mockThunk as any).typePrefix = actionName;

    return mockThunk;
  },
}));

import { AppError } from '../error-handling/app-error';
import { createManagedThunk, createSimpleManagedThunk, GLOBAL_ACTIONS } from './thunkHandler';

describe('ThunkHandler Utilities', () => {
  const mockDispatch = vi.fn();
  const mockRejectWithValue = vi.fn();

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('createManagedThunk', () => {
    it('should handle loader lifecycle and success notifications for App', async () => {
      const mockResult = { id: '1', name: 'María García López' };
      const mockOperation = vi.fn().mockResolvedValue(mockResult);
      const thunk = createManagedThunk({
        actionName: 'votes/createVote',
        operation: mockOperation,
        showLoader: true,
        showSuccessNotification: true,
        successMessage: (result: typeof mockResult) =>
          `Voto de ${result.name} registrado exitosamente`,
      });

      await thunk('test-payload', {
        dispatch: mockDispatch,
        rejectWithValue: mockRejectWithValue,
      } as any);

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { loaderId: 'LOADER_FOR_votes/createVote' },
        type: GLOBAL_ACTIONS.ACTIVATE_LOADER,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          notification: expect.objectContaining({
            message: 'Voto de María García López registrado exitosamente',
            type: 'success',
          }),
        },
        type: GLOBAL_ACTIONS.ENQUEUE_NOTIFICATION,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { loaderId: 'LOADER_FOR_votes/createVote' },
        type: GLOBAL_ACTIONS.DEACTIVATE_LOADER,
      });
    });

    it('should handle AppError with Spanish validation messages', async () => {
      const appError = new AppError(
        { field: 'email', statusCode: 400 },
        'Usuario José Martínez ya existe'
      );
      const mockOperation = vi.fn().mockRejectedValue(appError);
      const thunk = createManagedThunk({
        actionName: 'users/createUser',
        operation: mockOperation,
        showErrorNotification: true,
        showLoader: true,
      });

      await thunk('test-payload', {
        dispatch: mockDispatch,
        rejectWithValue: mockRejectWithValue,
      } as any);

      expect(mockRejectWithValue).toHaveBeenCalledWith({
        details: { field: 'email', statusCode: 400 },
        message: 'Usuario José Martínez ya existe',
        origin: 'users/createUser',
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { loaderId: 'LOADER_FOR_users/createUser' },
        type: GLOBAL_ACTIONS.DEACTIVATE_LOADER,
      });
    });

    it('should handle generic errors with connection issues', async () => {
      const mockOperation = vi.fn().mockRejectedValue(new Error('Error de conexión con servidor'));
      const thunk = createManagedThunk({
        actionName: 'votes/submitVote',
        operation: mockOperation,
        showLoader: false,
      });

      await thunk('test-payload', {
        dispatch: mockDispatch,
        rejectWithValue: mockRejectWithValue,
      } as any);

      expect(mockRejectWithValue).toHaveBeenCalledWith({
        details: null,
        message: 'Error de conexión con servidor',
        origin: 'votes/submitVote',
      });
    });
  });

  describe('createSimpleManagedThunk', () => {
    it('should work with App participant data', async () => {
      const mockOperation = vi
        .fn()
        .mockResolvedValue({ category: 'mejor-participante', participant: 'Ana López' });
      const thunk = createSimpleManagedThunk('participants/add', mockOperation, {
        showSuccessNotification: true,
        successMessage: 'Participante agregado correctamente',
      });

      await thunk('payload', {
        dispatch: mockDispatch,
        rejectWithValue: mockRejectWithValue,
      } as any);

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          notification: expect.objectContaining({
            message: 'Participante agregado correctamente',
          }),
        },
        type: GLOBAL_ACTIONS.ENQUEUE_NOTIFICATION,
      });
      expect(typeof thunk).toBe('function');
    });
  });
});
