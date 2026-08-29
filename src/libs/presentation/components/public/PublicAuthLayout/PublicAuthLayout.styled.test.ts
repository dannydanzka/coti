/**
 * PublicAuthLayout Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  AuthCard,
  AuthCardWrapper,
  AuthContent,
  AuthHeader,
  AuthIllustrationLeft,
  AuthIllustrationPlaceholder,
  AuthIllustrationRight,
  AuthPageWrapper,
  AuthSection,
  AuthSubtitle,
  AuthTitle,
} from './PublicAuthLayout.styled';

describe('PublicAuthLayout Styled Components', () => {
  it('should export all styled components', () => {
    expect(AuthPageWrapper).toBeDefined();
    expect(AuthSection).toBeDefined();
    expect(AuthContent).toBeDefined();
    expect(AuthIllustrationLeft).toBeDefined();
    expect(AuthIllustrationRight).toBeDefined();
    expect(AuthIllustrationPlaceholder).toBeDefined();
    expect(AuthCardWrapper).toBeDefined();
    expect(AuthHeader).toBeDefined();
    expect(AuthTitle).toBeDefined();
    expect(AuthSubtitle).toBeDefined();
    expect(AuthCard).toBeDefined();
  });
});
