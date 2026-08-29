/**
 * HomeScreen Component
 *
 * Entrada pública del producto. El flujo real (definir viaje → quiz →
 * proyección → plan de ahorro → cajita) se construye sobre este esqueleto.
 */

'use client';

import { useTranslation } from 'react-i18next';

import { HomeSubtitle, HomeTitle, HomeWrapper } from './HomeScreen.styled';

export const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <HomeWrapper>
      <HomeTitle>{t('home.title', 'Travel Savings App')}</HomeTitle>
      <HomeSubtitle>{t('home.subtitle', 'Esta herramienta proyecta, no reserva.')}</HomeSubtitle>
    </HomeWrapper>
  );
};
