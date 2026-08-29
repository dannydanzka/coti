/**
 * Admin User API Route Interfaces
 *
 * Type definitions for individual user API routes.
 */

export interface UserRouteParams {
  params: Promise<{
    id: string;
  }>;
}
