import { z } from 'zod';

import { validateBody } from './validate-body';

const testSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  name: z.string().min(1, 'El nombre es obligatorio'),
});

describe('validateBody', () => {
  it('returns success with valid data', () => {
    const result = validateBody(testSchema, { email: 'maria@ejemplo.com', name: 'María García' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('María García');
      expect(result.data.email).toBe('maria@ejemplo.com');
    }
  });

  it('returns error for invalid data', () => {
    const result = validateBody(testSchema, { email: 'not-an-email', name: '' });
    expect(result.success).toBe(false);
  });

  it('returns first validation error message', () => {
    const result = validateBody(testSchema, { email: 'valid@email.com', name: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeDefined();
    }
  });

  it('handles missing fields', () => {
    const result = validateBody(testSchema, {});
    expect(result.success).toBe(false);
  });

  it('handles null body', () => {
    const result = validateBody(testSchema, null);
    expect(result.success).toBe(false);
  });
});
