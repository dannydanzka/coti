/**
 * NotFoundScreen Interfaces
 *
 * Used for both 404 and general error pages.
 * If error is provided, shows error details. Otherwise shows 404 message.
 */

export interface NotFoundScreenProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}
