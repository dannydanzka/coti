/**
 * FileUploader Interfaces
 *
 * Types for the reusable file upload component.
 * Supports drag & drop, click to upload, and preview.
 */

export type FileUploaderVariant = 'default' | 'compact' | 'avatar';

export type AcceptedFileType = 'image' | 'video' | 'document' | 'any';

export interface FileUploaderProps {
  accept?: AcceptedFileType[];
  className?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  isUploading?: boolean;
  label?: string;
  maxSizeBytes?: number;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  onRemove?: (index: number) => void;
  previewUrl?: string | null;
  uploadProgress?: number;
  value?: File[];
  variant?: FileUploaderVariant;
}

export interface FilePreview {
  file: File;
  previewUrl: string;
  type: 'image' | 'video' | 'document';
}

export interface DropZoneProps {
  $disabled?: boolean;
  $hasError?: boolean;
  $isDragActive?: boolean;
  $variant: FileUploaderVariant;
}
