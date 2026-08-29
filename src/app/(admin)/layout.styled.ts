/**
 * Admin Layout Styled Components
 *
 * Layout container that adjusts to sidebar state.
 * Desktop: Content pushes based on sidebar width.
 * Mobile: Full width content with drawer overlay.
 */

import styled from 'styled-components';

import { color, layout, motion, spacing } from '@constants';

const SIDEBAR_WIDTH_EXPANDED = '260px';
const SIDEBAR_WIDTH_COLLAPSED = '72px';

export const AdminLayoutContainer = styled.div`
  background-color: ${color.backgroundDark};
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled.main<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: ${({ $sidebarCollapsed }) =>
    $sidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED};
  min-height: 100vh;
  transition: ${motion.normal};

  @media (max-width: ${layout.breakpoint.lg}) {
    margin-left: 0;
  }
`;

export const TopBar = styled.header`
  align-items: center;
  background-color: ${color.background};
  border-bottom: 1px solid ${color.border};
  display: flex;
  height: ${spacing['6xl']};
  justify-content: space-between;
  padding: 0 ${spacing.sm};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TopBarLeft = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.md};
`;

/**
 * Rótulo de la barra superior, no encabezado del documento: cada pantalla del
 * panel pone su propio `h1`, así que este va como `p` para no duplicarlo.
 */
export const TopBarTitle = styled.p`
  color: ${color.textPrimary};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: ${layout.breakpoint.md}) {
    display: none;
  }
`;

export const MobileMenuButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 8px;
  color: ${color.textPrimary};
  cursor: pointer;
  display: none;
  height: ${spacing.xl};
  justify-content: center;
  width: ${spacing.xl};

  @media (max-width: ${layout.breakpoint.lg}) {
    display: flex;
  }

  &:hover {
    background-color: ${color.backgroundDark};
  }
`;

export const TopBarRight = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.md};
`;

export const PageContent = styled.div`
  min-height: calc(100vh - ${spacing['4xl']});
  padding: ${spacing.md};

  @media (max-width: ${layout.breakpoint.md}) {
    padding: ${spacing.md};
  }
`;

export const BreadcrumbText = styled.span`
  color: ${color.textSecondary};
  font-size: 0.875rem;
`;
