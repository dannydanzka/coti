/**
 * Centralized Thunk Handler - Redux Toolkit async management
 *
 * Thunk handler implementation with centralized error handling, loading states, and notifications.
 * Following DOMAIN-OBJECTS-STANDARDS: Utils = Implementation ONLY, NO interfaces/types
 * All interfaces/types moved to thunkHandler.interfaces.ts
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { logError } from '@logger';

import { AppError } from '../error-handling/app-error';
import type { ThunkHandlerOptions } from './thunkHandler.interfaces';

export const GLOBAL_ACTIONS = {
  ACTIVATE_LOADER: 'global/activateLoader',
  DEACTIVATE_LOADER: 'global/deactivateLoader',
  DEQUEUE_NOTIFICATION: 'global/dequeueNotification',
  ENQUEUE_NOTIFICATION: 'global/enqueueNotification',
} as const;

/**
 * Dispatch success notification helper
 */
const dispatchSuccessNotification = <T>(
  dispatch: (action: { payload: unknown; type: string }) => void,
  actionName: string,
  result: T,
  successMessage: ((result: T) => string) | string
) => {
  const message = typeof successMessage === 'function' ? successMessage(result) : successMessage;

  dispatch({
    payload: {
      notification: {
        displayDuration: 3000,
        id: `${actionName}_success_${Date.now()}`,
        message,
        origin: actionName,
        timestamp: Date.now(),
        type: 'success' as const,
      },
    },
    type: GLOBAL_ACTIONS.ENQUEUE_NOTIFICATION,
  });
};

const I18N_KEY_PATTERN = /^errors\.[a-zA-Z]+(\.[a-zA-Z]+)+$/;

/**
 * Extract i18n metadata from an AppError whose `.message` is an i18n key.
 * Strips helper fields (`fallback`, `raw`) from the content to expose only params.
 */
const extractI18nFromError = (
  error: unknown
): { key: string; params?: Record<string, unknown> } | undefined => {
  if (!(error instanceof AppError)) return undefined;
  if (typeof error.message !== 'string' || !I18N_KEY_PATTERN.test(error.message)) {
    return undefined;
  }
  const { fallback: _f, raw: _r, ...params } = (error.content ?? {}) as Record<string, unknown>;
  const hasParams = Object.keys(params).length > 0;
  return hasParams ? { key: error.message, params } : { key: error.message };
};

/**
 * Transform error to message helper.
 * When the error is an AppError carrying an i18n key, prefer the ES `fallback`
 * stored in `.content.fallback` so notifications remain human-readable.
 */
const getErrorMessage = (
  error: unknown,
  transformError?: (error: unknown) => string,
  customErrorMessage?: string
): string => {
  if (transformError) {
    return transformError(error);
  }
  if (error instanceof AppError) {
    const content = error.content as { fallback?: unknown } | null;
    if (content && typeof content.fallback === 'string') {
      return content.fallback;
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return customErrorMessage || 'Error inesperado';
};

/**
 * Dispatch error notification helper
 */
const dispatchErrorNotification = (
  dispatch: (action: { payload: unknown; type: string }) => void,
  actionName: string,
  errorMessage: string
) => {
  dispatch({
    payload: {
      notification: {
        displayDuration: 5000,
        id: `${actionName}_error_${Date.now()}`,
        message: errorMessage,
        origin: actionName,
        timestamp: Date.now(),
        type: 'error' as const,
      },
    },
    type: GLOBAL_ACTIONS.ENQUEUE_NOTIFICATION,
  });
};

/**
 * Creates a managed async thunk with centralized error handling and loading states
 * Centralized async thunk handler adapted for Redux Toolkit
 *
 * Generic Parameters:
 * @template T - Return type (can be any type: primitives, objects, arrays)
 * @template P - Payload type (can be any type: void, primitives, objects)
 *
 * TODO: DOCUMENTED - Generic Type Constraints Evaluation (LEVEL 2 - 2-3h)
 *
 * Current Status: Using `unknown` provides type safety (better than `any`)
 *
 * Analysis (35 usages found):
 * - Objects: ParticipantEntity[], SignupResponse, { message: string }, etc.
 * - Primitives: string (e.g., <string, string> for deleteParticipantAction)
 * - Mixed patterns prevent simple Record<string, unknown> constraint
 *
 * Potential Improvements:
 * 1. Add JSDoc examples for common patterns
 * 2. Consider union type constraint: T extends Primitive | Record<string, unknown>
 * 3. Add runtime validation helpers for complex return types
 *
 * Migration Considerations:
 * - 35 usages need validation
 * - Breaking change risk for existing thunks
 * - Test coverage required before changing
 *
 * Recommendation: Keep current implementation until patterns fully stabilize.
 * Priority: Low (project in Testing phase, type safety already adequate)
 */
export const createManagedThunk = <T = unknown, P = unknown>(
  options: ThunkHandlerOptions<T, P>
) => {
  const {
    actionName,
    customErrorMessage,
    customLoaderId,
    operation,
    showErrorNotification = true,
    showLoader = true,
    showSuccessNotification = false,
    successMessage,
    transformError,
  } = options;

  const thunk = createAsyncThunk<T, P>(
    actionName,
    async (payload: P, { dispatch, rejectWithValue }) => {
      const loaderId = customLoaderId || `LOADER_FOR_${actionName}`;

      if (showLoader) {
        dispatch({ payload: { loaderId }, type: GLOBAL_ACTIONS.ACTIVATE_LOADER });
      }

      try {
        const result = await operation(payload);

        if (showSuccessNotification && successMessage) {
          dispatchSuccessNotification(dispatch, actionName, result, successMessage);
        }

        return result;
      } catch (error) {
        logError(error, actionName);
        const errorMessage = getErrorMessage(error, transformError, customErrorMessage);

        if (showErrorNotification) {
          dispatchErrorNotification(dispatch, actionName, errorMessage);
        }

        const i18n = extractI18nFromError(error);
        return rejectWithValue({
          details: error instanceof AppError ? error.content : null,
          ...(i18n ? { i18n } : {}),
          message: errorMessage,
          origin: actionName,
        });
      } finally {
        if (showLoader) {
          dispatch({ payload: { loaderId }, type: GLOBAL_ACTIONS.DEACTIVATE_LOADER });
        }
      }
    }
  );

  return thunk;
};

/**
 * Helper function for simple thunk creation with common patterns
 *
 * Generic Parameters:
 * @template T - Return type (can be any type: primitives, objects, arrays)
 * @template P - Payload type (can be any type: void, primitives, objects)
 *
 * TODO: DOCUMENTED - Inherits constraints from createManagedThunk (see above)
 */
export const createSimpleManagedThunk = <T = unknown, P = unknown>(
  actionName: string,
  operation: (payload: P) => Promise<T>,
  options?: Partial<ThunkHandlerOptions<T, P>>
) => {
  return createManagedThunk({
    actionName,
    operation,
    ...options,
  });
};
