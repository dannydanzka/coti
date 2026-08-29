/**
 * DashboardScreen Styled Components
 *
 * Screen-specific components only.
 * Layout and states use global PublicPageLayout and PublicStates.
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, layout, shape, spacing, typography } from '@constants';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const WelcomeTitle = styled.h1`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.display};
  font-size: ${typography.size['3xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;

  @media (min-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size['4xl']};
  }
`;

export const WelcomeSubtitle = styled.p`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  margin: 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${layout.breakpoint.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SectionTitle = styled.h2`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.semibold};
  margin: 0;
`;

export const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const ExploreCTACard = styled.div`
  align-items: center;
  background: ${brandColor.cotiForest};
  border-radius: ${shape.xl};
  display: flex;
  gap: ${spacing.lg};

  /* Sin tope se estira a los 1200px del contenedor y queda medio vacío. */
  max-width: 760px;
  min-width: 0;
  overflow: hidden;
  padding: ${spacing.xl} ${spacing['2xl']};
  position: relative;

  @media (max-width: ${layout.breakpoint.sm}) {
    flex-direction: column;
    padding: ${spacing.lg};
    text-align: center;
  }
`;

export const ExploreCTAIcon = styled.div`
  align-items: center;
  background-color: ${brandColor.cotiMustard};
  border-radius: 50%;
  color: ${brandColor.cotiBrown};
  display: flex;
  flex-shrink: 0;
  height: ${spacing['6xl']};
  justify-content: center;
  width: ${spacing['6xl']};
`;

export const ExploreCTAContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const ExploreCTATitle = styled.h3`
  color: ${color.white};
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;

  @media (max-width: ${layout.breakpoint.sm}) {
    font-size: ${typography.size.xl};
  }
`;

export const ExploreCTAText = styled.p`
  color: ${color.neutral200};
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  line-height: 1.6;
  margin: 0;
  max-width: 420px;

  @media (max-width: ${layout.breakpoint.sm}) {
    font-size: ${typography.size.sm};
  }
`;

export const ExploreCTAHighlight = styled.span`
  align-items: center;
  color: ${brandColor.landingBgYellow};
  display: inline-flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  gap: ${spacing.xs};
  margin-top: ${spacing.xs};

  svg {
    height: ${spacing.sm};
    width: ${spacing.sm};
  }
`;

export const ExploreCTAButton = styled.button`
  align-self: flex-start;
  background: ${color.white};
  border: none;
  border-radius: ${shape.lg};
  color: ${brandColor.cotiCoral};
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.semibold};
  padding: ${spacing.sm} ${spacing.xl};
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

/* ---------- Cajita de ahorro (pantalla 8) ---------- */

export const CajitaGrid = styled.section`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: 2fr 1fr;

  @media (width <= 900px) {
    grid-template-columns: 1fr;
  }
`;

export const HeroCard = styled.article`
  align-items: center;
  background: ${brandColor.cotiForest};
  border-radius: ${shape.xl};
  color: ${color.white};
  display: flex;
  gap: ${spacing.sm};
  padding: ${spacing.md};

  @media (width <= 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const HeroStamp = styled.figure`
  align-items: center;
  background: ${brandColor.cotiCream};
  border-radius: ${shape.md};
  display: flex;
  flex: 0 0 auto;
  font-size: ${typography.size['5xl']};
  height: 108px;
  justify-content: center;
  transform: rotate(-4deg);
  width: ${spacing['7xl']};
`;

export const HeroBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HeroLabel = styled.p`
  color: ${brandColor.landingBlueLight};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  letter-spacing: ${typography.tracking.wide};
  margin-bottom: 0;
  text-transform: uppercase;
`;

export const HeroAmount = styled.p`
  color: ${color.white};
  font-size: ${typography.size['5xl']};
  font-weight: ${typography.weight.bold};
  line-height: ${typography.leading.tight};
  margin-bottom: 0;
`;

export const HeroGoal = styled.p`
  color: ${brandColor.landingBlueLight};
  font-size: ${typography.size.sm};
  margin-bottom: 0;
`;

export const HeroTrack = styled.div`
  background: ${brandColor.bgPricingHeader};
  border-radius: ${shape.full};
  height: ${spacing.xs};
  margin-top: ${spacing.sm};
  overflow: hidden;
`;

export const HeroTrackFill = styled.i<{ $porcentaje: number }>`
  background: ${brandColor.cotiMustard};
  border-radius: ${shape.full};
  display: block;
  height: 100%;
  transition: width 0.4s ease-out;
  width: ${({ $porcentaje }) => `${Math.min(100, Math.max(0, $porcentaje))}%`};
`;

export const HeroMilestones = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin-top: ${spacing.xs};
`;

export const HeroMilestone = styled.li<{ $alcanzado: boolean }>`
  align-items: center;
  color: ${({ $alcanzado }) => ($alcanzado ? brandColor.cotiMustard : brandColor.landingBlueLight)};
  display: flex;
  font-size: ${typography.size.xs};
  font-weight: ${({ $alcanzado }) =>
    $alcanzado ? typography.weight.bold : typography.weight.medium};
  gap: ${spacing.micro};
`;

export const SideCard = styled.aside`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.md};
`;

export const SideLabel = styled.p`
  color: ${color.textSecondary};
  font-size: ${typography.size.sm};
  margin-bottom: 0;
`;

export const SideDate = styled.p`
  color: ${color.textPrimary};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.bold};
  margin-bottom: 0;
`;

export const SideAmount = styled.p`
  color: ${brandColor.cotiCoral};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  margin-bottom: 0;
`;

export const MilestoneBanner = styled.p`
  background: ${brandColor.alertBg};
  border-radius: ${shape.md};
  color: ${brandColor.cotiBrown};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  margin-bottom: 0;
  padding: ${spacing.xs};
`;

export const StatsRow = styled.section`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(3, 1fr);
  margin-top: ${spacing.sm};

  @media (width <= 700px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.article`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.lg};
  padding: ${spacing.sm};
`;

export const StatValue = styled.p`
  color: ${brandColor.cotiForest};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  margin-bottom: 0;
`;

export const StatLabel = styled.p`
  color: ${color.textSecondary};
  font-size: ${typography.size.sm};
  margin-bottom: 0;
`;

export const AportesCard = styled.section`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.xl};
  margin-top: ${spacing.sm};
  padding: ${spacing.md};
`;

export const AportesTitle = styled.h3`
  color: ${color.textSecondary};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  letter-spacing: ${typography.tracking.wide};
  margin-bottom: ${spacing.sm};
  text-transform: uppercase;
`;

export const AportesChart = styled.ul`
  align-items: flex-end;
  display: flex;
  gap: ${spacing.xs};
  height: 120px;
  list-style: none;
`;

export const AporteColumn = styled.li`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${spacing.micro};
  height: 100%;
  justify-content: flex-end;
  max-width: 120px;
`;

export const AporteBar = styled.i<{ $altura: number; $ultimo: boolean }>`
  background: ${({ $ultimo }) => ($ultimo ? brandColor.cotiCoral : brandColor.landingBgSkyBlue)};
  border-radius: ${shape.sm};
  display: block;
  height: ${({ $altura }) => `${Math.max(6, $altura)}%`};
  width: 100%;
`;

export const AporteLabel = styled.span`
  color: ${color.textSecondary};
  font-size: ${typography.size.xs};
  text-align: center;
`;

export const AportesEmpty = styled.p`
  color: ${color.textSecondary};
  font-size: ${typography.size.sm};
  margin-bottom: 0;
`;
