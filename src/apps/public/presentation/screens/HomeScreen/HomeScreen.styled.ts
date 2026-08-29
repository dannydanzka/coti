/**
 * HomeScreen Styled Components
 *
 * Coti landing: crema de fondo, tarjetas arena, acentos coral y verde bosque.
 * Formas redondeadas, sin gradientes brillantes (ver assets/branding/README.md).
 * Entradas suaves con `prefers-reduced-motion` respetado.
 */

'use client';

import styled, { css, keyframes } from 'styled-components';

import { brandColor, color, elevation, layout, shape, spacing, typography } from '@constants';

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(${spacing.md});
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const enter = (delay: string) => css`
  animation: ${riseIn} 0.7s ease-out ${delay} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const HomeWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${spacing['7xl']};
  margin: 0 auto;
  max-width: ${layout.sectionMaxWidth};
  padding: ${spacing['2xl']} ${spacing.lg} ${spacing['4xl']};
  width: 100%;

  @media (max-width: ${layout.breakpoint.md}) {
    gap: ${spacing['4xl']};
    padding: ${spacing.lg} ${spacing.md} ${spacing['2xl']};
  }
`;

export const Eyebrow = styled.span<{ $onDark?: boolean }>`
  color: ${({ $onDark }) => ($onDark ? brandColor.cotiMustard : brandColor.cotiCoral)};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

/* ---------- Hero: paisaje completo, título centrado, Coti a la derecha ---------- */

export const HeroSection = styled.section`
  /* Full-bleed: rompe el contenedor de 1200px y se pega al header. */
  align-items: center;

  /* 16/9 en vez de 3/2: el 3/2 daba 860px de alto y sobraba aire arriba. */
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  margin: -${spacing['2xl']} calc(50% - 50vw) 0;
  max-height: 660px;
  min-height: ${layout.heroMinHeight};
  overflow: hidden;
  padding: ${spacing.lg} 34% ${spacing['5xl']} ${spacing.lg};
  position: relative;
  text-align: center;
  width: 100vw;

  @media (max-width: ${layout.breakpoint.lg}) {
    padding-right: 30%;
  }

  @media (max-width: ${layout.breakpoint.md}) {
    aspect-ratio: auto;
    margin-top: -${spacing.lg};
    min-height: 620px;
    padding: ${spacing.xl} ${spacing.md} 55%;
  }
`;

export const HeroBackdrop = styled.img`
  height: 100%;
  inset: 0;
  object-fit: cover;
  object-position: center;
  position: absolute;
  width: 100%;
  z-index: ${layout.zIndex.base};

  @media (max-width: ${layout.breakpoint.md}) {
    object-position: 62% bottom;
  }
`;

export const HeroContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  max-width: 760px;
  position: relative;
  z-index: 1;
  ${enter('0s')}
`;

export const HeroTitle = styled.h1`
  color: ${brandColor.cotiForest};
  font-family: ${typography.family.rounded};
  font-size: ${typography.size['8xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.normal};
  line-height: 1.05;
  margin: 0;

  @media (max-width: ${layout.breakpoint.lg}) {
    font-size: ${typography.size['7xl']};
  }

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size['6xl']};
  }
`;

export const HeroTitleAccent = styled.span`
  color: ${brandColor.cotiCoral};
  display: block;
`;

export const HeroSubtitle = styled.p`
  color: ${color.textSecondary};
  font-size: ${typography.size.lg};
  line-height: ${typography.leading.relaxed};
  margin: 0;
  max-width: 540px;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  justify-content: center;
  margin-top: ${spacing.xs};
`;

export const HeroNote = styled.p`
  color: ${color.textTertiary};
  font-size: ${typography.size.sm};
  margin: 0;
  max-width: 460px;
`;

export const HeroStats = styled.dl`
  display: flex;
  gap: ${spacing['2xl']};
  justify-content: center;
  margin: -${spacing['2xl']} 0 0;

  @media (max-width: ${layout.breakpoint.sm}) {
    gap: ${spacing.md};
  }
`;

export const HeroStat = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  text-align: center;
`;

export const HeroStatValue = styled.dt`
  color: ${brandColor.cotiForest};
  font-family: ${typography.family.rounded};
  font-size: ${typography.size['4xl']};
  font-weight: ${typography.weight.bold};
  line-height: 1;
