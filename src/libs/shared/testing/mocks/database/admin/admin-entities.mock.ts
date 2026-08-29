/**
 * Admin Entities Mocks
 *
 * Mock data for admin-specific entities with Spanish data.
 * Updated for DearAdry - removed voting system fields.
 */

import type { ActivityType } from '@domain-types';
import type { AdminDashboardEntity, AlertType, UserEntity } from '@interfaces';

export const mockAdminDashboard: AdminDashboardEntity = {
  alerts: [
    {
      actionUrl: '/admin/security/alerts/alert-001',
      id: 'alert-001',
      isRead: false,
      message: 'Login desde un dispositivo no reconocido para el usuario María Rodriguez',
      severity: 'medium',
      timestamp: new Date('2024-03-15T09:00:00Z'),
      title: 'Nuevo dispositivo detectado',
      type: 'warning' as AlertType,
    },
  ],
  lastUpdated: new Date('2024-03-15T12:00:00Z'),
  metrics: {
    contentStats: {
      approvedEvidences: 234,
      pendingEvidences: 12,
      rejectedEvidences: 5,
    },
    enrollmentStats: {
      monthEnrollments: 156,
      todayEnrollments: 8,
      totalEnrollments: 456,
      weekEnrollments: 45,
    },
    systemHealth: {
      errorRate: 0.02,
      responseTime: 145,
      uptime: 99.98,
    },
    userEngagement: {
      activeUsers: 134,
      averageChallengesPerUser: 4.2,
      newRegistrations: 23,
    },
  },
  overview: {
    activeEvent: {
      id: 'event-2025',
      name: 'Rally Emocional 2025',
      status: 'active',
    },
    totalChallenges: 12,
    totalEvents: 3,
    totalParticipants: 45,
    totalUsers: 156,
  },
  recentActivity: [
    {
      description: 'Nuevo usuario Ana García Pérez se registró',
      id: 'activity-001',
      timestamp: new Date('2024-03-15T10:30:00Z'),
      type: 'user_created' as ActivityType,
      userId: 'user-ana-garcia-123',
      userName: 'Ana García Pérez',
    },
    {
      description: 'Evidencia enviada por Carlos Mendoza Silva',
      id: 'activity-002',
      timestamp: new Date('2024-03-15T09:45:00Z'),
      type: 'content_submitted' as ActivityType,
      userId: 'user-carlos-mendoza-456',
      userName: 'Carlos Mendoza Silva',
    },
  ],
};

export const mockAdminUserEntity: UserEntity = {
  age: null,
  bio: null,
  city: null,
  country: 'México',
  createdAt: new Date('2024-01-15T00:00:00Z'),
  deletedAt: null,
  deletedBy: null,
  email: 'maria.rodriguez@dearadry.com',
  firstName: 'María',
  id: 'admin-user-maria-rodriguez-789',
  isActive: true,
  lastLoginAt: new Date('2024-03-15T08:30:00Z'),
  lastName: 'Rodríguez López',
  neighborhood: null,
  number: null,
  passwordHash: 'hashed_password_admin',
  phone: null,
  photoUrl: null,
  role: 'admin',
  state: null,
  street: null,
  updatedAt: new Date('2024-03-15T08:30:00Z'),
  zipCode: null,
};

export const mockUserManager: UserEntity = {
  ...mockAdminUserEntity,
  email: 'carlos.garcia@dearadry.com',
  firstName: 'Carlos',
  id: 'admin-user-carlos-garcia-654',
  lastName: 'García Ruiz',
  passwordHash: 'hashed_password_manager',
  role: 'admin',
};

export const mockUserFilters = {
  createdAfter: new Date('2024-01-01T00:00:00Z'),
  isActive: true,
  role: 'admin' as const,
  searchTerm: 'García',
};

export const mockUserListResponse = {
  filters: mockUserFilters,
  pagination: {
    limit: 10,
    page: 1,
    total: 2,
    totalPages: 1,
  },
  users: [mockAdminUserEntity, mockUserManager],
};

export const mockDashboardOverview = mockAdminDashboard.overview;
export const mockDashboardMetrics = mockAdminDashboard.metrics;

export const mockAdminSession = {
  expiresAt: new Date('2024-03-16T08:30:00Z'),
  id: 'session-admin-maria-123',
  ipAddress: '192.168.1.100',
  isActive: true,
  token: 'jwt-token-admin-session',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  userId: mockAdminUserEntity.id,
};

export const mockRegularUser: UserEntity = {
  age: null,
  bio: null,
  city: null,
  country: 'México',
  createdAt: new Date('2024-02-01T00:00:00Z'),
  deletedAt: null,
  deletedBy: null,
  email: 'sofia.morales@example.com',
  firstName: 'Sofía',
  id: 'user-sofia-morales-321',
  isActive: true,
  lastLoginAt: new Date('2024-03-15T11:00:00Z'),
  lastName: 'Morales Vega',
  neighborhood: null,
  number: null,
  passwordHash: 'hashed_password_user',
  phone: null,
  photoUrl: null,
  role: 'participant',
  state: null,
  street: null,
  updatedAt: new Date('2024-03-15T11:00:00Z'),
  zipCode: null,
};

export const mockPendingUser: UserEntity = {
  ...mockRegularUser,
  email: 'luis.torres@example.com',
  firstName: 'Luis',
  id: 'user-pending-luis-torres-456',
  isActive: false,
  lastName: 'Torres García',
};
