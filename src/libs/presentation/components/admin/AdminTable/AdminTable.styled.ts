/**
 * AdminTable Styled Components
 *
 * Unified table styles for admin screens.
 * Consistent hover, sorting, and responsive behavior.
 */

'use client';

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type {
  StyledTableCellProps,
  StyledTableHeaderProps,
  StyledTableRowProps,
} from './AdminTable.interfaces';

export const AdminTableWrapper = styled.div`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape.lg};
  overflow-x: auto;
  width: 100%;
`;

export const AdminTable = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
`;

export const AdminTableHead = styled.thead`
  background: ${color.neutral50};
  border-bottom: 1px solid ${color.border};
`;

export const AdminTableBody = styled.tbody``;

export const AdminTableRow = styled.tr<StyledTableRowProps>`
  background: ${(props) => (props.$highlighted ? color.warningBackground : 'transparent')};
  border-bottom: 1px solid ${color.border};
  cursor: ${(props) => (props.$processing ? 'wait' : 'default')};
  opacity: ${(props) => (props.$processing ? 0.6 : 1)};
  pointer-events: ${(props) => (props.$processing ? 'none' : 'auto')};
  transition:
    background 0.15s ease,
    opacity 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${(props) => (props.$highlighted ? color.warningLight : color.neutral50)};
  }
`;

export const AdminTableHeader = styled.th<StyledTableHeaderProps>`
  color: ${(props) => (props.$active ? color.primary500 : color.textSecondary)};
  cursor: ${(props) => (props.$sortable ? 'pointer' : 'default')};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.medium};
  letter-spacing: ${typography.tracking.wide};
  padding: ${spacing.xs};
  text-align: left;
  text-transform: uppercase;
  transition: color 0.15s ease;
  user-select: ${(props) => (props.$sortable ? 'none' : 'auto')};
  ${(props) => props.$width && `width: ${props.$width};`}

  ${(props) =>
    props.$sortable &&
    `
    &:hover {
      color: ${color.primary500};
    }
  `}
`;

export const AdminSortIcon = styled.span`
  margin-left: ${spacing.micro};
`;

export const AdminTableCell = styled.td<StyledTableCellProps>`
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  max-width: 0;
  overflow: hidden;
  padding: ${spacing.xs};
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
  ${(props) => props.$width && `width: ${props.$width};`}
`;

export const AdminActionsContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.xs};
`;

export const AdminTableEmptyCell = styled.td`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing['2xl']};
  text-align: center;
`;
