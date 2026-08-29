/**
 * AdminDashboardScreen
 *
 * Styled components for AdminDashboardScreen.
 */

'use client';

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

export const HeaderSection = styled.header`
  margin-bottom: ${spacing.md};
`;

export const HeaderContent = styled.div``;

export const WelcomeTitle = styled.h1`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;
`;

export const WelcomeText = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  margin: ${spacing.xs} 0 0;
`;

export const UserName = styled.span`
  color: ${color.primary600};
  font-weight: ${typography.weight.medium};
`;

export const SectionTitle = styled.h2`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.semibold};
  margin: 0 0 ${spacing.sm};
`;

export const InfoBanner = styled.div`
  align-items: flex-start;
  background: ${color.primary50};
  border-left: 4px solid ${color.primary500};
  border-radius: ${shape.md};
  display: flex;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
  padding: ${spacing.sm};
`;

export const InfoBannerIcon = styled.div`
  color: ${color.primary500};
  flex-shrink: 0;
`;

export const InfoBannerContent = styled.div`
  flex: 1;
`;

export const InfoBannerTitle = styled.h4`
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  margin: 0 0 ${spacing.micro};
`;

export const InfoBannerText = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  line-height: ${typography.leading.relaxed};
  margin: 0;
`;

export const MetricsSection = styled.section`
  margin-bottom: ${spacing.md};
`;

export const MetricsGrid = styled.div<{ $marginTop?: boolean }>`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: ${({ $marginTop }) => ($marginTop ? spacing.sm : '0')};
`;

export const MetricCard = styled.div<{ $color?: string }>`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-left: 4px solid ${(props) => props.$color ?? color.primary500};
  border-radius: ${shape.lg};
  padding: ${spacing.sm};
`;

export const MetricIcon = styled.div<{ $color?: string }>`
  align-items: center;
  background: ${(props) => `${props.$color ?? color.primary500}15`};
  border-radius: ${shape.md};
  color: ${(props) => props.$color ?? color.primary500};
  display: flex;
  height: ${spacing.xl};
  justify-content: center;
  margin-bottom: ${spacing.sm};
  width: ${spacing.xl};
`;

export const MetricValue = styled.span`
  color: ${color.textPrimary};
  display: block;
  font-family: ${typography.family.display};
  font-size: ${typography.size['3xl']};
  font-weight: ${typography.weight.bold};
  line-height: 1;
  margin-bottom: ${spacing.micro};
  min-height: ${spacing.md};
`;

export const MetricLoader = styled.div<{ $color?: string }>`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 1s linear infinite;
  border: 3px solid ${(props) => `${props.$color ?? color.primary500}30`};
  border-radius: 50%;
  border-top-color: ${(props) => props.$color ?? color.primary500};
  height: ${spacing.md};
  width: ${spacing.md};
`;

export const MetricLabel = styled.span`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
`;
