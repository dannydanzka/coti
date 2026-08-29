import { noop } from './noop.helpers';

describe('noop', () => {
  it('is a function that returns undefined', () => {
    expect(typeof noop).toBe('function');
    expect(noop()).toBeUndefined();
  });
});
