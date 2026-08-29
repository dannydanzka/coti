/**
 * PublicStates Styled Components
 *
 * State display components for loading, error, and empty states.
 */

'use client';

import styled from 'styled-components';

import { color, elevation, shape, spacing, typography } from '@constants';

import type { StyledStateContainerProps } from './PublicStates.interfaces';

const BaseStateContainer = styled.div<StyledStateContainerProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  justify-content: center;
  min-height: ${({ $minHeight }) => $minHeight ?? '400px'};
  padding: ${spacing.lg};
  text-align: center;
`;

export const PublicErrorState = styled(BaseStateContainer)`
  background: ${color.white};
  border-radius: ${shape.lg};
  box-shadow: ${elevation.sm};
  min-height: ${({ $minHeight }) => $minHeight ?? '300px'};
  padding: ${spacing['2xl']};
`;

export const PublicErrorIcon = styled.span`
  display: block;
  font-size: ${typography.size['2xl']};
`;

export const PublicErrorText = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  margin: 0;
`;

export const PublicEmptyState = styled(BaseStateContainer)`
  background: ${color.white};
  border-radius: ${shape.lg};
  box-shadow: ${elevation.sm};
  padding: ${spacing['2xl']};
`;

export const PublicEmptyIcon = styled.div`
  font-size: ${typography.size['8xl']};
  margin-bottom: ${spacing.xs};
`;

export const PublicEmptyTitle = styled.h2`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;
`;

export const PublicEmptyText = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
`;

export const PublicEmptyActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  justify-content: center;
  margin-top: ${spacing.xs};
`;
