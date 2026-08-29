# CLAUDE.md — Coti

> **Qué es**: web app que proyecta cuánto necesitas ahorrar para un viaje y le da seguimiento
> visual al avance en una *cajita de ahorro*. Coti es un coatí viajero.
> **Principio rector**: **esta herramienta proyecta, no reserva.** No busca vuelos, no cotiza
> hoteles, no procesa pagos. Si aparece la tentación de agregarlos — propia o sugerida por
> Claude — la respuesta por defecto es **no**.
> **Stack**: Next.js 16 (App Router) · Prisma 7 + PostgreSQL (Supabase) · Redux Toolkit ·
> styled-components · Vitest + RTL · TypeScript strict.
> **Contexto**: workshop de Claude Code · Wizeline · agosto 2026.

---

## Empieza por aquí

| Necesitas | Lee |
|---|---|
| Qué variables de entorno hacen falta | `.env.example` |
| Qué se construye y qué no | `.claude/business/spec/spec-tecnica-travel-savings-app.md` |
| Alcance acordado del MVP + los dos injertos | `.claude/plans/index.md` |
| Infraestructura viva (Vercel, Supabase, riesgos) | `.claude/status/index.md` |
| Cómo escribir código aquí | `.claude/rules/_global.md` |
| Marca, mascota, paleta | `README.md` · `assets/branding/` |

### Cuentas del seed

| Cuenta | Rol | Entra a |
|---|---|---|
| `owner@coti.mx` / `Owner1234!` | OWNER | `/admin` y `/dashboard` |
| `admin@coti.mx` / `Admin1234!` | ADMIN | `/admin` y `/dashboard` |
| `demo@alcanza.mx` / `Demo1234!` | PARTICIPANT | `/dashboard` (con historial de ahorro) |

Un solo `/login` para todos: el rol decide a dónde cae. Un participante que
intente `/admin` es devuelto a `/login`; la API responde `403`.

> El backlog operativo vive en **MeisterTask**, proyecto `Coti`. `.claude/plans/` es sólo para
> lo que no cabe en una tarjeta.

---

## Políticas duras

1. **Respetar los límites de capa.** Presentación no habla con Prisma; una API Route no tiene
   lógica de negocio. Automatizado en `custom/architecture-boundaries`.
2. **Commits sólo cuando se piden.** Nunca autónomos.
3. **Buscar antes de crear.** El componente/helper/pattern probablemente ya existe.
4. **Idioma**: código, comentarios y nombres en **inglés**; documentación del equipo, contenido
   de UI y `.claude/business/` en **español**.
5. **Leer el pattern antes de escribir.** La tabla "dónde buscar por tipo de archivo" está en
   `.claude/rules/_global.md`.

---

## Comandos

```bash
npm run dev          # Dev server (Next.js 16, Turbopack)
npm run build        # prisma generate + next build
npm run type-check   # tsc --noEmit
npm test             # vitest run — 1600 tests
npm run test:watch   # vitest en watch
npm run lint         # lint:tsx + lint:css + type-check
npm run lint:tsx     # eslint (41 reglas custom en scripts/eslint-rules/)
npm run lint:css     # stylelint sobre **/*.styled.{ts,tsx}
npm run audit:dead   # knip — código muerto
npx prisma migrate dev   # crea y aplica migraciones (prisma/migrations/)
npx prisma migrate deploy # aplica migraciones pendientes (CI / producción)
npm run db:seed      # siembra 18 destinos + 3 cuentas (ver abajo)
npm run db:studio    # Prisma Studio
```

> ⚠️ **`npm run lint:fix` NO es seguro a ciegas.** La regla
> `@typescript-eslint/no-unnecessary-type-assertion` da falsos positivos bajo
> `moduleResolution: bundler` y su autofix ya rompió mocks
> (`src/libs/shared/testing/utils/mock-utilities/`,
> `src/libs/shared/testing/mocks/database/auth/`). Revisá el diff antes de commitear.

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

**Regla dura**: la API Route valida el body con el schema zod de `@validation`, delega en el
use case y mapea el error con `handleApiError`. Nada más.
Pattern: `.claude/patterns/frontend/nextjs/api-routes.md`.

```
src/
├── app/                    Next.js App Router
│   ├── (public)/           home · login · signup · forgot-password · reset-password
│   ├── (authenticated)/    dashboard · dashboard/profile · dashboard/profile/edit
│   ├── (admin)/admin/      panel admin · admin/users
│   └── api/                auth/* · admin/users/* · public/profile
├── apps/                   contextos de negocio
│   ├── auth/domain/        use cases: login · signup · logout · me ·
│   │                       request-password-reset · reset-password
│   ├── admin/              gestión de usuarios (RBAC: OWNER · ADMIN · PARTICIPANT)
│   └── public/             screens públicas + use case update-profile
├── data/
│   └── destinos.ts         catálogo curado — 18 destinos con rangos en MXN
└── libs/                   núcleo compartido
    ├── domain/             entities · interfaces · validation (zod) · mappers · types
    │   └── projection/     proyectarCosto — el corazón del producto
    ├── infrastructure/     prisma · repositories · services · state (RTK) ·
    │                       middleware (auth, rate-limit, validation) · config
    ├── presentation/       components · hooks · providers · styles · assets
    └── shared/             constants · helpers · i18n · utils · testing
```

