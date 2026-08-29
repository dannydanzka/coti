/**
 * Travel Repository Interfaces
 *
 * Prisma row shapes read back by the repository. Kept explicit so the
 * transforms stay typed without leaking Prisma's generated types upward.
 */

export interface PrismaViajeRow {
  actualizadoEn: Date;
  costoMax: number;
  costoMin: number;
  creadoEn: Date;
  destinoId: string;
  estado: string;
  estiloAlojamiento: string;
  estiloComida: string;
  fechaSalida: Date | null;
  id: string;
  noches: number;
  personas: number;
  ritmo: string;
  userId: string;
}

export interface PrismaDestinoRow {
  ciudad: string;
  continente: string;
  descripcion: string;
  diarioMax: number;
  diarioMin: number;
  diasSugeridos: number;
  emoji: string;
  hospedajeMax: number;
  hospedajeMin: number;
  id: string;
  pais: string;
  slug: string;
  visaCosto: number;
  vueloMax: number;
  vueloMin: number;
}

export interface PrismaPlanRow {
  aportacion: number;
  creadoEn: Date;
  fechaObjetivo: Date;
  frecuencia: string;
  id: string;
  meta: number;
  montoInicial: number;
  recordatorios: boolean;
  viajeId: string;
}

export interface PrismaAtraccionRow {
  costoMax: number;
  costoMin: number;
  descripcion: string;
  destinoId: string;
  id: string;
  nombre: string;
}

export interface PrismaAtraccionViajeRow {
  atraccion: PrismaAtraccionRow;
  atraccionId: string;
  id: string;
  prioridad: string;
  viajeId: string;
}

export type ViajeConRelaciones = PrismaViajeRow & {
  atracciones: PrismaAtraccionViajeRow[];
  destino: PrismaDestinoRow;
  plan: PrismaPlanRow | null;
};

export interface PrismaTemporadaRow {
  destinoId: string;
  id: string;
  mes: number;
  multiplicador: number;
  temporada: string;
}

export interface PrismaRegistroRow {
  fecha: Date;
  id: string;
  monto: number;
  nota: string | null;
  planId: string;
}

export type DestinoConRelaciones = PrismaDestinoRow & {
  atracciones: PrismaAtraccionRow[];
  temporadas: PrismaTemporadaRow[];
};
