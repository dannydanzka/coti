/**
 * ProgressBar Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  ProgressContainer,
  ProgressFill,
  ProgressHeader,
  ProgressLabel,
  ProgressPercentage,
  ProgressTrack,
} from './ProgressBar.styled';

describe('ProgressBar Styled Components', () => {
  it('should export all styled components', () => {
    expect(ProgressContainer).toBeDefined();
    expect(ProgressHeader).toBeDefined();
    expect(ProgressLabel).toBeDefined();
    expect(ProgressPercentage).toBeDefined();
    expect(ProgressTrack).toBeDefined();
    expect(ProgressFill).toBeDefined();
  });
});
