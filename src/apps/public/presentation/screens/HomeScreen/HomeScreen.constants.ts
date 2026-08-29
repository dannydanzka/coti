/**
 * HomeScreen Constants
 */

import { BRAND_ASSETS } from '@constants';

/** Ciclo del producto en tres escenas: soñar el destino → ahorrar → llegar. */
export const STORY_STEPS = [
  { image: BRAND_ASSETS.SCENES.SONAR, key: 'dream' },
  { image: BRAND_ASSETS.SCENES.AHORRAR, key: 'save' },
  { image: BRAND_ASSETS.SCENES.LLEGAR, key: 'arrive' },
] as const;

export const PRINCIPLES = ['project', 'value', 'company'] as const;

/** Los 8 pasos del flujo (`.claude/business/mockups/coti-flujo.html`), en orden. */
export const FLOW_STEPS = [
  'define',
  'style',
  'attractions',
  'projection',
  'plan',
  'start',
  'activate',
  'box',
] as const;

/** Cifras del hero. Los valores son del catálogo curado (`src/data/destinos.ts`). */
export const HERO_STATS = [
  { key: 'destinations', value: '18' },
  { key: 'steps', value: '8' },
  { key: 'bookings', value: '0' },
] as const;

export const VOICE_EXAMPLES = ['yes', 'no'] as const;
