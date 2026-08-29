import {
  formatCurrency,
  formatFileSize,
  formatNumber,
  formatPercentage,
  formatShippingAddress,
  formatUserRole,
} from './format.utils';

describe('FormatUtils', () => {
  describe('formatNumber', () => {
    it('should format numbers correctly', () => {
      expect(formatNumber(1234)).toMatch(/1[,\s]?234/);
      expect(formatNumber(25000.5)).toMatch(/25[,\s]?000[.,]5/);
      expect(formatNumber(-1500)).toMatch(/-1[,\s]?500/);
    });

    it('should format numbers with specific locale', () => {
      expect(formatNumber(1234, 'es-MX')).toBe('1,234');
      expect(formatNumber(1234, 'en-US')).toBe('1,234');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(85.5)).toMatch(/85\.5\s*%/);
      expect(formatPercentage(100, 0)).toMatch(/100\s*%/);
    });

    it('should format percentages with specific locale', () => {
      expect(formatPercentage(85.5, 1, 'es-MX')).toBe('85.5%');
    });
  });

  describe('formatUserRole', () => {
    it('should format Coti user roles with Spanish mapping', () => {
      expect(formatUserRole('owner')).toBe('Propietario');
      expect(formatUserRole('admin')).toBe('Administrador');
      expect(formatUserRole('participant')).toBe('Participante');
    });

    it('should return original value for unknown roles', () => {
      expect(formatUserRole('unknown')).toBe('unknown');
    });
  });

  describe('formatFileSize', () => {
    it('should format file sizes correctly', () => {
      expect(formatFileSize(1024)).toBe('1.0 KB');
      expect(formatFileSize(2048576)).toBe('2.0 MB');
    });

    it('handles zero bytes', () => {
      expect(formatFileSize(0)).toBe('0 B');
    });

    it('handles negative value', () => {
      expect(formatFileSize(-1)).toBe('0 B');
    });

    it('handles NaN', () => {
      expect(formatFileSize(NaN)).toBe('0 B');
    });

    it('handles bytes less than 1KB', () => {
      expect(formatFileSize(500)).toBe('500.0 B');
    });

    it('handles GB range', () => {
      expect(formatFileSize(1073741824)).toBe('1.0 GB');
    });
  });

  describe('formatCurrency', () => {
    it('formats Mexican pesos', () => {
      const result = formatCurrency(1500);
      expect(result).toContain('1');
      expect(result).toContain('500');
    });

    it('handles NaN', () => {
      expect(formatCurrency(NaN)).toBe('$0.00 MXN');
    });

    it('handles Infinity', () => {
      expect(formatCurrency(Infinity)).toBe('$0.00 MXN');
    });
  });

  describe('Edge cases', () => {
    it('formatNumber handles NaN', () => {
      expect(formatNumber(NaN)).toBe('0');
    });

    it('formatNumber handles Infinity', () => {
      expect(formatNumber(Infinity)).toBe('0');
    });

    it('formatPercentage handles NaN', () => {
      expect(formatPercentage(NaN)).toBe('0%');
    });

    it('formatPercentage handles invalid decimals', () => {
      expect(formatPercentage(50, -1)).toBe('0%');
      expect(formatPercentage(50, 11)).toBe('0%');
    });

    it('formatPercentage handles Infinity', () => {
      expect(formatPercentage(Infinity)).toBe('0%');
    });

    it('formatFileSize handles Infinity', () => {
      expect(formatFileSize(Infinity)).toBe('0 B');
    });

    it('formatPercentage handles non-integer decimals', () => {
      expect(formatPercentage(50, 1.5)).toBe('0%');
    });

    it('formatCurrency handles zero', () => {
      const result = formatCurrency(0);
      expect(result).toContain('0');
    });

    it('formatCurrency with custom locale', () => {
      const result = formatCurrency(1500, 'en-US');
      expect(result).toBeDefined();
    });

    it('formatNumber handles non-number input', () => {
      expect(formatNumber('abc' as unknown as number)).toBe('0');
    });

    it('formatPercentage handles non-number input', () => {
      expect(formatPercentage('abc' as unknown as number)).toBe('0%');
    });

    it('formatFileSize handles non-number input', () => {
      expect(formatFileSize('abc' as unknown as number)).toBe('0 B');
    });

    it('formatCurrency handles non-number input', () => {
      expect(formatCurrency('abc' as unknown as number)).toBe('$0.00 MXN');
    });
  });

  describe('formatShippingAddress', () => {
    it('formats a full address snapshot into one readable line', () => {
      const address = JSON.stringify({
        city: 'Guadalajara',
        country: 'México',
        neighborhood: 'Providencia',
        number: '123',
        state: 'Jalisco',
        street: 'Av. Pablo Neruda',
        zipCode: '44630',
      });

      expect(formatShippingAddress(address)).toBe(
        'Av. Pablo Neruda 123, Providencia, Guadalajara, Jalisco, CP 44630, México'
      );
    });

    it('skips the empty fields of a partial snapshot', () => {
      const address = JSON.stringify({
        city: 'Monterrey',
        country: '',
        neighborhood: '',
        number: '',
        state: 'Nuevo León',
        street: 'Calle Morelos',
        zipCode: '',
      });

      expect(formatShippingAddress(address)).toBe('Calle Morelos, Monterrey, Nuevo León');
    });

    it('returns null when there is no address (pickup orders)', () => {
      expect(formatShippingAddress(null)).toBeNull();
    });

    it('returns a legacy plain-text address verbatim', () => {
      expect(formatShippingAddress('Calle Hidalgo 45, CDMX')).toBe('Calle Hidalgo 45, CDMX');
    });
  });
});
