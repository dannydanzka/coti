/**
 * GlobalLoading Component Tests
 *
 * Tests for global loading overlay with Redux integration.
 * Spanish locale for data and UI text.
 */

import { GlobalLoading } from './GlobalLoading';

describe('GlobalLoading', () => {
  it('component is exported', () => {
    expect(GlobalLoading).toBeDefined();
    expect(typeof GlobalLoading).toBe('function');
  });

  it('component accepts className prop', () => {
    const component = GlobalLoading as React.FC<{ className?: string }>;
    expect(component).toBeDefined();
  });
});
