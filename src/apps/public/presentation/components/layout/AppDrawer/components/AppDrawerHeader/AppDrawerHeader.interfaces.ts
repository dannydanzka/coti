/**
 * AppDrawerHeader Component Interfaces
 */

export interface AppDrawerHeaderProps {
  isCollapsed: boolean;
  onMobileClose: () => void;
  onToggleCollapse: () => void;
  userEmail: string;
  userInitials: string;
  userName: string;
}
