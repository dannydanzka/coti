/**
 * useLayoutBgColor Hook
 *
 * Encapsulates layout background color state from Redux.
 * Used by Header and Footer components.
 */

import { useSelector } from 'react-redux';

import { selectLayoutBgColor } from '@redux';

export const useLayoutBgColor = () => {
  const layoutBgColor = useSelector(selectLayoutBgColor);

  return { layoutBgColor };
};
