import {
  CancelButton,
  CharCount,
  CountryDropdown,
  CountryDropdownIcon,
  CountryInput,
  CountryOption,
  CountrySelectorWrapper,
  DisabledNote,
  ErrorMessage,
  ErrorText,
  FormCard,
  FormField,
  FormGrid,
  FormSection,
  FullWidthField,
  HeaderActions,
  HeaderRow,
  HeaderTitles,
  Input,
  Label,
  LabelText,
  NoResults,
  RequiredAsterisk,
  SaveButton,
  SectionTitle,
  SuccessMessage,
  TextArea,
} from './ProfileEditScreen.styled';

describe('ProfileEditScreen Styled Components', () => {
  it('HeaderRow está definido', () => {
    expect(HeaderRow).toBeDefined();
  });

  it('HeaderTitles está definido', () => {
    expect(HeaderTitles).toBeDefined();
  });

  it('HeaderActions está definido', () => {
    expect(HeaderActions).toBeDefined();
  });

  it('FormCard está definido', () => {
    expect(FormCard).toBeDefined();
  });

  it('FormSection está definido', () => {
    expect(FormSection).toBeDefined();
  });

  it('SectionTitle está definido', () => {
    expect(SectionTitle).toBeDefined();
  });

  it('FormGrid está definido', () => {
    expect(FormGrid).toBeDefined();
  });

  it('FormField está definido', () => {
    expect(FormField).toBeDefined();
  });

  it('exporta todos los componentes styled', () => {
    expect(HeaderRow).toBeDefined();
    expect(HeaderTitles).toBeDefined();
    expect(HeaderActions).toBeDefined();
    expect(FormCard).toBeDefined();
    expect(FormSection).toBeDefined();
    expect(SectionTitle).toBeDefined();
    expect(FormGrid).toBeDefined();
    expect(FormField).toBeDefined();
    expect(FullWidthField).toBeDefined();
    expect(Label).toBeDefined();
    expect(CharCount).toBeDefined();
    expect(RequiredAsterisk).toBeDefined();
    expect(LabelText).toBeDefined();
    expect(Input).toBeDefined();
    expect(TextArea).toBeDefined();
    expect(ErrorText).toBeDefined();
    expect(CancelButton).toBeDefined();
    expect(SaveButton).toBeDefined();
    expect(SuccessMessage).toBeDefined();
    expect(ErrorMessage).toBeDefined();
    expect(DisabledNote).toBeDefined();
    expect(CountrySelectorWrapper).toBeDefined();
    expect(CountryInput).toBeDefined();
    expect(CountryDropdownIcon).toBeDefined();
    expect(CountryDropdown).toBeDefined();
    expect(CountryOption).toBeDefined();
    expect(NoResults).toBeDefined();
  });
});
