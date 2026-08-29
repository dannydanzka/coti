/**
 * ImagePicker Component
 *
 * Drag-and-drop image picker with local preview.
 * Does NOT upload automatically - parent handles upload.
 *
 * Usage:
 * - For creation flows where entity ID doesn't exist yet
 * - Parent receives File object and handles upload after entity creation
 */

'use client';

import { Camera, X } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ImagePickerProps } from './ImagePicker.interfaces';

import {
  Container,
  DropZone,
  HiddenInput,
  Hint,
  Placeholder,
  PlaceholderText,
  PreviewImage,
  RemoveButton,
} from './ImagePicker.styled';

const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp';

export const ImagePicker = ({ currentUrl, hint, onFileSelect }: ImagePickerProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const displayUrl = useMemo(() => localPreview ?? currentUrl, [localPreview, currentUrl]);
  const hasImage = Boolean(displayUrl);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setLocalPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      handleFileChange(file);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0] ?? null;
      if (file?.type.startsWith('image/')) {
        handleFileChange(file);
      }
    },
    [handleFileChange]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setLocalPreview(null);
      onFileSelect(null);
    },
    [onFileSelect]
  );

  return (
    <Container>
      <DropZone
        $hasImage={hasImage}
        $isDragging={isDragging}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <HiddenInput
          accept={ACCEPTED_TYPES}
          ref={inputRef}
          type='file'
          onChange={handleInputChange}
        />
        {hasImage ? (
          <>
            <PreviewImage alt='Preview' src={displayUrl ?? ''} />
            <RemoveButton type='button' onClick={handleRemove}>
              <X size={14} />
            </RemoveButton>
          </>
        ) : (
          <Placeholder>
            <Camera size={32} />
            <PlaceholderText>{t('common.dragOrClick')}</PlaceholderText>
          </Placeholder>
        )}
      </DropZone>
      {hint && <Hint>{hint}</Hint>}
    </Container>
  );
};
