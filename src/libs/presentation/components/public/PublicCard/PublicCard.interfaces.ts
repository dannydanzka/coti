/**
 * PublicCard Interfaces
 *
 * Types for public card components.
 */

export interface StyledCardProps {
  $variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  $padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface StyledCardHeaderProps {
  $withBorder?: boolean;
}
