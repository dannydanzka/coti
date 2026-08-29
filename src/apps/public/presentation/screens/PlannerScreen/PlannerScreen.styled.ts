/**
 * PlannerScreen Styled Components
 *
 * Wizard de un paso a la vez (mockup desktop `.claude/coti-flujo-desktop.html`):
 * barra superior con progreso, columna central de 760px, tarjetas blancas
 * sobre crema, verde bosque para selección y coral para el CTA.
 */

'use client';

import styled, { css } from 'styled-components';

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

export const Shell = styled.div`
  background: ${brandColor.cotiCream};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const TopBar = styled.header`
  align-items: center;
  background: ${color.surface};
  border-bottom: 1px solid ${color.border};
  display: grid;
  gap: ${spacing.md};
  grid-template-columns: 1fr auto 1fr;
  padding: ${spacing.sm} ${spacing.lg};
  position: sticky;
  top: 0;
  z-index: ${layout.zIndex.sticky};
`;

export const TopBarSpacer = styled.span``;

export const StepMeter = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.sm};
`;

export const StepMeterLabel = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.sm};
  white-space: nowrap;
`;

export const StepMeterTrack = styled.div<{ $percent: number }>`
  background: ${color.backgroundDark};
  border-radius: ${shape.full};
  height: ${spacing.micro};
  overflow: hidden;
  position: relative;
  width: 208px;

  &::after {
    background: ${brandColor.cotiForest};
    border-radius: ${shape.full};
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: width ${motion.normal};
    width: ${({ $percent }) => `${$percent}%`};
  }
`;

export const ExitButton = styled.button`
  background: none;
  border: none;
  color: ${color.textTertiary};
  cursor: pointer;
  font-size: ${typography.size.sm};
  justify-self: end;
  padding: ${spacing.xs};

  &:hover {
    color: ${color.textPrimary};
  }
`;

export const Body = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${spacing.lg};
  margin: 0 auto;
  max-width: 760px;
  padding: ${spacing['3xl']} ${spacing.lg} ${spacing['4xl']};
  width: 100%;

  @media (max-width: ${layout.breakpoint.md}) {
    padding: ${spacing.xl} ${spacing.md} ${spacing['2xl']};
  }
`;

export const Title = styled.h1`
  color: ${color.textPrimary};
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

export const Subtitle = styled.p`
  color: ${color.textTertiary};
  font-size: ${typography.size.base};
  margin: -${spacing.sm} 0 0;
`;

export const Label = styled.span`
  color: ${color.textTertiary};
  display: block;
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  letter-spacing: 0.06em;
  margin-bottom: ${spacing.xs};
  text-transform: uppercase;
`;

export const LabelRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing.xs};

  ${Label} {
    margin-bottom: 0;
  }
`;

export const TwoColumns = styled.div`
  align-items: start;
  display: grid;
  gap: ${spacing.lg};
  grid-template-columns: minmax(0, 1fr) auto;

  @media (max-width: ${layout.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const Field = styled.div``;

const fieldSkin = css`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.lg};
  color: ${color.textPrimary};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.sm} ${spacing.md};
  width: 100%;

  &:focus {
    border-color: ${brandColor.cotiForest};
    box-shadow: none;
    outline: none;
  }
`;

export const SelectInput = styled.select`
  ${fieldSkin}
  appearance: none;
  cursor: pointer;
`;

export const CalendarCard = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.xl};
  padding: ${spacing.sm};
`;

export const DateRow = styled.div`
  display: grid;
  gap: ${spacing.xs};
  grid-template-columns: 1fr 1fr;
`;

export const DateBox = styled.div<{ $on?: boolean }>`
  background: ${color.surface};
  border: ${({ $on }) => ($on ? '1.5px' : '1px')} solid
    ${({ $on }) => ($on ? brandColor.cotiForest : color.border)};
  border-radius: ${shape.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  padding: ${spacing.xs} ${spacing.sm};
`;

export const DateBoxLabel = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xs};
`;

export const DateBoxValue = styled.span`
  color: ${color.textPrimary};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.semibold};
