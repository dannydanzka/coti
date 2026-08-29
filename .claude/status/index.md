# Status — instantánea del proyecto

> Última actualización: 2026-08-29

## Infraestructura

| Recurso | Estado |
|---|---|
| Repo | `dannydanzka/claude-workshop-wizeline` (público) |
| Proyecto Vercel | `coti` — team `wizeline-workshop` |
| Base de datos | Supabase `coti-db` — PostgreSQL 17.6, conexión verificada |
| Deploy | ⚠️ aún no se ha desplegado nada |

**Riesgo con fecha:** el team `wizeline-workshop` está en plan **Pro con trial que vence el
12 de septiembre de 2026**. Hay que bajarlo a Hobby o borrarlo antes o empieza a facturar.

**Nota de conexión:** el pooler de Supabase exige `uselibpqcompat=true` en la URL o falla con
`self-signed certificate in certificate chain`. Ya está aplicado en `.env` y `.env.local`.
`DATABASE_URL` = pooled (pgbouncer) · `DIRECT_URL` = non-pooling (migraciones).

## Construido

- Scaffold Next.js 16.3.3 + React 19.2.8 + Tailwind + TypeScript
- Prisma 7.10.0 con adaptador `@prisma/adapter-pg`
- `src/data/destinos.ts` — 18 destinos curados con rangos MXN, temporadas y atracciones
- `src/lib/proyeccion.ts` — proyección de costo y matemática de ahorro
- Identidad de marca completa en `assets/branding/` + copias servidas en `public/brand/`

## Pendiente inmediato

1. **Modelar el dominio de viajes en Prisma** — el schema solo trae `User` + `PasswordResetToken`.
   Bloqueado por coordinación: definir quién lo escribe y en qué convención de nombres.
2. Migración inicial contra `coti-db`.
3. Seed de destinos **+ cuenta demo con 6 meses de historial** (sin historial la cajita se ve
   vacía en el escenario y el momento emocional del demo se cae).
4. Pantallas: inicio bifurcado, flujo A, flujo B, plan de ahorro, cajita, sliders de hábitos.

## Deuda conocida

- El repo es **público** y `.claude/business/team/` contiene perfiles de personas reales.
  Decisión tomada por el owner con conocimiento del hecho.
- La hoja de sprites es referencia rasterizada: hay que recortar sprites individuales y
  verificar transparencia antes de producción.
- Cualquier cifra de mercado que se use en el pitch necesita fuente o se quita.
