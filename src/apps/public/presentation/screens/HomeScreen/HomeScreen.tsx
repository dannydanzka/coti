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
      <HomeTitle>{t('home.title', 'Proyecta tu viaje. Ahorra con Coti.')}</HomeTitle>
      <HomeSubtitle>
        {t(
          'home.subtitle',
          'Dinos a dónde quieres ir y cuánto puedes apartar. Coti te dice en cuánto tiempo llegas — y te acompaña hasta lograrlo.'
        )}
      </HomeSubtitle>
    </HomeWrapper>
  );
};
