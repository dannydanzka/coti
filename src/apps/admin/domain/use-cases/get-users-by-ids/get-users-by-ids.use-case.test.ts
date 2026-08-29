/**
 * Get Users By IDs Use Case Tests
 */

vi.mock('@repositories', () => ({
  userRepository: { findById: vi.fn() },
}));

import {
  expectFailure,
  expectSuccess,
  itHandlesRepoError,
  itRejectsUnauthorized,
  MOCK_REQUEST,
  mockAuthSuccess,
} from '@testing/helpers';
import { userRepository } from '@repositories';

import { executeGetUsersByIds } from './get-users-by-ids.use-case';

const mockUserRepo = vi.mocked(userRepository);
const VALID_ID_1 = 'cm1234567890123456789abcd';
const VALID_ID_2 = 'cm9876543210987654321cdef';
const mockUsers = [
  {
    email: 'maria.garcia@example.com',
    firstName: 'María',
    id: VALID_ID_1,
    lastName: 'García',
    role: 'participant',
  },
  {
    email: 'jose.lopez@example.com',
    firstName: 'José',
    id: VALID_ID_2,
    lastName: 'López',
    role: 'participant',
  },
];
const params = { ids: [VALID_ID_1], request: MOCK_REQUEST };

describe('executeGetUsersByIds', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockUserRepo.findById.mockImplementation(((id: string) =>
      Promise.resolve(mockUsers.find((u) => u.id === id) ?? null)) as never);
  });

  it('returns users for valid ids', async () => {
    const result = expectSuccess(await executeGetUsersByIds(params));
    expect(result.data.users).toHaveLength(1);
    expect(result.data.found).toBe(1);
  });

  it('returns multiple users for multiple valid ids', async () => {
    const result = expectSuccess(
      await executeGetUsersByIds({ ids: [VALID_ID_1, VALID_ID_2], request: MOCK_REQUEST })
    );
    expect(result.data.users).toHaveLength(2);
    expect(result.data.found).toBe(2);
  });

  it('reports not found ids in response', async () => {
    mockUserRepo.findById.mockResolvedValueOnce(null);
    const result = expectSuccess(
      await executeGetUsersByIds({ ids: ['cm0000000000000000000abcd'], request: MOCK_REQUEST })
    );
    expect(result.data.found).toBe(0);
    expect(result.data.notFound).toContain('cm0000000000000000000abcd');
  });

  it('rejects empty ids array', async () => {
    expectFailure(await executeGetUsersByIds({ ids: [], request: MOCK_REQUEST }), 'requerido');
  });

  it('rejects invalid id format', async () => {
    expectFailure(
      await executeGetUsersByIds({ ids: ['invalid-id'], request: MOCK_REQUEST }),
      'inválido'
    );
  });

  itRejectsUnauthorized(executeGetUsersByIds, params);
  itHandlesRepoError(executeGetUsersByIds, params, mockUserRepo.findById);
});
