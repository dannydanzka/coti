/**
 * Global Slice Advanced Tests
 * ESSENTIAL: Smoke tests only - Redux slices tested via component integration
 */

import { setAnimationsEnabled, setReduceMotion } from './global.slice';

describe('Global Slice - Advanced Functionality', () => {
  it('should export advanced action creators', () => {
    expect(setAnimationsEnabled).toBeDefined();
    expect(setReduceMotion).toBeDefined();
  });
});
