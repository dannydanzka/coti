/** ProfileEditScreen - Form for editing user profile information. */
'use client';

import { useTranslation } from 'react-i18next';

import { FIELD_LIMITS } from '@constants';
import {
  PublicContainer,
  PublicPageTitle,
  PublicPageWrapper,
  PublicSection,
  PublicSubtitle,
} from '@components';

import { CountrySelector } from './components';
import type { ProfileEditScreenProps } from './ProfileEditScreen.interfaces';
import { UI_TEXT } from './ProfileEditScreen.constants';
import { useProfileEditForm } from './hooks';

import {
  CancelButton,
  CharCount,
  DisabledNote,
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
  RequiredAsterisk,
  SaveButton,
  SectionTitle,
  TextArea,
} from './ProfileEditScreen.styled';

export const ProfileEditScreen = ({ className }: ProfileEditScreenProps) => {
  const { t } = useTranslation();

  const {
    handleCancel,
    handleCountryChange,
    handleInputChange,
    handleNumericInput,
    handleSubmit,
    isLoading,
    profileForm,
    user,
  } = useProfileEditForm();

  const formData = profileForm.watch();

  if (!user) return null;

  const renderPersonalSection = () => (
    <FormSection>
      <SectionTitle>{UI_TEXT.SECTIONS.PERSONAL}</SectionTitle>
      <FormGrid>
        <FormField>
          <Label>
            <LabelText>
              {UI_TEXT.FIELDS.FIRST_NAME}
              <RequiredAsterisk>*</RequiredAsterisk>
            </LabelText>
            <CharCount>
              {formData.firstName.length}/{FIELD_LIMITS.FIRST_NAME}
            </CharCount>
          </Label>
          <Input
            maxLength={FIELD_LIMITS.FIRST_NAME}
            type='text'
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
          />
        </FormField>
        <FormField>
          <Label>
            <LabelText>
              {UI_TEXT.FIELDS.LAST_NAME}
              <RequiredAsterisk>*</RequiredAsterisk>
            </LabelText>
            <CharCount>
              {formData.lastName.length}/{FIELD_LIMITS.LAST_NAME}
            </CharCount>
          </Label>
          <Input
            maxLength={FIELD_LIMITS.LAST_NAME}
            type='text'
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
          />
        </FormField>
        <FormField>
          <Label>{UI_TEXT.FIELDS.EMAIL}</Label>
          <Input disabled type='email' value={user.email ?? ''} />
          <DisabledNote>{t('admin.users.emailCannotChange')}</DisabledNote>
        </FormField>
        <FormField>
          <Label>
            {UI_TEXT.FIELDS.PHONE}
            <CharCount>
              {formData.phone.length}/{FIELD_LIMITS.PHONE}
            </CharCount>
          </Label>
          <Input
            inputMode='numeric'
            maxLength={FIELD_LIMITS.PHONE}
            pattern='[0-9]*'
            placeholder={UI_TEXT.PLACEHOLDERS.PHONE}
            type='tel'
            value={formData.phone}
            onChange={handleNumericInput('phone')}
          />
        </FormField>
        <FormField>
          <Label>{UI_TEXT.FIELDS.AGE}</Label>
          <Input
            inputMode='numeric'
            max={120}
            min={1}
            pattern='[0-9]*'
            placeholder={UI_TEXT.PLACEHOLDERS.AGE}
            type='number'
            value={formData.age ?? ''}
            onChange={handleInputChange('age')}
          />
        </FormField>
      </FormGrid>
    </FormSection>
  );

  const renderAddressSection = () => (
    <FormSection>
      <SectionTitle>{UI_TEXT.SECTIONS.ADDRESS}</SectionTitle>
      <FormGrid>
        <FormField>
          <Label>
            {UI_TEXT.FIELDS.STREET}
            <CharCount>
              {formData.street.length}/{FIELD_LIMITS.STREET}
            </CharCount>
          </Label>
          <Input
            maxLength={FIELD_LIMITS.STREET}
            placeholder={UI_TEXT.PLACEHOLDERS.STREET}
            type='text'
            value={formData.street}
            onChange={handleInputChange('street')}
          />
        </FormField>
        <FormField>
          <Label>
            {UI_TEXT.FIELDS.NUMBER}
            <CharCount>
              {formData.number.length}/{FIELD_LIMITS.NUMBER}
            </CharCount>
          </Label>
          <Input
            inputMode='numeric'
            maxLength={FIELD_LIMITS.NUMBER}
            pattern='[0-9]*'
            placeholder={UI_TEXT.PLACEHOLDERS.NUMBER}
            type='text'
            value={formData.number}
            onChange={handleNumericInput('number')}
          />
        </FormField>
        <FormField>
          <Label>
            {UI_TEXT.FIELDS.NEIGHBORHOOD}
            <CharCount>
              {formData.neighborhood.length}/{FIELD_LIMITS.NEIGHBORHOOD}
            </CharCount>
          </Label>
          <Input
            maxLength={FIELD_LIMITS.NEIGHBORHOOD}
            placeholder={UI_TEXT.PLACEHOLDERS.NEIGHBORHOOD}
            type='text'
            value={formData.neighborhood}
            onChange={handleInputChange('neighborhood')}
          />
        </FormField>
        <FormField>
          <Label>
            {UI_TEXT.FIELDS.CITY}
            <CharCount>
              {formData.city.length}/{FIELD_LIMITS.CITY}
            </CharCount>
          </Label>
          <Input
            maxLength={FIELD_LIMITS.CITY}
            placeholder={UI_TEXT.PLACEHOLDERS.CITY}
            type='text'
            value={formData.city}
            onChange={handleInputChange('city')}
          />
        </FormField>
        <FormField>
          <Label>
            {UI_TEXT.FIELDS.STATE}
            <CharCount>
              {formData.state.length}/{FIELD_LIMITS.STATE}
            </CharCount>
          </Label>
          <Input
            maxLength={FIELD_LIMITS.STATE}
            placeholder={UI_TEXT.PLACEHOLDERS.STATE}
            type='text'
            value={formData.state}
            onChange={handleInputChange('state')}
          />
        </FormField>
        <FormField>
          <Label>
            {UI_TEXT.FIELDS.ZIP_CODE}
            <CharCount>
              {formData.zipCode.length}/{FIELD_LIMITS.ZIP_CODE}
            </CharCount>
          </Label>
          <Input
            inputMode='numeric'
            maxLength={FIELD_LIMITS.ZIP_CODE}
            pattern='[0-9]*'
            placeholder={UI_TEXT.PLACEHOLDERS.ZIP_CODE}
            type='text'
            value={formData.zipCode}
            onChange={handleNumericInput('zipCode')}
          />
        </FormField>
        <FormField>
          <Label>{UI_TEXT.FIELDS.COUNTRY}</Label>
          <CountrySelector value={formData.country} onChange={handleCountryChange} />
        </FormField>
      </FormGrid>
    </FormSection>
  );

  return (
    <PublicPageWrapper className={className}>
      <PublicSection $padding='none'>
        <PublicContainer>
          <HeaderRow>
            <HeaderTitles>
              <PublicPageTitle>{UI_TEXT.PAGE_TITLE}</PublicPageTitle>
              <PublicSubtitle>{UI_TEXT.PAGE_SUBTITLE}</PublicSubtitle>
            </HeaderTitles>
            <HeaderActions>
              <CancelButton type='button' onClick={handleCancel}>
                {UI_TEXT.CANCEL_BUTTON}
              </CancelButton>
              <SaveButton disabled={isLoading} form='profile-form' type='submit'>
                {isLoading ? UI_TEXT.SAVING : UI_TEXT.SAVE_BUTTON}
              </SaveButton>
            </HeaderActions>
          </HeaderRow>
          <FormCard id='profile-form' onSubmit={handleSubmit}>
            {renderPersonalSection()}
            {renderAddressSection()}
            <FormSection>
              <SectionTitle>{UI_TEXT.SECTIONS.OPTIONAL}</SectionTitle>
              <FormGrid>
                <FullWidthField>
                  <Label>
                    {UI_TEXT.FIELDS.BIO}
                    <CharCount>
                      {formData.bio.length}/{FIELD_LIMITS.BIO}
                    </CharCount>
                  </Label>
                  <TextArea
                    maxLength={FIELD_LIMITS.BIO}
                    placeholder={UI_TEXT.PLACEHOLDERS.BIO}
                    value={formData.bio}
                    onChange={handleInputChange('bio')}
                  />
                </FullWidthField>
              </FormGrid>
            </FormSection>
          </FormCard>
        </PublicContainer>
      </PublicSection>
    </PublicPageWrapper>
  );
};
