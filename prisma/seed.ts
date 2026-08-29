import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { DESTINOS } from '../src/data/destinos';
import { proyectarCosto } from '../src/libs/domain/projection/proyeccion';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

/** Hábitos recortables que alimentan el traductor de costo de oportunidad. */
const HABITOS = [
  { etiqueta: 'Café de cafetería', emoji: '☕', costoMensual: 1600 },
  { etiqueta: 'Suscripciones de streaming', emoji: '📺', costoMensual: 700 },
  { etiqueta: 'Comida a domicilio', emoji: '🛵', costoMensual: 2400 },
  { etiqueta: 'Salidas de fin de semana', emoji: '🍻', costoMensual: 3000 },
  { etiqueta: 'Ubers al trabajo', emoji: '🚕', costoMensual: 1800 },
];

async function main() {
  console.log('› Limpiando datos previos…');
  await prisma.registroDeAhorro.deleteMany();
  await prisma.habitoRecorte.deleteMany();
  await prisma.planDeAhorro.deleteMany();
  await prisma.atraccionViaje.deleteMany();
  await prisma.viaje.deleteMany();
  await prisma.user.deleteMany();
  await prisma.atraccion.deleteMany();
  await prisma.temporadaDestino.deleteMany();
  await prisma.destino.deleteMany();

  console.log(`› Sembrando ${DESTINOS.length} destinos…`);
  for (const d of DESTINOS) {
    const destino = await prisma.destino.create({
      data: {
        slug: d.slug,
        ciudad: d.ciudad,
        pais: d.pais,
        continente: d.continente,
        emoji: d.emoji,
        descripcion: d.descripcion,
        vueloMin: d.vueloMin,
        vueloMax: d.vueloMax,
        hospedajeMin: d.hospedajeMin,
        hospedajeMax: d.hospedajeMax,
        diarioMin: d.diarioMin,
        diarioMax: d.diarioMax,
        visaCosto: d.visaCosto,
        diasSugeridos: d.diasSugeridos,
        atracciones: { create: d.atracciones },
      },
    });

    // Temporadas: alta 1.35, baja 0.85, media 1.0
    for (let mes = 1; mes <= 12; mes++) {
      const esAlta = d.mesesAlta.includes(mes);
      const esBaja = d.mesesBaja.includes(mes);
      await prisma.temporadaDestino.create({
        data: {
          destinoId: destino.id,
          mes,
          temporada: esAlta ? 'ALTA' : esBaja ? 'BAJA' : 'MEDIA',
          multiplicador: esAlta ? 1.35 : esBaja ? 0.85 : 1.0,
        },
      });
    }
  }

  // ─── Cuentas de acceso: una por rol, para poder entrar a cada área ───
  console.log('› Creando cuentas de acceso (owner · admin · participante demo)…');

  const hash = (plain: string) => bcrypt.hash(plain, 10);

  await prisma.user.create({
    data: {
      email: 'owner@coti.mx',
      firstName: 'Owner',
      lastName: 'Coti',
      passwordHash: await hash('Owner1234!'),
      role: 'OWNER',
    },
  });

  await prisma.user.create({
    data: {
      email: 'admin@coti.mx',
      firstName: 'Admin',
      lastName: 'Coti',
      passwordHash: await hash('Admin1234!'),
      role: 'ADMIN',
    },
  });

  // ─── Cuenta demo con historial, para poder mostrar la cajita en el pitch ───
  const demo = await prisma.user.create({
    data: {
      email: 'demo@coti.mx',
      firstName: 'Cuenta',
      lastName: 'Demo',
      passwordHash: await hash('Demo1234!'),
      role: 'PARTICIPANT',
    },
  });

  const tokio = await prisma.destino.findUniqueOrThrow({
    where: { slug: 'tokio' },
    include: { atracciones: true },
  });

  const noches = 10;
  const personas = 1;
  const mustGo = tokio.atracciones.slice(0, 2);
  const opcionales = tokio.atracciones.slice(2);

  const rango = proyectarCosto(
    {
      vueloMin: tokio.vueloMin, vueloMax: tokio.vueloMax,
      hospedajeMin: tokio.hospedajeMin, hospedajeMax: tokio.hospedajeMax,
      diarioMin: tokio.diarioMin, diarioMax: tokio.diarioMax,
      visaCosto: tokio.visaCosto,
    },
    {
      noches, personas,
      estiloAlojamiento: 'MEDIO', estiloComida: 'MEDIO', ritmo: 'MEDIO',
      multiplicadorTemporada: 1.0,
      atraccionesMustGo: mustGo.reduce((a, x) => a + x.costoMin, 0),
      atraccionesOpcionales: opcionales.reduce((a, x) => a + x.costoMax, 0),
    },
  );

  const salida = new Date();
  salida.setMonth(salida.getMonth() + 8);

  const viaje = await prisma.viaje.create({
    data: {
      userId: demo.id,
      destinoId: tokio.id,
      estado: 'AHORRANDO',
      fechaSalida: salida,
      noches,
      personas,
      costoMin: rango.min,
      costoMax: rango.max,
      atracciones: {
        create: [
          ...mustGo.map((a) => ({ atraccionId: a.id, prioridad: 'MUST_GO' as const })),
          ...opcionales.map((a) => ({ atraccionId: a.id, prioridad: 'WOULD_BE_NICE' as const })),
        ],
      },
    },
  });

  const meta = rango.max;
  const aportacion = 6500;
  const plan = await prisma.planDeAhorro.create({
    data: {
      viajeId: viaje.id,
      meta,
      montoInicial: 8000,
      aportacion,
      frecuencia: 'MENSUAL',
      fechaObjetivo: salida,
      recordatorios: true,
      habitos: { create: HABITOS.map((h) => ({ ...h, recorte: 0 })) },
    },
  });

  // Seis meses de historial hacia atrás — sin esto la cajita se ve vacía en la demo.
  const historial: { monto: number; fecha: Date; nota: string }[] = [];
  for (let i = 6; i >= 1; i--) {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - i);
    // Variación realista: no todos los meses se aporta lo mismo.
    const variacion = [1, 0.7, 1.2, 1, 0.55, 1.15][6 - i];
    historial.push({
      monto: Math.round(aportacion * variacion),
      fecha,
      nota: variacion < 0.8 ? 'Mes apretado' : variacion > 1.1 ? 'Entró un extra' : 'Aportación del mes',
    });
  }
  await prisma.registroDeAhorro.createMany({
    data: historial.map((h) => ({ planId: plan.id, ...h })),
  });

  const total = historial.reduce((a, h) => a + h.monto, 0) + plan.montoInicial;
  console.log(`✓ Listo. Demo: ${tokio.ciudad} · meta ${meta} · ahorrado ${total} (${Math.round((total / meta) * 100)}%)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
