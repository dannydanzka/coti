/**
 * ProductPreview Constants
 *
 * Demo data mirroring `.claude/business/mockups/coti-flujo.html` (Tokio · 2 personas · 9 noches).
 * Static by design: the landing shows the shape of the product, not live data.
 */

export const PREVIEW_TRIP = {
  DESTINATION: 'Tokio, Japón',
  META: 'MXN · 2 personas · 9 noches · marzo 2028',
  RANGE: '$58,400 – $76,900',
  STYLE: 'Mochilero · foodie · cultura',
} as const;

export const PREVIEW_BREAKDOWN = [
  { emoji: '✈️', key: 'flights', range: '$24,000 – $32,000' },
  { emoji: '🏠', key: 'lodging', range: '$16,200 – $21,600' },
  { emoji: '🍜', key: 'food', range: '$9,900 – $13,500' },
  { emoji: '🎟️', key: 'attractions', range: '$5,400 – $6,300' },
] as const;

export const PREVIEW_PLAN = {
  GOALS: [
    { amount: '$58,400', key: 'minimum', selected: false },
    { amount: '$64,100', key: 'comfortable', selected: true },
    { amount: '$76,900', key: 'unlimited', selected: false },
  ],
  MONTHLY: '$3,200',
  SLIDER_PERCENT: 36,
} as const;

export const PREVIEW_BOX = {
  GOAL: '$64,100',
  MILESTONES: ['25%', '50%', '75%', '100%'],
  MONTHS: ['sep', 'oct', 'nov', 'dic', 'ene', 'feb'],
  NEXT_AMOUNT: '$3,200',
  PROGRESS_PERCENT: 40,
  REMAINING: '$38,400',
  SAVED: '$25,700',
} as const;
