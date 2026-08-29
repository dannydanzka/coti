/**
 * ErrorScreen Component Tests
 *
 * Smoke tests for error screen.
 * ErrorScreen delegates to NotFoundScreen.
 * Spanish locale mandatory.
 */

import { ErrorScreen } from './ErrorScreen';

vi.mock('../NotFoundScreen', () => ({
  NotFoundScreen: () => <div data-testid='not-found-screen'>NotFoundScreen</div>,
}));

describe('ErrorScreen', () => {
  describe('Module Structure', () => {
    it('exports ErrorScreen component', () => {
      expect(ErrorScreen).toBeDefined();
      expect(typeof ErrorScreen).toBe('function');
    });
  });
});
