/**
 * Universal HTTP Request Handler
 *
 * Centralized HTTP client following Clean Architecture and Context7 patterns.
 * Uses native fetch API — zero external dependencies.
 * Handles authentication, URL building, error handling, and file operations.
 *
 * @see HANDLE-REQUEST-PATTERNS.md for usage guidelines
 */

import { v4 as uuidv4 } from 'uuid';

import { HTTP_CONSTANTS } from '@constants';
import { logError } from '@logger';

import { AppError } from '../../error-handling/app-error';
import { buildURL } from '../buildURL';
import type { BuildURLParams } from '../buildURL/buildURL.interfaces';
import type { HandleRequestParams, HttpErrorResponse } from './handleRequest.interfaces';
import { injectAuthorizationHeader } from '../injectAuthorizationHeader';
import { REDUX_PERSIST_ROOT_KEY } from './handleRequest.constants';

/**
 * Void the current session after an unauthorized (401) response.
 *
 * The `auth-token` cookie is set with `httpOnly: true`, so it CANNOT be cleared
 * from JS — the previous `document.cookie = ...` was a no-op and the session
 * survived. We must hit the logout endpoint so the server expires the cookie,
 * and drop the persisted Redux state so the app does not rehydrate as
 * authenticated after the redirect.
 */
const voidSession = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', { credentials: 'include', keepalive: true, method: 'POST' });
  } catch (error) {
    logError(error, 'voidSession:logout');
  }

  try {
    window.localStorage.removeItem(REDUX_PERSIST_ROOT_KEY);
  } catch (error) {
    logError(error, 'voidSession:storage');
  }
};

/**
 * Parses fetch Response based on expected content type
 */
const parseResponse = async (
  response: Response,
  options: { fileToDownload?: string; isPlainText?: boolean }
): Promise<unknown> => {
  if (options.fileToDownload) return response.blob();
  if (options.isPlainText) return response.text();
  return response.json();
};

export const handleRequest = async ({
  body,
  customDefaultErrorMessage = false,
  endpoint,
  extraCustomQuery = '',
  fileToDownload,
  headers = {},
  isPlainText = false,
  method,
  mockedResponse,
  params,
  query,
  simulate = false,
  timeout = 30000,
  upload,
  url,
  withCredentials = true,
}: HandleRequestParams): Promise<unknown> => {
  try {
    if (simulate) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          const mockedResponseToReturn =
            typeof mockedResponse === 'function' ? mockedResponse() : mockedResponse;
          resolve(mockedResponseToReturn);
        }, 1000);
      });
    }

    if (!endpoint) throw new Error('Endpoint not specified');

    let requestURL = endpoint;
    if (url) {
      const buildURLParams: BuildURLParams = { endpoint, url };
      if (extraCustomQuery !== undefined) buildURLParams.extraCustomQuery = extraCustomQuery;
      if (params !== undefined) buildURLParams.params = params;
      if (query !== undefined) buildURLParams.query = query;
      requestURL = buildURL(buildURLParams);
    }

    const requestHeaders = injectAuthorizationHeader(headers);
    let requestBody: BodyInit | undefined;

    if (upload) {
      const formData = new FormData();
      formData.append(upload.inputName, upload.file, `${uuidv4()}-${upload.file.name}`);
      if (body) {
        Object.entries(body).forEach(([key, value]) => formData.append(key, value as string));
      }
      requestBody = formData;
    } else if (body instanceof FormData) {
      /**
       * Send multipart bodies as-is — the browser sets the Content-Type with the
       * correct boundary. Forcing application/json + JSON.stringify here would
       * serialize the FormData to "{}" and break the server's formData() parse.
       */
      requestBody = body;
    } else if (body) {
      requestHeaders['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(body);
    } else {
      requestHeaders['Content-Type'] = 'application/json';
    }

    const response = await fetch(requestURL, {
      body: requestBody,
      credentials: withCredentials ? 'include' : 'same-origin',
      headers: requestHeaders,
      method,
      signal: AbortSignal.timeout(timeout),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => response.text().catch(() => undefined));

      const httpError: HttpErrorResponse = {
        message: `HTTP ${response.status}`,
        response: {
          data: errorData,
          status: response.status,
        },
      };
      throw httpError;
    }

    const data = await parseResponse(response, { fileToDownload, isPlainText });

    if (fileToDownload) {
      if (typeof window !== 'undefined') {
        const downloadUrl = window.URL.createObjectURL(data as Blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileToDownload);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      }
      return null;
    }

    return data;
  } catch (error: unknown) {
    const httpError = error as HttpErrorResponse;

    if (httpError.response?.status === 401 && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/signup';
      const isLogoutCall = typeof endpoint === 'string' && endpoint.includes('/api/auth/logout');

      if (!isAuthPage && !isLogoutCall) {
        await voidSession();

        const loginUrl = currentPath.startsWith('/admin')
          ? '/login'
          : `/login?redirect=${encodeURIComponent(currentPath)}`;

        window.location.href = loginUrl;
        return { error: 'Sesión expirada', success: false };
      }
    }

    logError(error, 'handleRequest');

    const errorData = httpError.response?.data;
    let errorMessage: string;
    let i18nKey: string | undefined;
    let i18nParams: Record<string, unknown> | undefined;

    if (typeof errorData === 'object' && errorData) {
      const data = errorData as {
        error?: unknown;
        i18n?: { key?: unknown; params?: unknown };
      };
      errorMessage = data.error
        ? String(data.error)
        : customDefaultErrorMessage || HTTP_CONSTANTS.DEFAULT_ERROR_MESSAGE;
      if (data.i18n && typeof data.i18n.key === 'string') {
        i18nKey = data.i18n.key;
        if (data.i18n.params && typeof data.i18n.params === 'object') {
          i18nParams = data.i18n.params as Record<string, unknown>;
        }
      }
    } else if (typeof errorData === 'string') {
      errorMessage = errorData || customDefaultErrorMessage || HTTP_CONSTANTS.DEFAULT_ERROR_MESSAGE;
    } else {
      errorMessage = customDefaultErrorMessage || HTTP_CONSTANTS.DEFAULT_ERROR_MESSAGE;
    }

    /**
     * When the server emits an i18n key, expose it via AppError.message so
     * Redux slices / components can call `t(err.message, err.content)`. The
     * human-readable fallback is preserved in AppError.content under `.fallback`.
     */
    if (i18nKey) {
      throw new AppError(
        { ...(i18nParams ?? {}), fallback: errorMessage, raw: errorData },
        i18nKey
      );
    }

    throw new AppError(errorData, errorMessage);
  }
};
