/**
 * Travel Entity Tests
 */

import { calcularAhorrado, sumarAtraccionesPorPrioridad } from './travel.entity';

const registro = (monto: number) => ({
  fecha: new Date('2026-09-01'),
  id: `registro-${monto}`,
  monto,
  nota: null,
  planId: 'plan-1',
});

const seleccion = (prioridad: 'MUST_GO' | 'WOULD_BE_NICE', costoMin: number, costoMax: number) => ({
  atraccion: {
    costoMax,
    costoMin,
    descripcion: 'Descripción de prueba',
    destinoId: 'destino-1',
    id: `atraccion-${costoMin}`,
    nombre: 'Atracción de prueba',
  },
  atraccionId: `atraccion-${costoMin}`,
  id: `seleccion-${costoMin}`,
  prioridad,
  viajeId: 'viaje-1',
});

describe('calcularAhorrado', () => {
  it('parte del monto inicial cuando no hay aportaciones', () => {
    expect(calcularAhorrado(6500, [])).toBe(6500);
  });

  it('suma el monto inicial y todas las aportaciones', () => {
    expect(calcularAhorrado(6500, [registro(3200), registro(3200)])).toBe(12900);
  });

  it('arranca en cero cuando no hay monto inicial', () => {
    expect(calcularAhorrado(0, [registro(1000)])).toBe(1000);
  });
});

describe('sumarAtraccionesPorPrioridad', () => {
  it('devuelve ceros cuando no hay atracciones elegidas', () => {
    expect(sumarAtraccionesPorPrioridad([])).toEqual({ mustGo: 0, opcionales: 0 });
  });

  it('cuenta las "must go" por su costo mínimo', () => {
    const totales = sumarAtraccionesPorPrioridad([seleccion('MUST_GO', 100, 900)]);

    expect(totales).toEqual({ mustGo: 100, opcionales: 0 });
  });

  it('cuenta las opcionales por su costo máximo', () => {
    const totales = sumarAtraccionesPorPrioridad([seleccion('WOULD_BE_NICE', 100, 900)]);

    expect(totales).toEqual({ mustGo: 0, opcionales: 900 });
  });

  it('separa ambos grupos en la misma pasada', () => {
    const totales = sumarAtraccionesPorPrioridad([
      seleccion('MUST_GO', 100, 900),
      seleccion('WOULD_BE_NICE', 300, 1400),
      seleccion('MUST_GO', 500, 800),
    ]);

    expect(totales).toEqual({ mustGo: 600, opcionales: 1400 });
  });
});
