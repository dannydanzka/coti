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

import { PageWrapper, ScreenContainer } from '@components';
import { ROUTES } from '@constants';
import { useAuth } from '@hooks';

import type { DashboardScreenProps } from './DashboardScreen.interfaces';
import { DASHBOARD_UI_TEXT } from './DashboardScreen.constants';

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

  const handlePlanTrip = useCallback(() => {
    router.push(ROUTES.PUBLIC.HOME);
  }, [router]);

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
            <ExploreCTACard>
              <ExploreCTAIcon>
                <PiggyBank size={32} />
              </ExploreCTAIcon>
              <ExploreCTAContent>
                <ExploreCTATitle>{DASHBOARD_UI_TEXT.EMPTY_BOX.TITLE}</ExploreCTATitle>
                <ExploreCTAText>{DASHBOARD_UI_TEXT.EMPTY_BOX.SUBTITLE}</ExploreCTAText>
                <ExploreCTAHighlight>{DASHBOARD_UI_TEXT.EMPTY_BOX.HIGHLIGHT}</ExploreCTAHighlight>
                <ExploreCTAButton onClick={handlePlanTrip} type='button'>
                  {DASHBOARD_UI_TEXT.EMPTY_BOX.BUTTON}
                </ExploreCTAButton>
              </ExploreCTAContent>
            </ExploreCTACard>
          </StatsSection>
        </ContentWrapper>
      </ScreenContainer>
    </PageWrapper>
  );
};
