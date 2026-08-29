/**
 * ImagePicker Styled Components
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, shape, spacing, typography } from '@constants';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const DropZone = styled.label<{ $isDragging?: boolean; $hasImage?: boolean }>`
  align-items: center;
  background: ${({ $hasImage }) => ($hasImage ? 'transparent' : brandColor.landingBgYellow)};
  border: 2px dashed
    ${({ $isDragging }) => ($isDragging ? brandColor.cotiCoral : brandColor.landingBlueDark)};
  border-radius: ${shape.full};
  cursor: pointer;
  display: flex;
  height: 120px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease-in-out;
  width: 120px;

  &:hover {
    border-color: ${brandColor.cotiCoral};
  }
`;

export const PreviewImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const Placeholder = styled.div`
  align-items: center;
  color: ${brandColor.landingBlueDark};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const PlaceholderText = styled.span`
  color: ${brandColor.landingTextGray};
  font-size: ${typography.size.xs};
  text-align: center;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Hint = styled.span`
  color: ${brandColor.landingTextGray};
  font-size: ${typography.size.xs};
`;

export const RemoveButton = styled.button`
  align-items: center;
  background: ${color.error};
  border: none;
  border-radius: ${shape.full};
  color: ${color.white};
  cursor: pointer;
  display: flex;
  height: ${spacing.md};
  justify-content: center;
  position: absolute;
  right: ${spacing.micro};
  top: ${spacing.micro};
  width: ${spacing.md};

  &:hover {
    opacity: 0.9;
  }
`;
