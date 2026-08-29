/**
 * Global Slice Notifications Tests
 * ESSENTIAL: Smoke tests only - Notifications tested via component integration
 */

import {
  addToast,
  clearAllNotifications,
  dequeueNotification,
  enqueueNotification,
} from './global.slice';

describe('Global Slice - Notifications', () => {
  it('should export notification action creators', () => {
    expect(enqueueNotification).toBeDefined();
    expect(dequeueNotification).toBeDefined();
    expect(clearAllNotifications).toBeDefined();
    expect(addToast).toBeDefined();
  });
});
