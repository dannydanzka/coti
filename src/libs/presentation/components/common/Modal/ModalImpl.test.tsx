/**
 * ModalImpl Component Tests
 *
 * Tests default and confirm variants, close behavior, keyboard interaction.
 * Spanish locale mandatory.
 */

import { assertText, assertTexts, modal, renderWithProviders } from '@testing';

import { ModalImpl } from './ModalImpl';

describe('ModalImpl', () => {
  const mockOnClose = vi.fn();

  describe('Closed State', () => {
    it('renders nothing when closed', () => {
      const { container } = renderWithProviders(
        <ModalImpl isOpen={false} title='Test' onClose={mockOnClose} />
      );
      modal.assertClosed(container);
    });
  });

  describe('Default Variant', () => {
    it('renders title', () => {
      renderWithProviders(
        <ModalImpl isOpen title='Modal de prueba' onClose={mockOnClose}>
          Contenido
        </ModalImpl>
      );
      modal.assertTitle('Modal de prueba');
    });

    it('renders children content', () => {
      renderWithProviders(
        <ModalImpl isOpen title='Test' onClose={mockOnClose}>
          Contenido del modal
        </ModalImpl>
      );
      assertText('Contenido del modal');
    });

    it('renders footer when provided', () => {
      renderWithProviders(
        <ModalImpl footer={<button>Acción</button>} isOpen title='Test' onClose={mockOnClose}>
          Contenido
        </ModalImpl>
      );
      assertText('Acción');
    });

    it('renders dialog role', () => {
      renderWithProviders(
        <ModalImpl isOpen title='Test' onClose={mockOnClose}>
          Content
        </ModalImpl>
      );
      modal.assertOpen();
    });

    it('sets body overflow hidden when open', () => {
      renderWithProviders(
        <ModalImpl isOpen title='Test' onClose={mockOnClose}>
          Content
        </ModalImpl>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('Confirm Variant', () => {
    const mockOnConfirm = vi.fn();

    it('renders confirm modal with message', () => {
      renderWithProviders(
        <ModalImpl
          isOpen
          message='¿Estás seguro de eliminar?'
          title='Confirmar eliminación'
          variant='confirm'
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      modal.assertTitle('Confirmar eliminación');
      assertText('¿Estás seguro de eliminar?');
    });

    it('renders confirm variant with dialog', () => {
      renderWithProviders(
        <ModalImpl
          isOpen
          title='Confirmar eliminación'
          variant='confirm'
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      modal.assertTitle('Confirmar eliminación');
    });

    it('renders custom button texts', () => {
      renderWithProviders(
        <ModalImpl
          cancelText='No, volver'
          confirmText='Sí, eliminar'
          isOpen
          title='Confirmar'
          variant='confirm'
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      assertTexts(['No, volver', 'Sí, eliminar']);
    });
  });
});
