/**
 * HandleRequest Component Interfaces
 */

export interface HandleRequestParams {
  body?: Record<string, unknown> | FormData;
  customDefaultErrorMessage?: string | false;
  endpoint?: string;
  extraCustomQuery?: string;
  fileToDownload?: string;
  headers?: Record<string, string>;
  isPlainText?: boolean;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  mockedResponse?: unknown;
  params?: Record<string, string>;
  query?: Record<string, string | number | boolean | string[]>;
  simulate?: boolean;
  timeout?: number;
  upload?: { inputName: string; file: File };
  url?: string;
  withCredentials?: boolean;
}

export interface HttpErrorResponse {
  message?: string;
  response?: {
    data?: unknown;
    status?: number;
  };
}
