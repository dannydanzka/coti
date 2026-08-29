/**
 * AdminPageLayout Styled Components
 *
 * Layout components for admin screens:
 * - PageWrapper: Full page container
 * - ScreenContainer: Content area with padding
 * - PageTitle: Page heading
 */

'use client';

import styled from 'styled-components';

import { color, spacing, typography } from '@constants';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const ScreenContainer = styled.section`
  flex: 1;
`;

export const PageTitle = styled.h1`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['4xl']};
  font-weight: ${typography.weight.semibold};
  margin: 0 0 ${spacing.sm};
`;

export const HeaderRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  justify-content: space-between;
  margin-bottom: ${spacing.md};
`;

export const SectionTitle = styled.h2`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.semibold};
  margin: 0 0 ${spacing.sm};
`;
