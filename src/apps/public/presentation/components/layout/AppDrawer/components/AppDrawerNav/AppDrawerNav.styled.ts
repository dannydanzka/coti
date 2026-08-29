/**
 * AppDrawerNav Styled Components
 *
 * Colors aligned with Public UI (yellow/blue scheme).
 */

'use client';

import styled, { css } from 'styled-components';

import {
  brandColor,
  color,
  elevation,
  layout,
  motion,
  shape,
  spacing,
  typography,
} from '@constants';

export const NavSection = styled.nav`
  flex: 1;
  min-height: 0;
  overflow: hidden auto;
  padding: ${spacing.sm} 0;

  &::-webkit-scrollbar {
    width: ${spacing.micro};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${color.neutral300};
    border-radius: 4px;
  }
`;

export const NavList = styled.ul<{ $isCollapsed?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0 ${({ $isCollapsed }) => ($isCollapsed ? spacing.xs : spacing.sm)};
`;

export const NavItem = styled.li``;

export const NavLink = styled.a<{ $isActive: boolean; $isCollapsed: boolean }>`
  align-items: center;
  border-radius: ${shape.md};
  color: ${({ $isActive }) =>
    $isActive ? brandColor.landingBlueDark : brandColor.landingTextGray};
  cursor: pointer;
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.xs};
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  outline: none;
  padding: ${spacing.xs} ${spacing.sm};
  text-decoration: none;
  transition: ${motion.normal};

  &:hover,
  &:focus,
  &:focus-visible {
    box-shadow: none;
    outline: none;
    text-decoration: none;
  }

  ${({ $isActive }) =>
    $isActive
      ? css`
          background: ${brandColor.landingBgYellow};
          border-left: 3px solid ${brandColor.landingBlueDark};
          color: ${brandColor.landingBlueDark};
          font-weight: ${typography.weight.semibold};
        `
      : css`
          &:hover {
            background-color: ${brandColor.landingBgYellow};
            color: ${brandColor.landingBlueDark};
          }
        `}
`;

export const NavIcon = styled.span`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: ${spacing.md};
  justify-content: center;
  width: ${spacing.md};
`;

export const NavLabel = styled.span<{ $isCollapsed: boolean }>`
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.2s ease;
  white-space: nowrap;

  ${({ $isCollapsed }) =>
    $isCollapsed &&
    css`
      position: absolute;
      visibility: hidden;
      width: 0;
    `}
`;

export const NavBadge = styled.span<{ $isCollapsed: boolean }>`
  align-items: center;
  background-color: ${brandColor.landingBlueDark};
  border-radius: ${shape.full};
  color: ${color.white};
  display: flex;
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  height: ${spacing.sm};
  justify-content: center;
  min-width: ${spacing.sm};
  padding: 0 ${spacing.xs};

  ${({ $isCollapsed }) =>
    $isCollapsed &&
    css`
      position: absolute;
      right: ${spacing.xs};
      top: ${spacing.micro};
    `}
`;

export const Tooltip = styled.div`
  background-color: ${brandColor.landingBlueDark};
  border-radius: ${shape.sm};
  box-shadow: ${elevation.md};
  color: ${color.white};
  font-size: ${typography.size.xs};
  left: calc(100% + ${spacing.xs});
  opacity: 0;
  padding: ${spacing.xs} ${spacing.sm};
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.2s ease;
  visibility: hidden;
  white-space: nowrap;
  z-index: ${layout.zIndex.modal};
`;

export const NavItemWrapper = styled.div`
  position: relative;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;
