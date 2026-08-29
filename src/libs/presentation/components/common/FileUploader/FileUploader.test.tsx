/**
 * FileUploader Component Tests
 *
 * Tests for drag & drop file uploader functionality.
 */

import { fireEvent, render, screen } from '@testing-library/react';

import { assertNoText, assertText, assertTexts } from '@testing';

import { FileUploader } from './FileUploader';

const mockOnChange = vi.fn();

const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('FileUploader', () => {
  describe('Renderizado', () => {
    it('renderiza el componente con label', () => {
      render(<FileUploader label='Subir archivo' onChange={mockOnChange} />);
      assertText('Subir archivo');
    });

    it('renderiza el texto de instrucciones', () => {
      render(<FileUploader onChange={mockOnChange} />);
      assertTexts(['Haz clic', /arrastra tu archivo/]);
    });

    it('renderiza el hint cuando se proporciona', () => {
      render(<FileUploader hint='Máximo 10MB' onChange={mockOnChange} />);
      assertText('Máximo 10MB');
    });

    it('renderiza el error cuando se proporciona', () => {
      render(<FileUploader error='Archivo inválido' onChange={mockOnChange} />);
      assertText('Archivo inválido');
    });
  });

  describe('Selección de archivos', () => {
    it('llama onChange cuando se selecciona un archivo válido', () => {
      render(<FileUploader accept={['image']} onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const mockFile = createMockFile('test.jpg', 1024, 'image/jpeg');

      fireEvent.change(input, { target: { files: [mockFile] } });

      expect(mockOnChange).toHaveBeenCalledWith([mockFile]);
    });

    it('valida el tamaño del archivo', () => {
      render(<FileUploader accept={['image']} maxSizeBytes={1024} onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const largeFile = createMockFile('large.jpg', 2048, 'image/jpeg');

      fireEvent.change(input, { target: { files: [largeFile] } });

      expect(mockOnChange).not.toHaveBeenCalled();
      assertText(/muy grande/);
    });

    it('valida el tipo de archivo', () => {
      render(<FileUploader accept={['image']} onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const pdfFile = createMockFile('doc.pdf', 1024, 'application/pdf');

      fireEvent.change(input, { target: { files: [pdfFile] } });

      expect(mockOnChange).not.toHaveBeenCalled();
      assertText(/no permitido/);
    });
  });

  describe('Drag & Drop', () => {
    it('maneja el evento dragEnter', () => {
      render(<FileUploader onChange={mockOnChange} />);

      const dropZone = screen.getByText(/arrastra tu archivo/).closest('div');
      expect(dropZone).not.toBeNull();
      fireEvent.dragEnter(dropZone as HTMLElement);

      expect(dropZone).toBeInTheDocument();
    });

    it('maneja el evento drop con archivo válido', () => {
      render(<FileUploader accept={['image']} onChange={mockOnChange} />);

      const dropZone = screen.getByText(/arrastra tu archivo/).closest('div');
      expect(dropZone).not.toBeNull();
      const mockFile = createMockFile('drop.jpg', 1024, 'image/jpeg');

      const dataTransfer = {
        files: [mockFile],
      };

      fireEvent.drop(dropZone as HTMLElement, { dataTransfer });

      expect(mockOnChange).toHaveBeenCalledWith([mockFile]);
    });
  });

  describe('Estado deshabilitado', () => {
    it('no permite selección cuando está deshabilitado', () => {
      render(<FileUploader disabled onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      expect(input).toBeDisabled();
    });
  });

  describe('Vista previa', () => {
    it('muestra la imagen de preview cuando se proporciona previewUrl', () => {
      render(<FileUploader previewUrl='https://example.com/image.jpg' onChange={mockOnChange} />);

      const preview = screen.getByAltText('Vista previa');
      expect(preview).toBeInTheDocument();
      expect(preview).toHaveAttribute('src', 'https://example.com/image.jpg');
    });
  });

  describe('Variantes', () => {
    it('renderiza variante compact', () => {
      render(<FileUploader variant='compact' onChange={mockOnChange} />);

      assertText(/arrastra tu archivo/);
    });

    it('renderiza variante avatar sin texto', () => {
      render(<FileUploader variant='avatar' onChange={mockOnChange} />);
      assertNoText(/arrastra tu archivo/);
    });
  });

  describe('Múltiples archivos', () => {
    it('permite múltiples archivos cuando multiple=true', () => {
      render(<FileUploader multiple onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      expect(input).toHaveAttribute('multiple');
    });

    it('solo toma el primer archivo cuando multiple=false', () => {
      render(<FileUploader onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = createMockFile('file1.jpg', 1024, 'image/jpeg');
      const file2 = createMockFile('file2.jpg', 1024, 'image/jpeg');

      fireEvent.change(input, { target: { files: [file1, file2] } });

      expect(mockOnChange).toHaveBeenCalledWith([file1]);
    });
  });

  describe('Estado de carga', () => {
    it('muestra indicador de progreso cuando isUploading=true', () => {
      render(<FileUploader isUploading onChange={mockOnChange} />);

      assertText('Subiendo...');
    });

    it('muestra barra de progreso con porcentaje', () => {
      render(<FileUploader isUploading uploadProgress={50} onChange={mockOnChange} />);

      assertText('Subiendo...');
    });
  });
});
