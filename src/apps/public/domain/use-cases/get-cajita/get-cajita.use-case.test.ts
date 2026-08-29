/**
 * Get Cajita Use Case Tests
 */

vi.mock('@repositories', () => ({
  planDeAhorroRepository: { findByViajeId: vi.fn(), findRegistros: vi.fn() },
  viajeRepository: { findActivoByUserId: vi.fn() },
}));

import { expectSuccess, MOCK_REQUEST } from '@testing/helpers';
import { planDeAhorroRepository, viajeRepository } from '@repositories';

import { executeGetCajita } from './get-cajita.use-case';

const mockViajeRepo = vi.mocked(viajeRepository);
const mockPlanRepo = vi.mocked(planDeAhorroRepository);

const params = { request: MOCK_REQUEST, userId: 'usuario-1' };

const VIAJE_AHORRANDO = {
  actualizadoEn: new Date('2026-08-01'),
  atracciones: [],
  costoMax: 100000,
  costoMin: 80000,
  creadoEn: new Date('2026-02-01'),
  destino: { ciudad: 'Tokio' },
  destinoId: 'destino-1',
  estado: 'AHORRANDO',
  estiloAlojamiento: 'MEDIO',
  estiloComida: 'MEDIO',
  fechaSalida: new Date('2028-03-14'),
  id: 'viaje-1',
  noches: 9,
  personas: 2,
  plan: null,
  ritmo: 'MEDIO',
  userId: 'usuario-1',
};

const PLAN = {
  aportacion: 3200,
  creadoEn: new Date('2026-02-01'),
  fechaObjetivo: new Date('2028-02-01'),
  frecuencia: 'MENSUAL',
  id: 'plan-1',
  meta: 64100,
  montoInicial: 6500,
  recordatorios: true,
  viajeId: 'viaje-1',
};

/** Seis aportaciones de 3,200 — el mismo caso que dibuja el diseño. */
const REGISTROS = Array.from({ length: 6 }, (_unused, indice) => ({
  fecha: new Date(2026, 8 + indice, 1),
  id: `registro-${indice}`,
  monto: 3200,
  nota: null,
  planId: 'plan-1',
}));

describe('executeGetCajita', () => {
  beforeEach(() => {
    mockViajeRepo.findActivoByUserId.mockResolvedValue(VIAJE_AHORRANDO as never);
    mockPlanRepo.findByViajeId.mockResolvedValue(PLAN as never);
    mockPlanRepo.findRegistros.mockResolvedValue(REGISTROS as never);
  });

  it('suma el monto inicial y todas las aportaciones', async () => {
    const result = expectSuccess(await executeGetCajita(params));

    expect(result.data?.cajita?.ahorrado).toBe(25700);
  });

  it('calcula lo que falta contra la meta congelada', async () => {
    const result = expectSuccess(await executeGetCajita(params));

    expect(result.data?.cajita?.faltante).toBe(38400);
  });

  it('reporta el avance y el hito ya superado', async () => {
    const result = expectSuccess(await executeGetCajita(params));

    expect(result.data?.cajita?.porcentaje).toBe(40);
    expect(result.data?.cajita?.hitoAlcanzado).toBe(25);
  });

  it('calcula los periodos que faltan para llegar a la meta', async () => {
    const result = expectSuccess(await executeGetCajita(params));

    expect(result.data?.cajita?.periodosRestantes).toBe(12);
  });

  it('devuelve la cajita vacía cuando el viaje sigue en borrador', async () => {
    mockViajeRepo.findActivoByUserId.mockResolvedValueOnce({
      ...VIAJE_AHORRANDO,
      estado: 'BORRADOR',
    } as never);

    const result = expectSuccess(await executeGetCajita(params));

    expect(result.data?.cajita).toBeNull();
    expect(result.data?.borradorId).toBe('viaje-1');
  });

  it('devuelve la cajita vacía cuando el usuario no tiene viaje', async () => {
    mockViajeRepo.findActivoByUserId.mockResolvedValueOnce(null);

    const result = expectSuccess(await executeGetCajita(params));

    expect(result.data?.cajita).toBeNull();
    expect(result.data?.borradorId).toBeNull();
  });

  it('devuelve la cajita vacía cuando el viaje aún no tiene plan', async () => {
    mockPlanRepo.findByViajeId.mockResolvedValueOnce(null);

    const result = expectSuccess(await executeGetCajita(params));

    expect(result.data?.cajita).toBeNull();
  });

  it('no deja el avance por encima de cien cuando ya se pasó la meta', async () => {
    mockPlanRepo.findRegistros.mockResolvedValueOnce([
      { fecha: new Date('2026-09-01'), id: 'r', monto: 200000, nota: null, planId: 'plan-1' },
    ] as never);

    const result = expectSuccess(await executeGetCajita(params));

    expect(result.data?.cajita?.porcentaje).toBe(100);
    expect(result.data?.cajita?.faltante).toBe(0);
    expect(result.data?.cajita?.hitoAlcanzado).toBe(100);
  });

  it('sólo consulta el viaje del usuario que pregunta', async () => {
    await executeGetCajita(params);

    expect(mockViajeRepo.findActivoByUserId).toHaveBeenCalledWith('usuario-1');
  });
});
