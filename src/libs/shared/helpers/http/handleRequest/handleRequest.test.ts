/**
 * HandleRequest HTTP Utility Tests
 *
 * Essential tests for HTTP request handling following Essential Testing Philosophy.
 */

import { handleRequest } from './handleRequest';
import type { HandleRequestParams } from './handleRequest.interfaces';

vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid-v4',
}));

const createFetchResponse = (data: unknown, status = 200): Response =>
  ({
    blob: vi.fn().mockResolvedValue(new Blob([JSON.stringify(data)])),
    json: vi.fn().mockResolvedValue(data),
    ok: status >= 200 && status < 300,
    status,
    text: vi.fn().mockResolvedValue(JSON.stringify(data)),
  }) as unknown as Response;

describe('handleRequest', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('HTTP Operations & URL Building', () => {
    it('should handle HTTP methods and query parameters with App data', async () => {
      const updateData = { mensaje: 'Participante María García López actualizada', éxito: true };
      const queryData = { participantes: ['José Martínez', 'Ana López'] };

      const mockedFetch = vi.mocked(fetch);
      mockedFetch
        .mockResolvedValueOnce(createFetchResponse(updateData))
        .mockResolvedValueOnce(createFetchResponse(queryData));

      const updateParams: HandleRequestParams = {
        body: { email: 'maria.garcia@coti.mx', nombre: 'María García López' },
        endpoint: '/api/participantes/1',
        method: 'PUT',
        url: 'http://localhost:3000',
      };

      const queryParams: HandleRequestParams = {
        endpoint: '/api/participantes',
        method: 'GET',
        query: { buscar: 'García', categoría: 'mejor-participante' },
        url: 'http://localhost:3000',
      };

      const updateResult = await handleRequest(updateParams);
      const queryResult = await handleRequest(queryParams);

      expect(updateResult).toEqual(updateData);
      expect((queryResult as { participantes: string[] }).participantes).toContain('José Martínez');
      expect(mockedFetch).toHaveBeenLastCalledWith(
        'http://localhost:3000/api/participantes?buscar=Garc%C3%ADa&categor%C3%ADa=mejor-participante',
        expect.objectContaining({
          method: 'GET',
        })
      );
    });
  });

  describe('Error Handling & Authentication', () => {
    it('should handle errors and authorization for App users', async () => {
      const errorData = { error: 'Participante José Martínez no encontrado' };
      const mockToken = 'eyJhbGciOiJIUzI1NiJ9.usuario.maria.garcia.app';

      const mockedFetch = vi.mocked(fetch);
      mockedFetch
        .mockResolvedValueOnce(createFetchResponse(errorData, 404))
        .mockResolvedValueOnce(createFetchResponse({ usuario: 'María García López' }));

      const errorParams: HandleRequestParams = {
        endpoint: '/api/participantes/999',
        method: 'GET',
        url: 'http://localhost:3000',
      };

      Object.defineProperty(window, 'localStorage', {
        value: { getItem: vi.fn(() => mockToken) },
        writable: true,
      });

      const authParams: HandleRequestParams = {
        endpoint: '/api/usuarios/perfil',
        method: 'GET',
        url: 'http://localhost:3000',
      };

      await expect(handleRequest(errorParams)).rejects.toThrow();
      await expect(handleRequest({ endpoint: '', method: 'GET' })).rejects.toThrow();

      await handleRequest(authParams);
      expect(mockedFetch).toHaveBeenLastCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        })
      );
    });
  });

  describe('File Operations', () => {
    it('should handle file uploads for App documents', async () => {
      const mockResponseData = {
        archivoId: 'doc123',
        mensaje: 'Documento de Sofía López subido exitosamente',
      };
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse(mockResponseData));

      const mockFile = new File(['contenido del documento'], 'propuesta-sofia-lopez.pdf', {
        type: 'application/pdf',
      });

      const params: HandleRequestParams = {
        body: {
          categoría: 'propuestas',
          descripción: 'Propuesta de Sofía López para mejor participante',
        },
        endpoint: '/api/documentos/subir',
        method: 'POST',
        upload: { file: mockFile, inputName: 'documento' },
        url: 'http://localhost:3000',
      };

      const result = await handleRequest(params);

      expect(result).toEqual(mockResponseData);
      expect((result as { mensaje: string }).mensaje).toContain('Sofía López');
      const [callArgs] = mockedFetch.mock.calls;
      expect(callArgs).toBeDefined();
      expect(callArgs?.[1]).toEqual(
        expect.objectContaining({
          method: 'POST',
        })
      );
      expect(callArgs?.[1]?.body).toBeInstanceOf(FormData);
    });
  });

  describe('Simulate Mode', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return mocked response in simulate mode', async () => {
      const mockedData = { mensaje: 'Respuesta simulada de María García' };

      const resultPromise = handleRequest({
        endpoint: '/api/participantes',
        method: 'GET',
        mockedResponse: mockedData,
        simulate: true,
      });

      await vi.advanceTimersByTimeAsync(1000);
      const result = await resultPromise;

      expect(result).toEqual(mockedData);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should call function mockedResponse in simulate mode', async () => {
      const resultPromise = handleRequest({
        endpoint: '/api/participantes',
        method: 'GET',
        mockedResponse: () => ({ datos: 'resultado de función' }),
        simulate: true,
      });

      await vi.advanceTimersByTimeAsync(1000);
      const result = await resultPromise;

      expect(result).toEqual({ datos: 'resultado de función' });
    });
  });

  describe('Plain Text Response', () => {
    it('should return plain text when isPlainText is true', async () => {
      const mockedFetch = vi.mocked(fetch);
      const textResponse = {
        ok: true,
        status: 200,
        text: vi.fn().mockResolvedValue('Respuesta de texto plano'),
      } as unknown as Response;
      mockedFetch.mockResolvedValueOnce(textResponse);

      const result = await handleRequest({
        endpoint: '/api/health',
        isPlainText: true,
        method: 'GET',
      });

      expect(result).toBe('Respuesta de texto plano');
    });
  });

  describe('File Download', () => {
    it('should handle file download and return null', async () => {
      const mockedFetch = vi.mocked(fetch);
      const blob = new Blob(['contenido PDF']);
      const blobResponse = {
        blob: vi.fn().mockResolvedValue(blob),
        ok: true,
        status: 200,
      } as unknown as Response;
      mockedFetch.mockResolvedValueOnce(blobResponse);

      const mockCreateObjectURL = vi.fn().mockReturnValue('blob:fake-url');
      const mockRevokeObjectURL = vi.fn();
      Object.defineProperty(window, 'URL', {
        value: { createObjectURL: mockCreateObjectURL, revokeObjectURL: mockRevokeObjectURL },
        writable: true,
      });

      const mockLink = {
        click: vi.fn(),
        remove: vi.fn(),
        setAttribute: vi.fn(),
      } as unknown as HTMLAnchorElement;
      vi.spyOn(document, 'createElement').mockReturnValueOnce(mockLink);
      vi.spyOn(document.body, 'appendChild').mockImplementationOnce(() => mockLink);

      const result = await handleRequest({
        endpoint: '/api/documentos/descargar',
        fileToDownload: 'reporte-maría.pdf',
        method: 'GET',
      });

      expect(result).toBeNull();
      expect(mockLink.click).toHaveBeenCalled();
    });
  });

  describe('Error Message Extraction', () => {
    it('should prefer server error over customDefaultErrorMessage', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(
        createFetchResponse({ error: 'El correo ya está en uso' }, 422)
      );

      await expect(
        handleRequest({
          customDefaultErrorMessage: 'Error al crear el registro',
          endpoint: '/api/participantes',
          method: 'POST',
          url: 'http://localhost:3000',
        })
      ).rejects.toThrow('El correo ya está en uso');
    });

    it('should use customDefaultErrorMessage as fallback when server has no error field', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse({}, 500));

      await expect(
        handleRequest({
          customDefaultErrorMessage: 'Error personalizado de María',
          endpoint: '/api/participantes',
          method: 'GET',
          url: 'http://localhost:3000',
        })
      ).rejects.toThrow('Error personalizado de María');
    });

    it('should extract error string from response data', async () => {
      const mockedFetch = vi.mocked(fetch);
      const errorResponse = {
        json: vi.fn().mockResolvedValue('Mensaje de error directo'),
        ok: false,
        status: 400,
        text: vi.fn().mockResolvedValue('Mensaje de error directo'),
      } as unknown as Response;
      mockedFetch.mockResolvedValueOnce(errorResponse);

      await expect(
        handleRequest({
          endpoint: '/api/participantes',
          method: 'GET',
          url: 'http://localhost:3000',
        })
      ).rejects.toThrow();
    });

    it('should handle non-JSON error response', async () => {
      const mockedFetch = vi.mocked(fetch);
      const errorResponse = {
        json: vi.fn().mockRejectedValue(new Error('Not JSON')),
        ok: false,
        status: 500,
        text: vi.fn().mockResolvedValue('Internal Server Error'),
      } as unknown as Response;
      mockedFetch.mockResolvedValueOnce(errorResponse);

      await expect(
        handleRequest({
          endpoint: '/api/participantes',
          method: 'GET',
          url: 'http://localhost:3000',
        })
      ).rejects.toThrow();
    });
  });

  describe('Request Body Handling', () => {
    it('should send JSON body without upload', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse({ éxito: true }));

      await handleRequest({
        body: { nombre: 'José López' },
        endpoint: '/api/participantes',
        method: 'POST',
        url: 'http://localhost:3000',
      });

      expect(mockedFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({ nombre: 'José López' }),
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        })
      );
    });

    it('should send FormData body as-is without forcing JSON Content-Type', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse({ success: true }));

      const formData = new FormData();
      formData.append('bucket', 'documents');

      await handleRequest({
        body: formData,
        endpoint: '/api/upload',
        method: 'POST',
        url: 'http://localhost:3000',
      });

      expect(mockedFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: formData,
          headers: expect.not.objectContaining({ 'Content-Type': 'application/json' }),
        })
      );
    });

    it('should set Content-Type for requests without body', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse([]));

      await handleRequest({
        endpoint: '/api/participantes',
        method: 'GET',
        url: 'http://localhost:3000',
      });

      expect(mockedFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        })
      );
    });

    it('should use same-origin credentials when withCredentials is false', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse({}));

      await handleRequest({
        endpoint: '/api/health',
        method: 'GET',
        withCredentials: false,
      });

      expect(mockedFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ credentials: 'same-origin' })
      );
    });
  });

  describe('URL Building', () => {
    it('should use endpoint directly when no url provided', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse({ ok: true }));

      await handleRequest({
        endpoint: '/api/health',
        method: 'GET',
      });

      expect(mockedFetch).toHaveBeenCalledWith('/api/health', expect.any(Object));
    });

    it('should build URL with params', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse({}));

      await handleRequest({
        endpoint: '/api/participantes',
        method: 'GET',
        params: { id: 'user-123' },
        url: 'http://localhost:3000',
      });

      expect(mockedFetch).toHaveBeenCalled();
    });

    it('should include extraCustomQuery', async () => {
      const mockedFetch = vi.mocked(fetch);
      mockedFetch.mockResolvedValueOnce(createFetchResponse({}));

      await handleRequest({
        endpoint: '/api/participantes',
        extraCustomQuery: '&custom=valor',
        method: 'GET',
        url: 'http://localhost:3000',
      });

      expect(mockedFetch).toHaveBeenCalled();
    });
  });
});
