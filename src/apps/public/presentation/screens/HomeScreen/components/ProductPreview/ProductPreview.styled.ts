/**
 * ProductPreview Styled Components
 *
 * Miniature UI pieces (cards, pills, bars) in the language of the 8-screen
 * mockups: white cards on cream, forest for selection, coral for CTAs.
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, shape, spacing, typography } from '@constants';

export const StepLabel = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
  text-align: center;
`;

export const ProgressTrack = styled.div<{ $percent: number }>`
  background: ${color.backgroundDark};
  border-radius: ${shape.full};
  height: ${spacing.micro};
  overflow: hidden;
  position: relative;

  &::after {
    background: ${brandColor.cotiForest};
    border-radius: ${shape.full};
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: ${({ $percent }) => `${$percent}%`};
  }
`;

export const ScreenTitle = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.bold};
  line-height: ${typography.leading.tight};
`;

export const ScreenSubtitle = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
`;

export const SectionLabel = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const DarkCard = styled.div`
  background: ${brandColor.cotiForest};
  border-radius: ${shape.xl};
  color: ${brandColor.cotiCream};
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  padding: ${spacing.sm};
`;

export const DarkCardLabel = styled.span`
  color: ${brandColor.landingBlueLight};
  font-size: ${typography.size.xs};
`;

export const DarkCardValue = styled.span`
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.micro};
  margin-top: ${spacing.micro};
`;

export const Chip = styled.span<{ $tone?: 'coral' | 'dark' | 'light' }>`
  background: ${({ $tone }) => {
    if ($tone === 'coral') return brandColor.cotiCoral;
    if ($tone === 'light') return color.backgroundDark;
    return color.secondary500;
  }};
  border-radius: ${shape.full};
  color: ${({ $tone }) => ($tone === 'light' ? color.textPrimary : brandColor.cotiCream)};
  font-size: ${typography.size.xs};
  padding: ${spacing.micro} ${spacing.xs};
`;

export const Card = styled.div<{ $tone?: 'ok' | 'plain' }>`
  background: ${({ $tone }) => ($tone === 'ok' ? brandColor.signupSuccessBg : color.surface)};
  border: 1px solid ${({ $tone }) => ($tone === 'ok' ? brandColor.landingBlueLight : color.border)};
  border-radius: ${shape.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Row = styled.div<{ $selected?: boolean }>`
  align-items: center;
  background: ${({ $selected }) => ($selected ? color.backgroundAlt : 'transparent')};
  border-bottom: 1px solid ${color.border};
  display: flex;
  font-size: ${typography.size.xs};
  gap: ${spacing.xs};
  justify-content: space-between;
  padding: ${spacing.xs} ${spacing.sm};

  &:last-child {
    border-bottom: none;
  }
`;

export const RowLabel = styled.span`
  color: ${color.textPrimary};
  flex: 1;
  font-weight: ${typography.weight.medium};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RowHint = styled.span`
  color: ${color.textTertiary};
  display: block;
  font-size: ${typography.size.xs};
`;

export const RowValue = styled.span`
  color: ${color.textPrimary};
  font-weight: ${typography.weight.semibold};
  white-space: nowrap;
`;

export const Radio = styled.span<{ $on?: boolean }>`
  border: 2px solid ${({ $on }) => ($on ? brandColor.cotiForest : color.borderDark)};
  border-radius: ${shape.full};
  flex-shrink: 0;
  height: ${spacing.sm};
  position: relative;
  width: ${spacing.sm};

  &::after {
    background: ${brandColor.cotiForest};
    border-radius: ${shape.full};
    content: '';
    display: ${({ $on }) => ($on ? 'block' : 'none')};
    inset: 3px;
    position: absolute;
  }
`;

export const Segmented = styled.div`
  background: ${color.backgroundDark};
  border-radius: ${shape.full};
  display: flex;
  padding: ${spacing.micro};
`;

export const Segment = styled.span<{ $on?: boolean }>`
  background: ${({ $on }) => ($on ? brandColor.cotiForest : 'transparent')};
  border-radius: ${shape.full};
  color: ${({ $on }) => ($on ? brandColor.cotiCream : color.textTertiary)};
  flex: 1;
  font-size: ${typography.size.xs};
  font-weight: ${({ $on }) => ($on ? typography.weight.semibold : typography.weight.medium)};
  padding: ${spacing.micro} 0;
  text-align: center;
`;

export const AmountField = styled.div`
  align-items: baseline;
  background: ${color.surface};
  border: 1.5px solid ${brandColor.cotiForest};
  border-radius: ${shape.lg};
  display: flex;
  gap: ${spacing.xs};
  padding: ${spacing.xs} ${spacing.sm};
`;

export const AmountValue = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.bold};
`;

export const AmountUnit = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
  margin-left: auto;
`;

export const Slider = styled.div<{ $percent: number }>`
  background: ${color.backgroundDark};
  border-radius: ${shape.full};
  height: ${spacing.micro};
  margin: ${spacing.xs} ${spacing.xs} 0;
  position: relative;

  &::before {
    background: ${brandColor.cotiCoral};
    border-radius: ${shape.full};
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    width: ${({ $percent }) => `${$percent}%`};
  }

  &::after {
    background: ${brandColor.cotiCoral};
    border: 2px solid ${color.white};
    border-radius: ${shape.full};
    content: '';
    height: ${spacing.sm};
    left: ${({ $percent }) => `${$percent}%`};
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${spacing.sm};
  }
`;

export const OkTitle = styled.span`
  color: ${brandColor.cotiForest};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
`;

export const OkText = styled.span`
  color: ${color.textSecondary};
  font-size: ${typography.size.xs};
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  padding: ${spacing.xs} ${spacing.sm};
`;

export const BigNumber = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
`;

export const BigNumberMuted = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.regular};
`;

export const Milestones = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.micro};
`;

export const Milestone = styled.span<{ $reached?: boolean }>`
  color: ${({ $reached }) => ($reached ? brandColor.cotiForest : color.textTertiary)};
  font-size: ${typography.size.xs};
  font-weight: ${({ $reached }) => ($reached ? typography.weight.semibold : typography.weight.regular)};
`;

export const Celebrate = styled.div`
  background: ${color.backgroundAlt};
  border-radius: ${shape.lg};
  color: ${brandColor.cotiBrown};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.xs} ${spacing.sm};
`;

export const StatGrid = styled.div`
  display: grid;
  gap: ${spacing.xs};
  grid-template-columns: repeat(3, 1fr);
`;

export const Stat = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.lg};
  display: flex;
  flex-direction: column;
  padding: ${spacing.xs};
`;

export const StatValue = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.bold};
`;

export const StatLabel = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
`;

export const MonthRow = styled.div`
  display: flex;
  gap: ${spacing.micro};
`;

export const MonthDot = styled.span`
  align-items: center;
  background: ${brandColor.cotiForest};
  border-radius: ${shape.full};
  color: ${brandColor.cotiCream};
  display: flex;
  flex: 1;
  font-size: ${typography.size.xs};
  justify-content: center;
  padding: ${spacing.micro} 0;
`;

export const Cta = styled.span`
  background: ${brandColor.cotiCoral};
  border-radius: ${shape.lg};
  color: ${brandColor.cotiCream};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  margin-top: auto;
  padding: ${spacing.xs};
  text-align: center;
`;

export const Note = styled.span`
  background: ${color.backgroundDark};
  border-radius: ${shape.md};
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
  padding: ${spacing.xs} ${spacing.sm};
`;
