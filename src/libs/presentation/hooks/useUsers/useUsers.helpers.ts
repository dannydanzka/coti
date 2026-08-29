/**
 * useUsers Helpers
 *
 * Shared pure helpers for the user-management hooks.
 */

export const extractErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  if (err && typeof err === 'object' && 'message' in err) {
    const { message } = err;
    if (typeof message === 'string') return message;
  }
  return 'Error inesperado';
};
