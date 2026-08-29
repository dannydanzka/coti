/**
 * PublicCard Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  PublicCard,
  PublicCardContent,
  PublicCardDivider,
  PublicCardFooter,
  PublicCardHeader,
  PublicCardSubtitle,
  PublicCardTitle,
} from './PublicCard.styled';

describe('PublicCard Styled Components', () => {
  it('should export all styled components', () => {
    expect(PublicCard).toBeDefined();
    expect(PublicCardHeader).toBeDefined();
    expect(PublicCardTitle).toBeDefined();
    expect(PublicCardSubtitle).toBeDefined();
    expect(PublicCardContent).toBeDefined();
    expect(PublicCardFooter).toBeDefined();
    expect(PublicCardDivider).toBeDefined();
  });
});
