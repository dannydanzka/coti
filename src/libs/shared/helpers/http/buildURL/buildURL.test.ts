/**
 * BuildURL HTTP Utility Tests
 *
 * Essential tests for URL building utility following Essential Testing Philosophy.
 */

import { buildURL } from './buildURL';
import type { BuildURLParams } from './buildURL.interfaces';

describe('buildURL', () => {
  describe('Basic URL Building', () => {
    it('should build URLs with App endpoints', () => {
      const localEndpoint: BuildURLParams = {
        endpoint: '/api/users',
        url: 'http://localhost:3000',
      };
      const externalEndpoint: BuildURLParams = {
        endpoint: 'https://api.example.com/data',
        url: '',
      };

      expect(buildURL(localEndpoint)).toBe('http://localhost:3000/api/users');
      expect(buildURL(externalEndpoint)).toBe('https://api.example.com/data');
    });
  });

  describe('Path Parameters', () => {
    it('should replace path parameters with Spanish names', () => {
      const singleParam: BuildURLParams = {
        endpoint: '/api/users/{id}',
        params: { id: 'maria-garcia' },
        url: 'http://localhost:3000',
      };
      const multipleParams: BuildURLParams = {
        endpoint: '/api/users/{userId}/enrollments/{enrollmentId}',
        params: { enrollmentId: 'rally-2025', userId: 'jose-martinez' },
        url: 'http://localhost:3000',
      };

      expect(buildURL(singleParam)).toBe('http://localhost:3000/api/users/maria-garcia');
      expect(buildURL(multipleParams)).toBe(
        'http://localhost:3000/api/users/jose-martinez/enrollments/rally-2025'
      );
    });

    it('should handle unmatched parameters and special characters', () => {
      const unmatchedParams: BuildURLParams = {
        endpoint: '/api/users/{id}/profile/{section}',
        params: { id: 'ana-lopez' },
        url: 'http://localhost:3000',
      };
      const specialChars: BuildURLParams = {
        endpoint: '/api/search/{query}',
        params: { query: 'María García López' },
        url: 'http://localhost:3000',
      };

      expect(buildURL(unmatchedParams)).toBe(
        'http://localhost:3000/api/users/ana-lopez/profile/{section}'
      );
      expect(buildURL(specialChars)).toBe('http://localhost:3000/api/search/María García López');
    });
  });

  describe('Query Parameters', () => {
    it('should handle query parameters with App data', () => {
      const singleQuery: BuildURLParams = {
        endpoint: '/api/votes',
        query: { participant: 'carlos-rodriguez' },
        url: 'http://localhost:3000',
      };
      const multipleQueries: BuildURLParams = {
        endpoint: '/api/users',
        query: { limit: 10, page: 2, search: 'José María' },
        url: 'http://localhost:3000',
      };

      expect(buildURL(singleQuery)).toBe(
        'http://localhost:3000/api/votes?participant=carlos-rodriguez'
      );
      expect(buildURL(multipleQueries)).toBe(
        'http://localhost:3000/api/users?limit=10&page=2&search=Jos%C3%A9+Mar%C3%ADa'
      );
    });

    it('should handle arrays and undefined values', () => {
      const arrayQuery: BuildURLParams = {
        endpoint: '/api/challenges',
        query: { tags: ['physical', 'emotional', 'family'] },
        url: 'http://localhost:3000',
      };
      const undefinedQuery: BuildURLParams = {
        endpoint: '/api/users',
        query: { name: 'Elena Fernández' },
        url: 'http://localhost:3000',
      };

      expect(buildURL(arrayQuery)).toBe(
        'http://localhost:3000/api/challenges?tags=physical%2Cemotional%2Cfamily'
      );
      expect(buildURL(undefinedQuery)).toBe(
        'http://localhost:3000/api/users?name=Elena+Fern%C3%A1ndez'
      );
    });
  });

  describe('Extra Custom Query', () => {
    it('should handle extra custom queries', () => {
      const extraQuery: BuildURLParams = {
        endpoint: '/api/votes',
        extraCustomQuery: 'source=app-client',
        url: 'http://localhost:3000',
      };
      const combinedQuery: BuildURLParams = {
        endpoint: '/api/users',
        extraCustomQuery: 'utm_source=app',
        query: { search: 'Luis García' },
        url: 'http://localhost:3000',
      };

      expect(buildURL(extraQuery)).toBe('http://localhost:3000/api/votes?source=app-client');
      expect(buildURL(combinedQuery)).toBe(
        'http://localhost:3000/api/users?utm_source=app&search=Luis+Garc%C3%ADa'
      );
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all parameters together', () => {
      const complexParams: BuildURLParams = {
        endpoint: '/api/users/{userId}/votes',
        extraCustomQuery: 'include=comments',
        params: { userId: 'sofia-herrera' },
        query: { category: 'mejor-participante', limit: 5 },
        url: 'http://localhost:3000',
      };

      const result = buildURL(complexParams);
      expect(result).toContain('http://localhost:3000/api/users/sofia-herrera/votes');
      expect(result).toContain('include=comments');
      expect(result).toContain('limit=5');
      expect(result).toContain('category=mejor-participante');
    });
  });
});
