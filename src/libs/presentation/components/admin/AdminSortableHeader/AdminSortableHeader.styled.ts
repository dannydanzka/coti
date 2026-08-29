/**
 * AdminSortableHeader Styled Components
 *
 * Consistent styling for sortable table headers.
 */

'use client';

import styled from 'styled-components';

import { color, spacing, typography } from '@constants';

import type { StyledSortableHeaderProps } from './AdminSortableHeader.interfaces';

export const SortableHeader = styled.th<StyledSortableHeaderProps>`
  color: ${({ $active }) => ($active ? color.primary500 : color.textSecondary)};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.medium};
  letter-spacing: ${typography.tracking.wide};
  padding: ${spacing.sm};
  text-align: left;
  text-transform: uppercase;
  transition: color 0.15s ease;
  user-select: none;
  ${({ $width }) => $width && `width: ${$width};`}

  &:hover {
    color: ${color.primary500};
  }
`;

export const SortIconWrapper = styled.span`
  display: inline-flex;
  margin-left: ${spacing.micro};
  vertical-align: middle;
`;
