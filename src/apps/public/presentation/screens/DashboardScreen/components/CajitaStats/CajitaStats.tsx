'use client';

/**
 * CajitaStats
 *
 * Las tres tarjetas bajo el hero: lo que falta, los periodos restantes y
 * cuántos aportes se llevan.
 */

import { formatoMXN } from '@domain';

import type { CajitaStatsProps } from '../../DashboardScreen.interfaces';
import { DASHBOARD_UI_TEXT } from '../../DashboardScreen.constants';

import { StatCard, StatLabel, StatsRow, StatValue } from '../../DashboardScreen.styled';

export const CajitaStats = ({ cajita }: CajitaStatsProps) => (
  <StatsRow>
    <StatCard>
      <StatValue>{formatoMXN(cajita.faltante)}</StatValue>
      <StatLabel>{DASHBOARD_UI_TEXT.STATS.MISSING}</StatLabel>
    </StatCard>
    <StatCard>
      <StatValue>{cajita.periodosRestantes}</StatValue>
      <StatLabel>{DASHBOARD_UI_TEXT.STATS.PERIODS}</StatLabel>
    </StatCard>
    <StatCard>
      <StatValue>{cajita.registros.length}</StatValue>
      <StatLabel>{DASHBOARD_UI_TEXT.STATS.CONTRIBUTIONS}</StatLabel>
    </StatCard>
  </StatsRow>
);
