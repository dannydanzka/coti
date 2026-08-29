/**
 * CajitaScreen Styled Components
 *
 * Paso 8 del flujo: la cajita de ahorro. Tarjeta de avance con hitos, próximo
 * aporte, celebración del hito y tira de aportes por mes.
 */

'use client';

import styled from 'styled-components';

import {
  brandColor,
  color,
  elevation,
  layout,
  motion,
  shape,
  spacing,
  typography,
} from '@constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin: 0 auto;
  max-width: 1100px;
  width: 100%;
`;

export const HeaderRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: ${spacing.md};
  justify-content: space-between;

  @media (max-width: ${layout.breakpoint.md}) {
    flex-direction: column;
  }
`;

export const Greeting = styled.h1`
  color: ${brandColor.cotiForest};
  font-family: ${typography.family.display};
  font-size: ${typography.size['4xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;
`;

export const GreetingSub = styled.p`
  color: ${color.textTertiary};
  font-size: ${typography.size.base};
  margin: ${spacing.micro} 0 0;
`;

export const Grid = styled.div`
  display: grid;
  gap: ${spacing.lg};
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);

  @media (max-width: ${layout.breakpoint.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const ProgressCard = styled.section`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape['2xl']};
  box-shadow: ${elevation.sm};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.lg};
`;

export const CardTop = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const CityTag = styled.span`
  color: ${brandColor.cotiCoral};
  font-family: ${typography.family.rounded};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const PercentBadge = styled.span`
  background: ${brandColor.cotiForest};
  border-radius: ${shape.full};
  color: ${brandColor.cotiCream};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.bold};
  padding: ${spacing.micro} ${spacing.sm};
`;

export const Label = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const BigAmount = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['7xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
  line-height: 1;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size['5xl']};
  }
`;

export const BigAmountOf = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.regular};
  letter-spacing: 0;
  margin-left: ${spacing.xs};
`;

export const Track = styled.div<{ $percent: number }>`
  background: ${color.backgroundDark};
  border-radius: ${shape.full};
  height: ${spacing.sm};
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
    transition: width ${motion.slow};
    width: ${({ $percent }) => `${$percent}%`};
  }
`;

export const Milestones = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Milestone = styled.span<{ $reached: boolean }>`
  color: ${({ $reached }) => ($reached ? brandColor.cotiForest : color.textTertiary)};
  font-size: ${typography.size.xs};
  font-weight: ${({ $reached }) => ($reached ? typography.weight.bold : typography.weight.regular)};
`;

export const Celebrate = styled.div`
  align-items: center;
  background: ${color.backgroundAlt};
  border-radius: ${shape.lg};
  color: ${brandColor.cotiBrown};
  display: flex;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.xs};
  padding: ${spacing.sm} ${spacing.md};
`;

export const StatGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${layout.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const Stat = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  padding: ${spacing.md};
`;

export const StatValue = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
`;

export const StatLabel = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.sm};
`;

export const NextCard = styled.section`
  background: ${brandColor.cotiForest};
  border-radius: ${shape['2xl']};
  color: ${brandColor.cotiCream};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.lg};
`;

export const NextLabel = styled.span`
  color: ${brandColor.landingBlueLight};
  font-size: ${typography.size.sm};
`;

export const NextDate = styled.span`
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
`;

export const NextAmount = styled.span`
  color: ${brandColor.cotiMustard};
  font-family: ${typography.family.display};
  font-size: ${typography.size['4xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
`;

export const AporteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const QuickRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
`;

export const QuickButton = styled.button<{ $on: boolean }>`
  background: ${({ $on }) => ($on ? brandColor.cotiCream : 'transparent')};
  border: 1px solid ${brandColor.cotiCream};
  border-radius: ${shape.full};
  color: ${({ $on }) => ($on ? brandColor.cotiForest : brandColor.cotiCream)};
  cursor: pointer;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  padding: ${spacing.xs} ${spacing.sm};
  transition: ${motion.fast};
`;

export const AmountField = styled.label`
  align-items: baseline;
  background: ${color.surface};
  border-radius: ${shape.lg};
  color: ${color.textPrimary};
  cursor: text;
  display: flex;
  gap: ${spacing.xs};
  padding: ${spacing.xs} ${spacing.md};
`;

export const AmountPrefix = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.lg};
`;

export const AmountInput = styled.input`
  appearance: textfield;
  background: transparent;
  border: none;
  color: ${color.textPrimary};
  flex: 1;
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  min-width: 0;
  padding: 0;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
  }
`;

export const NoteInput = styled.input`
  background: ${color.surface};
  border: none;
  border-radius: ${shape.lg};
  color: ${color.textPrimary};
  font-size: ${typography.size.sm};
  padding: ${spacing.xs} ${spacing.md};

  &:focus {
    box-shadow: none;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  background: ${brandColor.cotiCoral};
  border: none;
  border-radius: ${shape.full};
  color: ${brandColor.cotiCream};
  cursor: pointer;
  font-family: ${typography.family.display};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.bold};
  padding: ${spacing.sm} ${spacing.lg};
  transition: ${motion.fast};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const MonthsCard = styled.section`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape['2xl']};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.lg};
`;

export const MonthRow = styled.div`
  display: grid;
  gap: ${spacing.xs};
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;

export const MonthCell = styled.div<{ $on: boolean }>`
  align-items: center;
  background: ${({ $on }) => ($on ? brandColor.cotiForest : color.backgroundDark)};
  border-radius: ${shape.lg};
  color: ${({ $on }) => ($on ? brandColor.cotiCream : color.textTertiary)};
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  padding: ${spacing.xs};
`;

export const MonthLabel = styled.span`
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  text-transform: capitalize;
`;

export const MonthAmount = styled.span`
  font-size: ${typography.size.xs};
`;

export const HistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const HistoryItem = styled.li`
  border-bottom: 1px solid ${color.border};
  display: flex;
  font-size: ${typography.size.sm};
  justify-content: space-between;
  margin: 0;
  padding: ${spacing.xs} 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const HistoryNote = styled.span`
  color: ${color.textTertiary};
`;

export const HistoryAmount = styled.span`
  color: ${color.textPrimary};
  font-weight: ${typography.weight.semibold};
`;

export const EmptyCard = styled.section`
  align-items: center;
  background: ${brandColor.cotiForest};
  border-radius: ${shape['2xl']};
  color: ${brandColor.cotiCream};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing['2xl']};
  text-align: center;
`;

export const EmptyMascot = styled.img`
  height: auto;
  width: 140px;
`;

export const EmptyTitle = styled.h2`
  color: ${brandColor.cotiCream};
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;
`;

export const EmptyText = styled.p`
  color: ${brandColor.landingBlueLight};
  margin: 0;
  max-width: 420px;
`;
