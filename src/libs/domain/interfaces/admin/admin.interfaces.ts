/**
 * Admin Domain Interfaces
 *
 * Shared interfaces for admin entities to avoid circular dependencies.
 * These interfaces should match the domain entities but are placed in libs for sharing.
 *
 */

import type { ActivityType, AlertSeverity } from '@domain-types';

export type AlertType = 'info' | 'warning' | 'error' | 'success';

export type AdminResource =
  | 'participants'
  | 'events'
  | 'challenges'
  | 'evidences'
  | 'enrollments'
  | 'users'
  | 'reports'
  | 'audit';

export type AdminAction = 'create' | 'read' | 'update' | 'delete' | 'approve' | 'reject' | 'export';

export interface AdminDashboardEntity {
  overview: DashboardOverview;
  metrics: DashboardMetrics;
  recentActivity: DashboardActivity[];
  alerts: DashboardAlert[];
  lastUpdated: Date;
}

export interface DashboardOverview {
  totalParticipants: number;
  totalEvents: number;
  totalChallenges: number;
  totalUsers: number;
  activeEvent: {
    id: string;
    name: string;
    status: string;
  } | null;
}

export interface DashboardMetrics {
  enrollmentStats: {
    todayEnrollments: number;
    weekEnrollments: number;
    monthEnrollments: number;
    totalEnrollments: number;
  };
  userEngagement: {
    activeUsers: number;
    newRegistrations: number;
    averageChallengesPerUser: number;
  };
  contentStats: {
    pendingEvidences: number;
    approvedEvidences: number;
    rejectedEvidences: number;
  };
  systemHealth: {
    uptime: number;
    responseTime: number;
    errorRate: number;
  };
}

export interface DashboardActivity {
  id: string;
  type: ActivityType;
  description: string;
  userId: string;
  userName: string;
  timestamp: Date;
}

export interface DashboardAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

export interface AdminPermission {
  resource: AdminResource;
  actions: AdminAction[];
}

export interface AdminSession {
  id: string;
  userId: string;
  token: string;
  isValid: boolean;
  expiresAt: Date;
  createdAt: Date;
  lastAccessedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}
