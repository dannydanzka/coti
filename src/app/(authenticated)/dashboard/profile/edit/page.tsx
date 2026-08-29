/**
 * Profile Edit Page
 *
 * Route: /dashboard/profile/edit
 * Allows users to edit their profile information.
 */

import { APP_METADATA } from '@constants';
import { ProfileEditScreen } from '@pages/public';

export default function ProfileEditPage() {
  return <ProfileEditScreen />;
}

export const metadata = {
  title: APP_METADATA.PROFILE_EDIT_TITLE,
};
