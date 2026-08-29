/**
 * useDashboardMetrics Interfaces
 */

export interface DashboardMetrics {
  totalUsers: number;
  owners: number;
  admins: number;
  participants: number;
}

export interface UseDashboardMetricsReturn {
  metrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
