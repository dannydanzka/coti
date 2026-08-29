/**
 * StartingPointStep — Paso 6: ¿ya llevas algo ahorrado?
 */

'use client';

import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { formatoMXN, porcentajeAvance } from '@domain';
import { MeetButton } from '@components';
import { Switch } from '@dannydanzka/sovereignty-ui';

import { MONTOS_RAPIDOS } from '../../PlannerScreen.constants';
import type { PlannerStepProps } from '../../PlannerScreen.interfaces';

import {
  Actions,
  AmountField,
  AmountInput,
  AmountPrefix,
  AmountUnit,
  Field,
  GhostButton,
  GoalHint,
  Label,
  ProgressTrack,
  QuickAmount,
  QuickAmounts,
  Stack,
  Subtitle,
  SummaryCard,
  SummaryKey,
  SummaryRow,
  SummaryValue,
  SwitchHint,
  SwitchLabel,
  SwitchRow,
  Title,
} from '../../PlannerScreen.styled';

export const StartingPointStep = ({ planner }: PlannerStepProps) => {
  const { t } = useTranslation();
  const { draft, goBack, goNext, plan, setDraft } = planner;

  const handleToggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDraft({ tieneAhorro: event.target.checked });
    },
    [setDraft]
  );
  const handleMonto = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDraft({ montoInicial: Math.max(0, Number(event.target.value) || 0) });
    },
    [setDraft]
  );
  const createQuick = useCallback(
    (monto: number) => () => setDraft({ montoInicial: monto }),
    [setDraft]
  );
  const handleFromZero = useCallback(() => {
    setDraft({ montoInicial: 0, tieneAhorro: false });
    goNext();
  }, [goNext, setDraft]);

  if (!plan) return null;

  const inicial = draft.tieneAhorro ? draft.montoInicial : 0;
  const porcentaje = porcentajeAvance(inicial, plan.meta);

  return (
    <>
      <Title>{t('planner.start.title')}</Title>
      <Subtitle>{t('planner.start.subtitle')}</Subtitle>

      <SwitchRow>
        <SwitchLabel>
          {t('planner.start.toggle')}
          <SwitchHint>{t('planner.start.toggleHint')}</SwitchHint>
        </SwitchLabel>
        <Switch checked={draft.tieneAhorro} onChange={handleToggle} />
      </SwitchRow>

      {draft.tieneAhorro && (
        <Field>
          <Label>{t('planner.start.amountLabel')}</Label>
          <Stack>
            <AmountField $on>
              <AmountPrefix>$</AmountPrefix>
              <AmountInput
                inputMode='numeric'
                min={0}
                type='number'
                value={draft.montoInicial || ''}
                onChange={handleMonto}
              />
              <AmountUnit>MXN</AmountUnit>
            </AmountField>
            <QuickAmounts>
              {MONTOS_RAPIDOS.map((monto) => (
                <QuickAmount
                  $on={draft.montoInicial === monto}
                  key={monto}
                  type='button'
                  onClick={createQuick(monto)}
                >
                  {formatoMXN(monto)}
                </QuickAmount>
              ))}
            </QuickAmounts>
          </Stack>
        </Field>
      )}

      <SummaryCard>
        <SummaryRow>
          <SummaryKey>{t('planner.start.goal')}</SummaryKey>
          <SummaryValue>{formatoMXN(plan.meta)}</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryKey>{t('planner.start.have')}</SummaryKey>
          <SummaryValue>{formatoMXN(inicial)}</SummaryValue>
        </SummaryRow>
        <SummaryRow $accent>
          <SummaryKey>{t('planner.start.missing')}</SummaryKey>
          <SummaryValue>{formatoMXN(Math.max(0, plan.meta - inicial))}</SummaryValue>
        </SummaryRow>
        <ProgressTrack $percent={porcentaje} />
        <GoalHint>
          {inicial > 0
            ? t('planner.start.progress', { percent: porcentaje })
            : t('planner.start.progressZero')}
        </GoalHint>
      </SummaryCard>

      <Actions>
        <GhostButton type='button' onClick={goBack}>
          {t('planner.common.back')}
        </GhostButton>
        <GhostButton type='button' onClick={handleFromZero}>
          {t('planner.start.fromZero')}
        </GhostButton>
        <MeetButton variant='primary' onClick={goNext}>
          {t('planner.common.continue')}
        </MeetButton>
      </Actions>
    </>
  );
};
