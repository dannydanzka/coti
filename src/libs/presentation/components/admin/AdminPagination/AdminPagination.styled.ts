/**
 * AdminPagination Styled Components
 *
 * Unified pagination styles for admin screens.
 * Consistent navigation, info display, and items per page selection.
 */

'use client';

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type { StyledPaginationButtonProps } from './AdminPagination.interfaces';

export const PaginationContainer = styled.div`
  align-items: center;
  border-top: 1px solid ${color.border};
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  justify-content: space-between;
  padding: ${spacing.sm};
`;

export const PaginationInfo = styled.span`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
`;

export const PaginationControls = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.xs};
`;

export const PerPageSelect = styled.select`
  appearance: none;
  background: ${color.white}
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")
    no-repeat right ${spacing.xs} center;
  border: 1px solid ${color.border};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.xs} ${spacing.md} ${spacing.xs} ${spacing.xs};

  &:focus {
    border-color: ${color.primary500};
    outline: none;
  }
`;

export const PerPageOption = styled.option`
  background: ${color.white};
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
`;

export const PaginationButton = styled.button<StyledPaginationButtonProps>`
  background: ${(props) => (props.$active ? color.primary500 : color.white)};
  border: 1px solid ${(props) => (props.$active ? color.primary500 : color.border)};
  border-radius: ${shape.md};
  color: ${(props) => (props.$active ? color.neutral900 : color.textPrimary)};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  min-width: ${spacing.lg};
  padding: ${spacing.xs} ${spacing.sm};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${color.primary500};
    ${(props) => !props.$active && `background: ${color.primary50};`}
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PaginationEllipsis = styled.span`
  color: ${color.textTertiary};
  font-family: ${typography.family.body};
  padding: 0 ${spacing.micro};
`;

export const PaginationButtonWrapper = styled.span`
  align-items: center;
  display: inline-flex;
`;
