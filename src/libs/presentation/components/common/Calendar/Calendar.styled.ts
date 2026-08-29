/**
 * Calendar Styled Components
 *
 * Month grid straight from the mockup (`.claude/business/mockups/coti-flujo.html`,
 * screen 1): chevron header, narrow weekday initials, forest green for the range
 * endpoints and a soft sage tint for the days in between.
 */

'use client';

import styled, { css } from 'styled-components';

import { brandColor, color, motion, shape, typography, spacing } from '@constants';

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  width: 100%;
`;

export const CalendarHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const MonthLabel = styled.span`
  color: ${color.textPrimary};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  text-transform: capitalize;
`;

export const NavButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  border-radius: ${shape.sm};
  color: ${color.textSecondary};
  cursor: pointer;
  display: flex;
  height: 28px;
  justify-content: center;
  transition: background ${motion.fast};
  width: 28px;

  &:hover {
    background: ${brandColor.landingBgCreamAlt};
  }

  &:disabled {
    cursor: default;
    opacity: 0.35;
  }
`;

export const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const WeekdayCell = styled.span`
  color: ${color.textSecondary};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.xs} 0;
  text-align: center;
  text-transform: uppercase;
`;

export const DaysGrid = styled.div`
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayPlaceholder = styled.span`
  aspect-ratio: 1;
`;

interface DayCellProps {
  $inRange: boolean;
  $isEndpoint: boolean;
}

export const DayCell = styled.button<DayCellProps>`
  align-items: center;
  aspect-ratio: 1;
  background: transparent;
  border: none;
  border-radius: ${shape.sm};
  color: ${color.textPrimary};
  cursor: pointer;
  display: flex;
  font-size: ${typography.size.xs};
  justify-content: center;
  transition: background ${motion.fast};

  &:hover:not(:disabled) {
    background: ${brandColor.landingBgCreamAlt};
  }

  &:disabled {
    color: ${color.textDisabled};
    cursor: default;
  }

  ${({ $inRange }) =>
    $inRange &&
    css`
      background: ${brandColor.landingBgSage};
      border-radius: ${shape.none};
    `}

  ${({ $isEndpoint }) =>
    $isEndpoint &&
    css`
      background: ${brandColor.cotiForest};
      border-radius: ${shape.sm};
      color: ${color.textInverse};
      font-weight: ${typography.weight.semibold};

      &:hover:not(:disabled) {
        background: ${brandColor.cotiForest};
      }
    `}
`;
