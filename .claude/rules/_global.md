# Global Rules

> **APLICA A**: todos los archivos de `src/`
> **PROPÓSITO**: reglas transversales — lo que el linter no alcanza a atrapar
>
> Muchas de estas reglas **están automatizadas** en `eslint.config.js` mediante las
> 41 reglas custom de `scripts/eslint-rules/`. Si dudas de una, el linter manda.
> Documentación de cada regla: `.claude/patterns/frontend/tooling/eslint-rules/`.

---

## DO

- **Leer el pattern antes de escribir.** El tipo de archivo dicta dónde buscar (tabla abajo).
- **Usar los alias** (`@components`, `@helpers`, `@repositories`, …). Nunca rutas relativas
  largas: `../../../libs/...` está prohibido por `custom/import-strategy`.
- **Tokens del design system**: `${spacing.md}`, `${color.textPrimary}`. Nunca `16px` ni `#fff`
  (`custom/design-tokens-policy`).
- **Propiedades CSS en orden alfabético** dentro de cada styled-component (stylelint `order/`).
- **Un styled-component por elemento.** Nada de `<div>`, `<span>`, `<button>` crudos
  (`custom/no-native-html`).
- **API Route = controlador delgado**: valida con zod, delega en el use case, mapea con
  `handleApiError` (`custom/route-delegation`).
- **Correr el linter sobre lo que tocaste** antes de dar algo por terminado.

## DON'T

- **Lógica de negocio en la capa de presentación.** Va en `apps/*/domain/use-cases/`.
- **Llamadas directas a servicios desde componentes** (`custom/no-direct-service-calls`).
- **Redux dentro de un componente.** Va en un hook (`custom/no-redux-in-components`).
- **`any` en código de producción.**
- **Estilos inline** (`custom/no-inline-styles`).
- **Imports cruzados entre módulos** (`apps/admin` no importa de `apps/public`).
- **`eslint-disable`** para silenciar una regla (`custom/no-eslint-disable`).
- **Strings de UI hardcodeados**: van a `@i18n` (`custom/no-hardcoded-ui-strings`).

---

## Checklist antes de dar por terminado

- [ ] `npm run type-check` — cero errores
- [ ] `npm run lint:tsx` — cero errores (los *warnings* de `no-unnecessary-type-assertion`
      son falsos positivos conocidos; ver `CLAUDE.md`)
- [ ] `npm test` — todo verde
- [ ] Sin imports cruzados entre módulos

---

## Dónde buscar, por tipo de archivo

| Trabajando en | Pattern |
|---|---|
| Componente | `patterns/frontend/presentation/components.md` |
| Hook | `patterns/frontend/presentation/hooks.md` |
| Styled-component | `patterns/frontend/presentation/styling/` |
| Use case | `patterns/frontend/domain/use-cases.md` |
| API Route | `patterns/frontend/nextjs/api-routes.md` |
| Repository | `patterns/frontend/infrastructure/repositories.md` |
| Service | `patterns/frontend/infrastructure/services.md` |
| Redux slice | `patterns/frontend/infrastructure/state/` |
| Auth / sesión | `patterns/frontend/auth/` |
| Test unitario | `patterns/frontend/testing/` · `patterns/core/testing/` |
| Regla de ESLint | `patterns/frontend/tooling/eslint-rules/` |

## Antes de escribir código, la cadena

`patterns/methodology/index.md` — **SBD → SCI → SCD → SCG**. En la práctica:
**SCD** (`patterns/methodology/development/SCD.md`) diseña el contexto antes de teclear;
**SCG** (`patterns/methodology/development/SCG.md`) gobierna la ejecución.

## Contexto del proyecto

| Dónde | Qué |
|---|---|
| `spec/spec-tecnica-travel-savings-app.md` | La especificación del producto — **la fuente de verdad del alcance** |
| `ideas/` · `team/` | Banco de ideas del workshop y perfiles del equipo |
| `.claude/business/` | Contexto de negocio que se vaya generando |
| `.claude/patterns/business/` | Patterns exclusivos de este proyecto |
