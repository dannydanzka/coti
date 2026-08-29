/**
 * AdminForm Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  CheckboxInput,
  CheckboxLabel,
  CheckboxWrapper,
  FormActions,
  FormButtonGroup,
  FormError,
  FormFieldError,
  FormGroup,
  FormHint,
  FormInput,
  FormLabel,
  FormOption,
  FormRow,
  FormRow3,
  FormSelect,
  FormTextarea,
  PasswordInputWrapper,
  PasswordToggle,
  RadioGroup,
  RadioInput,
  RadioLabel,
  RadioWrapper,
  SwitchInput,
  SwitchLabel,
  SwitchTrack,
  SwitchWrapper,
} from './AdminForm.styled';

describe('AdminForm Styled Components', () => {
  it('should export all styled components', () => {
    expect(FormGroup).toBeDefined();
    expect(FormLabel).toBeDefined();
    expect(FormInput).toBeDefined();
    expect(FormSelect).toBeDefined();
    expect(FormOption).toBeDefined();
    expect(FormTextarea).toBeDefined();
    expect(FormError).toBeDefined();
    expect(FormActions).toBeDefined();
    expect(PasswordInputWrapper).toBeDefined();
    expect(PasswordToggle).toBeDefined();
    expect(FormHint).toBeDefined();
    expect(FormRow).toBeDefined();
    expect(FormRow3).toBeDefined();
    expect(CheckboxWrapper).toBeDefined();
    expect(CheckboxInput).toBeDefined();
    expect(CheckboxLabel).toBeDefined();
    expect(RadioGroup).toBeDefined();
    expect(RadioWrapper).toBeDefined();
    expect(RadioInput).toBeDefined();
    expect(RadioLabel).toBeDefined();
    expect(SwitchWrapper).toBeDefined();
    expect(SwitchInput).toBeDefined();
    expect(SwitchTrack).toBeDefined();
    expect(SwitchLabel).toBeDefined();
    expect(FormFieldError).toBeDefined();
    expect(FormButtonGroup).toBeDefined();
  });
});