`;

export const HeroStatLabel = styled.dd`
  color: ${color.textTertiary};
  font-size: ${typography.size.sm};
  margin: 0;
`;

/* ---------- Story (soñar → ahorrar → llegar) ---------- */

export const StorySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
  scroll-margin-top: ${spacing['6xl']};
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  text-align: center;
`;

export const SectionTitle = styled.h2<{ $align?: 'center' | 'left' }>`
  color: ${brandColor.cotiForest};
  font-family: ${typography.family.display};
  font-size: ${typography.size['5xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
  line-height: ${typography.leading.tight};
  margin: ${({ $align }) => ($align === 'left' ? '0' : '0 auto')};
  max-width: 720px;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size['3xl']};
  }
`;

export const StepsGrid = styled.div`
  display: grid;
  gap: ${spacing.lg};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${layout.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

export const StepCard = styled.article`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape['2xl']};
  box-shadow: ${elevation.sm};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  overflow: hidden;
  padding-bottom: ${spacing.lg};
  position: relative;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    box-shadow: ${elevation.md};
    transform: translateY(-4px);
  }
`;

export const StepImage = styled.img`
  aspect-ratio: 4 / 3;
  object-fit: cover;
  width: 100%;
`;

export const StepNumber = styled.span`
  align-items: center;
  background: ${brandColor.cotiCoral};
  border-radius: ${shape.full};
  color: ${color.white};
  display: inline-flex;
  font-family: ${typography.family.display};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.bold};
  height: ${spacing.lg};
  justify-content: center;
  left: ${spacing.md};
  position: absolute;
  top: ${spacing.md};
  width: ${spacing.lg};
`;

export const StepTitle = styled.h3`
  color: ${brandColor.cotiForest};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.bold};
  margin: ${spacing.sm} ${spacing.md} 0;
`;

export const StepText = styled.p`
  color: ${color.textSecondary};
  font-size: ${typography.size.base};
  line-height: ${typography.leading.relaxed};
  margin: 0 ${spacing.md};
