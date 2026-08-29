/**
 * SignupScreen Component Tests
 *
 * Spanish locale mandatory.
 */

import { SignupScreen } from './SignupScreen';

describe('SignupScreen', () => {
  it('exports SignupScreen component', () => {
    expect(SignupScreen).toBeDefined();
    expect(typeof SignupScreen).toBe('function');
  });
});
