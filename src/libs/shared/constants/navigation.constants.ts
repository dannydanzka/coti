/**
 * Global Navigation Constants
 *
 * Navigation items and configuration used across the application.
 * Shared between app/ routes and presentation components.
 *
 */

// NOTE: NAVBAR_UI_TEXT is now in layout.constants.ts to avoid duplicates

export const PUBLIC_NAVIGATION_ITEMS = [
  {
    id: 'events',
    order: 1,
    title: 'Eventos',
    url: '/public/events',
  },
  {
    id: 'participants',
    order: 2,
    title: 'Participantes',
    url: '/public/participants',
  },
  {
    id: 'contact',
    order: 3,
    title: 'Contacto',
    url: '/public/contact',
  },
];
