/**
 * Authorization Helper Tests
 *
 * Essential smoke tests for authorization helpers following TESTING-STANDARDS.md.
 * Tests verify authorization methods are defined and callable.
 */

vi.unmock('@helpers');
vi.unmock('@helpers/use-case/authorization');
vi.unmock('@helpers/use-case/authorization/authorization');

import { validateAndGetUser } from './authorization';

describe('validateAndGetUser', () => {
  it('should be defined', () => {
    expect(validateAndGetUser).toBeDefined();
    expect(typeof validateAndGetUser).toBe('function');
  });

  it('should be async function', () => {
    expect(validateAndGetUser.constructor.name).toBe('AsyncFunction');
  });

  it('should accept request and allowedRoles parameters', () => {
    expect(validateAndGetUser).toHaveLength(2);
  });
});
