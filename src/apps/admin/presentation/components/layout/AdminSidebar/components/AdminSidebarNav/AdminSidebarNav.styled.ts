/**
 * AdminSidebarNav Styled Components
 */

'use client';

import styled, { css } from 'styled-components';

import { color, elevation, layout, motion, shape, spacing, typography } from '@constants';

export const NavSection = styled.nav`
  flex: 1;
  min-height: 0;
  overflow: hidden auto;
  padding: ${spacing.sm} 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${color.neutral600};
    border-radius: 4px;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0 ${spacing.sm};
`;

export const NavItem = styled.li``;

export const NavLink = styled.a<{ $isActive: boolean; $isCollapsed: boolean }>`
  align-items: center;
  background-color: ${({ $isActive }) => ($isActive ? `${color.primary500}20` : 'transparent')};
  border-left: 3px solid ${({ $isActive }) => ($isActive ? color.primary500 : 'transparent')};
  border-radius: ${shape.md};
  color: ${({ $isActive }) => ($isActive ? color.primary400 : color.neutral100)};
  cursor: pointer;
  display: flex;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.xs};
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  padding: ${spacing.xs} ${spacing.sm};
  text-decoration: none;
  transition: ${motion.normal};

  &:hover,
  &:focus,
  &:active {
    outline: none;
    text-decoration: none;
  }

  &:focus-visible {
    outline: none;
  }

  ${({ $isActive }) =>
    !$isActive &&
    css`
      &:hover {
        background-color: ${color.neutral700};
        color: ${color.white};
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
  background-color: ${color.error};
  border-radius: ${shape.full};
  color: ${color.textInverse};
  display: flex;
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  height: ${spacing.md};
  justify-content: center;
  min-width: ${spacing.md};
  padding: 0 ${spacing.xs};

  ${({ $isCollapsed }) =>
    $isCollapsed &&
    css`
      position: absolute;
      right: ${spacing.xs};
      top: 4px;
    `}
`;

export const Tooltip = styled.div`
  background-color: ${color.neutral800};
  border-radius: ${shape.sm};
  box-shadow: ${elevation.md};
  color: ${color.textInverse};
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
