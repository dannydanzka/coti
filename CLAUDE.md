# CLAUDE.md — Travel Savings App

> **Qué es**: herramienta de planificación financiera para viajes.
> **Principio rector**: **esta herramienta proyecta, no reserva.** Ni búsqueda de vuelos,
> ni checkout, ni pagos. Si aparece la tentación de agregarlos, la respuesta por defecto
> es no — ver `spec/spec-tecnica-travel-savings-app.md` §1.
> **Stack**: Next.js 16 (App Router) · Prisma 7 + PostgreSQL · Redux Toolkit ·
> styled-components · Vitest + RTL · TypeScript strict.
> **Origen**: copia congelada de Soberanía del Código, disciplina `frontend`
> (commit `bcbb4e5`). **Este repo no se sincroniza con nada.**

---

## Políticas duras

1. **Respetar los límites de capa.** Presentación no habla con Prisma; una API Route no
   tiene lógica de negocio. Está automatizado en `custom/architecture-boundaries`.
2. **Commits sólo cuando se piden.** Nunca autónomos.
3. **Buscar antes de crear.** El componente/helper/pattern probablemente ya existe.
4. **Idioma**: código, comentarios y nombres en **inglés**; documentación del equipo,
   contenido de UI y `spec/` en **español**.
5. **Leer el pattern antes de escribir.** Las reglas por tipo de archivo están en
   `.claude/rules/_global.md`.

---

## Comandos

```bash
npm run dev          # Dev server (Next.js 16, Turbopack)
npm run build        # prisma generate + next build
npm run type-check   # tsc --noEmit
npm test             # vitest run — 1555 tests
npm run test:watch   # vitest en watch
npm run lint         # lint:tsx + lint:css + type-check
npm run lint:tsx     # eslint (41 reglas custom)
npm run lint:css     # stylelint sobre **/*.styled.{ts,tsx}
npm run audit:dead   # knip — código muerto
npm run db:push      # aplica prisma/schema.prisma a la DB
npm run db:seed      # siembra destinos + cuenta demo (demo@alcanza.mx / Demo1234!)
npm run db:studio    # Prisma Studio
```

> ⚠️ **`npm run lint:fix` NO es seguro a ciegas.** La regla
> `@typescript-eslint/no-unnecessary-type-assertion` da falsos positivos bajo
> `moduleResolution: bundler` y su autofix ya rompió mocks (`src/libs/shared/testing/utils/mock-utilities/`,
> `src/libs/shared/testing/mocks/database/auth/`). Revisá el diff antes de commitear.

> **Estado actual**: `type-check`, `build`, `test` y `stylelint` en verde;
> eslint con 0 errores y ~28 warnings (los falsos positivos de arriba).
> **Falta**: `DATABASE_URL` real y las migraciones — copiar `.env.example` a
> `.env.local` y correr `npm run db:push && npm run db:seed`.

---

## Arquitectura

Front y back viven en el mismo proyecto Next.js. El flujo, en una línea:

```
Screen (apps/*/presentation) → Hook → Redux slice → Service (fetch)
                                                        ↓
                              API Route (app/api/**) — controlador delgado
                                                        ↓
                              Use Case (apps/*/domain) → Repository → Prisma
```

**Regla dura**: la API Route valida el body con el schema zod de `@validation`, delega en
el use case y mapea el error con `handleApiError`. Nada más.
Pattern: `.claude/patterns/frontend/nextjs/api-routes.md`.

```
src/
├── app/                    Next.js App Router — 17 rutas
│   ├── (public)/           home · login · signup · forgot-password · reset-password
│   ├── (admin)/admin/      panel admin → users
│   └── api/                auth/* · admin/users/*
├── apps/                   contextos de negocio
│   ├── auth/domain/        use cases: login · signup · logout · me ·
│   │                       request-password-reset · reset-password
│   ├── admin/              gestión de usuarios (RBAC: OWNER · ADMIN · PARTICIPANT)
│   └── public/             screens públicas
├── data/
│   └── destinos.ts         catálogo curado de destinos y rangos MXN (741 líneas)
└── libs/                   núcleo compartido
    ├── domain/             entities · interfaces · validation (zod) · mappers · types
    │   └── projection/     proyectarCosto — el corazón del producto
    ├── infrastructure/     prisma · repositories · services · state (RTK) ·
    │                       middleware (auth, rate-limit, validation) · email (Resend) · config
    ├── presentation/       components · hooks · providers · styles · assets
    └── shared/             constants · helpers · i18n · utils · testing
```

