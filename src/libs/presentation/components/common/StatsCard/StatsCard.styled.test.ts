/**
 * StatsCard Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import { CardContainer, CardIcon, CardLabel, CardSublabel, CardValue } from './StatsCard.styled';

describe('StatsCard Styled Components', () => {
  it('should export all styled components', () => {
    expect(CardContainer).toBeDefined();
    expect(CardIcon).toBeDefined();
    expect(CardValue).toBeDefined();
    expect(CardLabel).toBeDefined();
    expect(CardSublabel).toBeDefined();
  });
});
