/**
 * i18n Configuration
 *
 * Centralized i18next configuration for Coti platform.
 * Uses react-i18next for cross-platform compatibility (Next.js + React Native).
 *
 * Default language: Spanish (es)
 * Supported languages: es, en
 *
 * Usage in components:
 *   import { useTranslation } from 'react-i18next';
 *   const { t } = useTranslation();
 *   t('common.save') → "Guardar"
 *   t('admin.users.title') → "Gestión de Usuarios"
 */

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import en from './messages/en.json';
import es from './messages/es.json';

export const DEFAULT_LANGUAGE = 'es';

export const SUPPORTED_LANGUAGES = ['es', 'en'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
};

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18n.use(initReactI18next).init({
  debug: process.env['NODE_ENV'] === 'development',
  defaultNS: 'translation',
  fallbackLng: DEFAULT_LANGUAGE,
  initImmediate: false,
  interpolation: {
    escapeValue: false,
  },
  lng: DEFAULT_LANGUAGE,
  react: {
    useSuspense: false,
  },
  resources,
  showSupportNotice: false,
});

export { i18n };
