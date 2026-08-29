/**
 * PublicShell Styled Components
 */

import styled from 'styled-components';

import { color, spacing, typography } from '@constants';

export const PageContainer = styled.div`
  background-color: ${color.background};
  color: ${color.textPrimary};
  min-height: 100vh;
`;

export const PageContent = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: ${spacing.xl} 0;
  padding-left: ${spacing.md};
  padding-right: ${spacing.md};
`;

export const PageHeader = styled.div`
  margin-bottom: ${spacing.xl};
  text-align: center;
`;

export const PageTitle = styled.div`
  background: linear-gradient(135deg, ${color.primary500}, ${color.primary400});
  background-clip: text;
  font-family: ${typography.family.display};
  font-size: ${typography.size['6xl']};
  font-weight: ${typography.weight.bold};
  margin-bottom: ${spacing.md};
  -webkit-text-fill-color: transparent;

  @media (width <= 768px) {
    font-size: ${typography.size['4xl']};
  }
`;

export const PageSubtitle = styled.span`
  color: ${color.textSecondary};
  font-size: ${typography.size.lg};
  line-height: 1.6;
  margin: 0 auto ${spacing.xl};
  max-width: 600px;

  @media (width <= 768px) {
    font-size: ${typography.size.base};
  }
`;
