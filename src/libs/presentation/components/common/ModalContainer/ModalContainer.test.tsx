import type { ActiveModal } from '@redux';
import { assertNoText, assertTexts, renderWithProviders, screen, user } from '@testing';

import { ModalContainer } from './ModalContainer';

const mockUseModal = {
  activeModals: [] as ActiveModal[],
  clearAll: vi.fn(),
  closeModal: vi.fn(),
  hasModals: false,
  showAlert: vi.fn(),
  showConfirm: vi.fn(),
  showCustomModal: vi.fn(),
  showDismissible: vi.fn(),
  showFixed: vi.fn(),
  topModal: null as ActiveModal | null,
};

vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@hooks')>();
  return {
    ...actual,
    useModal: () => mockUseModal,
  };
});

describe('ModalContainer', () => {
  beforeEach(() => {
    mockUseModal.activeModals = [];
    mockUseModal.hasModals = false;
    mockUseModal.topModal = null;
    mockUseModal.closeModal = vi.fn();
  });

  it('renders nothing when no modals active', () => {
    renderWithProviders(<ModalContainer />);
    assertNoText(/modal/i);
  });

  it('renders modal content and title', () => {
    const modal = {
      config: {
        actions: [],
        canCloseOnBackdrop: false,
        canCloseOnEscape: true,
        content: 'Error procesando solicitud de María García',
        id: 'test-modal',
        showCloseButton: true,
        title: 'Error del Sistema',
        type: 'alert' as const,
      },
      id: 'test-modal',
    };

    mockUseModal.activeModals = [modal];
    mockUseModal.hasModals = true;

    renderWithProviders(<ModalContainer />);

    assertTexts(['Error del Sistema', 'Error procesando solicitud de María García']);
  });

  it('closes modal when close button clicked', async () => {
    const modal = {
      config: {
        actions: [],
        canCloseOnBackdrop: false,
        canCloseOnEscape: true,
        content: 'Contenido modal',
        id: 'closable-modal',
        showCloseButton: true,
        title: 'Modal con Cierre',
        type: 'alert' as const,
      },
      id: 'closable-modal',
    };

    mockUseModal.activeModals = [modal];
    const userEvent = user.setup();

    renderWithProviders(<ModalContainer />);

    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);

    expect(mockUseModal.closeModal).toHaveBeenCalledWith('closable-modal');
  });

  it('executes action when action button clicked', async () => {
    const mockAction = vi.fn();
    const modal = {
      config: {
        actions: [
          { label: 'Confirmar Eliminación', onClick: mockAction, variant: 'primary' as const },
        ],
        canCloseOnBackdrop: false,
        canCloseOnEscape: true,
        content: '¿Eliminar usuario José Martínez?',
        id: 'action-modal',
        showCloseButton: true,
        title: 'Confirmar Acción',
        type: 'confirm' as const,
      },
      id: 'action-modal',
    };

    mockUseModal.activeModals = [modal];
    const userEvent = user.setup();

    renderWithProviders(<ModalContainer />);

    const actionButton = screen.getByText('Confirmar Eliminación');
    await userEvent.click(actionButton);

    expect(mockAction).toHaveBeenCalledOnce();
  });

  it('closes on Escape key when enabled', () => {
    const modal = {
      config: {
        actions: [],
        canCloseOnBackdrop: false,
        canCloseOnEscape: true,
        content: 'Presiona Escape para cerrar',
        id: 'escape-modal',
        showCloseButton: true,
        title: 'Modal Escapable',
        type: 'alert' as const,
      },
      id: 'escape-modal',
    };

    mockUseModal.activeModals = [modal];

    renderWithProviders(<ModalContainer />);

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(mockUseModal.closeModal).toHaveBeenCalledWith('escape-modal');
  });
});