**Estilos**: styled-components + tokens de `@dannydanzka/sovereignty-ui`. Nunca valores
directos (`${spacing.md}`, no `16px`), propiedades CSS en orden alfabético, y ningún
`<div>`/`<span>`/`<button>` crudo — siempre un styled-component.

**Datos**: `prisma/schema.prisma` tiene dos capas —
**identidad** (`User`, `UserRole`, `PasswordResetToken`) heredada de soberanía, y
**dominio de viajes** (`Destino`, `TemporadaDestino`, `Atraccion`, `Viaje`,
`AtraccionViaje`, `PlanDeAhorro`, `RegistroDeAhorro`, `HabitoRecorte`).
La config de Prisma 7 vive en `prisma.config.ts` (raíz), no en `package.json`.
Schema: `prisma/schema.prisma` · seed: `prisma/seed.ts`.

---

## Deudas conocidas

| Qué | Detalle |
|---|---|
| `vendor/sovereignty-ui` | El design system se publica en GitHub Packages, pero el token de lectura de esta máquina está vencido (401). Se vendorizó el `dist` v0.7.0 y `package.json` lo referencia como `file:vendor/sovereignty-ui`. Con un token válido: volver a `"^0.7.0"` + `.npmrc` con `@dannydanzka:registry`. |
| Sin migraciones | Sólo `db:push`. La primera migración se genera cuando haya una DB estable. |
| `src/middleware.ts` | Next 16 lo marca deprecado a favor de `proxy.ts`. Funciona; migrar con `npx @next/codemod@canary middleware-to-proxy .` cuando convenga. |
| Warnings de eslint | ~28, todos `no-unnecessary-type-assertion` — falsos positivos, ver arriba. |

---

## Base de conocimiento — `.claude/`

Sólo conocimiento: **no hay skills, hooks ni comandos**. Ninguna sesión ejecuta nada
automáticamente. Y no hay `.project-id` ni `.sovereignty-version`, así que el `sync.sh`
de Soberanía del Código **no puede apuntarle a este repo**: lo que está aquí es una
copia congelada, propiedad de este proyecto, que se edita libremente.

```
.claude/
├── rules/
│   └── _global.md          Reglas transversales + tabla "dónde buscar por tipo de archivo"
├── patterns/
│   ├── core/         (68)  Arquitectura · calidad · testing · workflow · git ·
│   │                       documentación · conduct · 15 SOPs vivos
│   ├── methodology/  (24)  La cadena SBD → SCI → SCD → SCG
│   ├── frontend/    (130)  Next.js · presentación · infraestructura · testing ·
│   │                       tooling (incl. las 41 reglas de ESLint documentadas)
│   └── business/           Patterns exclusivos de este proyecto (vacío — llenar)
└── business/               Contexto de negocio del proyecto (vacío — llenar)
```

**Antes de teclear código**: `.claude/patterns/methodology/index.md`. En la práctica
**SCD** diseña el contexto y **SCG** gobierna la ejecución.

**Podado a propósito** (no está y no va a volver): `doctrine/` (filosofía del sistema),
`core/business/` (multi-tenant), los eslabones SDP · SQP · SRO de la cadena, y ~36 SOPs
de otras organizaciones (Atlassian/Jira/Confluence, publicación del design system,
ingesta documental, migraciones de código legado).

---

## Contexto del workshop — raíz del repo

| Ruta | Qué es |
|---|---|
| `spec/spec-tecnica-travel-savings-app.md` | **La especificación del producto — fuente de verdad del alcance** |
| `ideas/` | Banco de ideas del workshop (7 propuestas; ésta es la #04) |
| `team/` | Perfiles del equipo |
| `scripts/eslint-rules/` | Las 41 reglas custom que hacen cumplir la arquitectura |
| `prisma/` | `prisma/schema.prisma` + `prisma/seed.ts` (destinos + cuenta demo con 6 meses de historial) |
| `vendor/sovereignty-ui/` | Design system vendorizado (ver Deudas conocidas) |
