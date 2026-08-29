/**
 * AdminActionButtons Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import { SpinnerIcon, StyledToggleButton } from './AdminActionButtons.styled';

describe('AdminActionButtons Styled Components', () => {
  it('should export all styled components', () => {
    expect(StyledToggleButton).toBeDefined();
    expect(SpinnerIcon).toBeDefined();
  });
});
