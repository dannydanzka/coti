/**
 * ImagePreviewModal Styled Components
 *
 * Modal for image preview with category badge.
 */

'use client';

import styled from 'styled-components';

import { color, motion, shape, spacing, typography } from '@constants';
import { hexToRgba } from '@helpers';

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  align-items: center;
  backdrop-filter: blur(4px);
  background: rgb(${color.blackRgb} / 0.85);
  display: flex;
  inset: 0;
  justify-content: center;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  position: fixed;
  transition: opacity ${motion.normal};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  z-index: 1200;
`;

export const ModalContent = styled.div`
  max-height: 90vh;
  max-width: 90vw;
  position: relative;
`;

export const PreviewImage = styled.img`
  border-radius: ${shape.lg};
  display: block;
  max-height: 80vh;
  max-width: 85vw;
  object-fit: contain;
`;

export const PreviewVideo = styled.video`
  border-radius: ${shape.lg};
  display: block;
  max-height: 80vh;
  max-width: 85vw;
  object-fit: contain;
`;

export const NavArrowButton = styled.button<{ $side: 'left' | 'right' }>`
  align-items: center;
  background: ${hexToRgba(color.white, 0.2)};
  border: none;
  border-radius: ${shape.full};
  color: ${color.white};
  cursor: pointer;
  display: flex;
  height: ${spacing['2xl']};
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: background ${motion.fast};
  width: ${spacing['2xl']};
  z-index: 1;
  ${({ $side }) => ($side === 'left' ? `left: ${spacing.sm};` : `right: ${spacing.sm};`)}

  &:hover {
    background: ${hexToRgba(color.white, 0.35)};
  }
`;

export const ImageOverlay = styled.div`
  align-items: flex-start;
  background: linear-gradient(to bottom, ${hexToRgba(color.neutral900, 0.7)} 0%, transparent 100%);
  border-radius: ${shape.lg} ${shape.lg} 0 0;
  display: flex;
  gap: ${spacing.sm};
  justify-content: space-between;
  left: 0;
  padding: ${spacing.md} ${spacing.lg};
  position: absolute;
  right: 0;
  top: 0;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const ImageTitle = styled.h2`
  color: ${color.white};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.bold};
  margin: 0;
  text-shadow: 0 2px 4px ${hexToRgba(color.neutral900, 0.5)};
`;

export const CategoryBadge = styled.span<{ $categoryColor: string }>`
  background: ${({ $categoryColor }) => $categoryColor};
  border-radius: ${shape.full};
  color: ${color.white};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  padding: ${spacing.xs} ${spacing.sm};
  text-transform: uppercase;
  width: fit-content;
`;

export const ActionButtonsWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.xs};
`;

export const ActionButton = styled.button`
  align-items: center;
  background: ${hexToRgba(color.white, 0.2)};
  border: none;
  border-radius: ${shape.full};
  color: ${color.white};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: ${spacing.lg};
  justify-content: center;
  transition: background ${motion.fast};
  width: ${spacing.lg};

  &:hover {
    background: ${hexToRgba(color.white, 0.3)};
  }
`;

export const CloseButton = styled.button`
  align-items: center;
  background: ${hexToRgba(color.white, 0.2)};
  border: none;
  border-radius: ${shape.full};
  color: ${color.white};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: ${spacing.lg};
  justify-content: center;
  transition: background ${motion.fast};
  width: ${spacing.lg};

  &:hover {
    background: ${hexToRgba(color.white, 0.3)};
  }
`;

export const CaptionOverlay = styled.div`
  background: linear-gradient(to top, ${hexToRgba(color.neutral900, 0.7)} 0%, transparent 100%);
  border-radius: 0 0 ${shape.lg} ${shape.lg};
  bottom: 0;
  left: 0;
  padding: ${spacing.lg} ${spacing.lg} ${spacing.md};
  position: absolute;
  right: 0;
`;

export const ImageDescription = styled.p`
  color: ${color.white};
  font-size: ${typography.size.sm};
  line-height: 1.5;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 1px 2px ${hexToRgba(color.neutral900, 0.5)};
`;
