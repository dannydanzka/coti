/**
 * MediaCard Styled Components
 *
 * Centralized media display styles for images/videos.
 */

'use client';

import styled from 'styled-components';

import { color, elevation, shape, spacing, typography } from '@constants';
import { hexToRgba } from '@helpers';

export const ImageCard = styled.div`
  background: ${color.white};
  border: 1px solid ${color.neutral200};
  border-radius: ${shape.lg};
  box-shadow: ${elevation.sm};
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${elevation.md};
  }
`;

export const ImageWrapper = styled.div<{ $fixedHeight?: number }>`
  aspect-ratio: ${({ $fixedHeight }) => ($fixedHeight ? 'unset' : '16/9')};
  background: ${color.neutral100};
  height: ${({ $fixedHeight }) => ($fixedHeight ? `${$fixedHeight}px` : 'auto')};
  overflow: hidden;
  position: relative;
`;

export const ImageOverlayTop = styled.div`
  display: flex;
  gap: ${spacing.xs};
  position: absolute;
  right: ${spacing.sm};
  top: ${spacing.sm};
  z-index: 1;
`;

export const ImageOverlay = styled.div`
  align-items: flex-end;
  background: linear-gradient(to top, ${hexToRgba(color.neutral900, 0.7)} 0%, transparent 100%);
  bottom: 0;
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: ${spacing.sm};
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 3;
`;

export const ImageTitle = styled.h3`
  -webkit-box-orient: vertical;
  color: ${color.white};
  display: -webkit-box;
  flex: 1;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  -webkit-line-clamp: 2;
  margin: 0;
  overflow: hidden;
  text-shadow: 0 1px 3px ${hexToRgba(color.neutral900, 0.5)};
`;

export const ImageActions = styled.div`
  display: flex;
  gap: ${spacing.xs};
  margin-left: ${spacing.sm};
  pointer-events: auto;
`;

export const ImageDescriptionWrapper = styled.div`
  padding: ${spacing.xs} ${spacing.sm};
`;

export const ImageDescription = styled.p`
  -webkit-box-orient: vertical;
  color: ${color.textSecondary};
  display: -webkit-box;
  font-size: ${typography.size.xs};
  -webkit-line-clamp: 3;
  line-height: 1.4;
  margin: 0;
  overflow: hidden;
`;

export const CategoryBadge = styled.span<{ $bgColor?: string; $textColor?: string }>`
  background: ${({ $bgColor }) => $bgColor ?? hexToRgba(color.white, 0.95)};
  border-radius: ${shape.full};
  box-shadow: 0 1px 3px ${hexToRgba(color.neutral900, 0.3)};
  color: ${({ $textColor }) => $textColor ?? color.primary700};
  font-size: 11px;
  font-weight: ${typography.weight.medium};
  padding: 3px ${spacing.sm};
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? color.success : color.error)};
  border-radius: ${shape.full};
  box-shadow: 0 1px 3px ${hexToRgba(color.neutral900, 0.3)};
  color: ${color.white};
  font-size: 11px;
  font-weight: ${typography.weight.medium};
  padding: 3px ${spacing.sm};
`;

export const CardVideo = styled.video`
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  position: absolute;
  width: 100%;
`;

export const VideoIcon = styled.div`
  align-items: center;
  background: ${hexToRgba(color.neutral900, 0.6)};
  border-radius: ${shape.full};
  bottom: 50%;
  color: ${color.white};
  display: flex;
  font-size: ${typography.size.lg};
  height: ${spacing.xl};
  justify-content: center;
  left: 50%;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, 50%);
  width: ${spacing.xl};
  z-index: 2;
`;

export const ImagePlaceholder = styled.div`
  align-items: center;
  background: linear-gradient(135deg, ${color.neutral100} 0%, ${color.neutral200} 100%);
  color: ${color.neutral400};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  height: 100%;
  justify-content: center;
  width: 100%;

  svg {
    opacity: 0.5;
  }
`;

export const ImagePlaceholderText = styled.span`
  color: ${color.neutral400};
  font-size: ${typography.size.xs};
  opacity: 0.7;
`;

export const VideoPlaceholder = styled.div`
  align-items: center;
  background: linear-gradient(135deg, ${color.neutral200} 0%, ${color.neutral300} 100%);
  color: ${color.neutral500};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  svg {
    opacity: 0.6;
  }
`;

export const VideoClickOverlay = styled.div`
  cursor: pointer;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const VideoPlaceholderText = styled.span`
  color: ${color.neutral500};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
`;

export const CardImage = styled.img`
  cursor: pointer;
  height: 100%;
  left: 0;
  object-fit: contain;
  position: absolute;
  top: 0;
  width: 100%;
`;
