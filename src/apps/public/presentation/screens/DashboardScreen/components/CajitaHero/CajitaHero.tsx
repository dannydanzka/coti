'use client';

/**
 * CajitaHero
 *
 * El bloque verde de la pantalla 8: cuánto llevas ahorrado contra la meta,
 * con la barra de avance y los cuatro hitos.
 *
 * No calcula nada: `porcentaje` y `hitoAlcanzado` llegan resueltos del API.
 */

import { Check } from 'lucide-react';

import { formatoMXN } from '@domain';

import type { CajitaHeroProps } from '../../DashboardScreen.interfaces';
import { DASHBOARD_UI_TEXT, HITOS } from '../../DashboardScreen.constants';

import {
  HeroAmount,
  HeroBody,
  HeroCard,
  HeroGoal,
  HeroLabel,
  HeroMilestone,
  HeroMilestones,
  HeroStamp,
  HeroTrack,
  HeroTrackFill,
} from '../../DashboardScreen.styled';

export const CajitaHero = ({ cajita }: CajitaHeroProps) => (
  <HeroCard>
    <HeroStamp>{cajita.viaje.destino.emoji}</HeroStamp>
    <HeroBody>
      <HeroLabel>{DASHBOARD_UI_TEXT.BOX.SAVED}</HeroLabel>
      <HeroAmount>{formatoMXN(cajita.ahorrado)}</HeroAmount>
      <HeroGoal>
        {DASHBOARD_UI_TEXT.BOX.OF} {formatoMXN(cajita.plan.meta)}
      </HeroGoal>

      <HeroTrack>
        <HeroTrackFill $porcentaje={cajita.porcentaje} />
      </HeroTrack>

      <HeroMilestones>
        {HITOS.map((hito) => (
          <HeroMilestone $alcanzado={cajita.porcentaje >= hito} key={hito}>
            {cajita.porcentaje >= hito && <Check size={12} />}
            {`${hito}%`}
          </HeroMilestone>
        ))}
      </HeroMilestones>
    </HeroBody>
  </HeroCard>
);