`;

export const Pill = styled.span<{ $tone?: 'coral' | 'dark' | 'sand' }>`
  background: ${({ $tone }) => {
    if ($tone === 'coral') return brandColor.cotiCoral;
    if ($tone === 'sand') return brandColor.cotiSand;
    return brandColor.cotiForest;
  }};
  border-radius: ${shape.full};
  color: ${brandColor.cotiCream};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  padding: ${spacing.micro} ${spacing.xs};
`;

export const StepperRow = styled.div`
  align-items: center;
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.lg};
  display: flex;
  gap: ${spacing.sm};
  justify-content: space-between;
  padding: ${spacing.xs} ${spacing.sm};
`;

export const Avatars = styled.div`
  display: flex;
`;

export const AvatarDot = styled.span<{ $index: number }>`
  align-items: center;
  background: ${({ $index }) => ($index % 2 === 0 ? brandColor.cotiSand : color.secondary300)};
  border: 2px solid ${color.surface};
  border-radius: ${shape.full};
  color: ${brandColor.cotiBrown};
  display: inline-flex;
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.bold};
  height: ${spacing.lg};
  justify-content: center;
  margin-left: -${spacing.xs};
  width: ${spacing.lg};

  &:first-child {
    margin-left: 0;
  }
`;

export const StepperControls = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.sm};
`;

export const StepperButton = styled.button<{ $filled?: boolean }>`
  align-items: center;
  background: ${({ $filled }) => ($filled ? brandColor.cotiForest : color.surface)};
  border: 1px solid ${({ $filled }) => ($filled ? brandColor.cotiForest : color.border)};
  border-radius: ${shape.full};
  color: ${({ $filled }) => ($filled ? brandColor.cotiCream : color.textPrimary)};
  cursor: pointer;
  display: inline-flex;
  font-size: ${typography.size.lg};
  height: ${spacing.lg};
  justify-content: center;
  line-height: 1;
  width: ${spacing.lg};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const StepperValue = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.bold};
  min-width: ${spacing.md};
  text-align: center;
`;

export const InfoBox = styled.div<{ $tone?: 'muted' | 'ok' | 'warn' }>`
  align-items: flex-start;
  background: ${({ $tone }) => {
    if ($tone === 'ok') return brandColor.signupSuccessBg;
    if ($tone === 'warn') return brandColor.alertBg;
    return color.backgroundDark;
  }};
  border: 1px solid
    ${({ $tone }) => {
      if ($tone === 'ok') return brandColor.landingBlueLight;
      if ($tone === 'warn') return color.primary200;
      return color.border;
    }};
  border-radius: ${shape.lg};
  display: flex;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
`;

export const InfoIcon = styled.span<{ $tone?: 'muted' | 'ok' | 'warn' }>`
  align-items: center;
  background: ${({ $tone }) => ($tone === 'ok' ? brandColor.cotiForest : brandColor.cotiMustard)};
  border-radius: ${shape.full};
  color: ${brandColor.cotiCream};
  display: inline-flex;
  flex-shrink: 0;
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.bold};
  height: ${spacing.md};
  justify-content: center;
  width: ${spacing.md};
`;

export const InfoTitle = styled.span`
  color: ${color.textPrimary};
  display: block;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
`;

export const InfoText = styled.span`
  color: ${color.textSecondary};
  display: block;
  font-size: ${typography.size.sm};
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;
  margin-top: ${spacing.sm};
`;

export const GhostButton = styled.button`
  background: none;
  border: none;
  color: ${color.textTertiary};
  cursor: pointer;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.xs} ${spacing.sm};

  &:hover {
    color: ${color.textPrimary};
  }
`;

/* ---- Paso 2 ---- */

