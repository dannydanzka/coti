/**
 * Button Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import { ButtonIcon, ButtonLoader, StyledButton } from './Button.styled';

describe('Button Styled Components', () => {
  it('should export all styled components', () => {
    expect(StyledButton).toBeDefined();
    expect(ButtonLoader).toBeDefined();
    expect(ButtonIcon).toBeDefined();
  });
});
