/**
 * DashboardScreen
 *
 * Portada del usuario autenticado: saludo y estado de su cajita de ahorro.
 *
 * Hoy muestra el estado vacío porque todavía no existen los endpoints del
 * dominio de viajes (`Viaje`, `PlanDeAhorro`, `RegistroDeAhorro` ya están en el
 * esquema). Al construirlos, el estado vacío se reemplaza por el avance real.
 */

'use client';

import { PiggyBank } from 'lucide-react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { AUTHENTICATED_ROUTES } from '@constants';
import { formatoMXN } from '@domain';
import { PageWrapper, ScreenContainer } from '@components';
import { useAuth } from '@hooks';
import { useCajita } from '@apps/public/hooks';

import { DASHBOARD_UI_TEXT } from './DashboardScreen.constants';
import type { DashboardScreenProps } from './DashboardScreen.interfaces';

import {
  ContentWrapper,
  ExploreCTAButton,
  ExploreCTACard,
  ExploreCTAContent,
  ExploreCTAHighlight,
  ExploreCTAIcon,
  ExploreCTAText,
  ExploreCTATitle,
  SectionTitle,
  StatsSection,
  WelcomeSection,
  WelcomeSubtitle,
  WelcomeTitle,
} from './DashboardScreen.styled';

export const DashboardScreen = ({ className }: DashboardScreenProps) => {
  void className;

  const { user } = useAuth();
  const router = useRouter();

  const { isLoaded, metrics, viaje } = useCajita();

  const handlePlanTrip = useCallback(() => {
    router.push(AUTHENTICATED_ROUTES.PLANNER);
  }, [router]);

  const handleOpenBox = useCallback(() => {
    router.push(AUTHENTICATED_ROUTES.CAJITA);
  }, [router]);

  const hasBox = Boolean(viaje?.plan && metrics);

  return (
    <PageWrapper>
      <ScreenContainer>
        <ContentWrapper>
          <WelcomeSection>
            <WelcomeTitle>
              {DASHBOARD_UI_TEXT.WELCOME.GREETING}, {user?.firstName ?? ''}!
            </WelcomeTitle>
            <WelcomeSubtitle>{DASHBOARD_UI_TEXT.WELCOME.SUBTITLE}</WelcomeSubtitle>
          </WelcomeSection>

          <StatsSection>
            <SectionTitle>{DASHBOARD_UI_TEXT.SAVINGS.TITLE}</SectionTitle>
            {isLoaded && hasBox && viaje && metrics ? (
              <ExploreCTACard>
                <ExploreCTAIcon>
                  <PiggyBank size={32} />
                </ExploreCTAIcon>
                <ExploreCTAContent>
                  <ExploreCTATitle>
                    {viaje.destino.emoji} {viaje.destino.ciudad} · {metrics.porcentaje}%
                  </ExploreCTATitle>
                  <ExploreCTAText>
                    {DASHBOARD_UI_TEXT.ACTIVE_BOX.SAVED} {formatoMXN(metrics.ahorrado)}{' '}
                    {DASHBOARD_UI_TEXT.ACTIVE_BOX.OF} {formatoMXN(metrics.meta)}
                  </ExploreCTAText>
                  <ExploreCTAHighlight>
                    {formatoMXN(metrics.faltante)} {DASHBOARD_UI_TEXT.ACTIVE_BOX.MISSING}
                  </ExploreCTAHighlight>
                  <ExploreCTAButton type='button' onClick={handleOpenBox}>
                    {DASHBOARD_UI_TEXT.ACTIVE_BOX.BUTTON}
                  </ExploreCTAButton>
                </ExploreCTAContent>
              </ExploreCTACard>
            ) : (
              <ExploreCTACard>
                <ExploreCTAIcon>
                  <PiggyBank size={32} />
                </ExploreCTAIcon>
                <ExploreCTAContent>
                  <ExploreCTATitle>{DASHBOARD_UI_TEXT.EMPTY_BOX.TITLE}</ExploreCTATitle>
                  <ExploreCTAText>{DASHBOARD_UI_TEXT.EMPTY_BOX.SUBTITLE}</ExploreCTAText>
                  <ExploreCTAHighlight>{DASHBOARD_UI_TEXT.EMPTY_BOX.HIGHLIGHT}</ExploreCTAHighlight>
                  <ExploreCTAButton type='button' onClick={handlePlanTrip}>
                    {DASHBOARD_UI_TEXT.EMPTY_BOX.BUTTON}
                  </ExploreCTAButton>
                </ExploreCTAContent>
              </ExploreCTACard>
            )}
          </StatsSection>
        </ContentWrapper>
      </ScreenContainer>
    </PageWrapper>
  );
};
