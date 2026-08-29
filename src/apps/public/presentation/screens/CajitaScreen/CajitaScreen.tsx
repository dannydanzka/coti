/**
 * CajitaScreen — Paso 8: Mi cajita de ahorro.
 *
 * Avance hacia la meta, hitos, próximo aporte, registro de aportes y tira de
 * los últimos seis meses. Sin viaje activo muestra el estado vacío que manda
 * al wizard.
 */

'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { Check, PartyPopper } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { AUTHENTICATED_ROUTES, BRAND_ASSETS, BRAND_UI_TEXT } from '@constants';
import { formatoFecha, formatoMXN } from '@domain';
import { MeetButton, PageWrapper, ScreenContainer } from '@components';
import { useAuth } from '@hooks';
import { useCajita } from '@apps/public/hooks';

import { APORTE_RAPIDO_MULTIPLIERS, HITOS } from './CajitaScreen.constants';

import {
  AmountField,
  AmountInput,
  AmountPrefix,
  AporteForm,
  BigAmount,
  BigAmountOf,
  CardTop,
  Celebrate,
  CityTag,
  Column,
  EmptyCard,
  EmptyMascot,
  EmptyText,
  EmptyTitle,
  Greeting,
  GreetingSub,
  Grid,
  HeaderRow,
  HistoryAmount,
  HistoryItem,
  HistoryList,
  HistoryNote,
  Label,
  Milestone,
  Milestones,
  MonthAmount,
  MonthCell,
  MonthLabel,
  MonthRow,
  MonthsCard,
  NextAmount,
  NextCard,
  NextDate,
  NextLabel,
  NoteInput,
  PercentBadge,
  ProgressCard,
  QuickButton,
  QuickRow,
  Stat,
  StatGrid,
  StatLabel,
  StatValue,
  SubmitButton,
  Track,
  Wrapper,
} from './CajitaScreen.styled';

const monthYear = new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' });

