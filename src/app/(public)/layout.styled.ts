/**
 * Public Layout Styled Components
 *
 * Supports both authenticated (with drawer) and public (without drawer) views.
 */

'use client';

import styled from 'styled-components';

import { layout, motion, spacing } from '@constants';

const DRAWER_WIDTH_EXPANDED = '260px';
const DRAWER_WIDTH_COLLAPSED = '72px';

export const PublicContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: clip; /* secciones full-bleed (hero de la portada) miden 100vw */
  width: 100%;
`;

export const AuthenticatedContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const DrawerWrapper = styled.div<{ $isCollapsed: boolean }>`
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  transition: ${motion.normal};
  width: ${({ $isCollapsed }) => ($isCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED)};
  z-index: 100;

  @media (max-width: ${layout.breakpoint.lg}) {
    position: fixed;
    width: 0; /* AppDrawer handles its own width via translateX */
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`;

export const MainContent = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ContentArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: calc(100vh - ${spacing['6xl']});
`;

export const PageContent = styled.div`
  flex: 1;
  padding: ${spacing.xl};

  @media (max-width: ${layout.breakpoint.md}) {
    padding: ${spacing.md};
  }
`;
