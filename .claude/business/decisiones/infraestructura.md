# Decisión — Infraestructura

> **Fecha:** 2026-08-29 · **Estado:** vigente

Dónde vive Coti, por qué quedó así, y qué tiene fecha de caducidad.

## Dónde vive

| Recurso | Cuál |
|---|---|
| Repo | `dannydanzka/coti` (**público**) — renombrado desde `claude-workshop-wizeline` |
| Proyecto Vercel | `coti` — team `wizeline-workshop` |
| Base de datos | Supabase `coti-db` — PostgreSQL 17.6 |
| Producción | **https://coti-mx.vercel.app** — alias único |

## Dominio

`coti.vercel.app` **no se pudo usar**: ya está tomada por otra cuenta y los subdominios
`.vercel.app` son únicos globalmente. Quedó `coti-mx.vercel.app`, registrada como **dominio del
proyecto** —no como alias— para que quede exenta del SSO: el team usa
`ssoProtection: all_except_custom_domains`, y un alias suelto sigue detrás del login de Vercel.

Se eliminaron `alcanza-six.vercel.app` (heredada del nombre viejo) y el alias
`coti-wizeline-workshop.vercel.app`, que **se regenera en cada deploy de producción** y hay que
volver a borrar.

## Variables de entorno

En Vercel (Production): `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`. Los nombres y para qué
sirve cada uno están en `.env.example`; **los valores viven sólo en `.env.local` y en Vercel,
nunca en el repo.**

El pooler de Supabase exige `uselibpqcompat=true` en la URL o falla con
`self-signed certificate in certificate chain`. `DATABASE_URL` = pooled (pgbouncer) ·
`DIRECT_URL` = non-pooling (migraciones).

Local y producción apuntan a **la misma base**. No hay entorno de staging.

## Riesgos con fecha

| Riesgo | Fecha |
|---|---|
| El team `wizeline-workshop` está en **Pro con trial que vence el 12-sep-2026**. Bajarlo a Hobby o borrarlo antes o empieza a facturar. | 2026-09-12 |
| `/api/auth/login` permite **5 intentos por IP cada 15 min** (limitador en memoria). Si en el workshop varias personas entran desde la misma red se bloquean entre ellas. | durante el workshop |

## Asumido a conciencia

- El repo es **público** y `.claude/business/team/` contiene perfiles de personas reales.
  Decisión del owner con conocimiento del hecho.
- No hay proveedor de correo. `/forgot-password` genera el token igual, pero no se envía nada:
  fuera de producción el enlace se escribe en el log del servidor para poder recorrer el flujo.
- El repo **no está conectado a Vercel** (`vercel git connect`): cada deploy es manual.
