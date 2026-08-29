/**
 * GlobalLoading Component Interfaces
 *
 * Redux-connected component - isVisible derived from Redux state
 *
 */

export interface GlobalLoadingProps {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Force visibility regardless of Redux state.
   * Use for Suspense fallback where Redux is not yet available.
   */
  forceVisible?: boolean;

  /**
   * Optional text to display next to loading animation
   * Max 30 characters
   */
  text?: string;
}
