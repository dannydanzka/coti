/**
 * AdminDashboardScreen
 *
 * Portada del panel de administración: saludo y métricas del padrón de usuarios.
 * Al sumar nuevas áreas administrables se agregan aquí sus tarjetas.
 */

'use client';

import { Info, ShieldCheck, UserCog, Users } from 'lucide-react';

import { color } from '@constants';
import { PageWrapper, ScreenContainer } from '@components';
import { useAuth, useDashboardMetrics } from '@hooks';

import type { AdminDashboardScreenProps } from './AdminDashboardScreen.interfaces';
import { UI_TEXT } from './AdminDashboardScreen.constants';

import {
  HeaderSection,
  InfoBanner,
  InfoBannerContent,
  InfoBannerIcon,
  InfoBannerText,
  InfoBannerTitle,
  MetricCard,
  MetricIcon,
  MetricLabel,
  MetricLoader,
  MetricsGrid,
  MetricsSection,
  MetricValue,
  SectionTitle,
  WelcomeText,
  WelcomeTitle,
} from './AdminDashboardScreen.styled';

export const AdminDashboardScreen = ({ className }: AdminDashboardScreenProps) => {
  void className;

  const { user } = useAuth();
  const { loading, metrics } = useDashboardMetrics();

  const renderWelcome = () => (
    <HeaderSection>
      <WelcomeTitle>
        {UI_TEXT.WELCOME.GREETING}, {user?.firstName ?? 'Admin'}!
      </WelcomeTitle>
      <WelcomeText>{UI_TEXT.WELCOME.SUBTITLE}</WelcomeText>
    </HeaderSection>
  );

  const renderMetrics = () => (
    <MetricsSection>
      <SectionTitle>{UI_TEXT.METRICS.TITLE}</SectionTitle>
      <MetricsGrid>
        <MetricCard $color={color.primary500}>
          <MetricIcon $color={color.primary500}>
            <Users size={20} />
          </MetricIcon>
          <MetricValue>
            {loading ? <MetricLoader $color={color.primary500} /> : metrics.totalUsers}
          </MetricValue>
          <MetricLabel>{UI_TEXT.METRICS.TOTAL_USERS}</MetricLabel>
        </MetricCard>
        <MetricCard $color={color.info}>
          <MetricIcon $color={color.info}>
            <Users size={20} />
          </MetricIcon>
          <MetricValue>
            {loading ? <MetricLoader $color={color.info} /> : metrics.participants}
          </MetricValue>
          <MetricLabel>{UI_TEXT.METRICS.PARTICIPANTS}</MetricLabel>
        </MetricCard>
        <MetricCard $color={color.warning}>
          <MetricIcon $color={color.warning}>
            <UserCog size={20} />
          </MetricIcon>
          <MetricValue>
            {loading ? <MetricLoader $color={color.warning} /> : metrics.admins}
          </MetricValue>
          <MetricLabel>{UI_TEXT.METRICS.ADMINS}</MetricLabel>
        </MetricCard>
        <MetricCard $color={color.success}>
          <MetricIcon $color={color.success}>
            <ShieldCheck size={20} />
          </MetricIcon>
          <MetricValue>
            {loading ? <MetricLoader $color={color.success} /> : metrics.owners}
          </MetricValue>
          <MetricLabel>{UI_TEXT.METRICS.OWNERS}</MetricLabel>
        </MetricCard>
      </MetricsGrid>
    </MetricsSection>
  );

  const renderInfoBanner = () => (
    <InfoBanner>
      <InfoBannerIcon>
        <Info size={20} />
      </InfoBannerIcon>
      <InfoBannerContent>
        <InfoBannerTitle>{UI_TEXT.INFO_BANNER.TITLE}</InfoBannerTitle>
        <InfoBannerText>{UI_TEXT.INFO_BANNER.TEXT}</InfoBannerText>
      </InfoBannerContent>
    </InfoBanner>
  );

  return (
    <PageWrapper>
      <ScreenContainer>
        {renderWelcome()}
        {renderMetrics()}
        {renderInfoBanner()}
      </ScreenContainer>
    </PageWrapper>
  );
};
