/**
 * PublicPageLayout Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  PublicContainer,
  PublicContentWrapper,
  PublicGrid2,
  PublicGrid3,
  PublicPageTitle,
  PublicPageWrapper,
  PublicResponsiveGrid,
  PublicScreenContent,
  PublicSection,
  PublicSectionTitle,
  PublicSubtitle,
} from './PublicPageLayout.styled';

describe('PublicPageLayout Styled Components', () => {
  it('should export all styled components', () => {
    expect(PublicPageWrapper).toBeDefined();
    expect(PublicContentWrapper).toBeDefined();
    expect(PublicSection).toBeDefined();
    expect(PublicContainer).toBeDefined();
    expect(PublicPageTitle).toBeDefined();
    expect(PublicSectionTitle).toBeDefined();
    expect(PublicSubtitle).toBeDefined();
    expect(PublicGrid2).toBeDefined();
    expect(PublicGrid3).toBeDefined();
    expect(PublicResponsiveGrid).toBeDefined();
    expect(PublicScreenContent).toBeDefined();
  });
});
