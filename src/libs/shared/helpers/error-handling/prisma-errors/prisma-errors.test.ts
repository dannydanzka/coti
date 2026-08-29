import { translatePrismaError } from './prisma-errors';

describe('translatePrismaError', () => {
  it('translates column too long error', () => {
    const error = new Error('Value too long for the column');
    expect(translatePrismaError(error)).toContain('excede el tamaño máximo');
  });

  it('translates unique constraint on email', () => {
    const error = new Error('Unique constraint failed on the fields: (`email`)');
    expect(translatePrismaError(error)).toContain('correo electrónico');
  });

  it('translates unique constraint on slug', () => {
    const error = new Error('Unique constraint failed on the fields: (`slug`)');
    expect(translatePrismaError(error)).toContain('identificador');
  });

  it('translates generic unique constraint', () => {
    const error = new Error('Unique constraint failed on the fields: (`name`)');
    expect(translatePrismaError(error)).toContain('duplicados');
  });

  it('translates record not found (P2025)', () => {
    const error = new Error('P2025: Record to update not found');
    expect(translatePrismaError(error)).toContain('ya no existe');
  });

  it('translates foreign key constraint (P2003)', () => {
    const error = new Error('P2003: Foreign key constraint failed on the field');
    expect(translatePrismaError(error)).toContain('registros relacionados');
  });

  it('translates invalid invocation error', () => {
    const error = new Error('Invalid `prisma.user.create()` invocation');
    expect(translatePrismaError(error)).toContain('procesar los datos');
  });

  it('returns null for unrecognized errors', () => {
    const error = new Error('Some random error');
    expect(translatePrismaError(error)).toBeNull();
  });
});
