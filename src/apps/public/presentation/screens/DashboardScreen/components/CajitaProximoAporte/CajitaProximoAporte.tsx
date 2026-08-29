'use client';

/**
 * CajitaProximoAporte
 *
 * La tarjeta lateral: cuándo toca el siguiente aporte, el hito recién superado
 * y el botón que abre el registro.
 */

import { Button } from '@components';
import { formatoMXN } from '@domain';

import type { CajitaProximoAporteProps } from '../../DashboardScreen.interfaces';
import { DASHBOARD_UI_TEXT } from '../../DashboardScreen.constants';
import { formatDiaYMes } from '../../DashboardScreen.helpers';

import {
  MilestoneBanner,
  SideAmount,
  SideCard,
  SideDate,
  SideLabel,
} from '../../DashboardScreen.styled';

export const CajitaProximoAporte = ({
  cajita,
  onRegistrar,
  registrando,
}: CajitaProximoAporteProps) => (
  <SideCard>
    <SideLabel>{DASHBOARD_UI_TEXT.NEXT.TITLE}</SideLabel>
    <SideDate>{formatDiaYMes(cajita.proximoAporte)}</SideDate>
    <SideAmount>{formatoMXN(cajita.plan.aportacion)}</SideAmount>

    {cajita.hitoAlcanzado !== null && (
      <MilestoneBanner>
        {DASHBOARD_UI_TEXT.MILESTONE.REACHED} {cajita.hitoAlcanzado}%
        {DASHBOARD_UI_TEXT.MILESTONE.SUFFIX}
      </MilestoneBanner>
    )}

    <Button disabled={registrando} fullWidth variant='accent' onClick={onRegistrar}>
      {DASHBOARD_UI_TEXT.NEXT.BUTTON}
    </Button>
  </SideCard>
);
