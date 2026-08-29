/**
 * HomeScreen Styled Components
 */

'use client';

import styled from 'styled-components';

import { color, layout, spacing, typography } from '@constants';

export const HomeWrapper = styled.main`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing['3xl']} ${spacing.xl};
  text-align: center;

  @media (max-width: ${layout.breakpoint.md}) {
    padding: ${spacing.xl} ${spacing.md};
  }
`;

export const HomeTitle = styled.h1`
  color: ${color.textPrimary};
  font-size: ${typography.size['3xl']};
  font-weight: ${typography.weight.bold};
  margin: 0 0 ${spacing.md};
`;

export const HomeSubtitle = styled.p`
  color: ${color.textSecondary};
  font-size: ${typography.size.lg};
  margin: 0;
  max-width: 640px;
`;
