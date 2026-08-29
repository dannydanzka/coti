/**
 * User Repository Interfaces
 *
 * Repository contracts for user management operations including filters and pagination.
 * Domain-level interfaces shared across repository implementations.
 *
 */
import type {
  CreateUserRequest,
  UpdateProfileRequest,
  UpdateUserRequest,
  UserEntity,
} from '@interfaces';
import type { UserRole } from '@domain-types';

export interface UserFilters {
  role?: UserRole;
  isActive?: boolean;
  isVerified?: boolean;
  searchTerm?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  lastLoginAfter?: Date;
  lastLoginBefore?: Date;
}

export interface UserPagination {
  page: number;
  limit: number;
  sortBy?: keyof UserEntity;
  sortOrder?: 'asc' | 'desc';
}

export interface UserListResponse {
  users: UserEntity[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: UserFilters;
}

export interface UserRepository {
  create(request: CreateUserRequest): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByEmailIncludingDeleted(email: string): Promise<UserEntity | null>;
  reactivate(
    id: string,
    data: {
      firstName: string;
      lastName: string;
      passwordHash: string;
      role: UserRole;
      phone?: string | null;
      isActive?: boolean;
    }
  ): Promise<UserEntity>;
  update(request: UpdateUserRequest): Promise<UserEntity>;
  updatePassword(userId: string, passwordHash: string): Promise<void>;
  updateProfile(userId: string, updates: UpdateProfileRequest): Promise<UserEntity>;
  delete(id: string): Promise<void>;

  findMany(filters: UserFilters, pagination: UserPagination): Promise<UserListResponse>;
  search(searchTerm: string, pagination: UserPagination): Promise<UserListResponse>;
  findByRole(role: UserEntity['role']): Promise<UserEntity[]>;

  getRecentlyCreated(days: number): Promise<UserEntity[]>;

  exists(id: string): Promise<boolean>;
  emailExists(email: string, excludeId?: string): Promise<boolean>;

  count(filters?: Partial<UserFilters>): Promise<number>;
}
