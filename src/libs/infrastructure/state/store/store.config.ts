/**
 * Redux store configuration for the application
 *
 * Redux Toolkit + redux-persist. Slices activas: auth (sesión), users
 * (gestión admin) y global (UI transitoria). Los slices del dominio de viajes
 * se agregan aquí conforme se construyan.
 */

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authSlice, globalSlice, travelSlice, usersSlice } from '../slices';

/**
 * Global slice persist config - exclude transient UI state
 * layoutBgColor: Set by screens, should reset on page refresh
 * toasts/notifications/modals/loaders: Runtime state only
 */
const globalPersistConfig = {
  blacklist: ['layoutBgColor', 'toasts', 'notifications', 'activeModals', 'activeLoaders'],
  key: 'global',
  storage,
};

// Root reducer configuration for the application
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  global: persistReducer(globalPersistConfig, globalSlice.reducer),
  travel: travelSlice.reducer,
  users: usersSlice.reducer,
});

/**
 * Persist configuration - selective persistence for security
 *
 * WHITELIST ONLY (persist only these slices):
 * - 'auth': Authentication state (user, isAuthenticated) - Required for session persistence
 *
 * NOTE: 'global' is intentionally NOT in this root whitelist. It is already
 * persisted independently via its own nested persistReducer (globalPersistConfig
 * above), whose field-level blacklist drops layoutBgColor. Persisting it here too
 * would re-serialize the whole global state at the root level, where the blacklist
 * does not apply — baking transient UI state into storage.
 *
 * NOT PERSISTED (runtime/transactional data):
 * - 'users': Sensitive user data, CRUD operations - PRIVACY RISK
 *
 * NOTE: Token is stored separately in localStorage for API calls.
 * Auth slice persistence maintains session across page refreshes.
 */
const persistConfig = {
  key: 'travel_savings_root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware
// serializableCheck disabled: Date objects in entities trigger warnings but work correctly.
// Maintaining ignoredPaths for arrays (payload.0.createdAt, payload.1.updatedAt...) is impractical.
export const store = configureStore({
  devTools: process.env['NODE_ENV'] !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: persistedReducer,
});

// Create persistor
export const persistor = persistStore(store);

// Reset store function for admin logout or cache clearing
export const resetStore = () => {
  persistor.purge();
};

// Type exports for TypeScript usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
