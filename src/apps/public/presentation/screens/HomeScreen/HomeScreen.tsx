/**
 * HomeScreen Component
 *
 * Portada pública de Coti. Cuenta el ciclo del producto con la narrativa de
 * marca — soñar el destino → ahorrar en la cajita → llegar — enseña el producto
 * real (tres de las ocho pantallas del flujo) y deja claro el principio rector:
 * Coti proyecta, no reserva.
 *
 * El flujo real entra por crear cuenta; los CTAs llevan ahí o al dashboard si
 * ya hay sesión.
 */

'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { AUTHENTICATED_ROUTES, BRAND_ASSETS, HEADER_ROUTES } from '@constants';
import { HOME_SECTION_IDS } from '@apps/public/constants';
import { MeetButton } from '@components';
import { useAuth } from '@hooks';

import {
  FLOW_STEPS,
  HERO_STATS,
  PRINCIPLES,
  STORY_STEPS,
  VOICE_EXAMPLES,
} from './HomeScreen.constants';
import { ProductPreview } from './components/ProductPreview';

import {
  ClosingCard,
  ClosingContent,
  ClosingMascot,
  ClosingTitle,
  Eyebrow,
  FlowList,
  FlowListItem,
  FlowNumber,
  FlowText,
  HeroActions,
  HeroBackdrop,
  HeroContent,
  HeroNote,
  HeroSection,
  HeroStat,
  HeroStatLabel,
  HeroStats,
  HeroStatValue,
  HeroSubtitle,
  HeroTitle,
  HeroTitleAccent,
  HomeWrapper,
  PhoneShowcase,
  PrincipleCard,
  PrinciplesGrid,
  PrincipleText,
  PrincipleTitle,
  ProductCopy,
  ProductSection,
  ProjectionCard,
  ProjectionContent,
  ProjectionSection,
  ProjectionText,
  ProjectionTitle,
  SectionHeader,
  SectionTitle,
  ShowcasePhone,
  StepCard,
  StepImage,
  StepNumber,
  StepsGrid,
  StepText,
  StepTitle,
  StorySection,
  VoiceCard,
  VoiceGrid,
  VoiceQuote,
  VoiceSection,
  VoiceTag,
} from './HomeScreen.styled';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleStart = useCallback(() => {
    router.push(isAuthenticated ? AUTHENTICATED_ROUTES.DASHBOARD : HEADER_ROUTES.ENROLLMENT);
  }, [isAuthenticated, router]);

  const handleLogin = useCallback(() => {
    router.push(HEADER_ROUTES.LOGIN);
  }, [router]);

  const primaryCtaLabel = isAuthenticated ? t('home.hero.ctaDashboard') : t('home.hero.ctaPrimary');

  const renderHero = () => (
    <HeroSection>
      <HeroBackdrop alt='' src={BRAND_ASSETS.HERO} />
      <HeroContent>
        <Eyebrow>{t('home.hero.eyebrow')}</Eyebrow>
        <HeroTitle>
          {t('home.hero.titleLead')} <HeroTitleAccent>{t('home.hero.titleAccent')}</HeroTitleAccent>
        </HeroTitle>
        <HeroSubtitle>{t('home.hero.subtitle')}</HeroSubtitle>
        <HeroActions>
          <MeetButton variant='primary' onClick={handleStart}>
            {primaryCtaLabel}
          </MeetButton>
          {!isAuthenticated && (
            <MeetButton variant='outline' onClick={handleLogin}>
              {t('home.hero.ctaSecondary')}
            </MeetButton>
          )}
        </HeroActions>
        <HeroNote>{t('home.hero.note')}</HeroNote>
      </HeroContent>
    </HeroSection>
  );

  const renderStats = () => (
    <HeroStats>
      {HERO_STATS.map((stat) => (
        <HeroStat key={stat.key}>
          <HeroStatValue>{stat.value}</HeroStatValue>
          <HeroStatLabel>{t(`home.hero.stats.${stat.key}`)}</HeroStatLabel>
        </HeroStat>
      ))}
    </HeroStats>
  );

  const renderStory = () => (
    <StorySection id={HOME_SECTION_IDS.STORY}>
      <SectionHeader>
        <Eyebrow>{t('home.story.eyebrow')}</Eyebrow>
        <SectionTitle>{t('home.story.title')}</SectionTitle>
      </SectionHeader>
      <StepsGrid>
        {STORY_STEPS.map((step, index) => (
          <StepCard key={step.key}>
            <StepImage alt='' src={step.image} />
            <StepNumber>{index + 1}</StepNumber>
            <StepTitle>{t(`home.story.steps.${step.key}.title`)}</StepTitle>
            <StepText>{t(`home.story.steps.${step.key}.text`)}</StepText>
          </StepCard>
        ))}
      </StepsGrid>
    </StorySection>
  );

  const renderProduct = () => (
    <ProductSection>
      <ProductCopy>
        <Eyebrow>{t('home.product.eyebrow')}</Eyebrow>
        <SectionTitle $align='left'>{t('home.product.title')}</SectionTitle>
        <HeroSubtitle>{t('home.product.text')}</HeroSubtitle>
        <FlowList>
          {FLOW_STEPS.map((step, index) => (
            <FlowListItem key={step}>
              <FlowNumber>{index + 1}</FlowNumber>
              <FlowText>{t(`home.product.steps.${step}`)}</FlowText>
            </FlowListItem>
          ))}
        </FlowList>
        <MeetButton variant='primary' onClick={handleStart}>
          {primaryCtaLabel}
        </MeetButton>
      </ProductCopy>
      <PhoneShowcase>
        <ShowcasePhone $offset='down'>
          <ProductPreview
            caption={t('home.product.captions.projection')}
            screen='projection'
            tilt='left'
          />
        </ShowcasePhone>
        <ShowcasePhone $offset='up'>
          <ProductPreview caption={t('home.product.captions.box')} screen='cajita' tilt='right' />
        </ShowcasePhone>
      </PhoneShowcase>
    </ProductSection>
  );

  const renderProjection = () => (
    <ProjectionSection id={HOME_SECTION_IDS.PROJECTION}>
      <ProjectionCard>
        <ProjectionContent>
          <Eyebrow $onDark>{t('home.projection.eyebrow')}</Eyebrow>
          <ProjectionTitle>{t('home.projection.title')}</ProjectionTitle>
          <ProjectionText>{t('home.projection.text')}</ProjectionText>
          <MeetButton variant='primary' onClick={handleStart}>
            {t('home.projection.cta')}
          </MeetButton>
        </ProjectionContent>
      </ProjectionCard>
      <PrinciplesGrid>
        {PRINCIPLES.map((principle) => (
          <PrincipleCard key={principle}>
            <PrincipleTitle>{t(`home.principles.${principle}.title`)}</PrincipleTitle>
            <PrincipleText>{t(`home.principles.${principle}.text`)}</PrincipleText>
          </PrincipleCard>
        ))}
      </PrinciplesGrid>
    </ProjectionSection>
  );

  const renderVoice = () => (
    <VoiceSection>
      <SectionHeader>
        <Eyebrow>{t('home.voice.eyebrow')}</Eyebrow>
        <SectionTitle>{t('home.voice.title')}</SectionTitle>
      </SectionHeader>
      <VoiceGrid>
        {VOICE_EXAMPLES.map((example) => (
          <VoiceCard $tone={example} key={example}>
            <VoiceTag $tone={example}>{t(`home.voice.${example}.tag`)}</VoiceTag>
            <VoiceQuote>{t(`home.voice.${example}.quote`)}</VoiceQuote>
          </VoiceCard>
        ))}
      </VoiceGrid>
    </VoiceSection>
  );

  const renderClosing = () => (
    <ClosingCard>
      <ClosingContent>
        <ClosingTitle>{t('home.closing.title')}</ClosingTitle>
        <HeroSubtitle>{t('home.closing.text')}</HeroSubtitle>
        <HeroActions>
          <MeetButton variant='primary' onClick={handleStart}>
            {primaryCtaLabel}
          </MeetButton>
        </HeroActions>
      </ClosingContent>
      <ClosingMascot alt='' src={BRAND_ASSETS.SCENES.AHORRAR} />
    </ClosingCard>
  );

  return (
    <HomeWrapper>
      {renderHero()}
      {renderStats()}
      {renderStory()}
      {renderProduct()}
      {renderProjection()}
      {renderVoice()}
      {renderClosing()}
    </HomeWrapper>
  );
};
