/**
 * DefineTripStep — Paso 1: destino, fechas y personas.
 */

'use client';

import type { ChangeEvent } from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatoFecha } from '@domain';
import { Calendar, MeetButton } from '@components';

import { MAX_PERSONAS } from '../../PlannerScreen.constants';
import type { PlannerStepProps } from '../../PlannerScreen.interfaces';

import {
  Actions,
  AvatarDot,
  Avatars,
  CalendarCard,
  DateBox,
  DateBoxLabel,
  DateBoxValue,
  DateRow,
  Field,
  InfoBox,
  InfoIcon,
  InfoText,
  InfoTitle,
  Label,
  LabelRow,
  Pill,
  SelectInput,
  SelectOption,
  Stack,
  StepperButton,
  StepperControls,
  StepperRow,
  StepperValue,
  Subtitle,
  Title,
  TwoColumns,
} from '../../PlannerScreen.styled';

const toDate = (value: string | null) => (value ? new Date(value) : null);

export const DefineTripStep = ({ planner }: PlannerStepProps) => {
  const { t } = useTranslation();
  const { canContinue, destinos, draft, goNext, noches, setDraft } = planner;

  const range = useMemo(
    () => ({ end: toDate(draft.fechaRegreso), start: toDate(draft.fechaSalida) }),
    [draft.fechaRegreso, draft.fechaSalida]
  );

  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }, []);

  const handleDestino = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setDraft({ atracciones: {}, destinoId: event.target.value || null });
    },
    [setDraft]
  );

  const handleRange = useCallback(
    (next: { end: Date | null; start: Date | null }) => {
      setDraft({
        fechaRegreso: next.end ? next.end.toISOString() : null,
        fechaSalida: next.start ? next.start.toISOString() : null,
      });
    },
    [setDraft]
  );

  const handleLess = useCallback(() => {
    setDraft({ personas: Math.max(1, draft.personas - 1) });
  }, [draft.personas, setDraft]);

  const handleMore = useCallback(() => {
    setDraft({ personas: Math.min(MAX_PERSONAS, draft.personas + 1) });
  }, [draft.personas, setDraft]);

  return (
    <>
      <Title>{t('planner.define.title')}</Title>
      <Subtitle>{t('planner.define.subtitle')}</Subtitle>

      <TwoColumns>
        <Stack>
          <Field>
            <Label>{t('planner.define.destination')}</Label>
            <SelectInput value={draft.destinoId ?? ''} onChange={handleDestino}>
              <SelectOption value=''>{t('planner.define.destinationPlaceholder')}</SelectOption>
              {destinos.map((destino) => (
                <SelectOption key={destino.id} value={destino.id}>
                  {destino.emoji} {destino.ciudad}, {destino.pais}
                </SelectOption>
              ))}
            </SelectInput>
          </Field>

          <Field>
            <LabelRow>
              <Label>{t('planner.define.dates')}</Label>
              {noches > 0 && <Pill>{t('planner.define.nights', { count: noches })}</Pill>}
            </LabelRow>
            <DateRow>
              <DateBox $on={Boolean(range.start)}>
                <DateBoxLabel>{t('planner.define.departure')}</DateBoxLabel>
                <DateBoxValue>
                  {range.start ? formatoFecha(range.start) : t('planner.define.pickDate')}
                </DateBoxValue>
              </DateBox>
              <DateBox $on={Boolean(range.end)}>
                <DateBoxLabel>{t('planner.define.return')}</DateBoxLabel>
                <DateBoxValue>
                  {range.end ? formatoFecha(range.end) : t('planner.define.pickDate')}
                </DateBoxValue>
              </DateBox>
            </DateRow>
          </Field>

          <Field>
            <Label>{t('planner.define.people')}</Label>
            <StepperRow>
              <Avatars>
                {Array.from({ length: draft.personas }, (_unused, index) => index).map(
                  (index) => (
                    <AvatarDot $index={index} key={index}>
                      {index === 0 ? t('planner.define.you') : t('planner.define.companion')}
                    </AvatarDot>
                  )
                )}
              </Avatars>
              <StepperControls>
                <StepperButton
                  aria-label={t('planner.define.less')}
                  disabled={draft.personas <= 1}
                  type='button'
                  onClick={handleLess}
                >
                  –
                </StepperButton>
                <StepperValue>{draft.personas}</StepperValue>
                <StepperButton
                  $filled
                  aria-label={t('planner.define.more')}
                  disabled={draft.personas >= MAX_PERSONAS}
                  type='button'
                  onClick={handleMore}
                >
                  +
                </StepperButton>
              </StepperControls>
            </StepperRow>
          </Field>
        </Stack>

        <CalendarCard>
          <Calendar minDate={minDate} mode='range' rangeValue={range} onRangeChange={handleRange} />
        </CalendarCard>
      </TwoColumns>

      <InfoBox $tone='warn'>
        <InfoIcon $tone='warn'>!</InfoIcon>
        <Stack>
          <InfoTitle>{t('planner.define.tipTitle')}</InfoTitle>
          <InfoText>{t('planner.define.tipText')}</InfoText>
        </Stack>
      </InfoBox>

      <Actions>
        <MeetButton disabled={!canContinue} variant='primary' onClick={goNext}>
          {t('planner.common.continue')}
        </MeetButton>
      </Actions>
    </>
  );
};