`;

/* ---------- Producto: las pantallas del flujo ---------- */

export const ProductSection = styled.section`
  align-items: center;
  display: grid;
  gap: ${spacing['2xl']};
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);

  @media (max-width: ${layout.breakpoint.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const ProductCopy = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const FlowList = styled.ol`
  display: grid;
  gap: ${spacing.xs} ${spacing.md};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  list-style: none;
  margin: 0 0 ${spacing.xs};
  padding: 0;
  width: 100%;

  @media (max-width: ${layout.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FlowListItem = styled.li`
  align-items: center;
  display: flex;
  gap: ${spacing.xs};
  margin: 0;
`;

export const FlowNumber = styled.span`
  align-items: center;
  background: ${color.backgroundAlt};
  border-radius: ${shape.full};
  color: ${brandColor.cotiForest};
  display: inline-flex;
  flex-shrink: 0;
  font-family: ${typography.family.display};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.bold};
  height: ${spacing.md};
  justify-content: center;
  width: ${spacing.md};
`;

export const FlowText = styled.span`
  color: ${color.textPrimary};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
`;

export const PhoneShowcase = styled.div`
  align-items: center;
  display: grid;
  gap: ${spacing.md};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: ${spacing.xl} ${spacing.md};
  position: relative;

  @media (max-width: ${layout.breakpoint.sm}) {
    gap: ${spacing.md};
    padding: ${spacing.md} ${spacing.xs};
  }

  &::before {
    background: ${color.backgroundAlt};
    border-radius: ${shape['2xl']};
    content: '';
    inset: 0;
    position: absolute;
    z-index: ${layout.zIndex.base};
  }
`;

export const ShowcasePhone = styled.div<{ $offset: 'down' | 'up' }>`
  max-width: 290px;
  position: relative;
  transform: translateY(${({ $offset }) => ($offset === 'down' ? spacing.lg : `-${spacing.lg}`)});
  width: 100%;
  z-index: 1;

  @media (max-width: ${layout.breakpoint.sm}) {
    transform: none;
  }
`;

/* ---------- Projection + principios ---------- */

export const ProjectionSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  scroll-margin-top: ${spacing['6xl']};
`;

export const ProjectionCard = styled.div`
  background: ${brandColor.cotiForest};
  border-radius: ${shape['2xl']};
  color: ${color.white};
  overflow: hidden;
  padding: ${spacing['3xl']} ${spacing['2xl']};
  position: relative;

  @media (max-width: ${layout.breakpoint.md}) {
    padding: ${spacing.lg};
  }

  &::after {
    background: ${color.secondary500};
    border-radius: ${shape.full};
    content: '';
    height: 420px;
    opacity: 0.5;
    position: absolute;
    right: -120px;
    top: -160px;
    width: 420px;
  }
`;

export const ProjectionContent = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  max-width: 680px;
  position: relative;
  z-index: 1;
`;

export const ProjectionTitle = styled.h2`
  color: ${color.white};
  font-family: ${typography.family.display};
  font-size: ${typography.size['5xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
  line-height: ${typography.leading.tight};
  margin: 0;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size['3xl']};
  }
`;

export const ProjectionText = styled.p`
  color: ${brandColor.landingBgCreamWarm};
  font-size: ${typography.size.lg};
  line-height: ${typography.leading.relaxed};
  margin: 0;
`;

export const PrinciplesGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${layout.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

export const PrincipleCard = styled.div`
  background: ${color.backgroundAlt};
  border-radius: ${shape.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  padding: ${spacing.md};
`;

export const PrincipleTitle = styled.h3`
  color: ${brandColor.cotiBrown};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.bold};
  margin: 0;
`;

export const PrincipleText = styled.p`
  color: ${color.textSecondary};
  font-size: ${typography.size.sm};
  margin: 0;
`;

/* ---------- Voz de marca ---------- */

export const VoiceSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const VoiceGrid = styled.div`
  display: grid;
  gap: ${spacing.lg};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0 auto;
  max-width: 900px;
  width: 100%;

  @media (max-width: ${layout.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

export const VoiceCard = styled.blockquote<{ $tone: 'no' | 'yes' }>`
  background: ${({ $tone }) => ($tone === 'yes' ? color.surface : color.backgroundDark)};
  border: 1px solid ${({ $tone }) => ($tone === 'yes' ? brandColor.landingBlueLight : color.border)};
  border-radius: ${shape['2xl']};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin: 0;
  opacity: ${({ $tone }) => ($tone === 'yes' ? 1 : 0.85)};
  padding: ${spacing.lg};
`;

export const VoiceTag = styled.span<{ $tone: 'no' | 'yes' }>`
  align-self: flex-start;
  background: ${({ $tone }) => ($tone === 'yes' ? brandColor.cotiForest : color.borderDark)};
  border-radius: ${shape.full};
  color: ${({ $tone }) => ($tone === 'yes' ? brandColor.cotiCream : color.textPrimary)};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  letter-spacing: 0.06em;
  padding: ${spacing.micro} ${spacing.sm};
  text-transform: uppercase;
`;

export const VoiceQuote = styled.p`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.semibold};
  line-height: ${typography.leading.normal};
  margin: 0;
`;

/* ---------- Cierre ---------- */

export const ClosingCard = styled.section`
  align-items: center;
  background: ${color.backgroundAlt};
  border: 1px solid ${color.border};
  border-radius: ${shape['2xl']};
  display: grid;
  gap: ${spacing.xl};
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  overflow: hidden;
  padding: ${spacing['2xl']};

  @media (max-width: ${layout.breakpoint.md}) {
    grid-template-columns: 1fr;
    padding: ${spacing.lg};
    text-align: center;
  }
`;

export const ClosingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  @media (max-width: ${layout.breakpoint.md}) {
    align-items: center;
  }
`;

export const ClosingTitle = styled.h2`
  color: ${brandColor.cotiForest};
  font-family: ${typography.family.display};
  font-size: ${typography.size['5xl']};
  font-weight: ${typography.weight.black};
  letter-spacing: ${typography.tracking.tight};
  line-height: ${typography.leading.tight};
  margin: 0;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size['3xl']};
  }
`;

export const ClosingMascot = styled.img`
  border-radius: ${shape.xl};
  height: auto;
  justify-self: center;
  max-height: ${layout.illustrationMaxHeightSm};
  object-fit: cover;
  width: 100%;
`;
