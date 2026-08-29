/**
 * Card Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import { StyledCard } from './Card.styled';

describe('Card Styled Components', () => {
  it('should export all styled components', () => {
    expect(StyledCard).toBeDefined();
  });
});
