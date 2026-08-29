/**
 * AdminDropdown Styled Components
 *
 * Dropdown menu components for admin screens.
 */

'use client';

import styled, { css } from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type {
  DropdownItemProps,
  DropdownMenuProps,
  DropdownTriggerProps,
} from './AdminDropdown.interfaces';

export const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export const DropdownTrigger = styled.button<DropdownTriggerProps>`
  align-items: center;
  background-color: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  cursor: pointer;
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  gap: ${spacing.xs};
  justify-content: space-between;
  min-width: 160px;
  padding: ${spacing.xs} ${spacing.sm};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    border-color: ${color.primary400};
  }

  &:focus {
    border-color: ${color.primary500};
    box-shadow: 0 0 0 3px ${color.primary100};
    outline: none;
  }

  &:disabled {
    background-color: ${color.neutral100};
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  &[data-open='true'] svg {
    transform: rotate(180deg);
  }
`;

export const DropdownMenu = styled.div<DropdownMenuProps>`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape.md};
  box-shadow: 0 4px 12px rgb(${color.neutral900} / 0.15);
  left: 0;
  max-height: 240px;
  min-width: 100%;
  overflow-y: auto;
  position: absolute;
  z-index: 100;

  ${({ $position }) =>
    $position === 'top'
      ? css`
          bottom: calc(100% + ${spacing.micro});
        `
      : css`
          top: calc(100% + ${spacing.micro});
        `}
`;

export const DropdownItem = styled.button<DropdownItemProps>`
  background: ${({ $selected }) => ($selected ? color.primary50 : 'transparent')};
  border: none;
  color: ${({ $disabled, $selected }) => {
    if ($disabled) return color.textTertiary;
    if ($selected) return color.primary700;
    return color.textPrimary;
  }};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${({ $selected }) =>
    $selected ? typography.weight.medium : typography.weight.regular};
  padding: ${spacing.xs} ${spacing.sm};
  text-align: left;
  transition: background 0.15s ease;
  width: 100%;

  &:hover:not(:disabled) {
    background: ${({ $selected }) => ($selected ? color.primary100 : color.neutral50)};
  }

  &:focus {
    background: ${color.primary50};
    outline: none;
  }
`;

export const DropdownIcon = styled.span`
  align-items: center;
  display: flex;
  height: ${spacing.sm};
  justify-content: center;
  width: ${spacing.sm};
`;
