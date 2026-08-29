import { isEmpty } from './object.utils';

describe('ObjectUtils', () => {
  describe('isEmpty', () => {
    it('should return true for null, undefined, and empty objects', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('should return false for objects with properties', () => {
      expect(isEmpty({ nombre: 'Elena Fernández' })).toBe(false);
      expect(isEmpty({ activo: true, usuario: 'admin' })).toBe(false);
    });

    it('should handle arrays correctly', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty(['María', 'José'])).toBe(false);
    });
  });
});
