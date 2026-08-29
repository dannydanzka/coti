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
  align-self: center;
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
