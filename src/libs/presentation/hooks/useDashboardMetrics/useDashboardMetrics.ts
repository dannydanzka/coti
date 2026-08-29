/**
 * useDashboardMetrics
 *
 * Métricas del panel de administración. Hoy sólo cubre la gestión de usuarios,
 * que es el único dominio con endpoints de administración. Al agregar nuevas
 * áreas (viajes, planes de ahorro), se suman aquí sus conteos.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

import { UsersService } from '@services';

import type { DashboardMetrics, UseDashboardMetricsReturn } from './useDashboardMetrics.interfaces';

const EMPTY_METRICS: DashboardMetrics = {
  admins: 0,
  owners: 0,
  participants: 0,
  totalUsers: 0,
};

export const useDashboardMetrics = (): UseDashboardMetricsReturn => {
  const [metrics, setMetrics] = useState<DashboardMetrics>(EMPTY_METRICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const byRole = await UsersService.getCountByRole(true);

      setMetrics({
        admins: byRole.countByRole.admin ?? 0,
        owners: byRole.countByRole.owner ?? 0,
        participants: byRole.countByRole.participant ?? 0,
        totalUsers: byRole.total,
      });
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : 'No se pudieron cargar las métricas'
      );
      setMetrics(EMPTY_METRICS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMetrics();
  }, [fetchMetrics]);

  return { error, loading, metrics, refetch: fetchMetrics };
};
