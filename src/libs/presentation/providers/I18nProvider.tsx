/**
 * I18nProvider
 *
 * Initializes i18next and provides the instance to the React tree.
 * Uses I18nextProvider to ensure all useTranslation hooks receive the instance,
 * regardless of Turbopack chunk splitting.
 */

'use client';

import { I18nextProvider, initReactI18next } from 'react-i18next';
import type { ReactNode } from 'react';
import i18n from 'i18next';

import en from '@i18n/messages/en.json';
import es from '@i18n/messages/es.json';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    defaultNS: 'translation',
    fallbackLng: 'es',
    initImmediate: false,
    interpolation: {
      escapeValue: false,
    },
    lng: 'es',
    react: {
      useSuspense: false,
    },
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
  });
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
