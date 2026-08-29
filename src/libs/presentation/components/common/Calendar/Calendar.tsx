/**
 * Calendar Component
 *
 * Month-grid range picker for the trip dates (mockup screen 1). This is the
 * local implementation of one of the three known gaps in the design system —
 * see `.claude/business/decisiones/ui-kit.md`: gaps get styled-components
 * builds instead of pulling Tailwind primitives.
 *
 * Selection rules: first click sets the start (and clears the end); a click on
 * or before the start restarts the range; a later click closes it.
 *
 * Weekday initials are the first letter of Intl's long weekday name — in es
 * that yields the mockup's L M M J V S D (narrow would give X for miércoles).
 */

'use client';

import { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { CalendarProps, CalendarRange } from './Calendar.interfaces';

import {
  CalendarHeader,
  CalendarWrapper,
  DayCell,
  DayPlaceholder,
  DaysGrid,
  MonthLabel,
  NavButton,
  WeekdaysRow,
  WeekdayCell,
} from './Calendar.styled';

const DAYS_IN_WEEK = 7;

/** A Monday, used only to derive localized weekday initials. */
const REFERENCE_MONDAY = new Date(2024, 0, 1);

const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

/** Monday-first column index (getDay is Sunday-first). */
const mondayIndex = (date: Date): number => (date.getDay() + 6) % DAYS_IN_WEEK;

export const Calendar = ({ minDate, onRangeChange, rangeValue }: CalendarProps) => {
  const { i18n, t } = useTranslation();

  const [visibleMonth, setVisibleMonth] = useState<Date>(() => {
    const base = rangeValue.start ?? minDate ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const minDay = useMemo(() => (minDate ? startOfDay(minDate).getTime() : null), [minDate]);

  const weekdays = useMemo(
    () =>
      Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
        const day = new Date(REFERENCE_MONDAY);
        day.setDate(day.getDate() + index);
        const name = day.toLocaleDateString(i18n.language, { weekday: 'long' });
        return name.charAt(0).toUpperCase();
      }),
    [i18n.language]
  );

  const monthLabel = visibleMonth.toLocaleDateString(i18n.language, {
    month: 'long',
    year: 'numeric',
  });

  const handlePrevMonth = useCallback(() => {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1));
  }, []);

  const handleDayClick = useCallback(
    (day: Date) => {
      const { end, start } = rangeValue;
      const isNewRange = !start || Boolean(end) || day.getTime() <= startOfDay(start).getTime();

      const next: CalendarRange = isNewRange ? { end: null, start: day } : { end: day, start };
      onRangeChange(next);
    },
    [onRangeChange, rangeValue]
  );

  const renderDays = () => {
    const firstOfMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const daysInMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      0
    ).getDate();
    const leadingBlanks = mondayIndex(firstOfMonth);

    const startTime = rangeValue.start ? startOfDay(rangeValue.start).getTime() : null;
    const endTime = rangeValue.end ? startOfDay(rangeValue.end).getTime() : null;

    const cells = [];

    for (let blank = 0; blank < leadingBlanks; blank += 1) {
      cells.push(<DayPlaceholder key={`blank-${blank}`} />);
    }

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
      const day = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), dayNumber);
      const time = day.getTime();

      const isEndpoint = time === startTime || time === endTime;
      const isInRange =
        startTime !== null && endTime !== null && time > startTime && time < endTime;
      const isDisabled = minDay !== null && time < minDay;

      cells.push(
        <DayCell
          $inRange={isInRange}
          $isEndpoint={isEndpoint}
          aria-label={day.toLocaleDateString(i18n.language, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
          aria-pressed={isEndpoint}
          disabled={isDisabled}
          key={dayNumber}
          type='button'
          onClick={() => handleDayClick(day)}
        >
          {dayNumber}
        </DayCell>
      );
    }

    return cells;
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <NavButton
          aria-label={t('common.calendar.prevMonth')}
          type='button'
          onClick={handlePrevMonth}
        >
          <ChevronLeft size={16} />
        </NavButton>
        <MonthLabel>{monthLabel}</MonthLabel>
        <NavButton
          aria-label={t('common.calendar.nextMonth')}
          type='button'
          onClick={handleNextMonth}
        >
          <ChevronRight size={16} />
        </NavButton>
      </CalendarHeader>
      <WeekdaysRow>
        {weekdays.map((weekday, index) => (
          <WeekdayCell key={`${weekday}-${index}`}>{weekday}</WeekdayCell>
        ))}
      </WeekdaysRow>
      <DaysGrid>{renderDays()}</DaysGrid>
    </CalendarWrapper>
  );
};
