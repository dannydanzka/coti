/**
 * Global Slice Modals Tests
 * ESSENTIAL: Smoke tests only - Modal management tested via component integration
 */

import { addModal, clearAllModals, removeModal } from './global.slice';

describe('Global Slice - Modal Management', () => {
  it('should export modal action creators', () => {
    expect(addModal).toBeDefined();
    expect(removeModal).toBeDefined();
    expect(clearAllModals).toBeDefined();
  });
});
