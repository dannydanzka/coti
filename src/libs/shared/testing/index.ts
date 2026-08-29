/**
 * Testing Utilities - Main Export
 *
 * Centralized testing utilities for the application React components.
 * Context7 Clean Architecture pattern with tree-shaking optimized barrel exports (Rule 36).
 *
 * NOTE: Testing helpers (admin, auth, global) are NOT exported here to avoid circular dependencies.
 * Import directly: import { setupAdminTest } from '@testing/helpers'
 *
 */

export * from './utils/render-with-providers';

export * from './utils/mock-utilities';

export * from './utils/provider-hoc';

export * from './utils/test-helpers';

export * from './mocks';

export * from './react-testing-library';

export * from './user-event';

import '@testing-library/jest-dom';
