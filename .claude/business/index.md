# Contexto de negocio — Coti

> Todo el contexto no-código del proyecto vive aquí: qué se construye, por qué quedó así,
> de dónde salió la idea y quién está en el equipo.
> Las reglas de **cómo** escribir código están en `../rules/_global.md` y `../patterns/`.

## Qué hay

| Carpeta | Qué contiene | Cuándo leerla |
|---|---|---|
| [`spec/coti.md`](spec/coti.md) | **Fuente de verdad del alcance**: principio rector, problema, flujo, MVP y lo que queda fuera | antes de proponer o construir cualquier feature |
| [`decisiones/`](decisiones/index.md) | Decisiones cerradas con su porqué — UI kit, infraestructura | antes de re-abrir una discusión que ya se dio |
| [`mockups/`](mockups/README.md) | Las 8 pantallas del flujo dibujadas, móvil y escritorio — **y en qué difieren del modelo de datos** | al construir cualquier pantalla del flujo |
| [`ideas/`](ideas/README.md) | Banco de las 7 ideas propuestas por el equipo (ganó la #4) | contexto histórico del workshop |
| [`team/`](team/README.md) | Perfiles de las personas del workshop | para saber con quién se cuenta |

## Qué NO va aquí

- Patterns de código → `../patterns/`
- Reglas transversales → `../rules/_global.md`
- Código y assets servidos → `src/`, `public/` (raíz del repo)
- Backlog operativo → **MeisterTask**, proyecto `Coti`
