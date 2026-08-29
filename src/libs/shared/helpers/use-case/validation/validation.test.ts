/**
 * Validation Helper Tests
 *
 *
 * Essential smoke tests for validation helpers following TESTING-STANDARDS.md.
 * Tests verify validator methods are defined and basic composition works.
 */

import { CommonValidators, createValidator } from './validation';

describe('createValidator', () => {
  it('should be defined', () => {
    expect(createValidator).toBeDefined();
    expect(typeof createValidator).toBe('function');
  });

  it('should return validator builder object', () => {
    const validator = createValidator();
    expect(validator).toBeDefined();
    expect(validator.compose).toBeDefined();
    expect(validator.email).toBeDefined();
    expect(validator.maxLength).toBeDefined();
    expect(validator.minLength).toBeDefined();
    expect(validator.required).toBeDefined();
    expect(validator.requiredId).toBeDefined();
  });

  it('should create composable validators', () => {
    const validator = createValidator<{ email: string }>();
    const validate = validator.compose(validator.required('email'), validator.email('email'));
    expect(validate).toBeDefined();
    expect(typeof validate).toBe('function');
  });
});

describe('CommonValidators', () => {
  it('should be defined', () => {
    expect(CommonValidators).toBeDefined();
  });

  it('should have emailFormat method', () => {
    expect(CommonValidators.emailFormat).toBeDefined();
    expect(typeof CommonValidators.emailFormat).toBe('function');
  });

  it('should have idFormat method', () => {
    expect(CommonValidators.idFormat).toBeDefined();
    expect(typeof CommonValidators.idFormat).toBe('function');
  });

  it('should have requiredRequest method', () => {
    expect(CommonValidators.requiredRequest).toBeDefined();
    expect(typeof CommonValidators.requiredRequest).toBe('function');
  });
});

describe('createValidator - functional tests', () => {
  interface TestParams {
    email: string;
    id: string;
    name: string;
    role: string;
  }

  it('required returns error for missing field', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.required('name');
    const result = validate({ email: '', id: '', name: '', role: '' });
    expect(result).not.toBeNull();
    expect(result?.error).toContain('requerido');
  });

  it('required returns null for present field', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.required('name');
    const result = validate({ email: '', id: '', name: 'María', role: '' });
    expect(result).toBeNull();
  });

  it('required uses custom message', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.required('name', 'Nombre es obligatorio');
    const result = validate({ email: '', id: '', name: '', role: '' });
    expect(result?.error).toContain('Nombre es obligatorio');
  });

  it('requiredId returns error for empty string', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.requiredId('id');
    const result = validate({ email: '', id: '  ', name: '', role: '' });
    expect(result).not.toBeNull();
  });

  it('requiredId returns null for valid id', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.requiredId('id');
    const result = validate({ email: '', id: 'user-123', name: '', role: '' });
    expect(result).toBeNull();
  });

  it('email returns error for invalid format', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.email('email');
    const result = validate({ email: 'not-an-email', id: '', name: '', role: '' });
    expect(result?.i18n?.key).toBe('errors.auth.emailInvalidFormat');
  });

  it('email returns null for valid email', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.email('email');
    const result = validate({ email: 'maria@ejemplo.com', id: '', name: '', role: '' });
    expect(result).toBeNull();
  });

  it('email returns null for empty value', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.email('email');
    const result = validate({ email: '', id: '', name: '', role: '' });
    expect(result).toBeNull();
  });

  it('minLength returns error for short string', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.minLength('name', 3);
    const result = validate({ email: '', id: '', name: 'AB', role: '' });
    expect(result).not.toBeNull();
  });

  it('minLength returns null for valid length', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.minLength('name', 3);
    const result = validate({ email: '', id: '', name: 'María', role: '' });
    expect(result).toBeNull();
  });

  it('minLength uses custom message', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.minLength('name', 3, 'Muy corto');
    const result = validate({ email: '', id: '', name: 'AB', role: '' });
    expect(result?.error).toContain('Muy corto');
  });

  it('maxLength returns error for long string', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.maxLength('name', 5);
    const result = validate({ email: '', id: '', name: 'María García', role: '' });
    expect(result).not.toBeNull();
  });

  it('maxLength returns null for valid length', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.maxLength('name', 50);
    const result = validate({ email: '', id: '', name: 'María', role: '' });
    expect(result).toBeNull();
  });

  it('maxLength uses custom message', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.maxLength('name', 5, 'Demasiado largo');
    const result = validate({ email: '', id: '', name: 'María García López', role: '' });
    expect(result?.error).toContain('Demasiado largo');
  });

  it('oneOf returns error for invalid value', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.oneOf('role', ['admin', 'participant']);
    const result = validate({ email: '', id: '', name: '', role: 'superuser' });
    expect(result).not.toBeNull();
  });

  it('oneOf returns null for valid value', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.oneOf('role', ['admin', 'participant']);
    const result = validate({ email: '', id: '', name: '', role: 'admin' });
    expect(result).toBeNull();
  });

  it('oneOf returns null for empty value', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.oneOf('role', ['admin', 'participant']);
    const result = validate({ email: '', id: '', name: '', role: '' });
    expect(result).toBeNull();
  });

  it('oneOf uses custom message', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.oneOf('role', ['admin'], 'Rol no válido');
    const result = validate({ email: '', id: '', name: '', role: 'participant' });
    expect(result?.error).toContain('Rol no válido');
  });

  it('compose returns first error in chain', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.compose(validator.required('name'), validator.required('email'));
    const result = validate({ email: '', id: '', name: '', role: '' });
    expect(result?.error).toContain('name');
  });

  it('compose returns null when all pass', () => {
    const validator = createValidator<TestParams>();
    const validate = validator.compose(validator.required('name'), validator.required('email'));
    const result = validate({ email: 'maria@ejemplo.com', id: '', name: 'María', role: '' });
    expect(result).toBeNull();
  });
});

describe('CommonValidators - functional tests', () => {
  it('emailFormat returns error for invalid email', () => {
    const result = CommonValidators.emailFormat('bad-email');
    expect(result).not.toBeNull();
    expect(result?.i18n?.key).toBe('errors.auth.emailInvalidFormat');
  });

  it('emailFormat returns null for valid email', () => {
    const result = CommonValidators.emailFormat('jose@ejemplo.com');
    expect(result).toBeNull();
  });

  it('idFormat returns error for null', () => {
    const result = CommonValidators.idFormat(null);
    expect(result).not.toBeNull();
  });

  it('idFormat returns error for empty string', () => {
    const result = CommonValidators.idFormat('');
    expect(result).not.toBeNull();
  });

  it('idFormat returns null for valid id', () => {
    const result = CommonValidators.idFormat('user-123');
    expect(result).toBeNull();
  });

  it('idFormat uses custom field name', () => {
    const result = CommonValidators.idFormat(null, 'userId');
    expect(result).not.toBeNull();
  });

  it('requiredRequest returns error for missing request', () => {
    const result = CommonValidators.requiredRequest({ request: null });
    expect(result).not.toBeNull();
    expect(result?.i18n?.key).toBe('errors.auth.requestRequired');
  });

  it('requiredRequest returns null for present request', () => {
    const result = CommonValidators.requiredRequest({ request: {} });
    expect(result).toBeNull();
  });
});
