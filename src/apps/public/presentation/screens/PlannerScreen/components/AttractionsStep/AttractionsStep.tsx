/**
 * AttractionsStep — Paso 3: must go / would be nice por atracción.
 */

'use client';

import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MeetButton } from '@components';
import type { PrioridadAtraccion } from '@interfaces';

import type { PlannerStepProps } from '../../PlannerScreen.interfaces';
import { PRIORIDAD } from '../../PlannerScreen.constants';

import {
  Actions,
  AttractionGrid,
  AttractionName,
  AttractionRow,
  CountRow,
  GhostButton,
  InfoBox,
  InfoIcon,
  InfoText,
  Pill,
  Subtitle,
  Title,
  ToggleButton,
  ToggleGroup,
} from '../../PlannerScreen.styled';

export const AttractionsStep = ({ planner }: PlannerStepProps) => {
  const { t } = useTranslation();
  const { destino, draft, goBack, goNext, setAtraccion } = planner;

  const counts = useMemo(() => {
    const values = Object.values(draft.atracciones);
    return {
      mustGo: values.filter((value) => value === PRIORIDAD.MUST_GO).length,
      nice: values.filter((value) => value === PRIORIDAD.WOULD_BE_NICE).length,
    };
  }, [draft.atracciones]);

  const createSetter = useCallback(
    (atraccionId: string, prioridad: PrioridadAtraccion) => () => {
      const current = draft.atracciones[atraccionId];
      setAtraccion(atraccionId, current === prioridad ? null : prioridad);
    },
    [draft.atracciones, setAtraccion]
  );

  return (
    <>
      <Title>{t('planner.attractions.title')}</Title>
      <Subtitle>{t('planner.attractions.subtitle')}</Subtitle>

      <CountRow>
        <Pill $tone='coral'>{t('planner.attractions.mustGoCount', { count: counts.mustGo })}</Pill>
        <Pill $tone='sand'>{t('planner.attractions.niceCount', { count: counts.nice })}</Pill>
      </CountRow>

      <AttractionGrid>
        {(destino?.atracciones ?? []).map((atraccion) => {
          const current = draft.atracciones[atraccion.id];
          return (
            <AttractionRow key={atraccion.id}>
              <AttractionName title={atraccion.descripcion}>{atraccion.nombre}</AttractionName>
              <ToggleGroup>
                <ToggleButton
                  $on={current === PRIORIDAD.MUST_GO}
                  $tone='coral'
                  type='button'
                  onClick={createSetter(atraccion.id, PRIORIDAD.MUST_GO)}
                >
                  {t('planner.attractions.mustGo')}
                </ToggleButton>
                <ToggleButton
                  $on={current === PRIORIDAD.WOULD_BE_NICE}
                  $tone='sand'
                  type='button'
                  onClick={createSetter(atraccion.id, PRIORIDAD.WOULD_BE_NICE)}
                >
                  {t('planner.attractions.nice')}
                </ToggleButton>
              </ToggleGroup>
            </AttractionRow>
          );
        })}
      </AttractionGrid>

      <InfoBox>
        <InfoIcon>i</InfoIcon>
        <InfoText>{t('planner.attractions.hint')}</InfoText>
      </InfoBox>

      <Actions>
        <GhostButton type='button' onClick={goBack}>
          {t('planner.common.back')}
        </GhostButton>
        <MeetButton variant='primary' onClick={goNext}>
          {t('planner.common.continue')}
        </MeetButton>
      </Actions>
    </>
  );
};
