/**
 * AdminSidebarHeader Component Interfaces
 */

export interface AdminSidebarHeaderProps {
  isCollapsed: boolean;
  onMobileClose: () => void;
  onToggleCollapse: () => void;
  roleLabel: string;
  userEmail: string;
  userInitials: string;
  userName: string;
}
