/**
 * Error Page Interfaces
 *
 * Type definitions for Next.js error boundary page.
 */

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
