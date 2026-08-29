/**
 * Registrar Aporte Use Case Tests
 */

vi.mock('@repositories', () => ({
  planDeAhorroRepository: { findByViajeId: vi.fn(), registrarAporte: vi.fn() },
  viajeRepository: { findActivoByUserId: vi.fn() },
}));

import { expectSuccess, MOCK_REQUEST } from '@testing/helpers';
import { planDeAhorroRepository, viajeRepository } from '@repositories';

import { executeRegistrarAporte } from './registrar-aporte.use-case';

const mockViajeRepo = vi.mocked(viajeRepository);
const mockPlanRepo = vi.mocked(planDeAhorroRepository);

const params = { monto: 3200, request: MOCK_REQUEST, userId: 'usuario-1' };

const VIAJE_AHORRANDO = { estado: 'AHORRANDO', id: 'viaje-1', userId: 'usuario-1' };
const PLAN = { id: 'plan-1', viajeId: 'viaje-1' };
const REGISTRO = {
  fecha: new Date('2026-09-01'),
  id: 'registro-1',
  monto: 3200,
  nota: null,
  planId: 'plan-1',
};

describe('executeRegistrarAporte', () => {
  beforeEach(() => {
    mockViajeRepo.findActivoByUserId.mockResolvedValue(VIAJE_AHORRANDO as never);
    mockPlanRepo.findByViajeId.mockResolvedValue(PLAN as never);
    mockPlanRepo.registrarAporte.mockResolvedValue(REGISTRO as never);
  });

  it('registra el aporte en el plan del usuario', async () => {
    const result = expectSuccess(await executeRegistrarAporte(params));

    expect(result.data?.registro.monto).toBe(3200);
    expect(mockPlanRepo.registrarAporte).toHaveBeenCalledWith({
      monto: 3200,
      nota: null,
      planId: 'plan-1',
    });
  });

  it('guarda la nota cuando viene', async () => {
    await executeRegistrarAporte({ ...params, nota: 'Entró un extra' });

    expect(mockPlanRepo.registrarAporte).toHaveBeenCalledWith(
      expect.objectContaining({ nota: 'Entró un extra' })
    );
  });

  it('rechaza un monto de cero', async () => {
    const result = await executeRegistrarAporte({ ...params, monto: 0 });

    expect(result.success).toBe(false);
    expect(mockPlanRepo.registrarAporte).not.toHaveBeenCalled();
  });

  it('rechaza un monto negativo', async () => {
    const result = await executeRegistrarAporte({ ...params, monto: -100 });

    expect(result.success).toBe(false);
    expect(mockPlanRepo.registrarAporte).not.toHaveBeenCalled();
  });

  it('rechaza aportar cuando el viaje sigue en borrador', async () => {
    mockViajeRepo.findActivoByUserId.mockResolvedValueOnce({
      ...VIAJE_AHORRANDO,
      estado: 'BORRADOR',
    } as never);

    const result = await executeRegistrarAporte(params);

    expect(result.success).toBe(false);
    expect(mockPlanRepo.registrarAporte).not.toHaveBeenCalled();
  });

  it('rechaza aportar cuando el usuario no tiene viaje', async () => {
    mockViajeRepo.findActivoByUserId.mockResolvedValueOnce(null);

    const result = await executeRegistrarAporte(params);

    expect(result.success).toBe(false);
  });

  it('resuelve el plan desde la identidad de quien llama, no desde el cuerpo', async () => {
    await executeRegistrarAporte(params);

    expect(mockViajeRepo.findActivoByUserId).toHaveBeenCalledWith('usuario-1');
    expect(mockPlanRepo.findByViajeId).toHaveBeenCalledWith('viaje-1');
  });
});
