/**
 * Header Component Interfaces
 */

export type HeaderVariant = 'public' | 'authenticated' | 'admin';

export interface HeaderProps {
  bgColor?: string;
  onMenuClick?: () => void;
  variant?: HeaderVariant;
}

export interface HeaderUser {
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'participant';
}