export const CajitaScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { isLoaded, isSaving, metrics, registrarAporte, viaje } = useCajita();
  const [monto, setMonto] = useState<number>(0);
  const [nota, setNota] = useState('');

  const handlePlan = useCallback(() => {
    router.push(AUTHENTICATED_ROUTES.PLANNER);
  }, [router]);

  const handleMonto = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMonto(Math.max(0, Number(event.target.value) || 0));
  }, []);
  const handleNota = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNota(event.target.value.slice(0, 120));
  }, []);
  const createQuick = useCallback((value: number) => () => setMonto(value), []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (monto <= 0) return;
      const ok = await registrarAporte(monto, nota.trim() || undefined);
      if (ok) {
        setMonto(0);
        setNota('');
      }
    },
    [monto, nota, registrarAporte]
  );

  if (!isLoaded) return null;

  if (!viaje?.plan || !metrics) {
    return (
      <PageWrapper>
        <ScreenContainer>
          <Wrapper>
            <EmptyCard>
              <EmptyMascot alt={BRAND_UI_TEXT.MASCOT_ALT} src={BRAND_ASSETS.MASCOT} />
              <EmptyTitle>{t('cajita.empty.title')}</EmptyTitle>
              <EmptyText>{t('cajita.empty.text')}</EmptyText>
              <MeetButton variant='primary' onClick={handlePlan}>
                {t('cajita.empty.cta')}
              </MeetButton>
            </EmptyCard>
          </Wrapper>
        </ScreenContainer>
      </PageWrapper>
    );
  }

  const { plan } = viaje;
  const salida = viaje.fechaSalida ? new Date(viaje.fechaSalida) : new Date(plan.fechaObjetivo);
  const historial = [...plan.registros].reverse().slice(0, 6);

  return (
    <PageWrapper>
      <ScreenContainer>
        <Wrapper>
          <HeaderRow>
            <Column>
              <Greeting>{t('cajita.greeting', { name: user?.firstName ?? '' })}</Greeting>
              <GreetingSub>
                {t('cajita.monthsLeft', {
                  city: viaje.destino.ciudad,
                  count: metrics.mesesRestantes,
                })}
              </GreetingSub>
            </Column>
          </HeaderRow>

          <Grid>
            <Column>
              <ProgressCard>
                <CardTop>
                  <CityTag>
                    {viaje.destino.emoji} {viaje.destino.ciudad} · {monthYear.format(salida)}
                  </CityTag>
                  <PercentBadge>{metrics.porcentaje}%</PercentBadge>
                </CardTop>
                <Label>{t('cajita.saved')}</Label>
                <BigAmount>
                  {formatoMXN(metrics.ahorrado)}
                  <BigAmountOf>{t('cajita.of', { amount: formatoMXN(metrics.meta) })}</BigAmountOf>
                </BigAmount>
                <Track $percent={metrics.porcentaje} />
                <Milestones>
                  {HITOS.map((hito) => (
                    <Milestone $reached={metrics.porcentaje >= hito} key={hito}>
                      {metrics.porcentaje >= hito && <Check size={12} />}
                      {hito}%
                    </Milestone>
                  ))}
                </Milestones>
                {metrics.hito && (
                  <Celebrate>
                    <PartyPopper size={18} />
                    {t(`cajita.milestone.${metrics.hito}`, { percent: metrics.porcentaje })}
                  </Celebrate>
                )}
              </ProgressCard>

              <StatGrid>
                <Stat>
                  <StatValue>{formatoMXN(metrics.faltante)}</StatValue>
                  <StatLabel>{t('cajita.stats.missing')}</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>{metrics.mesesRestantes}</StatValue>
                  <StatLabel>{t('cajita.stats.months')}</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>{metrics.aportes}</StatValue>
                  <StatLabel>{t('cajita.stats.entries')}</StatLabel>
                </Stat>
              </StatGrid>

              <MonthsCard>
                <Label>{t('cajita.entries')}</Label>
                <MonthRow>
                  {metrics.meses.map((month) => (
                    <MonthCell $on={month.monto > 0} key={month.key}>
                      <MonthLabel>{month.label}</MonthLabel>
                      <MonthAmount>{month.monto > 0 ? formatoMXN(month.monto) : '—'}</MonthAmount>
                    </MonthCell>
                  ))}
                </MonthRow>
                {historial.length > 0 && (
                  <HistoryList>
                    {historial.map((registro) => (
                      <HistoryItem key={registro.id}>
                        <HistoryNote>
                          {formatoFecha(new Date(registro.fecha))}
                          {registro.nota ? ` · ${registro.nota}` : ''}
                        </HistoryNote>
                        <HistoryAmount>{formatoMXN(registro.monto)}</HistoryAmount>
                      </HistoryItem>
                    ))}
                  </HistoryList>
                )}
              </MonthsCard>
            </Column>

            <Column>
              <NextCard>
                <NextLabel>{t('cajita.next.label')}</NextLabel>
                <NextDate>{formatoFecha(metrics.proximoAporte)}</NextDate>
                <NextAmount>{formatoMXN(plan.aportacion)}</NextAmount>
                <AporteForm onSubmit={handleSubmit}>
                  <NextLabel>{t('cajita.next.register')}</NextLabel>
                  <QuickRow>
                    {APORTE_RAPIDO_MULTIPLIERS.map((multiplier) => {
                      const value = Math.round(plan.aportacion * multiplier);
                      return (
                        <QuickButton
                          $on={monto === value}
                          key={multiplier}
                          type='button'
                          onClick={createQuick(value)}
                        >
                          {formatoMXN(value)}
                        </QuickButton>
                      );
                    })}
                  </QuickRow>
                  <AmountField>
                    <AmountPrefix>$</AmountPrefix>
                    <AmountInput
                      inputMode='numeric'
                      min={0}
                      placeholder='0'
                      type='number'
                      value={monto || ''}
                      onChange={handleMonto}
                    />
                  </AmountField>
                  <NoteInput
                    placeholder={t('cajita.next.notePlaceholder')}
                    type='text'
                    value={nota}
                    onChange={handleNota}
                  />
                  <SubmitButton disabled={isSaving || monto <= 0} type='submit'>
                    {isSaving ? t('cajita.next.saving') : t('cajita.next.cta')}
                  </SubmitButton>
                </AporteForm>
              </NextCard>
            </Column>
          </Grid>
        </Wrapper>
      </ScreenContainer>
    </PageWrapper>
  );
};
