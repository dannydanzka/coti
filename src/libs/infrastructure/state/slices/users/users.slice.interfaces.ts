/**
 * Users Slice Interfaces
 */

import type { ServerPagination } from '@services';
import type { UserEntity } from '@interfaces';

export interface UsersState {
  lastUpdated: string | null;
  selectedUsers: string[];
  serverPagination: ServerPagination;
  users: UserEntity[];
}
