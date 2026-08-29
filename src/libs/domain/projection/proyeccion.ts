/**
 * Lógica de proyección — el corazón del producto.
 *
 * Principio rector: esta herramienta PROYECTA, no reserva.
 * Todos los montos son MXN y todos los rangos son estimaciones curadas,
 * nunca precios en vivo de un proveedor.
 */

export type EstiloNivel = 'ECONOMICO' | 'MEDIO' | 'COMODO';
export type Ritmo = 'RELAJADO' | 'MEDIO' | 'INTENSO';
export type FrecuenciaAporte = 'SEMANAL' | 'QUINCENAL' | 'MENSUAL' | 'TRIMESTRAL';

export interface RangosDestino {
  vueloMin: number;
  vueloMax: number;
  hospedajeMin: number;
  hospedajeMax: number;
  diarioMin: number;
  diarioMax: number;
  visaCosto: number;
}

export interface PreferenciasViaje {
  noches: number;
  personas: number;
  estiloAlojamiento: EstiloNivel;
  estiloComida: EstiloNivel;
  ritmo: Ritmo;
  /** Multiplicador de temporada del mes de salida (1.0 = base) */
  multiplicadorTemporada?: number;
  /** Costo de atracciones marcadas Must go (se suman siempre) */
  atraccionesMustGo?: number;
  /** Costo de atracciones Would be nice (solo empujan el máximo) */
  atraccionesOpcionales?: number;
}

export interface RangoCosto {
  min: number;
  max: number;
  desglose: DesgloseCosto[];
}

export interface DesgloseCosto {
  concepto: string;
  emoji: string;
  min: number;
  max: number;
}

const FACTOR_ESTILO: Record<EstiloNivel, number> = {
  COMODO: 1.45,
  ECONOMICO: 0.75,
  MEDIO: 1.0,
};

/** Un ritmo más intenso gasta más en transporte y entradas por día. */
const FACTOR_RITMO: Record<Ritmo, number> = {
  INTENSO: 1.25,
  MEDIO: 1.0,
  RELAJADO: 0.85,
};

/**
 * Calcula el rango estimado de costo de un viaje.
 *
 * El vuelo y la visa escalan por persona; el hospedaje escala por noche
 * (asumiendo habitación compartida a partir de la segunda persona);
 * el gasto diario escala por persona y por noche.
 */
export function proyectarCosto(rangos: RangosDestino, prefs: PreferenciasViaje): RangoCosto {
  const temporada = prefs.multiplicadorTemporada ?? 1;
  const personas = Math.max(1, prefs.personas);
  const noches = Math.max(1, prefs.noches);

  const vuelo = {
    max: Math.round(rangos.vueloMax * personas * temporada),
    min: Math.round(rangos.vueloMin * personas * temporada),
  };

  // Habitaciones: 2 personas por habitación, redondeando hacia arriba.
  const habitaciones = Math.ceil(personas / 2);
  const factorAloj = FACTOR_ESTILO[prefs.estiloAlojamiento];
  const hospedaje = {
    max: Math.round(rangos.hospedajeMax * noches * habitaciones * factorAloj * temporada),
    min: Math.round(rangos.hospedajeMin * noches * habitaciones * factorAloj * temporada),
  };

  const factorDiario = FACTOR_ESTILO[prefs.estiloComida] * FACTOR_RITMO[prefs.ritmo];
  const diario = {
    max: Math.round(rangos.diarioMax * noches * personas * factorDiario),
    min: Math.round(rangos.diarioMin * noches * personas * factorDiario),
  };

  const visa = {
    max: rangos.visaCosto * personas,
    min: rangos.visaCosto * personas,
  };

  const mustGo = prefs.atraccionesMustGo ?? 0;
  const opcionales = prefs.atraccionesOpcionales ?? 0;
  const atracciones = {
    max: (mustGo + opcionales) * personas,
    min: mustGo * personas,
  };

  const desglose: DesgloseCosto[] = [
    { concepto: 'Vuelo redondo', emoji: '✈️', ...vuelo },
    { concepto: `Hospedaje · ${noches} noches`, emoji: '🏨', ...hospedaje },
    { concepto: 'Comida y transporte', emoji: '🍜', ...diario },
    { concepto: 'Atracciones', emoji: '🎟️', ...atracciones },
  ];
  if (rangos.visaCosto > 0) {
    desglose.push({ concepto: 'Visa y trámites', emoji: '🛂', ...visa });
  }

  return {
    desglose,
    max: desglose.reduce((acc, d) => acc + d.max, 0),
    min: desglose.reduce((acc, d) => acc + d.min, 0),
  };
}

// ─── Matemática de ahorro ───

/** Aportaciones por año según la frecuencia elegida. */
export const APORTES_POR_ANIO: Record<FrecuenciaAporte, number> = {
  MENSUAL: 12,
  QUINCENAL: 26,
  SEMANAL: 52,
  TRIMESTRAL: 4,
};

export const DIAS_POR_APORTE: Record<FrecuenciaAporte, number> = {
  MENSUAL: 30,
  QUINCENAL: 15,
  SEMANAL: 7,
  TRIMESTRAL: 91,
};

/**
 * ¿Cuánto hay que apartar por periodo para llegar a la meta en la fecha objetivo?
 */
export function aportacionRequerida(
  meta: number,
  montoInicial: number,
  frecuencia: FrecuenciaAporte,
  desde: Date,
  fechaObjetivo: Date
): number {
  const faltante = Math.max(0, meta - montoInicial);
  const periodos = periodosEntre(desde, fechaObjetivo, frecuencia);
  if (periodos <= 0) return faltante;
  return Math.ceil(faltante / periodos);
}

export function periodosEntre(desde: Date, hasta: Date, frecuencia: FrecuenciaAporte): number {
  const dias = (hasta.getTime() - desde.getTime()) / 86_400_000;
  return Math.max(0, Math.floor(dias / DIAS_POR_APORTE[frecuencia]));
}

/**
 * Dada una capacidad de ahorro, ¿en qué fecha se alcanza la meta?
 * Devuelve null si la aportación es cero o negativa.
 */
export function fechaDeLlegada(
  meta: number,
  ahorroActual: number,
  aportacion: number,
  frecuencia: FrecuenciaAporte,
  desde: Date = new Date()
): Date | null {
  const faltante = meta - ahorroActual;
  if (faltante <= 0) return desde;
  if (aportacion <= 0) return null;
  const periodos = Math.ceil(faltante / aportacion);
  const resultado = new Date(desde);
  resultado.setDate(resultado.getDate() + periodos * DIAS_POR_APORTE[frecuencia]);
  return resultado;
}

/** Capacidad de ahorro mensual equivalente, sin importar la frecuencia. */
export function equivalenteMensual(aportacion: number, frecuencia: FrecuenciaAporte): number {
  return Math.round((aportacion * APORTES_POR_ANIO[frecuencia]) / 12);
}

export function porcentajeAvance(ahorrado: number, meta: number): number {
  if (meta <= 0) return 0;
  return Math.min(100, Math.round((ahorrado / meta) * 100));
}

/** Hitos celebrables de la cajita de ahorro. */
export function hitoAlcanzado(porcentaje: number): 25 | 50 | 75 | 100 | null {
  if (porcentaje >= 100) return 100;
  if (porcentaje >= 75) return 75;
  if (porcentaje >= 50) return 50;
  if (porcentaje >= 25) return 25;
  return null;
}

export function formatoMXN(monto: number): string {
  return new Intl.NumberFormat('es-MX', {
    currency: 'MXN',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(monto);
}

export function formatoFecha(fecha: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(fecha);
}
