/**
 * Global Slice Core Tests
 * ESSENTIAL: Smoke tests only - Redux slices tested via component integration
 */

import { setGlobalLoading, setLanguage, setTheme } from './global.slice';

describe('Global Slice - Core Functionality', () => {
  it('should export core action creators', () => {
    expect(setGlobalLoading).toBeDefined();
    expect(setTheme).toBeDefined();
    expect(setLanguage).toBeDefined();
  });
});
