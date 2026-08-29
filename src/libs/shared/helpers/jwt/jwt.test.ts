import { decodeToken, signToken, verifyToken } from './jwt';

const SECRET = 'test-secret-key-for-jwt';

describe('JWT Helper', () => {
  describe('signToken', () => {
    it('creates a valid JWT string', () => {
      const token = signToken({ userId: 'u-1' }, SECRET);
      expect(token).toBeDefined();
      expect(token.split('.')).toHaveLength(3);
    });

    it('creates token with expiration', () => {
      const token = signToken({ userId: 'u-1' }, SECRET, { expiresIn: '1h' });
      expect(token).toBeDefined();
    });
  });

  describe('verifyToken', () => {
    it('verifies valid token', () => {
      const token = signToken({ userId: 'u-1' }, SECRET);
      const result = verifyToken(token, SECRET);
      expect(result.valid).toBe(true);
      expect(result.payload).toHaveProperty('userId', 'u-1');
    });

    it('rejects token with wrong secret', () => {
      const token = signToken({ userId: 'u-1' }, SECRET);
      const result = verifyToken(token, 'wrong-secret');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('inválido');
    });

    it('rejects malformed token', () => {
      const result = verifyToken('not-a-token', SECRET);
      expect(result.valid).toBe(false);
    });
  });

  describe('decodeToken', () => {
    it('decodes token without verification', () => {
      const token = signToken({ email: 'maria@ejemplo.com', userId: 'u-1' }, SECRET);
      const decoded = decodeToken<{ email: string; userId: string }>(token);
      expect(decoded?.userId).toBe('u-1');
      expect(decoded?.email).toBe('maria@ejemplo.com');
    });

    it('returns null for invalid token', () => {
      expect(decodeToken('not-a-token')).toBeNull();
    });
  });
});
