/**
 * AdminSidebarFooter Styled Components
 */

'use client';

import styled from 'styled-components';

import { color, motion, shape, spacing, typography } from '@constants';

export const SidebarFooter = styled.div<{ $isCollapsed: boolean }>`
  border-top: 1px solid ${color.neutral700};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: ${spacing.md} ${({ $isCollapsed }) => ($isCollapsed ? spacing.xs : spacing.sm)};
`;

export const LogoutButton = styled.button<{ $isCollapsed: boolean }>`
  align-items: center;
  background-color: transparent;
  border: 1px solid ${color.neutral600};
  border-radius: ${shape.md};
  color: ${color.neutral100};
  cursor: pointer;
  display: flex;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.xs};
  justify-content: center;
  padding: ${spacing.xs} ${spacing.sm};
  transition: ${motion.normal};
  width: 100%;

  &:hover {
    background-color: ${color.neutral600};
    border-color: ${color.neutral400};
    color: ${color.white};
  }
`;

export const LogoutText = styled.span<{ $isCollapsed: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'inline')};
`;
