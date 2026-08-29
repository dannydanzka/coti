/**
 * ProjectionStep — Paso 4: el rango proyectado y su desglose.
 */

'use client';

import { useTranslation } from 'react-i18next';

import { formatoMXN } from '@domain';
import { MeetButton } from '@components';

import type { PlannerStepProps } from '../../PlannerScreen.interfaces';

import {
  Actions,
  DarkChip,
  DarkChips,
  DarkLead,
  DarkSummary,
  DarkValue,
  DarkValueSeparator,
  DetailCard,
  DetailHeader,
  DetailLabel,
  DetailRow,
  DetailValue,
  GhostButton,
  InfoBox,
  InfoIcon,
  InfoText,
  Label,
} from '../../PlannerScreen.styled';

const monthFormatter = new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' });

export const ProjectionStep = ({ planner }: PlannerStepProps) => {
  const { t } = useTranslation();
  const { destino, draft, goBack, goNext, noches, projection } = planner;

  if (!projection || !destino || !draft.fechaSalida) {
    return (
      <>
        <InfoBox $tone='warn'>
          <InfoIcon $tone='warn'>!</InfoIcon>
          <InfoText>{t('planner.projection.incomplete')}</InfoText>
        </InfoBox>
        <Actions>
          <GhostButton type='button' onClick={goBack}>
            {t('planner.common.back')}
          </GhostButton>
        </Actions>
      </>
    );
  }

  const estilos = draft.estilos.map((estilo) => t(`planner.style.options.${estilo}`)).join(' · ');

  return (
    <>
      <DarkSummary>
        <DarkLead>{t('planner.projection.lead')}</DarkLead>
        <DarkValue>
          {formatoMXN(projection.rango.min)}
          <DarkValueSeparator>–</DarkValueSeparator>
          {formatoMXN(projection.rango.max)}
        </DarkValue>
        <DarkLead>
          {t('planner.projection.meta', {
            month: monthFormatter.format(new Date(draft.fechaSalida)),
            nights: noches,
            people: draft.personas,
          })}
        </DarkLead>
        <DarkChips>
          <DarkChip>
            {destino.emoji} {destino.ciudad}, {destino.pais}
          </DarkChip>
          {estilos && <DarkChip>{estilos}</DarkChip>}
        </DarkChips>
      </DarkSummary>

      <DetailCard>
        <DetailHeader>
          <Label>{t('planner.projection.details')}</Label>
        </DetailHeader>
        {projection.rango.desglose.map((item) => (
          <DetailRow key={item.concepto}>
            <DetailLabel>
              {item.emoji} {item.concepto}
            </DetailLabel>
            <DetailValue>
              {formatoMXN(item.min)} – {formatoMXN(item.max)}
            </DetailValue>
          </DetailRow>
        ))}
      </DetailCard>

      <InfoBox>
        <InfoIcon>i</InfoIcon>
        <InfoText>{t('planner.projection.disclaimer')}</InfoText>
      </InfoBox>

      <Actions>
        <GhostButton type='button' onClick={goBack}>
          {t('planner.common.back')}
        </GhostButton>
        <MeetButton variant='primary' onClick={goNext}>
          {t('planner.projection.cta')}
        </MeetButton>
      </Actions>
    </>
  );
};
