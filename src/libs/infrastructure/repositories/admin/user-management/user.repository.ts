/**
 * User Repository - Prisma Implementation
 *
 * Infrastructure layer implementation of UserRepository contract.
 * Uses Prisma with Supabase PostgreSQL for real database operations.
 * Context7 Clean Architecture pattern with object literal export.
 *
 */

import type {
  CreateUserRequest,
  UpdateProfileRequest,
  UpdateUserRequest,
  UserEntity,
  UserFilters,
  UserListResponse,
  UserPagination,
  UserRepository,
} from '@interfaces';
import { mapRoleFromPrisma, mapRoleToPrisma } from '@constants';
import { prisma } from '@database';
import type { PrismaUserRole, UserRole } from '@domain-types';

/**
 * Transform Prisma User to UserEntity interface
 * Includes all new fields: firstName, lastName, address, profile
 */
const transformPrismaUserToEntity = (user: {
  age: number | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  createdAt: Date;
  deletedAt: Date | null;
  deletedBy: string | null;
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  lastLoginAt: Date | null;
  neighborhood: string | null;
  number: string | null;
  passwordHash: string;
  phone: string | null;
  photoUrl: string | null;
  role: PrismaUserRole;
  state: string | null;
  street: string | null;
  updatedAt: Date;
  zipCode: string | null;
}): UserEntity => ({
  age: user.age,
  bio: user.bio,
  city: user.city,
  country: user.country,
  createdAt: user.createdAt,
  deletedAt: user.deletedAt,
  deletedBy: user.deletedBy,
  email: user.email,
  firstName: user.firstName,
  id: user.id,
  isActive: user.isActive,
  lastLoginAt: user.lastLoginAt,
  lastName: user.lastName,
  neighborhood: user.neighborhood,
  number: user.number,
  passwordHash: user.passwordHash,
  phone: user.phone,
  photoUrl: user.photoUrl,
  role: mapRoleFromPrisma(user.role) as UserRole,
  state: user.state,
  street: user.street,
  updatedAt: user.updatedAt,
  zipCode: user.zipCode,
});

