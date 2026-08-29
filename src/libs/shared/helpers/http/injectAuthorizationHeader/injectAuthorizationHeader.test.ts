/**
 * InjectAuthorizationHeader HTTP Utility Tests
 *
 * Essential tests for authorization header injection utility following Essential Testing Philosophy.
 */

import { injectAuthorizationHeader } from './injectAuthorizationHeader';

describe('injectAuthorizationHeader', () => {
  let originalLocalStorage: Storage | undefined;

  beforeEach(() => {
    originalLocalStorage = (global as any).localStorage;
  });

  afterEach(() => {
    (global as any).localStorage = originalLocalStorage;
  });

  describe('Token Injection', () => {
    it('should inject authorization header for App user tokens', () => {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.maria.garcia.token';
      const quotedToken = `"${mockToken}"`;

      Object.defineProperty(global, 'localStorage', {
        value: { getItem: vi.fn(() => mockToken) },
        writable: true,
      });
      expect(injectAuthorizationHeader()).toEqual({ Authorization: `Bearer ${mockToken}` });

      Object.defineProperty(global, 'localStorage', {
        value: { getItem: vi.fn(() => quotedToken) },
        writable: true,
      });
      expect(injectAuthorizationHeader()).toEqual({ Authorization: `Bearer ${mockToken}` });

      Object.defineProperty(global, 'localStorage', {
        value: { getItem: vi.fn(() => null) },
        writable: true,
      });
      expect(injectAuthorizationHeader()).toEqual({});
    });
  });

  describe('Header Merging', () => {
    it('should merge headers with Spanish locale for App API', () => {
      const mockToken = 'jwt.token.ana.lopez';

      Object.defineProperty(global, 'localStorage', {
        value: { getItem: vi.fn(() => mockToken) },
        writable: true,
      });

      const spanishHeaders = {
        'Accept-Language': 'es-ES',
        'Content-Type': 'application/json',
      };

      const overrideHeaders = {
        Authorization: 'Bearer custom.token.carlos.ruiz',
      };

      expect(injectAuthorizationHeader(spanishHeaders)).toEqual({
        'Accept-Language': 'es-ES',
        Authorization: `Bearer ${mockToken}`,
        'Content-Type': 'application/json',
      });

      expect(injectAuthorizationHeader(overrideHeaders)).toEqual({
        Authorization: 'Bearer custom.token.carlos.ruiz',
      });
    });
  });
});
