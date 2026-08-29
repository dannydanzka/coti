import { assertText, form, render, user } from '@testing';

import { FormTextField } from './FormTextField';

describe('FormTextField', () => {
  it('renders label and input', () => {
    render(<FormTextField id='name' label='Nombre' value='' onChange={() => {}} />);
    form.assertField('Nombre');
  });

  it('shows error message', () => {
    render(
      <FormTextField error='Email inválido' id='email' label='Email' value='' onChange={() => {}} />
    );
    form.assertError('Email inválido');
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    render(<FormTextField id='name' label='Nombre' value='' onChange={onChange} />);
    await user.typeInField('Nombre', 'M');
    expect(onChange).toHaveBeenCalledWith('M');
  });

  it('shows required indicator', () => {
    render(<FormTextField id='name' label='Nombre' required value='' onChange={() => {}} />);
    assertText(/Nombre \*/);
  });
});
