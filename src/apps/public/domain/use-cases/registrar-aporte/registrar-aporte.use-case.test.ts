/**
 * Registrar Aporte Use Case Tests
 */

vi.mock('@repositories', () => ({
  viajeRepository: { addRegistro: vi.fn(), findActivoByUserId: vi.fn() },
}));

import { expectSuccess } from '@testing/helpers';
import { viajeRepository } from '@repositories';

import { executeRegistrarAporte } from './registrar-aporte.use-case';

const mockViajeRepo = vi.mocked(viajeRepository);

const params = { input: { monto: 3200 }, userId: 'usuario-1' };

const VIAJE_CON_PLAN = {
  estado: 'AHORRANDO',
  id: 'viaje-1',
  plan: { id: 'plan-1', viajeId: 'viaje-1' },
  userId: 'usuario-1',
};

describe('executeRegistrarAporte', () => {
  beforeEach(() => {
    mockViajeRepo.findActivoByUserId.mockResolvedValue(VIAJE_CON_PLAN as never);
    mockViajeRepo.addRegistro.mockResolvedValue(undefined as never);
  });

  it('registra el aporte en el plan del viaje activo del usuario', async () => {
    const result = expectSuccess(await executeRegistrarAporte(params));

    expect(mockViajeRepo.addRegistro).toHaveBeenCalledWith('plan-1', params.input);
    expect(result.data?.viaje.id).toBe('viaje-1');
  });

  it('devuelve el viaje recargado, no el previo al aporte', async () => {
    const recargado = { ...VIAJE_CON_PLAN, id: 'viaje-1' };
    mockViajeRepo.findActivoByUserId
      .mockResolvedValueOnce(VIAJE_CON_PLAN as never)
      .mockResolvedValueOnce(recargado as never);

    await executeRegistrarAporte(params);

    expect(mockViajeRepo.findActivoByUserId).toHaveBeenCalledTimes(2);
  });

  it('falla 404 cuando el usuario no tiene viaje activo', async () => {
    mockViajeRepo.findActivoByUserId.mockResolvedValue(null as never);

    const result = await executeRegistrarAporte(params);

    expect(result.success).toBe(false);
    expect(mockViajeRepo.addRegistro).not.toHaveBeenCalled();
  });

  it('falla 404 cuando el viaje activo no tiene plan de ahorro', async () => {
    mockViajeRepo.findActivoByUserId.mockResolvedValue({
      ...VIAJE_CON_PLAN,
      plan: null,
    } as never);

    const result = await executeRegistrarAporte(params);

    expect(result.success).toBe(false);
    expect(mockViajeRepo.addRegistro).not.toHaveBeenCalled();
  });

  it('mapea un error del repositorio sin propagar la excepción', async () => {
    mockViajeRepo.findActivoByUserId.mockRejectedValue(new Error('db down'));

    const result = await executeRegistrarAporte(params);

    expect(result.success).toBe(false);
  });
});
