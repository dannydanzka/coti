/**
 * Global Error Page Interfaces
 *
 * Type definitions for Next.js global error boundary page.
 */

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
