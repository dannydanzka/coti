/**
 * Admin route group layout (server wrapper)
 *
 * Forces dynamic rendering for all admin routes — they are auth-gated and
 * must not be prerendered at build time. Delegates UI to AdminLayoutClient.
 */

import type { ReactNode } from 'react';

import { AdminLayoutClient } from './AdminLayoutClient';

export const dynamic = 'force-dynamic';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
};

export default AdminLayout;
