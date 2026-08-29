/**
 * Calendar Component Interfaces
 */

export interface CalendarRange {
  end: Date | null;
  start: Date | null;
}

export interface CalendarProps {
  /** Earliest selectable day (inclusive). Days before it render disabled. */
  minDate?: Date;
  /** Only range selection exists today; the prop keeps the call sites explicit. */
  mode: 'range';
  onRangeChange: (next: CalendarRange) => void;
  rangeValue: CalendarRange;
}
