/**
 * SavingsPlanStep — Paso 5: meta, frecuencia y aportación.
 */

'use client';

import type { ChangeEvent } from 'react';
import { Check } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { formatoFecha, formatoMXN } from '@domain';
import type { FrecuenciaAporte } from '@domain';
import { MeetButton } from '@components';
import type { MetaOpcion } from '@redux';

import { APORTACION_RANGE, FRECUENCIAS, META_OPCIONES } from '../../PlannerScreen.constants';
import type { PlannerStepProps } from '../../PlannerScreen.interfaces';

import {
  Actions,
  AmountField,
  AmountInput,
  AmountPrefix,
  AmountUnit,
  Field,
  GhostButton,
  GoalAmount,
  GoalCurrency,
  GoalHero,
  GoalHint,
  GoalOption,
  GoalOptionAmount,
  GoalOptions,
  GoalOptionTitle,
  InfoBox,
  InfoIcon,
  InfoText,
  InfoTitle,
  Label,
  RangeInput,
  RangeLabel,
  RangeLabels,
  Segment,
  Segmented,
  Stack,
  Subtitle,
  Title,
} from '../../PlannerScreen.styled';

export const SavingsPlanStep = ({ planner }: PlannerStepProps) => {
  const { t } = useTranslation();
  const { canContinue, draft, goBack, goNext, plan, projection, setDraft } = planner;

  const createMetaSetter = useCallback(
    (metaOpcion: MetaOpcion) => () => setDraft({ metaOpcion }),
    [setDraft]
  );
  const createFrecuenciaSetter = useCallback(
    (frecuencia: FrecuenciaAporte) => () => setDraft({ frecuencia }),
    [setDraft]
  );
  const handleAportacion = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDraft({ aportacion: Math.max(0, Number(event.target.value) || 0) });
    },
    [setDraft]
  );

  if (!projection || !plan) return null;

  const llega = plan.llegaATiempo;

  return (
    <>
      <Title>{t('planner.plan.title')}</Title>
      <Subtitle>{t('planner.plan.subtitle')}</Subtitle>

      <Field>
        <Label>{t('planner.plan.goalLabel')}</Label>
        <Stack>
          <GoalHero>
            <GoalAmount>{formatoMXN(plan.meta)}</GoalAmount>
            <GoalCurrency>MXN</GoalCurrency>
          </GoalHero>
          <GoalOptions>
            {META_OPCIONES.map((opcion) => (
              <GoalOption
                $on={draft.metaOpcion === opcion}
                key={opcion}
                type='button'
                onClick={createMetaSetter(opcion)}
              >
                <GoalOptionTitle>{t(`planner.plan.goals.${opcion}.title`)}</GoalOptionTitle>
                <GoalOptionAmount>{formatoMXN(projection.metas[opcion])}</GoalOptionAmount>
              </GoalOption>
            ))}
          </GoalOptions>
          <GoalHint>{t(`planner.plan.goals.${draft.metaOpcion}.hint`)}</GoalHint>
        </Stack>
      </Field>

      <Field>
        <Label>{t('planner.plan.frequencyLabel')}</Label>
        <Segmented>
          {FRECUENCIAS.map((frecuencia) => (
            <Segment
              $on={draft.frecuencia === frecuencia}
              key={frecuencia}
              type='button'
              onClick={createFrecuenciaSetter(frecuencia)}
            >
              {t(`planner.plan.frequency.${frecuencia}`)}
            </Segment>
          ))}
        </Segmented>
      </Field>

      <Field>
        <Label>{t(`planner.plan.amountLabel.${draft.frecuencia}`)}</Label>
        <AmountField $on>
          <AmountPrefix>$</AmountPrefix>
          <AmountInput
            inputMode='numeric'
            min={0}
            type='number'
            value={draft.aportacion || ''}
            onChange={handleAportacion}
          />
          <AmountUnit>{t(`planner.plan.amountUnit.${draft.frecuencia}`)}</AmountUnit>
        </AmountField>
        <RangeInput
          max={APORTACION_RANGE.MAX}
          min={APORTACION_RANGE.MIN}
          step={APORTACION_RANGE.STEP}
          type='range'
          value={Math.min(APORTACION_RANGE.MAX, Math.max(APORTACION_RANGE.MIN, draft.aportacion))}
          onChange={handleAportacion}
        />
        <RangeLabels>
          <RangeLabel>{formatoMXN(APORTACION_RANGE.MIN)}</RangeLabel>
          <RangeLabel>{formatoMXN(APORTACION_RANGE.MAX)}</RangeLabel>
        </RangeLabels>
      </Field>

      <InfoBox $tone={llega ? 'ok' : 'warn'}>
        <InfoIcon $tone={llega ? 'ok' : 'warn'}>{llega ? <Check size={12} /> : '!'}</InfoIcon>
        <Stack>
          <InfoTitle>{llega ? t('planner.plan.okTitle') : t('planner.plan.lateTitle')}</InfoTitle>
          <InfoText>
            {plan.fechaLlegada
              ? t(llega ? 'planner.plan.okText' : 'planner.plan.lateText', {
                  amount: formatoMXN(draft.aportacion),
                  date: formatoFecha(plan.fechaLlegada),
                  frequency: t(`planner.plan.per.${draft.frecuencia}`),
                })
              : t('planner.plan.noAmount')}
          </InfoText>
        </Stack>
      </InfoBox>

      <Actions>
        <GhostButton type='button' onClick={goBack}>
          {t('planner.common.back')}
        </GhostButton>
        <MeetButton disabled={!canContinue} variant='primary' onClick={goNext}>
          {t('planner.common.continue')}
        </MeetButton>
      </Actions>
    </>
  );
};
