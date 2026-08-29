/**
 * Redux Provider Component
 *
 * Provides Redux store to the entire application.
 * Includes Redux Persist for selective state persistence.
 * AuthProvider is the SINGLE SOURCE OF TRUTH for authentication.
 */

'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';

import { persistor, store } from '@store';

import { AuthProvider } from '../AuthProvider';
import type { ReduxProviderProps } from './ReduxProvider.interfaces';

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>{children}</AuthProvider>
      </PersistGate>
    </Provider>
  );
};
