/**
 * ActivateStep — Paso 7: resumen, recordatorios y abrir la cajita.
 */

'use client';

import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { BRAND_ASSETS, BRAND_UI_TEXT } from '@constants';
import { formatoFecha, formatoMXN } from '@domain';
import { MeetButton } from '@components';
import { Switch } from '@dannydanzka/sovereignty-ui';
import { useAuth } from '@hooks';

import type { PlannerStepProps } from '../../PlannerScreen.interfaces';

import {
  Actions,
  Celebration,
  CelebrationMascot,
  GhostButton,
  GoalHint,
  ReminderCard,
  Subtitle,
  SummaryCard,
  SummaryKey,
  SummaryRow,
  SummaryValue,
  SwitchHint,
  SwitchLabel,
  SwitchRow,
  Ticket,
  TicketAmount,
  TicketCity,
  Title,
} from '../../PlannerScreen.styled';

export const ActivateStep = ({ planner }: PlannerStepProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { destino, draft, goBack, isSaving, plan, setDraft, submit } = planner;

  const handleReminders = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDraft({ recordatorios: event.target.checked });
    },
    [setDraft]
  );
  const handleSubmit = useCallback(() => {
    void submit();
  }, [submit]);

  if (!plan || !destino || !draft.fechaSalida) return null;

  const salida = new Date(draft.fechaSalida);
  const inicial = draft.tieneAhorro ? draft.montoInicial : 0;

  return (
    <>
      <Ticket>
        <TicketCity>{destino.ciudad}</TicketCity>
        <TicketAmount>{formatoMXN(plan.meta)}</TicketAmount>
      </Ticket>

      <Celebration>
        <CelebrationMascot alt={BRAND_UI_TEXT.MASCOT_ALT} src={BRAND_ASSETS.MASCOT} />
        <Title>{t('planner.activate.title')}</Title>
        <Subtitle>
          {t('planner.activate.subtitle', { city: destino.ciudad, date: formatoFecha(salida) })}
        </Subtitle>
      </Celebration>

      <SummaryCard>
        <SummaryRow>
          <SummaryKey>{t('planner.activate.destination')}</SummaryKey>
          <SummaryValue>
            {destino.ciudad}, {destino.pais}
          </SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryKey>{t('planner.activate.goal')}</SummaryKey>
          <SummaryValue>{formatoMXN(plan.meta)} MXN</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryKey>{t('planner.activate.contribution')}</SummaryKey>
          <SummaryValue>
            {t('planner.activate.contributionValue', {
              amount: formatoMXN(draft.aportacion),
              frequency: t(`planner.plan.per.${draft.frecuencia}`),
              periods: plan.periodos,
            })}
          </SummaryValue>
        </SummaryRow>
        {inicial > 0 && (
          <SummaryRow>
            <SummaryKey>{t('planner.activate.initial')}</SummaryKey>
            <SummaryValue>{formatoMXN(inicial)}</SummaryValue>
          </SummaryRow>
        )}
      </SummaryCard>

      <ReminderCard>
        <SwitchRow>
          <SwitchLabel>
            {t('planner.activate.reminder')}
            <SwitchHint>{t('planner.activate.reminderHint')}</SwitchHint>
          </SwitchLabel>
          <Switch checked={draft.recordatorios} onChange={handleReminders} />
        </SwitchRow>
        {draft.recordatorios && (
          <GoalHint>{t('planner.activate.reminderTo', { email: user?.email ?? '' })}</GoalHint>
        )}
      </ReminderCard>

      <Actions>
        <GhostButton type='button' onClick={goBack}>
          {t('planner.common.back')}
        </GhostButton>
        <MeetButton disabled={isSaving} variant='primary' onClick={handleSubmit}>
          {isSaving ? t('planner.activate.saving') : t('planner.activate.cta')}
        </MeetButton>
      </Actions>
      <GoalHint>{t('planner.activate.editable')}</GoalHint>
    </>
  );
};
