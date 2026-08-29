/**
 * AdminEntityCell Styled Components
 *
 * Consistent styling for entity display in admin tables.
 */

'use client';

import styled from 'styled-components';

import { color, spacing, typography } from '@constants';

import type { StyledEntityDescriptionProps } from './AdminEntityCell.interfaces';

export const EntityName = styled.span`
  color: ${color.textPrimary};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EntityId = styled.span`
  color: ${color.textTertiary};
  display: block;
  font-family: ${typography.family.mono};
  font-size: ${typography.size.xs};
  margin-top: ${spacing.micro};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EntityDescription = styled.span<StyledEntityDescriptionProps>`
  color: ${color.textSecondary};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  max-width: ${({ $maxWidth }) => $maxWidth ?? '100%'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EntitySubtext = styled.span`
  color: ${color.textSecondary};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  margin-top: ${spacing.micro};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EntityEmail = styled.span`
  color: ${color.textSecondary};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EntityCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  min-width: 0;
  width: 100%;
`;
