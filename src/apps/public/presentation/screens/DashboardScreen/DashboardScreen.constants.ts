/**
 * DashboardScreen Constants
 */

export const DASHBOARD_UI_TEXT = {
  APORTES: {
    EMPTY: 'Cuando registres tu primer aporte, aquí verás tu historial.',
    TITLE: 'Tus aportes',
  },
  BOX: {
    OF: 'de',
    SAVED: 'Llevas ahorrado',
  },
  DRAFT: {
    BUTTON: 'Retomar mi plan',
    SUBTITLE: 'Dejaste un viaje a medio planear. Puedes seguir donde te quedaste.',
    TITLE: 'Tienes un plan sin terminar',
  },
  EMPTY_BOX: {
    BUTTON: 'Planear mi viaje',
    HIGHLIGHT: 'Esta herramienta proyecta, no reserva.',
    SUBTITLE:
      'Elige un destino, dinos cuánto puedes apartar y te decimos en cuánto tiempo llegas. Después vuelves aquí a registrar cada aportación.',
    TITLE: 'Todavía no tienes una cajita de ahorro',
  },
  MILESTONE: {
    REACHED: '¡Ya pasaste el hito de',
    SUFFIX: '!',
  },
  NEXT: {
    BUTTON: 'Registrar aporte',
    TITLE: 'Próximo aporte',
  },
  SAVINGS: {
    TITLE: 'Mi cajita de ahorro',
  },
  STATS: {
    CONTRIBUTIONS: 'aportes',
    MISSING: 'te faltan',
    PERIODS: 'periodos restantes',
  },
  WELCOME: {
    GREETING: '¡Hola',
    SUBTITLE: 'Este es tu avance hacia el próximo viaje.',
    SUBTITLE_WITH_TRIP: 'Este es tu avance hacia',
  },
} as const;

/** Milestones drawn under the progress bar, matching the design. */
export const HITOS = [25, 50, 75, 100] as const;

/** Contributions shown in the bar chart; the design shows the last six. */
export const APORTES_VISIBLES = 6;
