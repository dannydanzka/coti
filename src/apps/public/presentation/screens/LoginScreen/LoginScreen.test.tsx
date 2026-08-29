/**
 * LoginScreen Component Tests
 *
 * Spanish locale mandatory.
 */

import { LoginScreen } from './LoginScreen';

describe('LoginScreen', () => {
  it('exports LoginScreen component', () => {
    expect(LoginScreen).toBeDefined();
    expect(typeof LoginScreen).toBe('function');
  });
});
