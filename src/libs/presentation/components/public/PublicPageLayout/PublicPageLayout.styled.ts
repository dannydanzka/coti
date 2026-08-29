/**
 * PublicPageLayout Styled Components
 *
 * Layout components for public-facing pages.
 */

'use client';

import styled, { css } from 'styled-components';

import { color, layout, spacing, typography } from '@constants';

import type {
  StyledContainerProps,
  StyledResponsiveGridProps,
  StyledSectionProps,
  StyledTitleProps,
} from './PublicPageLayout.interfaces';

export const PublicPageWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

export const PublicContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: calc(100vh - ${spacing['6xl']});
  width: 100%;
`;

const getSectionBackground = (bg?: StyledSectionProps['$background']) => {
  switch (bg) {
    case 'alt':
      return css`
        background-color: ${color.backgroundAlt};
      `;
    case 'primary':
      return css`
        background-color: ${color.primary50};
      `;
    case 'dark':
      return css`
        background-color: ${color.neutral900};
      `;
    case 'default':
    case undefined:
      return css`
        background-color: ${color.transparent};
      `;
  }
};

const getSectionPadding = (padding?: StyledSectionProps['$padding']) => {
  switch (padding) {
    case 'none':
      return css`
        padding: 0;
      `;
    case 'sm':
      return css`
        padding: ${spacing.md} ${spacing.sm};

        @media (width <= 768px) {
          padding: ${spacing.sm} ${spacing.sm};
        }
      `;
    case 'md':
      return css`
        padding: ${spacing['2xl']} ${spacing.md};

        @media (width <= 768px) {
          padding: ${spacing.lg} ${spacing.sm};
        }
      `;
    case 'xl':
      return css`
        padding: ${spacing['4xl']} ${spacing.md};

        @media (width <= 768px) {
          padding: ${spacing['2xl']} ${spacing.sm};
        }
      `;
    case 'lg':
    case undefined:
      return css`
        padding: ${spacing['4xl']} ${spacing.md};

        @media (width <= 768px) {
          padding: ${spacing['2xl']} ${spacing.sm};
        }
      `;
  }
};

export const PublicSection = styled.section<StyledSectionProps>`
  flex: 1;
  ${({ $background }) => getSectionBackground($background)}
  ${({ $padding }) => getSectionPadding($padding)}
`;

const getContainerMaxWidth = (maxWidth?: StyledContainerProps['$maxWidth']) => {
  switch (maxWidth) {
    case 'sm':
      return '640px';
    case 'md':
      return '768px';
    case 'lg':
      return '1024px';
    case 'full':
      return '100%';
    case 'xl':
    case undefined:
      return '1200px';
  }
};

export const PublicContainer = styled.div<StyledContainerProps>`
  margin: 0 auto;
  max-width: ${({ $maxWidth }) => getContainerMaxWidth($maxWidth)};
  padding: 1rem 0 3rem;
  width: 100%;
`;

const getTitleSize = (size?: StyledTitleProps['$size']) => {
  switch (size) {
    case 'sm':
      return css`
        font-size: ${typography.size['2xl']};

        @media (width <= 768px) {
          font-size: ${typography.size.xl};
        }
      `;
    case 'md':
      return css`
        font-size: ${typography.size['4xl']};

        @media (width <= 768px) {
          font-size: ${typography.size['2xl']};
        }
      `;
    case 'xl':
      return css`
        font-size: ${typography.size['7xl']};

        @media (width <= 768px) {
          font-size: ${typography.size['5xl']};
        }
      `;
    case 'lg':
    case undefined:
      return css`
        font-size: ${typography.size['6xl']};

        @media (width <= 768px) {
          font-size: ${typography.size['4xl']};
        }
      `;
  }
};

export const PublicPageTitle = styled.h1<StyledTitleProps>`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-weight: ${typography.weight.bold};
  margin: 0;
  text-align: ${({ $align }) => $align ?? 'left'};
  ${({ $size }) => getTitleSize($size)}
`;

export const PublicSectionTitle = styled.h2<StyledTitleProps>`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-weight: ${typography.weight.bold};
  margin: 0 0 ${spacing.md};
  text-align: ${({ $align }) => $align ?? 'left'};
  ${({ $size }) => getTitleSize($size ?? 'md')}
`;

export const PublicSubtitle = styled.p<StyledTitleProps>`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.lg};
  line-height: 1.6;
  margin: ${spacing.xs} 0 0;
  text-align: ${({ $align }) => $align ?? 'left'};

  @media (width <= 768px) {
    font-size: ${typography.size.base};
  }
`;

export const PublicGrid2 = styled.div`
  display: grid;
  gap: ${spacing['2xl']};
  grid-template-columns: 1fr 1fr;

  @media (width <= 900px) {
    gap: ${spacing.lg};
    grid-template-columns: 1fr;
  }
`;

export const PublicGrid3 = styled.div`
  display: grid;
  gap: ${spacing.lg};
  grid-template-columns: repeat(3, 1fr);

  @media (width <= 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width <= 600px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * PublicResponsiveGrid - Standard responsive grid pattern
 *
 * Default columns: 1 → 2 → 3 → 4 (responsive by breakpoint)
 * Default gap: md
 *
 * Usage:
 * <PublicResponsiveGrid>...</PublicResponsiveGrid>
 * <PublicResponsiveGrid $columns={{ base: 1, sm: 2, md: 2, lg: 3 }}>...</PublicResponsiveGrid>
 * <PublicResponsiveGrid $gap="lg">...</PublicResponsiveGrid>
 */
const getGridGap = (gap?: StyledResponsiveGridProps['$gap']) => {
  switch (gap) {
    case 'sm':
      return `${spacing.xs} ${spacing.sm}`;
    case 'lg':
      return `${spacing.md} ${spacing.lg}`;
    case 'md':
    case undefined:
      return `${spacing.sm} ${spacing.md}`;
  }
};

export const PublicResponsiveGrid = styled.div<StyledResponsiveGridProps>`
  display: grid;
  gap: ${({ $gap }) => getGridGap($gap)};
  grid-template-columns: repeat(${({ $columns }) => $columns?.base ?? 1}, 1fr);

  @media (min-width: ${layout.breakpoint.sm}) {
    grid-template-columns: repeat(${({ $columns }) => $columns?.sm ?? 2}, 1fr);
  }

  @media (min-width: ${layout.breakpoint.md}) {
    grid-template-columns: repeat(${({ $columns }) => $columns?.md ?? 3}, 1fr);
  }

  @media (min-width: ${layout.breakpoint.lg}) {
    grid-template-columns: repeat(${({ $columns }) => $columns?.lg ?? 4}, 1fr);
  }
`;

/**
 * PublicScreenContent - Standard screen content wrapper
 *
 * Combines max-width 1200px with responsive padding.
 * Use inside PublicSection for consistent screen layouts.
 */
export const PublicScreenContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin: 0 auto;
  max-width: 1200px;
  padding: ${spacing.md};
  width: 100%;
`;
