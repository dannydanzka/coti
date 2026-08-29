'use client';

/**
 * CajitaEmptyState
 *
 * Lo que ve quien todavía no abre su cajita. Si dejó el asistente a medias,
 * el texto cambia para invitarlo a retomarlo en vez de empezar de cero.
 */

import { PiggyBank } from 'lucide-react';

import type { CajitaEmptyStateProps } from '../../DashboardScreen.interfaces';
import { DASHBOARD_UI_TEXT } from '../../DashboardScreen.constants';

import {
  ExploreCTAButton,
  ExploreCTACard,
  ExploreCTAContent,
  ExploreCTAHighlight,
  ExploreCTAIcon,
  ExploreCTAText,
  ExploreCTATitle,
} from '../../DashboardScreen.styled';

export const CajitaEmptyState = ({ borradorId, onPlanear }: CajitaEmptyStateProps) => {
  const textos = borradorId ? DASHBOARD_UI_TEXT.DRAFT : DASHBOARD_UI_TEXT.EMPTY_BOX;

  return (
    <ExploreCTACard>
      <ExploreCTAIcon>
        <PiggyBank size={32} />
      </ExploreCTAIcon>
      <ExploreCTAContent>
        <ExploreCTATitle>{textos.TITLE}</ExploreCTATitle>
        <ExploreCTAText>{textos.SUBTITLE}</ExploreCTAText>
        {!borradorId && (
          <ExploreCTAHighlight>{DASHBOARD_UI_TEXT.EMPTY_BOX.HIGHLIGHT}</ExploreCTAHighlight>
        )}
        <ExploreCTAButton type='button' onClick={onPlanear}>
          {textos.BUTTON}
        </ExploreCTAButton>
      </ExploreCTAContent>
    </ExploreCTACard>
  );
};
