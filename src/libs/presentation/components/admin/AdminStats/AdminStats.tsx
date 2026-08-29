/**
 * AdminStats Components
 *
 * Reusable stats components for admin dashboard screens.
 */

'use client';

import type { StatItemProps, StatsBarProps, StatsGridProps } from './AdminStats.interfaces';

import {
  StatContent,
  StatIcon,
  StatItem as StyledStatItem,
  StatLabel,
  StatsBar as StyledStatsBar,
  StatsGrid as StyledStatsGrid,
  StatValue,
} from './AdminStats.styled';

export const AdminStatsBar = ({ children, className }: StatsBarProps) => (
  <StyledStatsBar className={className}>{children}</StyledStatsBar>
);

export const AdminStatsGrid = ({ children, className, columns = 4 }: StatsGridProps) => (
  <StyledStatsGrid $columns={columns} className={className}>
    {children}
  </StyledStatsGrid>
);

export const AdminStatItem = ({
  className,
  icon,
  label,
  value,
  variant = 'default',
}: StatItemProps) => (
  <StyledStatItem $variant={variant} className={className}>
    {icon && <StatIcon>{icon}</StatIcon>}
    <StatContent>
      <StatLabel>{label}</StatLabel>
      <StatValue>{value}</StatValue>
    </StatContent>
  </StyledStatItem>
);

export {
  StatCard,
  StatCardDescription,
  StatCardTitle,
  StatCardValue,
  StatContent,
  StatIcon,
  StatItem,
  StatLabel,
  StatValue,
  StatsBar,
  StatsGrid,
} from './AdminStats.styled';
