/**
 * PublicPageLayout Interfaces
 *
 * Types for public page layout components.
 */

export interface StyledSectionProps {
  $background?: 'default' | 'alt' | 'primary' | 'dark';
  $padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface StyledContainerProps {
  $maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface StyledTitleProps {
  $size?: 'sm' | 'md' | 'lg' | 'xl';
  $align?: 'left' | 'center' | 'right';
}

export interface StyledResponsiveGridProps {
  $columns?: {
    base?: number;
    lg?: number;
    md?: number;
    sm?: number;
  };
  $gap?: 'sm' | 'md' | 'lg';
}
