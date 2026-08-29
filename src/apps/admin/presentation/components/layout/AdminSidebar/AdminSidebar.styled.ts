/**
 * AdminSidebar Styled Components
 *
 * Container styles only. Sub-components have their own styled files.
 */

'use client';

import styled from 'styled-components';

import { color, elevation, layout, motion } from '@constants';

const SIDEBAR_WIDTH_EXPANDED = '260px';
const SIDEBAR_WIDTH_COLLAPSED = '72px';

export const SidebarContainer = styled.aside<{
  $isCollapsed: boolean;
  $isMobileOpen: boolean;
}>`
  background: linear-gradient(180deg, ${color.neutral900} 0%, ${color.neutral800} 100%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transition: ${motion.normal};
  width: ${({ $isCollapsed }) => ($isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED)};
  z-index: ${layout.zIndex.fixed};

  @media (max-width: ${layout.breakpoint.lg}) {
    box-shadow: ${({ $isMobileOpen }) => ($isMobileOpen ? elevation.lg : 'none')};
    transform: translateX(${({ $isMobileOpen }) => ($isMobileOpen ? '0' : '-100%')});
    width: ${SIDEBAR_WIDTH_EXPANDED};
  }
`;

export const SidebarOverlay = styled.div<{ $isVisible: boolean }>`
  background-color: rgb(${color.neutral900} / 0.5);
  display: none;
  inset: 0;
  position: fixed;
  z-index: calc(${layout.zIndex.fixed} - 1);

  @media (max-width: ${layout.breakpoint.lg}) {
    display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  }
`;
