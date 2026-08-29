/**
 * User Entity - Coti Business Tests
 *
 * Tests for user entity business functions.
 * Spanish locale test data per project standards.
 */

import { getUserFullName, hasCompleteAddress } from './user.entity';

describe('User Entity Business', () => {
  describe('getUserFullName', () => {
    it('retorna nombre completo', () => {
      expect(
        getUserFullName({
          firstName: 'María',
          lastName: 'García',
        } as never)
      ).toBe('María García');
    });

    it('retorna solo nombre si no hay apellido', () => {
      expect(
        getUserFullName({
          firstName: 'José',
          lastName: '',
        } as never)
      ).toBe('José');
    });

    it('retorna solo apellido si no hay nombre', () => {
      expect(
        getUserFullName({
          firstName: '',
          lastName: 'López',
        } as never)
      ).toBe('López');
    });
  });

  describe('hasCompleteAddress', () => {
    it('retorna true con dirección completa', () => {
      expect(
        hasCompleteAddress({
          city: 'Ciudad de México',
          state: 'CDMX',
          street: 'Av. Reforma 123',
          zipCode: '06600',
        })
      ).toBe(true);
    });

    it('retorna false sin calle', () => {
      expect(
        hasCompleteAddress({
          city: 'Guadalajara',
          state: 'Jalisco',
          street: null,
          zipCode: '44100',
        })
      ).toBe(false);
    });

    it('retorna false sin ciudad', () => {
      expect(
        hasCompleteAddress({
          city: null,
          state: 'CDMX',
          street: 'Calle Principal',
          zipCode: '06600',
        })
      ).toBe(false);
    });

    it('retorna false sin estado', () => {
      expect(
        hasCompleteAddress({
          city: 'Monterrey',
          state: null,
          street: 'Av. Juárez',
          zipCode: '64000',
        })
      ).toBe(false);
    });

    it('retorna false sin código postal', () => {
      expect(
        hasCompleteAddress({
          city: 'Puebla',
          state: 'Puebla',
          street: 'Calle 5 de Mayo',
          zipCode: null,
        })
      ).toBe(false);
    });
  });
});