**Estilos**: styled-components + tokens de `@dannydanzka/sovereignty-ui`. Nunca valores directos
(`${spacing.md}`, no `16px`), propiedades CSS en orden alfabético, y ningún `<div>`/`<span>`/
`<button>` crudo — siempre un styled-component.

**Datos**: `prisma/schema.prisma` tiene dos capas —
**identidad** (`User`, `UserRole`, `PasswordResetToken`) y
**dominio de viajes** (`Destino`, `TemporadaDestino`, `Atraccion`, `Viaje`, `AtraccionViaje`,
`PlanDeAhorro`, `RegistroDeAhorro`, `HabitoRecorte`).
La config de Prisma 7 vive en `prisma.config.ts` (raíz), no en `package.json`.
Seed: `prisma/seed.ts`.

---

## Deudas conocidas

| Qué | Detalle |
|---|---|
| `vendor/sovereignty-ui` | El design system se publica en GitHub Packages, pero el token de lectura de esta máquina está vencido (401). Se vendorizó el `dist` v0.7.0 y `package.json` lo referencia como `file:vendor/sovereignty-ui`. Con un token válido: volver a `"^0.7.0"` + `.npmrc` con `@dannydanzka:registry`. |
| Nombre del paquete | `package.json` sigue diciendo `travel-savings-app`; la marca es **Coti**. |
| Foto de perfil | El perfil muestra iniciales o `photoUrl`, pero **no** hay subida de imagen: falta crear el bucket de Storage. |
| Dominio de viajes sin API | `Destino`, `Viaje`, `PlanDeAhorro`… existen en la base y el seed los llena, pero todavía no hay endpoints ni pantallas. El dashboard muestra el estado vacío. |
| Sin proveedor de correo | Se eliminó Resend. `/forgot-password` sigue generando el token en la base, pero **nadie recibe el enlace**: fuera de producción se escribe en el log del servidor para poder recorrer el flujo. Si se necesita correo real, hay que elegir proveedor y cargar su llave en `.env`. |
| `src/middleware.ts` | Next 16 lo marca deprecado a favor de `proxy.ts`. Funciona; migrar con `npx @next/codemod@canary middleware-to-proxy .` cuando convenga. |
| Warnings de eslint | ~28, todos `no-unnecessary-type-assertion` — falsos positivos, ver arriba. |
| Trial de Vercel | El team `wizeline-workshop` está en Pro con trial que vence el **12-sep-2026**. Ver `.claude/status/index.md`. |

---

## Base de conocimiento — `.claude/`

Sólo conocimiento: **no hay skills, hooks ni comandos**. Ninguna sesión ejecuta nada
automáticamente. Tampoco hay `.project-id` ni `.sovereignty-version`, así que el `sync.sh` de
Soberanía del Código **no puede apuntarle a este repo**: lo que hay aquí es una copia congelada
y podada, propiedad de este proyecto, que se edita libremente.

```
.claude/
├── business/               Spec · banco de ideas · perfiles del equipo
├── plans/                  Alcance del MVP y decisiones que no caben en una tarjeta
├── status/                 Instantánea de infraestructura (Vercel, Supabase, riesgos)
├── rules/_global.md        Reglas transversales + dónde buscar por tipo de archivo
└── patterns/
    ├── core/        (57)   Arquitectura · calidad · testing · workflow · git ·
    │                       documentación · conduct · 10 SOPs
    ├── methodology/ (24)   La cadena SBD → SCI → SCD → SCG
    ├── frontend/   (124)   Next.js · presentación · infraestructura · testing ·
    │                       tooling (incl. las 41 reglas de ESLint documentadas)
    └── business/           Patterns exclusivos de este proyecto (por llenar)
```

**Antes de teclear código**: `.claude/patterns/methodology/index.md`. En la práctica, **SCD**
diseña el contexto y **SCG** gobierna la ejecución.

Si necesitás reglas por módulo o SOPs propios, creá `.claude/rules/modules/` o
`.claude/rules/sop/` cuando tengas qué poner adentro — hoy no existen porque estaban vacíos y
git no versiona directorios vacíos.

**Podado a propósito** (no está y no va a volver): `doctrine/` (filosofía del sistema), los
eslabones SDP · SQP · SRO, patterns de herramientas que no usamos (Playwright/E2E, Jest, React
Native, Nx, redux-saga), meta-gobernanza del repo de soberanía, y los SOPs de otras
organizaciones (Atlassian/Jira/Confluence, publicación del design system, ingesta documental).

---

## Raíz del repo

| Ruta | Qué es |
|---|---|
| `README.md` | Presentación pública de Coti: producto, marca, mascota, paleta |
| `assets/branding/` | Identidad visual: logo, ícono, mascota, escenas, guía de marca |
| `scripts/eslint-rules/` | Las 41 reglas custom que hacen cumplir la arquitectura |
| `prisma/` | `prisma/schema.prisma` + `prisma/seed.ts` (destinos + cuenta demo con historial) |
| `vendor/sovereignty-ui/` | Design system vendorizado (ver Deudas conocidas) |

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
