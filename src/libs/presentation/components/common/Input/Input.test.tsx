import { assertText, form, render, screen, user } from '@testing';

import { Input } from './Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input id='email' label='Correo electrónico' name='email' value='' />);
    form.assertField('Correo electrónico');
  });

  it('shows required indicator', () => {
    render(<Input id='name' label='Nombre' name='name' required value='' />);
    assertText('*');
  });

  it('displays error message', () => {
    render(<Input error='Email inválido' id='email' label='Email' name='email' value='' />);
    form.assertError('Email inválido');
  });

  it('calls onChange with value', async () => {
    const onChange = vi.fn();
    render(<Input id='name' label='Nombre' name='name' value='' onChange={onChange} />);
    await user.typeInField('Nombre', 'M');
    expect(onChange).toHaveBeenCalledWith('M');
  });

  it('toggles password visibility', async () => {
    render(<Input id='pass' label='Contraseña' name='password' type='password' value='secret' />);
    const input = form.assertField('Contraseña', 'password');
    const userInstance = user.setup();
    const toggleButton = screen.getByRole('button');
    await userInstance.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled id='test' label='Test' name='test' value='' />);
    expect(screen.getByLabelText('Test')).toBeDisabled();
  });
});
