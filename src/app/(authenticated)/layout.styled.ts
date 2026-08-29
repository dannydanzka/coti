/**
 * Authenticated Layout Styled Components
 *
 * Layout structure identical to AdminLayout for consistent drawer behavior.
 * Desktop: Fixed sidebar that pushes content via margin-left.
 * Mobile: Full width content with drawer overlay.
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, layout, motion, spacing } from '@constants';

const DRAWER_WIDTH_EXPANDED = '260px';
const DRAWER_WIDTH_COLLAPSED = '72px';

export const AuthenticatedContainer = styled.div`
  background-color: ${brandColor.landingBgCream};
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled.main<{ $sidebarCollapsed: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: ${({ $sidebarCollapsed }) =>
    $sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED};
  min-height: 100vh;
  min-width: 0;
  transition: ${motion.normal};

  @media (max-width: ${layout.breakpoint.lg}) {
    margin-left: 0;
  }
`;

export const TopBar = styled.header`
  align-items: center;
  background-color: ${brandColor.bgHeader};
  border-bottom: 1px solid ${color.border};
  display: flex;
  height: ${spacing['6xl']};
  justify-content: space-between;
  padding: 0 ${spacing.md};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TopBarLeft = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.md};
`;

/** The centered brand mark doubles as the way back home. */
export const LogoLink = styled.a`
  align-items: center;
  display: flex;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const TopBarCenter = styled.div`
  align-items: center;
  display: flex;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);

  svg {
    height: ${spacing['3xl']};
    width: auto;

    @media (min-width: ${layout.breakpoint.md}) {
      height: ${spacing['4xl']};
    }
  }
`;

export const TopBarRight = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.md};
`;

export const MobileMenuButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 8px;
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  display: none;
  height: ${spacing.xl};
  justify-content: center;
  width: ${spacing.xl};

  @media (max-width: ${layout.breakpoint.lg}) {
    display: flex;
  }

  &:hover {
    background-color: ${color.neutral100};
  }
`;

export const PageContent = styled.div`
  flex: 1;
  padding: ${spacing.xl};

  @media (max-width: ${layout.breakpoint.md}) {
    padding: ${spacing.md};
  }
`;
