/**
 * FileUploader Styled Components
 *
 * Landing-style drag & drop file uploader.
 * Supports default, compact, and avatar variants.
 */

'use client';

import styled, { css, keyframes } from 'styled-components';

import { brandColor, color, elevation, shape, spacing, typography } from '@constants';

import type { DropZoneProps, FileUploaderVariant } from './FileUploader.interfaces';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const FileUploaderWrapper = styled.div``;

export const DropZone = styled.div<DropZoneProps>`
  align-items: center;
  background: ${({ $hasError, $isDragActive }) => {
    if ($hasError) return color.errorBackground;
    if ($isDragActive) return brandColor.landingBgYellow;
    return color.neutral50;
  }};
  border: 2px dashed
    ${({ $hasError, $isDragActive }) => {
      if ($hasError) return color.error;
      if ($isDragActive) return brandColor.landingPinkVibrant;
      return color.neutral300;
    }};
  border-radius: ${({ $variant }) => ($variant === 'avatar' ? shape.full : shape.lg)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  justify-content: center;
  min-height: ${({ $variant }) => {
    if ($variant === 'avatar') return '120px';
    if ($variant === 'compact') return '80px';
    return '160px';
  }};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  padding: ${({ $variant }) => ($variant === 'compact' ? spacing.sm : spacing.md)};
  position: relative;
  transition: all 0.2s ease-in-out;
  width: ${({ $variant }) => ($variant === 'avatar' ? '120px' : '100%')};

  ${({ $variant }) =>
    $variant === 'avatar' &&
    css`
      aspect-ratio: 1;
      height: 120px;
      padding: ${spacing.xs};
    `}

  &:hover {
    background: ${({ $disabled, $hasError }) => {
      if ($disabled) return color.neutral50;
      if ($hasError) return color.errorBackground;
      return brandColor.landingBgYellow;
    }};
    border-color: ${({ $disabled, $hasError }) => {
      if ($disabled) return color.neutral300;
      if ($hasError) return color.error;
      return brandColor.landingPinkVibrant;
    }};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadIcon = styled.div<{ $variant: FileUploaderVariant }>`
  align-items: center;
  background: ${color.white};
  border-radius: ${shape.full};
  box-shadow: ${elevation.sm};
  color: ${brandColor.landingPinkVibrant};
  display: flex;
  height: ${({ $variant }) => ($variant === 'avatar' ? '40px' : '56px')};
  justify-content: center;
  width: ${({ $variant }) => ($variant === 'avatar' ? '40px' : '56px')};

  svg {
    height: ${({ $variant }) => ($variant === 'avatar' ? '20px' : '28px')};
    width: ${({ $variant }) => ($variant === 'avatar' ? '20px' : '28px')};
  }
`;

export const UploadText = styled.span<{ $variant: FileUploaderVariant }>`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${({ $variant }) =>
    $variant === 'compact' ? typography.size.sm : typography.size.base};
  font-weight: ${typography.weight.medium};
  text-align: center;
`;

export const UploadHint = styled.span`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  text-align: center;
`;

export const HighlightText = styled.span`
  color: ${brandColor.landingPinkVibrant};
  font-weight: ${typography.weight.semibold};
`;

export const Label = styled.label`
  color: ${brandColor.landingBlueDark};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  margin-bottom: ${spacing.xs};
`;

export const ErrorMessage = styled.span`
  color: ${color.error};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  margin-top: ${spacing.xs};
`;

export const PreviewContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  width: 100%;
`;

export const PreviewImage = styled.img<{ $variant: FileUploaderVariant }>`
  border-radius: ${({ $variant }) => ($variant === 'avatar' ? shape.full : shape.md)};
  height: ${({ $variant }) => ($variant === 'avatar' ? '80px' : '120px')};
  object-fit: cover;
  width: ${({ $variant }) => ($variant === 'avatar' ? '80px' : 'auto')};
`;

export const PreviewVideo = styled.video`
  border-radius: ${shape.md};
  max-height: 120px;
  max-width: 100%;
`;

export const FileInfo = styled.div`
  align-items: center;
  background: ${color.white};
  border-radius: ${shape.md};
  display: flex;
  gap: ${spacing.sm};
  padding: ${spacing.sm};
  width: 100%;
`;

export const FileIcon = styled.div`
  align-items: center;
  background: ${color.primary100};
  border-radius: ${shape.sm};
  color: ${color.primary700};
  display: flex;
  height: ${spacing.xl};
  justify-content: center;
  width: ${spacing.xl};

  svg {
    height: ${spacing.sm};
    width: ${spacing.sm};
  }
`;

export const FileDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${spacing.micro};
  min-width: 0;
`;

export const FileName = styled.span`
  color: ${color.neutral700};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileSize = styled.span`
  color: ${color.neutral500};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
`;

export const RemoveButton = styled.button`
  align-items: center;
  background: ${color.errorBackground};
  border: none;
  border-radius: ${shape.full};
  color: ${color.error};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: ${spacing.lg};
  justify-content: center;
  transition: all 0.2s ease-in-out;
  width: ${spacing.lg};

  &:hover {
    background: ${color.error};
    color: ${color.white};
  }

  svg {
    height: ${spacing.sm};
    width: ${spacing.sm};
  }
`;

export const ProgressOverlay = styled.div`
  align-items: center;
  background: rgb(${color.white} / 0.9);
  border-radius: ${shape.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  inset: 0;
  justify-content: center;
  position: absolute;
`;

export const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border: 3px solid ${color.neutral200};
  border-radius: ${shape.full};
  border-top-color: ${brandColor.landingPinkVibrant};
  height: ${spacing.lg};
  width: ${spacing.lg};
`;

export const ProgressText = styled.span`
  animation: ${pulse} 1.5s ease-in-out infinite;
  color: ${brandColor.landingPinkVibrant};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
`;

export const ProgressBar = styled.div`
  background: ${color.neutral200};
  border-radius: ${shape.full};
  height: 4px;
  overflow: hidden;
  width: 80%;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  background: ${brandColor.landingPinkVibrant};
  border-radius: ${shape.full};
  height: 100%;
  transition: width 0.3s ease-in-out;
  width: ${({ $progress }) => $progress}%;
`;
