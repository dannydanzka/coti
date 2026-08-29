/**
 * FileUploader Component
 *
 * Reusable drag & drop file uploader with Landing-style design.
 * Supports default, compact, and avatar variants.
 */

'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { AcceptedFileType, FileUploaderProps } from './FileUploader.interfaces';
import { FILE_TYPE_CATEGORIES, FILE_UPLOADER_VARIANTS } from './FileUploader.constants';
import { formatFileSize } from './FileUploader.helpers';

import {
  DropZone,
  ErrorMessage,
  FileDetails,
  FileIcon as FileIconWrapper,
  FileInfo,
  FileName,
  FileSize,
  FileUploaderWrapper,
  HiddenInput,
  HighlightText,
  Label,
  PreviewContainer,
  PreviewImage,
  PreviewVideo,
  ProgressBar,
  ProgressFill,
  ProgressOverlay,
  ProgressText,
  RemoveButton,
  Spinner,
  UploadHint,
  UploadIcon,
  UploadText,
} from './FileUploader.styled';

const UploadCloudSvg = () => (
  <svg fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
    <path
      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ImageSvg = () => (
  <svg fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
    <rect height='18' rx='2' ry='2' width='18' x='3' y='3' />
    <circle cx='8.5' cy='8.5' r='1.5' />
    <path d='M21 15l-5-5L5 21' />
  </svg>
);

const VideoSvg = () => (
  <svg fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
    <rect height='14' rx='2' ry='2' width='15' x='2' y='5' />
    <path d='M17 9l5-3v12l-5-3z' />
  </svg>
);

const FileSvg = () => (
  <svg fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
    <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
    <path d='M14 2v6h6M16 13H8M16 17H8M10 9H8' />
  </svg>
);

const TrashSvg = () => (
  <svg fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
    <path
      d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const MIME_TYPE_MAP: Record<AcceptedFileType, string[]> = {
  any: ['*/*'],
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'],
  video: ['video/mp4', 'video/quicktime', 'video/webm', 'video/mpeg'],
};

const getFileType = (file: File): 'image' | 'video' | 'document' => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  return 'document';
};

export const FileUploader = ({
  accept = ['image'],
  className,
  disabled = false,
  error,
  hint,
  isUploading = false,
  label,
  maxSizeBytes = 10 * 1024 * 1024,
  multiple = false,
  onChange,
  onRemove,
  previewUrl,
  uploadProgress,
  value = [],
  variant = 'default',
}: FileUploaderProps) => {
  const { t } = useTranslation();
  const [isDragActive, setIsDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptString = useMemo(() => {
    if (accept.includes('any')) return '*/*';
    return accept.flatMap((type) => MIME_TYPE_MAP[type]).join(',');
  }, [accept]);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxSizeBytes) {
        return `El archivo es muy grande (${formatFileSize(file.size)}). Máximo: ${formatFileSize(maxSizeBytes)}`;
      }

      if (!accept.includes('any')) {
        const allowedMimes = accept.flatMap((type) => MIME_TYPE_MAP[type]);
        if (!allowedMimes.some((mime) => file.type.match(mime.replace('*', '.*')))) {
          return `Tipo de archivo no permitido. Solo se aceptan: ${accept.join(', ')}`;
        }
      }

      return null;
    },
    [accept, maxSizeBytes]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0 || disabled) return;

      setLocalError(null);
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setLocalError(validationError);
          return;
        }
      }

      const [firstFile] = fileArray;
      if (!firstFile) return;
      const filesToAdd = multiple ? fileArray : [firstFile];
      onChange(filesToAdd);
    },
    [disabled, multiple, onChange, validateFile]
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragActive(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragActive(true);
      }
    },
    [disabled]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (disabled) return;

      const { files } = e.dataTransfer;
      handleFiles(files);
    },
    [disabled, handleFiles]
  );

  const handleClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [handleFiles]
  );

  const handleRemove = useCallback(
    (index: number) => {
      if (onRemove) {
        onRemove(index);
      }
    },
    [onRemove]
  );

  const handleRemoveFirst = useCallback(() => {
    handleRemove(0);
  }, [handleRemove]);

  const displayError = error ?? localError;
  const hasPreview = previewUrl ?? value.length > 0;
  const [currentFile] = value;

  const renderFileInfo = (icon: React.ReactNode, file: File) => (
    <FileInfo>
      <FileIconWrapper>{icon}</FileIconWrapper>
      <FileDetails>
        <FileName>{file.name}</FileName>
        <FileSize>{formatFileSize(file.size)}</FileSize>
      </FileDetails>
      {onRemove && (
        <RemoveButton type='button' onClick={handleRemoveFirst}>
          <TrashSvg />
        </RemoveButton>
      )}
    </FileInfo>
  );

  const renderImagePreview = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    return (
      <PreviewContainer>
        <PreviewImage $variant={variant} alt={file.name} src={objectUrl} />
        {variant !== FILE_UPLOADER_VARIANTS.AVATAR && renderFileInfo(<ImageSvg />, file)}
      </PreviewContainer>
    );
  };

  const renderVideoPreview = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    return (
      <PreviewContainer>
        <PreviewVideo controls src={objectUrl} />
        {renderFileInfo(<VideoSvg />, file)}
      </PreviewContainer>
    );
  };

  const renderPreview = () => {
    if (previewUrl) {
      const isVideo = previewUrl.match(/\.(mp4|webm|mov)$/i);
      if (isVideo) return <PreviewVideo controls src={previewUrl} />;
      return <PreviewImage $variant={variant} alt='Vista previa' src={previewUrl} />;
    }

    if (currentFile) {
      const fileType = getFileType(currentFile);
      if (fileType === FILE_TYPE_CATEGORIES.IMAGE) return renderImagePreview(currentFile);
      if (fileType === FILE_TYPE_CATEGORIES.VIDEO) return renderVideoPreview(currentFile);
      return renderFileInfo(<FileSvg />, currentFile);
    }

    return null;
  };

  const renderUploadArea = () => {
    if (hasPreview && !isUploading) {
      return renderPreview();
    }

    return (
      <>
        <UploadIcon $variant={variant}>
          <UploadCloudSvg />
        </UploadIcon>
        {variant !== FILE_UPLOADER_VARIANTS.AVATAR && (
          <>
            <UploadText $variant={variant}>
              <HighlightText>{t('public.profile.clickToUpload')}</HighlightText>{' '}
              {t('media.selectOrDrag')}
            </UploadText>
            {hint && <UploadHint>{hint}</UploadHint>}
          </>
        )}
      </>
    );
  };

  return (
    <FileUploaderWrapper className={className}>
      {label && <Label>{label}</Label>}
      <DropZone
        $disabled={disabled}
        $hasError={Boolean(displayError)}
        $isDragActive={isDragActive}
        $variant={variant}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <HiddenInput
          accept={acceptString}
          disabled={disabled}
          multiple={multiple}
          ref={inputRef}
          type='file'
          onChange={handleInputChange}
        />

        {renderUploadArea()}

        {isUploading && (
          <ProgressOverlay>
            <Spinner />
            <ProgressText>{t('common.uploading')}</ProgressText>
            {uploadProgress !== undefined && (
              <ProgressBar>
                <ProgressFill $progress={uploadProgress} />
              </ProgressBar>
            )}
          </ProgressOverlay>
        )}
      </DropZone>
      {displayError && <ErrorMessage>{displayError}</ErrorMessage>}
    </FileUploaderWrapper>
  );
};