export const StyleGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: ${layout.breakpoint.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const StyleCard = styled.button<{ $on: boolean }>`
  background: ${({ $on }) => ($on ? brandColor.cotiForest : color.surface)};
  border: 1px solid ${({ $on }) => ($on ? brandColor.cotiForest : color.border)};
  border-radius: ${shape.lg};
  color: ${({ $on }) => ($on ? brandColor.cotiCream : color.textPrimary)};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.md} ${spacing.sm};
  text-align: left;
  transition: ${motion.fast};

  &:hover {
    border-color: ${brandColor.cotiForest};
  }
`;

export const StyleEmoji = styled.span`
  font-size: ${typography.size.xl};
`;

export const StyleName = styled.span`
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
`;

/* ---- Paso 3 ---- */

export const CountRow = styled.div`
  display: flex;
  gap: ${spacing.xs};
`;

export const AttractionGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${layout.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

export const AttractionRow = styled.div`
  align-items: center;
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.lg};
  display: flex;
  gap: ${spacing.sm};
  justify-content: space-between;
  padding: ${spacing.sm} ${spacing.md};
`;

export const AttractionName = styled.span`
  color: ${color.textPrimary};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  min-width: 0;
`;

export const ToggleGroup = styled.div`
  background: ${color.backgroundDark};
  border-radius: ${shape.full};
  display: inline-flex;
  flex-shrink: 0;
  padding: ${spacing.micro};
`;

export const ToggleButton = styled.button<{ $on: boolean; $tone: 'coral' | 'sand' }>`
  background: ${({ $on, $tone }) => {
    if (!$on) return 'transparent';
    return $tone === 'coral' ? brandColor.cotiCoral : brandColor.cotiSand;
  }};
  border: none;
  border-radius: ${shape.full};
  color: ${({ $on, $tone }) => {
    if (!$on) return color.textTertiary;
    return $tone === 'coral' ? brandColor.cotiCream : brandColor.cotiBrown;
  }};
  cursor: pointer;
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  padding: ${spacing.micro} ${spacing.xs};
  transition: ${motion.fast};
`;

/* ---- Paso 4 ---- */

export const DarkSummary = styled.div`
  background: ${brandColor.cotiForest};
  border-radius: ${shape.xl};
  color: ${brandColor.cotiCream};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.lg};
`;

export const DarkLead = styled.span`
  color: ${brandColor.landingBlueLight};
  font-size: ${typography.size.sm};
`;

export const DarkValue = styled.span`
  font-family: ${typography.family.display};
  font-size: ${typography.size['6xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
  line-height: 1.1;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size['4xl']};
  }
`;

export const DarkValueSeparator = styled.span`
  color: ${brandColor.cotiMustard};
  font-weight: ${typography.weight.regular};
  margin: 0 ${spacing.xs};
`;

export const DarkChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
  margin-top: ${spacing.xs};
`;

export const DarkChip = styled.span`
  background: ${color.secondary500};
  border-radius: ${shape.full};
  font-size: ${typography.size.xs};
  padding: ${spacing.micro} ${spacing.xs};
`;

export const DetailCard = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.xl};
  overflow: hidden;
`;

export const DetailHeader = styled.div`
  border-bottom: 1px solid ${color.border};
  padding: ${spacing.sm} ${spacing.md};

  ${Label} {
    margin-bottom: 0;
  }
`;

export const DetailRow = styled.div`
  align-items: center;
  border-bottom: 1px solid ${color.border};
  display: flex;
  font-size: ${typography.size.sm};
  justify-content: space-between;
  padding: ${spacing.sm} ${spacing.md};

  &:last-child {
    border-bottom: none;
  }
`;

export const DetailLabel = styled.span`
  color: ${color.textPrimary};
`;

export const DetailValue = styled.span`
  color: ${color.textPrimary};
  font-weight: ${typography.weight.semibold};
  white-space: nowrap;
`;

/* ---- Paso 5 ---- */

export const GoalHero = styled.div`
  align-items: baseline;
  display: flex;
  gap: ${spacing.xs};
`;

export const GoalAmount = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['6xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
  line-height: 1;
`;

export const GoalCurrency = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.sm};
`;

export const GoalOptions = styled.div`
  display: grid;
  gap: ${spacing.xs};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${layout.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

export const GoalOption = styled.button<{ $on: boolean }>`
  background: ${({ $on }) => ($on ? color.backgroundAlt : color.surface)};
  border: ${({ $on }) => ($on ? '1.5px' : '1px')} solid
    ${({ $on }) => ($on ? brandColor.cotiForest : color.border)};
  border-radius: ${shape.lg};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
  padding: ${spacing.sm} ${spacing.md};
  text-align: left;
`;

export const GoalOptionTitle = styled.span`
  color: ${color.textPrimary};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
`;

export const GoalOptionAmount = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.bold};
`;

export const GoalHint = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.sm};
`;

export const Segmented = styled.div`
  background: ${color.backgroundDark};
  border-radius: ${shape.full};
  display: flex;
  padding: ${spacing.micro};
`;

export const Segment = styled.button<{ $on: boolean }>`
  background: ${({ $on }) => ($on ? brandColor.cotiForest : 'transparent')};
  border: none;
  border-radius: ${shape.full};
  color: ${({ $on }) => ($on ? brandColor.cotiCream : color.textTertiary)};
  cursor: pointer;
  flex: 1;
  font-size: ${typography.size.sm};
  font-weight: ${({ $on }) => ($on ? typography.weight.semibold : typography.weight.medium)};
  padding: ${spacing.xs} 0;
  transition: ${motion.fast};
`;

export const AmountField = styled.label<{ $on?: boolean }>`
  align-items: baseline;
  background: ${color.surface};
  border: 1.5px solid ${({ $on }) => ($on ? brandColor.cotiForest : color.border)};
  border-radius: ${shape.lg};
  cursor: text;
  display: flex;
  gap: ${spacing.xs};
  padding: ${spacing.sm} ${spacing.md};
`;

export const AmountPrefix = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.xl};
`;

export const AmountInput = styled.input`
  appearance: textfield;
  background: transparent;
  border: none;
  color: ${color.textPrimary};
  flex: 1;
  font-family: ${typography.family.display};
  font-size: ${typography.size['3xl']};
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

export const AmountUnit = styled.span`
  color: ${color.textTertiary};
  font-size: ${typography.size.sm};
`;

export const RangeInput = styled.input`
  accent-color: ${brandColor.cotiCoral};
  margin: ${spacing.xs} 0 0;
  width: 100%;
`;

export const RangeLabels = styled.div`
  color: ${color.textTertiary};
  display: flex;
  font-size: ${typography.size.xs};
  justify-content: space-between;
`;

/* ---- Paso 6 ---- */

export const SwitchRow = styled.label`
  align-items: center;
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.lg};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: ${spacing.sm} ${spacing.md};
`;

export const SwitchLabel = styled.span`
  color: ${color.textPrimary};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
`;

export const SwitchHint = styled.span`
  color: ${color.textTertiary};
  display: block;
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.regular};
`;

export const QuickAmounts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
`;