export const userRepository: UserRepository = {
  count: async (filters?: Partial<UserFilters>): Promise<number> => {
    const where: Record<string, unknown> = {
      deletedAt: null,
    };

    if (filters?.role) {
      where['role'] = mapRoleToPrisma(filters.role);
    }
    if (filters?.isActive !== undefined) {
      where['isActive'] = filters.isActive;
    }
    if (filters?.searchTerm) {
      where['OR'] = [
        { firstName: { contains: filters.searchTerm, mode: 'insensitive' } },
        { lastName: { contains: filters.searchTerm, mode: 'insensitive' } },
        { email: { contains: filters.searchTerm, mode: 'insensitive' } },
      ];
    }

    return prisma.user.count({ where });
  },
  create: async (request: CreateUserRequest): Promise<UserEntity> => {
    const existingUser = await prisma.user.findUnique({
      where: { email: request.email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error('Ya existe un usuario con este email');
    }

    const newUser = await prisma.user.create({
      data: {
        age: request.age ?? null,
        email: request.email.toLowerCase(),
        firstName: request.firstName,
        isActive: request.isActive ?? true,
        lastName: request.lastName,
        passwordHash: request.password,
        phone: request.phone ?? null,
        role: mapRoleToPrisma(request.role),
      },
    });

    return transformPrismaUserToEntity(newUser);
  },
  delete: async (id: string): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await prisma.user.update({
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
      where: { id },
    });
  },
  emailExists: async (email: string, excludeId?: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({
      where: {
        deletedAt: null,
        email: email.toLowerCase(),
        id: excludeId ? { not: excludeId } : undefined,
      },
    });
    return Boolean(user);
  },
  exists: async (id: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
      where: { deletedAt: null, id },
    });
    return Boolean(user);
  },
  findByEmail: async (email: string): Promise<UserEntity | null> => {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || user.deletedAt) return null;

    return transformPrismaUserToEntity(user);
  },
  findByEmailIncludingDeleted: async (email: string): Promise<UserEntity | null> => {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) return null;

    return transformPrismaUserToEntity(user);
  },
  findById: async (id: string): Promise<UserEntity | null> => {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.deletedAt) return null;

    return transformPrismaUserToEntity(user);
  },
  findByRole: async (role: UserEntity['role']): Promise<UserEntity[]> => {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        role: mapRoleToPrisma(role),
      },
    });

    return users.map(transformPrismaUserToEntity);
  },
  findMany: async (filters: UserFilters, pagination: UserPagination): Promise<UserListResponse> => {
    const where: Record<string, unknown> = {
      deletedAt: null,
    };

    if (filters.role) {
      where['role'] = mapRoleToPrisma(filters.role);
    }
    if (filters.isActive !== undefined) {
      where['isActive'] = filters.isActive;
    }
    if (filters.searchTerm) {
      where['OR'] = [
        { firstName: { contains: filters.searchTerm, mode: 'insensitive' } },
        { lastName: { contains: filters.searchTerm, mode: 'insensitive' } },
        { email: { contains: filters.searchTerm, mode: 'insensitive' } },
      ];
    }
    if (filters.createdAfter) {
      where['createdAt'] = { gte: filters.createdAfter };
    }
    if (filters.createdBefore) {
      where['createdAt'] = {
        ...(where['createdAt'] ?? {}),
        lte: filters.createdBefore,
      };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        where,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      filters,
      pagination: {
        limit: pagination.limit,
        page: pagination.page,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
      users: users.map(transformPrismaUserToEntity),
    };
  },
  getRecentlyCreated: async (days: number): Promise<UserEntity[]> => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        createdAt: { gte: cutoffDate },
        deletedAt: null,
      },
    });

    return users.map(transformPrismaUserToEntity);
  },
  reactivate: async (
    id: string,
    data: {
      firstName: string;
      lastName: string;
      passwordHash: string;
      role: UserRole;
      phone?: string | null;
      isActive?: boolean;
    }
  ): Promise<UserEntity> => {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (!user.deletedAt) {
      throw new Error('El usuario no está eliminado');
    }

    const updatedUser = await prisma.user.update({
      data: {
        deletedAt: null,
        deletedBy: null,
        firstName: data.firstName,
        isActive: data.isActive ?? true,
        lastName: data.lastName,
        passwordHash: data.passwordHash,
        phone: data.phone ?? null,
        role: mapRoleToPrisma(data.role),
      },
      where: { id },
    });

    return transformPrismaUserToEntity(updatedUser);
  },
  search: async (searchTerm: string, pagination: UserPagination): Promise<UserListResponse> => {
    return userRepository.findMany({ searchTerm }, pagination);
  },
  update: async (request: UpdateUserRequest): Promise<UserEntity> => {
    const user = await prisma.user.findUnique({ where: { id: request.id } });

    if (!user || user.deletedAt) {
      throw new Error('Usuario no encontrado');
    }

    if (request.email) {
      const emailConflict = await prisma.user.findFirst({
        where: {
          deletedAt: null,
          email: request.email.toLowerCase(),
          id: { not: request.id },
        },
      });
      if (emailConflict) {
        throw new Error('Ya existe un usuario con este email');
      }
    }

    const updateData: Record<string, unknown> = {};

    if (request.email) updateData['email'] = request.email.toLowerCase();
    if (request.firstName) updateData['firstName'] = request.firstName;
    if (request.lastName) updateData['lastName'] = request.lastName;

    if (request.role) updateData['role'] = mapRoleToPrisma(request.role);
    if (request.isActive !== undefined) updateData['isActive'] = request.isActive;
    if (request.lastLoginAt !== undefined) updateData['lastLoginAt'] = request.lastLoginAt;

    if (request.street !== undefined) updateData['street'] = request.street;
    if (request.number !== undefined) updateData['number'] = request.number;
    if (request.neighborhood !== undefined) updateData['neighborhood'] = request.neighborhood;
    if (request.city !== undefined) updateData['city'] = request.city;
    if (request.state !== undefined) updateData['state'] = request.state;
    if (request.zipCode !== undefined) updateData['zipCode'] = request.zipCode;
    if (request.country !== undefined) updateData['country'] = request.country;

    if (request.phone !== undefined) updateData['phone'] = request.phone;
    if (request.age !== undefined) updateData['age'] = request.age;
    if (request.photoUrl !== undefined) updateData['photoUrl'] = request.photoUrl;
    if (request.bio !== undefined) updateData['bio'] = request.bio;

    const updatedUser = await prisma.user.update({
      data: updateData,
      where: { id: request.id },
    });

    return transformPrismaUserToEntity(updatedUser);
  },
  updatePassword: async (userId: string, passwordHash: string): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.deletedAt) {
      throw new Error('Usuario no encontrado');
    }

    await prisma.user.update({
      data: { passwordHash },
      where: { id: userId },
    });
  },
  updateProfile: async (userId: string, updates: UpdateProfileRequest): Promise<UserEntity> => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.deletedAt) {
      throw new Error('Usuario no encontrado');
    }

    const updatedUser = await prisma.user.update({
      data: {
        age: updates.age ?? null,
        bio: updates.bio ?? null,
        city: updates.city,
        country: updates.country ?? 'México',
        ...(updates.firstName && { firstName: updates.firstName }),
        ...(updates.lastName && { lastName: updates.lastName }),
        neighborhood: updates.neighborhood ?? null,
        number: updates.number,
        phone: updates.phone ?? null,
        photoUrl: updates.photoUrl ?? null,
        state: updates.state,
        street: updates.street,
        zipCode: updates.zipCode,
      },
      where: { id: userId },
    });

    return transformPrismaUserToEntity(updatedUser);
  },
};
