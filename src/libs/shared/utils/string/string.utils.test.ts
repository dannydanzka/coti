import { capitalize, getUserInitials, removeAccents, sanitizeHtml, slugify } from './string.utils';

describe('StringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize Spanish names and phrases', () => {
      expect(capitalize('maría garcía lópez')).toBe('María garcía lópez');
      expect(capitalize('josé martínez')).toBe('José martínez');
      expect(capitalize('ELENA RODRÍGUEZ')).toBe('Elena rodríguez');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('slugify', () => {
    it('should create URL-friendly slugs from Spanish text', () => {
      expect(slugify('María García López')).toBe('maria-garcia-lopez');
      expect(slugify('José Antonio Martínez')).toBe('jose-antonio-martinez');
      expect(slugify('Niño con corazón')).toBe('nino-con-corazon');
    });
  });

  describe('getUserInitials', () => {
    it('should extract initials from Spanish names', () => {
      expect(getUserInitials('María García López')).toBe('MG');
      expect(getUserInitials('José Antonio Martínez Silva')).toBe('JA');
      expect(getUserInitials('Ana')).toBe('A');
    });
  });

  describe('removeAccents', () => {
    it('should remove Spanish accents correctly', () => {
      expect(removeAccents('José María')).toBe('Jose Maria');
      expect(removeAccents('Niño pequeño')).toBe('Nino pequeno');
      expect(removeAccents('Adiós amigo')).toBe('Adios amigo');
    });
  });

  describe('sanitizeHtml', () => {
    it('should escape HTML characters with Spanish content', () => {
      expect(sanitizeHtml('<script>alert("Hola María")</script>')).toBe(
        '&lt;script&gt;alert(&quot;Hola María&quot;)&lt;/script&gt;'
      );
    });

    it('escapes single quotes', () => {
      expect(sanitizeHtml("María's")).toBe('María&#x27;s');
    });

    it('escapes ampersand', () => {
      expect(sanitizeHtml('José & María')).toBe('José &amp; María');
    });
  });

  describe('Edge cases', () => {
    it('slugify handles empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('getUserInitials handles empty string', () => {
      expect(getUserInitials('')).toBe('');
      expect(getUserInitials('   ')).toBe('');
    });
  });

  describe('Type validation', () => {
    it('capitalize throws for non-string', () => {
      expect(() => capitalize(123 as never)).toThrow('Valid string required');
    });

    it('slugify throws for non-string', () => {
      expect(() => slugify(null as never)).toThrow('Valid string required');
    });

    it('removeAccents throws for non-string', () => {
      expect(() => removeAccents(undefined as never)).toThrow('Valid string required');
    });

    it('sanitizeHtml throws for non-string', () => {
      expect(() => sanitizeHtml(42 as never)).toThrow('Valid string required');
    });

    it('getUserInitials throws for non-string', () => {
      expect(() => getUserInitials({} as never)).toThrow('Valid name string required');
    });
  });
});
