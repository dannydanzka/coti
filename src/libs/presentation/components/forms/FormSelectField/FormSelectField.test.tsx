import { assertTexts, form, render, screen, userEvent } from '@testing';

import { FormSelectField } from './FormSelectField';

const options = [
  { label: 'Estándar', value: 'STANDARD' },
  { label: 'Cierre', value: 'CLOSURE' },
];

describe('FormSelectField', () => {
  it('renders label and options', () => {
    render(
      <FormSelectField id='type' label='Tipo' options={options} value='' onChange={() => {}} />
    );
    form.assertField('Tipo');
    assertTexts(['Estándar', 'Cierre']);
  });

  it('shows error message', () => {
    render(
      <FormSelectField
        error='Seleccione un tipo'
        id='type'
        label='Tipo'
        options={options}
        value=''
        onChange={() => {}}
      />
    );
    form.assertError('Seleccione un tipo');
  });

  it('calls onChange on selection', async () => {
    const onChange = vi.fn();
    render(
      <FormSelectField id='type' label='Tipo' options={options} value='' onChange={onChange} />
    );
    await userEvent.selectOptions(screen.getByLabelText(/Tipo/), 'CLOSURE');
    expect(onChange).toHaveBeenCalledWith('CLOSURE');
  });
});
