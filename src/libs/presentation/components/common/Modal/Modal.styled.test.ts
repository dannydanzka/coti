import {
  BaseModalContainer,
  BaseModalFooter,
  ModalActions,
  ModalContent,
  ModalHeader,
  ModalIcon,
  ModalMessage,
  ModalOverlay,
  ModalTitle,
} from './Modal.styled';

describe('Modal Styled Components', () => {
  it('ModalOverlay está definido', () => {
    expect(ModalOverlay).toBeDefined();
  });

  it('BaseModalContainer está definido', () => {
    expect(BaseModalContainer).toBeDefined();
  });

  it('ModalHeader está definido', () => {
    expect(ModalHeader).toBeDefined();
  });

  it('ModalTitle está definido', () => {
    expect(ModalTitle).toBeDefined();
  });

  it('ModalContent está definido', () => {
    expect(ModalContent).toBeDefined();
  });

  it('BaseModalFooter está definido', () => {
    expect(BaseModalFooter).toBeDefined();
  });

  it('ModalIcon está definido', () => {
    expect(ModalIcon).toBeDefined();
  });

  it('ModalMessage está definido', () => {
    expect(ModalMessage).toBeDefined();
  });

  it('exporta todos los componentes styled', () => {
    expect(ModalOverlay).toBeDefined();
    expect(BaseModalContainer).toBeDefined();
    expect(ModalHeader).toBeDefined();
    expect(ModalTitle).toBeDefined();
    expect(ModalContent).toBeDefined();
    expect(BaseModalFooter).toBeDefined();
    expect(ModalIcon).toBeDefined();
    expect(ModalMessage).toBeDefined();
    expect(ModalActions).toBeDefined();
  });
});
