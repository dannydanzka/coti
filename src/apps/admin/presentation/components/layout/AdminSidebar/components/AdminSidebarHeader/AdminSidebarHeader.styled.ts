/**
 * AdminSidebarHeader Styled Components
 *
 * User info section with avatar, name, email, role badge.
 */

'use client';

import styled from 'styled-components';

import { color, layout, shape, spacing, typography } from '@constants';

export const SidebarHeader = styled.div<{ $isCollapsed: boolean }>`
  align-items: center;
  background: ${color.neutral800};
  border-bottom: 1px solid ${color.neutral700};
  display: flex;
  flex-shrink: 0;
  gap: ${spacing.xs};
  height: ${spacing['6xl']};
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'space-between')};
  padding: 0 ${({ $isCollapsed }) => ($isCollapsed ? spacing.xs : spacing.sm)};
`;

export const UserSection = styled.div<{ $isCollapsed: boolean }>`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${spacing.xs};
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  min-width: 0;
  overflow: hidden;
`;

export const UserAvatar = styled.div`
  align-items: center;
  background: linear-gradient(135deg, ${color.primary500} 0%, ${color.primary600} 100%);
  border-radius: ${shape.full};
  color: ${color.neutral900};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${typography.family.display};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.bold};
  height: ${spacing.xl};
  justify-content: center;
  text-transform: uppercase;
  width: ${spacing.xl};

  @media (max-width: ${layout.breakpoint.lg}) {
    cursor: default;
    pointer-events: none;
  }

  &:hover {
    opacity: 0.85;

    @media (max-width: ${layout.breakpoint.lg}) {
      opacity: 1;
    }
  }
`;

export const UserInfo = styled.div<{ $isCollapsed: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'flex')};
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`;

export const UserName = styled.span`
  color: ${color.textInverse};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserEmail = styled.span`
  color: ${color.neutral400};
  font-size: ${typography.size.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RoleBadge = styled.div<{ $isCollapsed: boolean }>`
  align-items: center;
  background: ${color.neutral700};
  border: 1px solid ${color.neutral600};
  border-radius: ${shape.full};
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'flex')};
  flex-shrink: 0;
  gap: ${spacing.micro};
  padding: ${spacing.micro} ${spacing.xs};
`;

export const RoleLabel = styled.span`
  color: ${color.primary400};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
`;

export const MobileCloseButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: ${shape.md};
  color: ${color.textSecondary};
  cursor: pointer;
  display: none;
  flex-shrink: 0;
  height: ${spacing.lg};
  justify-content: center;
  width: ${spacing.lg};

  @media (max-width: ${layout.breakpoint.lg}) {
    display: flex;
  }

  &:hover {
    background-color: ${color.neutral700};
    color: ${color.textInverse};
  }
`;
