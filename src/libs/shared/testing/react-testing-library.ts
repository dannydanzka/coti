/**
 * React Testing Library Re-exports
 * Centralized re-exports from @testing-library/react for tree-shaking optimization.
 */

export {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';

export type { RenderOptions, RenderResult } from '@testing-library/react';
