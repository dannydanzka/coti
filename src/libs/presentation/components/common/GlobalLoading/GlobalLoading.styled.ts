/**
 * GlobalLoading Styled Components
 */

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

export const LoadingOverlay = styled.div<{ $isVisible: boolean }>`
  align-items: center;
  background: ${brandColor.landingBgYellow};
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: 9999;
`;

export const LoadingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export const LoadingMascot = styled.img`
  display: block;
  height: auto;
  max-width: 220px;
  width: 50vw;
`;
