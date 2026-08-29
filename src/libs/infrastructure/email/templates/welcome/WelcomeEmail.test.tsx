/**
 * WelcomeEmail Template Tests
 */

import { WelcomeEmail } from './WelcomeEmail';

describe('WelcomeEmail', () => {
  it('exports WelcomeEmail component', () => {
    expect(WelcomeEmail).toBeDefined();
    expect(typeof WelcomeEmail).toBe('function');
  });
});
