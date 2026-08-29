/**
 * Crypto Helper Tests
 *
 * Tests password hashing and comparison.
 * Spanish locale mandatory.
 */

vi.unmock('bcryptjs');

import { comparePassword, hashPassword } from './crypto';

describe('Crypto Helper', () => {
  it('hashes password', async () => {
    const hash = await hashPassword('contraseña123');

    expect(hash).toBeDefined();
    expect(hash).not.toBe('contraseña123');
    expect(hash.startsWith('$2')).toBe(true);
  });

  it('hashes with custom salt rounds', async () => {
    const hash = await hashPassword('contraseña123', { saltRounds: 4 });

    expect(hash).toBeDefined();
    expect(hash.startsWith('$2')).toBe(true);
  });

  it('compares password correctly', async () => {
    const hash = await hashPassword('contraseña123', { saltRounds: 4 });

    const isValid = await comparePassword('contraseña123', hash);
    expect(isValid).toBe(true);

    const isInvalid = await comparePassword('contraseñaIncorrecta', hash);
    expect(isInvalid).toBe(false);
  });
});
