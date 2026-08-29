/**
 * PublicForm Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  PublicForm,
  PublicFormActions,
  PublicFormError,
  PublicFormGroup,
  PublicFormHint,
  PublicFormInput,
  PublicFormLabel,
  PublicFormMessage,
  PublicFormRow,
  PublicFormSelect,
  PublicFormTextarea,
} from './PublicForm.styled';

describe('PublicForm Styled Components', () => {
  it('should export all styled components', () => {
    expect(PublicForm).toBeDefined();
    expect(PublicFormGroup).toBeDefined();
    expect(PublicFormLabel).toBeDefined();
    expect(PublicFormInput).toBeDefined();
    expect(PublicFormTextarea).toBeDefined();
    expect(PublicFormSelect).toBeDefined();
    expect(PublicFormMessage).toBeDefined();
    expect(PublicFormError).toBeDefined();
    expect(PublicFormHint).toBeDefined();
    expect(PublicFormActions).toBeDefined();
    expect(PublicFormRow).toBeDefined();
  });
});
