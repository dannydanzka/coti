/**
 * PublicAuthLayout Interfaces
 *
 * Types for authentication page layouts (Login, Signup).
 */

export interface PublicAuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface AuthCardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export interface AuthHeaderProps {
  subtitle?: string;
  title: string;
}

export interface AuthIllustrationProps {
  alt: string;
  children?: React.ReactNode;
  className?: string;
  height?: number;
  src?: string;
  width?: number;
}

export interface StyledIllustrationPlaceholderProps {
  $height?: string;
  $variant?: 'primary' | 'accent';
  $width?: string;
}
