/**
 * DashboardScreen
 *
 * Portada del usuario autenticado: saludo y estado de su cajita de ahorro.
 *
 * Cuando hay un viaje en AHORRANDO muestra el avance real; si no, conserva el
 * estado vacío con su llamada a planear. Toda la aritmética llega resuelta
 * desde `GET /api/travel/cajita`.
 */

'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { PageWrapper, ScreenContainer } from '@components';
import { ROUTES } from '@constants';
import { useAuth, useCajita } from '@hooks';

import {
  CajitaAportes,
  CajitaEmptyState,
  CajitaHero,
  CajitaProximoAporte,
  CajitaStats,
  RegistrarAporteModal,
} from './components';
import { DASHBOARD_UI_TEXT } from './DashboardScreen.constants';
import type { DashboardScreenProps } from './DashboardScreen.interfaces';
import { obtenerDestino } from './DashboardScreen.helpers';

import {
  CajitaGrid,
  ContentWrapper,
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
  const { aporteEnCurso, borradorId, cajita, registrarAporte } = useCajita();
  const [modalAbierto, setModalAbierto] = useState(false);

  const handlePlanTrip = useCallback(() => {
    router.push(ROUTES.PUBLIC.HOME);
  }, [router]);

  const handleAbrirModal = useCallback(() => setModalAbierto(true), []);
  const handleCerrarModal = useCallback(() => setModalAbierto(false), []);

  const handleRegistrar = useCallback(
    async (monto: number, nota?: string) => {
      const resultado = await registrarAporte(monto, nota);

      if (resultado.success) {
        setModalAbierto(false);
      }
    },
    [registrarAporte]
  );

  const subtitulo = cajita
    ? `${DASHBOARD_UI_TEXT.WELCOME.SUBTITLE_WITH_TRIP} ${obtenerDestino(cajita)}.`
    : DASHBOARD_UI_TEXT.WELCOME.SUBTITLE;

  return (
    <PageWrapper>
      <ScreenContainer>
        <ContentWrapper>
          <WelcomeSection>
            <WelcomeTitle>
              {DASHBOARD_UI_TEXT.WELCOME.GREETING}, {user?.firstName ?? ''}!
            </WelcomeTitle>
            <WelcomeSubtitle>{subtitulo}</WelcomeSubtitle>
          </WelcomeSection>

          <StatsSection>
            <SectionTitle>{DASHBOARD_UI_TEXT.SAVINGS.TITLE}</SectionTitle>

            {cajita ? (
              <>
                <CajitaGrid>
                  <CajitaHero cajita={cajita} />
                  <CajitaProximoAporte
                    cajita={cajita}
                    registrando={aporteEnCurso}
                    onRegistrar={handleAbrirModal}
                  />
                </CajitaGrid>
                <CajitaStats cajita={cajita} />
                <CajitaAportes cajita={cajita} />
              </>
            ) : (
              <CajitaEmptyState borradorId={borradorId} onPlanear={handlePlanTrip} />
            )}
          </StatsSection>
        </ContentWrapper>
      </ScreenContainer>

      {cajita && (
        <RegistrarAporteModal
          isOpen={modalAbierto}
          registrando={aporteEnCurso}
          sugerido={cajita.plan.aportacion}
          onClose={handleCerrarModal}
          onSubmit={handleRegistrar}
        />
      )}
    </PageWrapper>
  );
};
