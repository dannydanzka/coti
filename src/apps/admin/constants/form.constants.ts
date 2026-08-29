/**
 * Admin Form Constants
 *
 */

import { ROLE_LABELS, USER_ROLES } from '@constants';

export const ACTIVE_STATUS_OPTIONS = [
  { label: 'Activo', value: 'true' },
  { label: 'Suspendido', value: 'false' },
];

export const ROLE_OPTIONS = [
  { label: ROLE_LABELS[USER_ROLES.OWNER], value: USER_ROLES.OWNER },
  { label: ROLE_LABELS[USER_ROLES.ADMIN], value: USER_ROLES.ADMIN },
  { label: ROLE_LABELS[USER_ROLES.PARTICIPANT], value: USER_ROLES.PARTICIPANT },
];
