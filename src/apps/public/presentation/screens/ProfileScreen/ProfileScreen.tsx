/**
 * ProfileScreen Component
 *
 * User profile management screen.
 * Shows personal info and photo upload.
 */

'use client';

import { Edit, MapPin, User } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import {
  PublicContainer,
  PublicPageTitle,
  PublicPageWrapper,
  PublicSection,
  PublicSubtitle,
} from '@components';
import { useAuth, useSyncGlobalLoading } from '@hooks';

import type { ProfileScreenProps } from './ProfileScreen.interfaces';
import { UI_TEXT } from './ProfileScreen.constants';
import { useProfileScreen } from './hooks';

import {
  AddressLine,
  EditButton,
  EmptyState,
  EmptyText,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  ProfileAvatar,
  ProfileAvatarImage,
  ProfileBody,
  ProfileCard,
  ProfileHeader,
  ScreenHeader,
  Section,
  SectionHeader,
  SectionTitle,
  UserEmail,
  UserInfo,
  UserName,
} from './ProfileScreen.styled';

export const ProfileScreen = ({ className }: ProfileScreenProps) => {
  const router = useRouter();
  const { user } = useAuth();
  useProfileScreen();

  const userInitials = useMemo(() => {
    if (!user?.firstName) return '?';
    const firstInitial = user.firstName?.[0] ?? '';
    const lastInitial = user.lastName?.[0] ?? '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
  }, [user?.firstName, user?.lastName]);

  const fullName = useMemo(() => {
    return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Usuario';
  }, [user?.firstName, user?.lastName]);

  const hasAddress = useMemo(() => {
    return Boolean(user?.street || user?.city || user?.state);
  }, [user?.street, user?.city, user?.state]);

  const handleEditProfile = useCallback(() => {
    router.push('/dashboard/profile/edit');
  }, [router]);

  useSyncGlobalLoading(!user);

  if (!user) {
    return null;
  }

  const renderPersonalInfoSection = () => (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <User />
          {UI_TEXT.PERSONAL_INFO_TITLE}
        </SectionTitle>
        <EditButton type='button' onClick={handleEditProfile}>
          <Edit />
          {UI_TEXT.EDIT_BUTTON}
        </EditButton>
      </SectionHeader>
      <InfoGrid>
        <InfoItem>
          <InfoLabel>{UI_TEXT.FIELDS.NAME}</InfoLabel>
          <InfoValue>{fullName}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{UI_TEXT.FIELDS.EMAIL}</InfoLabel>
          <InfoValue>{user?.email ?? UI_TEXT.NO_DATA}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{UI_TEXT.FIELDS.PHONE}</InfoLabel>
          <InfoValue>{user?.phone ?? UI_TEXT.NO_DATA}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{UI_TEXT.FIELDS.AGE}</InfoLabel>
          <InfoValue>{user?.age ? `${user.age} años` : UI_TEXT.NO_DATA}</InfoValue>
        </InfoItem>
      </InfoGrid>
    </Section>
  );

  const renderAddressSection = () => (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <MapPin />
          {UI_TEXT.ADDRESS_TITLE}
        </SectionTitle>
      </SectionHeader>
      {hasAddress ? (
        <InfoGrid>
          <InfoItem>
            <InfoLabel>{UI_TEXT.FIELDS.STREET}</InfoLabel>
            <InfoValue>{user?.street ?? UI_TEXT.NO_DATA}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{UI_TEXT.FIELDS.NUMBER}</InfoLabel>
            <InfoValue>{user?.number ?? UI_TEXT.NO_DATA}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{UI_TEXT.FIELDS.NEIGHBORHOOD}</InfoLabel>
            <InfoValue>{user?.neighborhood ?? UI_TEXT.NO_DATA}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{UI_TEXT.FIELDS.CITY}</InfoLabel>
            <InfoValue>{user?.city ?? UI_TEXT.NO_DATA}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{UI_TEXT.FIELDS.STATE}</InfoLabel>
            <InfoValue>{user?.state ?? UI_TEXT.NO_DATA}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{UI_TEXT.FIELDS.ZIP_CODE}</InfoLabel>
            <InfoValue>{user?.zipCode ?? UI_TEXT.NO_DATA}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{UI_TEXT.FIELDS.COUNTRY}</InfoLabel>
            <InfoValue>{user?.country ?? 'México'}</InfoValue>
          </InfoItem>
        </InfoGrid>
      ) : (
        <EmptyState>
          <MapPin size={24} />
          <EmptyText>{UI_TEXT.NO_ADDRESS}</EmptyText>
        </EmptyState>
      )}
    </Section>
  );

  const renderBioSection = () => (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <User />
          {UI_TEXT.BIO_TITLE}
        </SectionTitle>
      </SectionHeader>
      {user?.bio ? (
        <AddressLine>{user.bio}</AddressLine>
      ) : (
        <EmptyState>
          <EmptyText>{UI_TEXT.NO_BIO}</EmptyText>
        </EmptyState>
      )}
    </Section>
  );

  return (
    <PublicPageWrapper className={className}>
      <PublicSection $padding='none'>
        <PublicContainer>
          <ScreenHeader>
            <PublicPageTitle>{UI_TEXT.PAGE_TITLE}</PublicPageTitle>
            <PublicSubtitle>{UI_TEXT.PAGE_SUBTITLE}</PublicSubtitle>
          </ScreenHeader>
          <ProfileCard>
            <ProfileHeader>
              <ProfileAvatar>
                {user?.photoUrl ? (
                  <ProfileAvatarImage alt={fullName} src={user.photoUrl} />
                ) : (
                  userInitials
                )}
              </ProfileAvatar>
              <UserInfo>
                <UserName>{fullName}</UserName>
                <UserEmail>{user?.email ?? ''}</UserEmail>
              </UserInfo>
            </ProfileHeader>
            <ProfileBody>
              {renderPersonalInfoSection()}
              {renderAddressSection()}
              {renderBioSection()}
            </ProfileBody>
          </ProfileCard>
        </PublicContainer>
      </PublicSection>
    </PublicPageWrapper>
  );
};
