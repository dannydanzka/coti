/**
 * ModalContainer Styled Components
 */

import styled from 'styled-components';

import { color, spacing, typography } from '@constants';

import type { ButtonProps, ContainerProps, OverlayProps } from './ModalContainer.styled.interfaces';

export const ModalOverlay = styled.div<OverlayProps>`
  align-items: center;
  background: rgb(${color.neutral900} / 0.5);
  display: flex;
  inset: 0;
  justify-content: center;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  position: fixed;
  transition: opacity 0.2s ease-in-out;
  z-index: 10000;
`;

export const ModalContainer = styled.div<ContainerProps>`
  background: ${color.background};
  border-radius: ${spacing.md};
  box-shadow: 0 10px 25px rgb(${color.neutral900} / 0.2);
  max-height: 80vh;
  max-width: 500px;
  min-width: 320px;
  overflow: hidden;
  transform: translateY(0);
  transition: transform 0.2s ease-in-out;
  width: 90%;
`;

export const ModalHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${color.backgroundDark};
  display: flex;
  justify-content: space-between;
  padding: ${spacing.lg} ${spacing.lg} ${spacing.md};
`;

export const ModalTitle = styled.div`
  color: ${color.textPrimary};
  font-size: ${typography.size.lg};
  font-weight: 600;
  margin: 0;
`;

export const ModalCloseButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: ${spacing.xs};
  color: ${color.textSecondary};
  cursor: pointer;
  display: flex;
  height: ${spacing.lg};
  justify-content: center;
  transition: all 0.2s ease-in-out;
  width: ${spacing.lg};

  &:hover {
    background-color: ${color.backgroundDark};
    color: ${color.textPrimary};
  }
`;

export const ModalBody = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding: ${spacing.md} ${spacing.lg};
`;

export const ModalText = styled.p`
  color: ${color.textSecondary};
  line-height: 1.5;
  margin: 0;
`;

export const ModalFooter = styled.div`
  border-top: 1px solid ${color.backgroundDark};
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;
  padding: ${spacing.md} ${spacing.lg} ${spacing.lg};
`;

export const ModalButton = styled.button<ButtonProps>`
  background: ${({ $variant = 'secondary' }) =>
    $variant === 'primary' ? color.primary500 : color.backgroundDark};
  border: 1px solid
    ${({ $variant = 'secondary' }) =>
      $variant === 'primary' ? color.primary600 : color.backgroundDark};
  border-radius: ${spacing.xs};
  color: ${({ $variant = 'secondary' }) =>
    $variant === 'primary' ? color.textInverse : color.textPrimary};
  cursor: pointer;
  font-size: ${typography.size.sm};
  font-weight: 500;
  min-width: ${spacing['6xl']};
  padding: ${spacing.sm} ${spacing.md};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ $variant = 'secondary' }) =>
      $variant === 'primary' ? color.primary600 : color.backgroundAlt};
  }

  &:focus {
    outline: 2px solid ${color.primary500};
    outline-offset: 2px;
  }
`;
