/**
 * AdminSearch Styled Components
 *
 * Unified search and filter styles for admin screens.
 */

'use client';

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

export const FilterBar = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
`;

export const SearchInput = styled.input`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape.md};
  flex: 1;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  min-width: 200px;
  padding: ${spacing.xs} ${spacing.sm};
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${color.primary500};
    outline: none;
  }

  &::placeholder {
    color: ${color.textTertiary};
  }
`;

export const FilterSelect = styled.select`
  appearance: none;
  background: ${color.white}
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")
    no-repeat right ${spacing.sm} center;
  border: 1px solid ${color.border};
  border-radius: ${shape.md};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.xs} ${spacing.lg} ${spacing.xs} ${spacing.sm};
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${color.primary500};
    outline: none;
  }
`;
