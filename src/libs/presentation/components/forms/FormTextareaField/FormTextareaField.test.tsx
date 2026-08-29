import { assertText, form, render, screen, user } from '@testing';

import { FormTextareaField } from './FormTextareaField';

describe('FormTextareaField', () => {
  it('renders with label', () => {
    render(<FormTextareaField id='desc' label='Descripción' value='' onChange={() => {}} />);
    assertText(/Descripción/);
  });

  it('renders with placeholder', () => {
    render(
      <FormTextareaField
        id='msg'
        label='Mensaje'
        placeholder='Escribe tu mensaje'
        value=''
        onChange={() => {}}
      />
    );
    expect(screen.getByPlaceholderText('Escribe tu mensaje')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<FormTextareaField id='req' label='Comentario' required value='' onChange={() => {}} />);
    assertText(/Comentario/);
  });

  it('shows error message', () => {
    render(
      <FormTextareaField
        error='Campo requerido'
        id='err'
        label='Nota'
        value=''
        onChange={() => {}}
      />
    );
    form.assertError('Campo requerido');
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    render(<FormTextareaField id='typing' label='Texto' value='' onChange={onChange} />);
    const userInstance = user.setup();
    const textarea = screen.getByRole('textbox');
    await userInstance.type(textarea, 'Hola');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders disabled', () => {
    render(
      <FormTextareaField disabled id='dis' label='Deshabilitado' value='' onChange={() => {}} />
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
