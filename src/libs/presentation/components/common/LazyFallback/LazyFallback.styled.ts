/**
 * LazyFallback
 *
 * Styled components for LazyFallback.
 */

'use client';

import styled, { keyframes } from 'styled-components';

import { brandColor } from '@constants';

const heartbeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.15);
  }
`;

export const Container = styled.div`
  align-items: center;
  background: ${brandColor.landingBgYellow};
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: 9999;
`;

export const LogoWrapper = styled.div`
  animation: ${heartbeat} 1.5s ease-in-out infinite;
  display: flex;
  justify-content: center;
  max-width: 300px;
  width: 80vw;

  @media (width >= 768px) {
    max-width: 400px;
  }

  svg {
    display: block;
    height: auto;
    max-width: 100%;
  }
`;
