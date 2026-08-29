/**
 * Login Constants
 *
 * UI text constants for login page and authentication flow.
 * Following DearAdry architecture standards.
 */

export const LOGIN_UI_TEXT = {
  FOOTER: {
    BRAND_TEXT: 'Retos y Eventos de Bienestar',
    DESCRIPTION: 'Plataforma exclusiva para',
    LOCATION: 'familias en México',
  },
  FORM: {
    EMAIL_LABEL: 'Email',
    EMAIL_PLACEHOLDER: 'tu@email.com',
    PASSWORD_LABEL: 'Contraseña',
    PASSWORD_PLACEHOLDER: 'Tu contraseña',
    SUBMIT_BUTTON: 'Iniciar Sesión',
  },
  HEADER: {
    SUBTITLE: 'Administración Exclusiva',
    TITLE: 'DearAdry',
  },
  LOADING: {
    FALLBACK: 'Cargando...',
    LOGIN_PROCESS: 'Iniciando sesión...',
    VERIFICATION: 'Verificando autenticación...',
  },
} as const;
