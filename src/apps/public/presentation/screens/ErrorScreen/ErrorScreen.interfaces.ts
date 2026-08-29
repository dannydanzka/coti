/**
 * ErrorScreen Interfaces
 */

export interface ErrorScreenProps {
  error: Error & { digest?: string };
  reset: () => void;
}
