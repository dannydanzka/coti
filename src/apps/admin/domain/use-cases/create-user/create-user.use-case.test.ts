/**
 * Create User Use Case Tests
 */

vi.mock('@repositories', () => ({
  userRepository: { create: vi.fn(), findByEmail: vi.fn(), findByEmailIncludingDeleted: vi.fn() },
}));

import {
  expectFailure,
  expectSuccess,
  itRejectsUnauthorized,
  MOCK_REQUEST,
  mockAuthSuccess,
} from '@testing/helpers';
import { userRepository } from '@repositories';

import { executeCreateUser } from './create-user.use-case';

const mockUserRepo = vi.mocked(userRepository);
const validParams = {
  email: 'carlos.martinez@example.com',
  firstName: 'Carlos',
  lastName: 'Martínez López',
  password: 'SecurePass123',
  request: MOCK_REQUEST,
  role: 'admin' as const,
};

describe('executeCreateUser', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockUserRepo.findByEmail.mockResolvedValue(null);
    mockUserRepo.findByEmailIncludingDeleted.mockResolvedValue(null);
    mockUserRepo.create.mockResolvedValue({
      ...validParams,
      createdAt: new Date(),
      id: 'new-user-123',
      isActive: true,
    } as never);
  });

  it('creates user with valid data', async () => {
    const result = expectSuccess(await executeCreateUser(validParams));
    expect(result.message).toContain('exitosamente');
    expect(result.data).toBeDefined();
  });

  it('calls repository with hashed password', async () => {
    await executeCreateUser(validParams);
    expect(mockUserRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: validParams.email,
        password: expect.not.stringMatching(validParams.password),
      })
    );
  });

  it('rejects duplicate email', async () => {
    mockUserRepo.findByEmail.mockResolvedValueOnce({
      email: validParams.email,
      id: 'existing-123',
    } as never);
    expectFailure(await executeCreateUser(validParams), 'Ya existe un usuario');
  });

  it('rejects missing email', async () => {
    expectFailure(await executeCreateUser({ ...validParams, email: '' }), 'campos obligatorios');
  });

  it('rejects invalid email format', async () => {
    expectFailure(
      await executeCreateUser({ ...validParams, email: 'invalid-email' }),
      'email no válido'
    );
  });

  it('rejects firstName shorter than 2 chars', async () => {
    expectFailure(await executeCreateUser({ ...validParams, firstName: 'A' }), '2 caracteres');
  });

  it('rejects password shorter than 8 chars', async () => {
    expectFailure(await executeCreateUser({ ...validParams, password: 'Short1' }), '8 caracteres');
  });

  itRejectsUnauthorized(executeCreateUser, validParams);
});
