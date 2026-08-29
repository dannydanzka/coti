# Status — instantánea del proyecto

> Última actualización: 2026-08-29

## Infraestructura

| Recurso | Estado |
|---|---|
| Repo | `dannydanzka/coti` (público) — renombrado desde `claude-workshop-wizeline` |
| Proyecto Vercel | `coti` — team `wizeline-workshop` |
| Base de datos | Supabase `coti-db` — PostgreSQL 17.6, conexión verificada |
| Deploy | ✅ producción en **https://coti-mx.vercel.app** (alias único) |

**Dominio:** `coti.vercel.app` no se pudo usar — ya está tomada por otra cuenta de Vercel
(los subdominios `.vercel.app` son únicos globalmente). Se quedó `coti-mx.vercel.app`, registrada
como dominio del proyecto para que quede exenta del SSO. Se eliminaron `alcanza-six.vercel.app`
(heredada del nombre viejo) y el alias `coti-wizeline-workshop.vercel.app`.

**Variables en Vercel (Production):** `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`.
`RESEND_API_KEY` no está y no hace falta: es opcional en el código, sólo desactiva el envío del
correo de recuperación — el token de reseteo se genera igual.

**Ojo con el rate limit:** `/api/auth/login` permite 5 intentos por IP cada 15 minutos. Si en el
workshop varias personas entran desde la misma red, se van a bloquear entre ellas.

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

## Cuentas de la demo

| Cuenta | Contraseña | Rol | Entra a |
|---|---|---|---|
| `owner@coti.mx` | `Owner1234!` | OWNER | `/admin` y `/dashboard` |
| `admin@coti.mx` | `Admin1234!` | ADMIN | `/admin` y `/dashboard` |
| `demo@alcanza.mx` | `Demo1234!` | PARTICIPANT | `/dashboard` |

Un solo `/login` para las tres: el rol decide a dónde cae.

## Pendiente inmediato

1. Pantallas del producto: inicio bifurcado, flujo A, flujo B, plan de ahorro, cajita,
   sliders de hábitos. El dominio de viajes ya está en la base y sembrado, pero **sin API
   ni UI**: el dashboard muestra el estado vacío.
2. Conectar el repo a Vercel (`vercel git connect`) para que cada push despliegue solo.

## Deuda conocida

- El repo es **público** y `.claude/business/team/` contiene perfiles de personas reales.
  Decisión tomada por el owner con conocimiento del hecho.
- La hoja de sprites es referencia rasterizada: hay que recortar sprites individuales y
  verificar transparencia antes de producción.
- Cualquier cifra de mercado que se use en el pitch necesita fuente o se quita.
