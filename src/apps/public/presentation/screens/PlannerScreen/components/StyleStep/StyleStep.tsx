/**
 * StyleStep — Paso 2: chips de estilo de viaje.
 */

'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { EstiloViaje } from '@interfaces';
import { MeetButton } from '@components';

import { ESTILOS } from '../../PlannerScreen.constants';
import type { PlannerStepProps } from '../../PlannerScreen.interfaces';

import {
  Actions,
  GhostButton,
  Label,
  StyleCard,
  StyleEmoji,
  StyleGrid,
  StyleName,
  Subtitle,
  Title,
} from '../../PlannerScreen.styled';

export const StyleStep = ({ planner }: PlannerStepProps) => {
  const { t } = useTranslation();
  const { draft, goBack, goNext, toggleEstilo } = planner;

  const createToggle = useCallback(
    (estilo: EstiloViaje) => () => toggleEstilo(estilo),
    [toggleEstilo]
  );

  return (
    <>
      <Title>{t('planner.style.title')}</Title>
      <Subtitle>{t('planner.style.subtitle')}</Subtitle>

      <Label>{t('planner.style.label')}</Label>
      <StyleGrid>
        {ESTILOS.map((estilo) => (
          <StyleCard
            $on={draft.estilos.includes(estilo.key)}
            aria-pressed={draft.estilos.includes(estilo.key)}
            key={estilo.key}
            type='button'
            onClick={createToggle(estilo.key)}
          >
            <StyleEmoji aria-hidden='true'>{estilo.emoji}</StyleEmoji>
            <StyleName>{t(`planner.style.options.${estilo.key}`)}</StyleName>
          </StyleCard>
        ))}
      </StyleGrid>

      <Actions>
        <GhostButton type='button' onClick={goBack}>
          {t('planner.common.back')}
        </GhostButton>
        <MeetButton variant='primary' onClick={goNext}>
          {draft.estilos.length === 0 ? t('planner.common.skip') : t('planner.common.continue')}
        </MeetButton>
      </Actions>
    </>
  );
};