export const QuickAmount = styled.button<{ $on: boolean }>`
  background: ${({ $on }) => ($on ? brandColor.cotiForest : color.surface)};
  border: 1px solid ${({ $on }) => ($on ? brandColor.cotiForest : color.border)};
  border-radius: ${shape.full};
  color: ${({ $on }) => ($on ? brandColor.cotiCream : color.textPrimary)};
  cursor: pointer;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.xs} ${spacing.sm};
`;

export const SummaryCard = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.md};
`;

export const SummaryRow = styled.div<{ $accent?: boolean }>`
  color: ${({ $accent }) => ($accent ? brandColor.cotiCoral : color.textPrimary)};
  display: flex;
  font-size: ${typography.size.sm};
  font-weight: ${({ $accent }) => ($accent ? typography.weight.bold : typography.weight.regular)};
  justify-content: space-between;
`;

export const SummaryKey = styled.span`
  color: ${color.textTertiary};
`;

export const SummaryValue = styled.span``;

export const RangeLabel = styled.span``;

export const SelectOption = styled.option``;

export const ProgressTrack = styled.div<{ $percent: number }>`
  background: ${color.backgroundDark};
  border-radius: ${shape.full};
  height: ${spacing.xs};
  margin-top: ${spacing.xs};
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
    transition: width ${motion.normal};
    width: ${({ $percent }) => `${$percent}%`};
  }
`;

/* ---- Paso 7 ---- */

export const Ticket = styled.div`
  background: ${brandColor.cotiForest};
  border-radius: ${shape.xl};
  color: ${brandColor.cotiCream};
  display: flex;
  justify-content: space-between;
  padding: ${spacing.md} ${spacing.lg};
`;

export const TicketCity = styled.span`
  font-family: ${typography.family.rounded};
  font-size: ${typography.size['3xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const TicketAmount = styled.span`
  align-self: center;
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
`;

export const Celebration = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  text-align: center;

  ${Subtitle} {
    margin-top: 0;
  }
`;

export const CelebrationMascot = styled.img`
  height: auto;
  width: 160px;
`;

export const ReminderCard = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.border};
  border-radius: ${shape.xl};
  box-shadow: ${elevation.sm};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.md};
`;
