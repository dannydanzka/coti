/**
 * AppDrawer Styled Components
 *
 * Container styles only. Sub-components have their own styled files.
 * Colors aligned with Public UI (cream/yellow/blue scheme).
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, elevation, layout, motion } from '@constants';

const SIDEBAR_WIDTH_EXPANDED = '260px';
const SIDEBAR_WIDTH_COLLAPSED = '72px';

export const SidebarContainer = styled.aside<{
  $isCollapsed: boolean;
  $isMobileOpen: boolean;
}>`
  background: ${brandColor.bgHeader};
  border-right: 1px solid ${color.neutral200};
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;

  /**
   * Colapsado hay que dejar salir los tooltips, que se posicionan fuera del
   * ancho de 72px: recortados no se veían nunca. Expandido
   * sí se recorta, para que las etiquetas no se desborden durante la
   * transición de ancho.
   */
  overflow: ${({ $isCollapsed }) => ($isCollapsed ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  transition: ${motion.normal};
  width: ${({ $isCollapsed }) => ($isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED)};
  z-index: ${layout.zIndex.fixed};

  @media (max-width: ${layout.breakpoint.lg}) {
    box-shadow: ${({ $isMobileOpen }) => ($isMobileOpen ? elevation.xl : 'none')};
    transform: translateX(${({ $isMobileOpen }) => ($isMobileOpen ? '0' : '-100%')});
    width: ${SIDEBAR_WIDTH_EXPANDED};
  }
`;

export const SidebarOverlay = styled.div<{ $isVisible: boolean }>`
  background-color: rgb(${color.blackRgb} / 0.5);
  display: none;
  inset: 0;
  position: fixed;
  z-index: calc(${layout.zIndex.fixed} - 1);

  @media (max-width: ${layout.breakpoint.lg}) {
    display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  }
`;
