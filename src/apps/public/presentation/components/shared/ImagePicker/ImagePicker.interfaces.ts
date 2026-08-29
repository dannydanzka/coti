/**
 * ImagePicker Interfaces
 *
 * Local image picker with preview (no automatic upload).
 * For use when entity doesn't exist yet (creation flows).
 */

export interface ImagePickerProps {
  /** Current image URL (for edit mode) */
  currentUrl?: string | null;
  /** Hint text below the picker */
  hint?: string;
  /** Called when file is selected */
  onFileSelect: (file: File | null) => void;
}
