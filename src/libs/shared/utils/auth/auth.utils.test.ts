import { getCurrentUser, hasRole, isAuthenticated, logout } from './auth.utils';

vi.mock('@constants', () => ({
  ROUTES: { AUTH: { LOGIN: '/iniciar-sesion' } },
}));

const createValidToken = (payload: Record<string, unknown>) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.fake-signature`;
};

const mockGetItem = vi.mocked(localStorage.getItem);

describe('Auth Utils', () => {
  describe('isAuthenticated', () => {
    it('returns false when no token', () => {
      mockGetItem.mockReturnValueOnce(null);
      expect(isAuthenticated()).toBe(false);
    });

    it('returns true for valid unexpired token', () => {
      const future = Math.floor(Date.now() / 1000) + 3600;
      const token = createValidToken({ exp: future, userId: 'u-1' });
      mockGetItem.mockReturnValueOnce(token);
      expect(isAuthenticated()).toBe(true);
    });

    it('returns false for expired token', () => {
      const past = Math.floor(Date.now() / 1000) - 3600;
      const token = createValidToken({ exp: past, userId: 'u-1' });
      mockGetItem.mockReturnValueOnce(token);
      expect(isAuthenticated()).toBe(false);
    });

    it('returns false for malformed token', () => {
      mockGetItem.mockReturnValueOnce('not-a-valid-token');
      expect(isAuthenticated()).toBe(false);
    });

    it('returns false for token missing required fields', () => {
      const token = createValidToken({ someField: 'value' });
      mockGetItem.mockReturnValueOnce(token);
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('logout', () => {
    it('calls removeItem for auth data and returns login route', () => {
      const result = logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user_preferences');
      expect(localStorage.removeItem).toHaveBeenCalledWith('persist:coti_root');
      expect(result).toBe('/iniciar-sesion');
    });
  });

  describe('getCurrentUser', () => {
    it('returns null when not authenticated', () => {
      mockGetItem.mockReturnValueOnce(null);
      expect(getCurrentUser()).toBeNull();
    });

    it('returns user data from valid token', () => {
      const future = Math.floor(Date.now() / 1000) + 3600;
      const token = createValidToken({
        email: 'maria@ejemplo.com',
        exp: future,
        isActive: true,
        name: 'María García',
        role: 'participant',
        userId: 'u-1',
      });
      mockGetItem.mockReturnValueOnce(token).mockReturnValueOnce(token);
      const user = getCurrentUser();
      expect(user?.email).toBe('maria@ejemplo.com');
      expect(user?.name).toBe('María García');
      expect(user?.role).toBe('participant');
      expect(user?.userId).toBe('u-1');
    });

    it('returns null for token missing user fields', () => {
      const future = Math.floor(Date.now() / 1000) + 3600;
      const token = createValidToken({ exp: future, userId: 'u-1' });
      mockGetItem.mockReturnValueOnce(token);
      expect(getCurrentUser()).toBeNull();
    });
  });

  describe('hasRole', () => {
    const setupUser = (role: string) => {
      const future = Math.floor(Date.now() / 1000) + 3600;
      const token = createValidToken({
        email: 'maria@ejemplo.com',
        exp: future,
        isActive: true,
        name: 'María',
        role,
        userId: 'u-1',
      });
      mockGetItem.mockReturnValue(token);
    };

    it('owner has all roles', () => {
      setupUser('owner');
      expect(hasRole('owner')).toBe(true);
      expect(hasRole('admin')).toBe(true);
      expect(hasRole('participant')).toBe(true);
    });

    it('admin has admin and participant roles', () => {
      setupUser('admin');
      expect(hasRole('owner')).toBe(false);
      expect(hasRole('admin')).toBe(true);
      expect(hasRole('participant')).toBe(true);
    });

    it('participant has only participant role', () => {
      setupUser('participant');
      expect(hasRole('owner')).toBe(false);
      expect(hasRole('admin')).toBe(false);
      expect(hasRole('participant')).toBe(true);
    });

    it('returns false when no user', () => {
      mockGetItem.mockReturnValueOnce(null);
      expect(hasRole('admin')).toBe(false);
    });

    it('returns false for inactive user', () => {
      const future = Math.floor(Date.now() / 1000) + 3600;
      const token = createValidToken({
        email: 'maria@ejemplo.com',
        exp: future,
        isActive: false,
        name: 'María',
        role: 'admin',
        userId: 'u-1',
      });
      mockGetItem.mockReturnValueOnce(token);
      expect(hasRole('admin')).toBe(false);
    });

    it('throws for null role', () => {
      expect(() => hasRole(null as never)).toThrow('Role is required');
    });

    it('throws for unrecognized role', () => {
      setupUser('admin');
      expect(() => hasRole('superuser' as never)).toThrow('Unrecognized role');
    });
  });

  describe('getCurrentUser edge cases', () => {
    it('defaults isActive to true when not in payload', () => {
      const future = Math.floor(Date.now() / 1000) + 3600;
      const token = createValidToken({
        email: 'jose@ejemplo.com',
        exp: future,
        name: 'José',
        role: 'participant',
        userId: 'u-2',
      });
      mockGetItem.mockReturnValueOnce(token);
      const user = getCurrentUser();
      expect(user?.isActive).toBe(true);
    });
  });
});
