# Especificación de producto — Coti

> **Estado:** vigente · **Última actualización:** 2026-08-29
> **Fuente de verdad del alcance.** Si algo contradice este documento, gana este documento.
> Decisiones cerradas con su porqué → `../decisiones/`.

---

## 1. Principio rector

> **Esta herramienta proyecta, no reserva.**

No es un buscador de vuelos, no es una agencia, no procesa pagos. Es una herramienta de
**proyección financiera y motivación de ahorro**. Cuando aparezca la tentación —propia o
sugerida por Claude— de agregar reservación, checkout o pasarela de pago, la respuesta por
defecto es **no**.

De ahí se sigue que el **rango** estimado ("este viaje te puede costar entre $X y $Y MXN") no
sólo basta: es preferible a un precio exacto. El objetivo es que la persona visualice la meta
y se sienta capaz de ahorrarla, no que compare tarifas.

---

## 2. Problema y usuario

**Problema.** Viajar en 2026 se siente inalcanzable para adultos jóvenes independientes, que
balancean el ahorro para viajes con otras responsabilidades en un contexto económico
fluctuante.

**Objetivo.** Una web app que proyecte cuánto necesita ahorrar una persona para un viaje
concreto y le dé seguimiento visual al avance, para combatir la creencia de que conocer el
mundo no es accesible a esta edad.

**Usuario objetivo.** Jóvenes adultos independientes —aunque abierta a cualquiera— que
quieren viajar y no tienen un plan financiero claro para lograrlo.

**El enemigo a vencer es "esto no es para mí".** La app se siente aliada, no hoja de cálculo:
tono cercano y motivador, nunca financiero-corporativo. Estética minimalista y moderna.

---

## 3. Alcance del MVP

Idea ganadora del banco: **proyección financiera y ahorro para viajes** (idea #4).
Se construye el flujo base **más dos injertos** que le dan el momento demostrable.

### Flujo base

1. **Definir viaje** — destino(s) y fechas.
2. **Quiz de preferencias** — estilo de viaje, con atracciones clasificadas
   *Must go* / *Would be nice*.
3. **Configurar detalles** — duración de la estancia y número de personas.
4. **Ver proyección** — rango estimado de costo total (mínimo–máximo).
5. **Definir plan de ahorro** — periodo total, frecuencia (semanal / mensual / trimestral),
   ingreso disponible a destinar.
6. **Registrar punto de partida** — monto ya ahorrado, si existe.
7. **Activar "Ahorrar para mi viaje"**.
8. **Seguimiento** — la persona vuelve a actualizar su **cajita de ahorro** y ver el avance.

Los ocho pasos están dibujados en `../mockups/coti-flujo.html` (móvil) y
`coti-flujo-desktop.html`.

### Injerto B — "¿a dónde me alcanza?"

Bifurcación en la pantalla de inicio. En vez de pedir destino primero, se pide **capacidad de
ahorro y ventana de tiempo**, y se devuelven los destinos alcanzables. Invierte la pregunta y
ataca de frente la creencia de "esto no es para mí".

### Injerto C — sliders de hábitos

Convertir hábitos cotidianos en tiempo de viaje. Mover un slider recorre la fecha de salida en
vivo. Es el cierre del pitch.

### La cajita de ahorro

Es el momento de mayor valor emocional del producto y merece tiempo de **diseño**, no sólo de
ingeniería: progreso visual, micro-celebraciones en los hitos (25 / 50 / 75 / 100 %) y un
mensaje de refuerzo al registrar un aporte.

---

## 4. Fuera de alcance — decidido, no olvidado

| Qué | Por qué |
|---|---|
| Precios en vivo de vuelos, hoteles o Airbnb | Contradice el principio rector. Se usan **rangos curados**: 18 destinos en `src/data/destinos.ts`. Hay que decirlo explícitamente en el pitch. |
| Reservación, checkout y pagos | Proyecta, no reserva. |
| Multi-moneda en tiempo real | Fase futura. |
| Ahorro grupal entre varias cuentas | El "número de personas" sólo dimensiona el costo; no hay split entre cuentas distintas. |
| Recordatorios por email / push | Se guarda la preferencia, no se envía nada. Un recordatorio no se puede demostrar en un pitch de tres minutos. |

Sobre los datos de precio: una API comercial de tarifas exige partnership o tiene tiers
gratuitos muy limitados (Amadeus Self-Service, Skyscanner Partners). El catálogo curado por
destino y temporada es suficiente para proyectar — y es más honesto con lo que el producto
promete.

---

## 5. Cómo quedó implementado

Las preguntas abiertas de la fase de concepto ya están resueltas por lo construido:

| Pregunta | Resolución |
|---|---|
| ¿Qué stack? | Next.js 16 · Prisma 7 + PostgreSQL (Supabase) · Redux Toolkit · styled-components. **No** shadcn/Tailwind → `../decisiones/ui-kit.md`. |
| ¿Autenticación desde el día uno? | Sí. Un solo `/login`; el rol (OWNER · ADMIN · PARTICIPANT) decide a dónde cae. |
| ¿Canal de recordatorios? | Ninguno. No hay proveedor de correo — ver "fuera de alcance". |
| ¿Cuántos viajes simultáneos? | El modelo los permite; la UI del MVP se enfoca en uno. |
| ¿Qué tan curada la base de rangos? | 18 destinos con rango MXN, temporadas y atracciones, sembrados por `prisma/seed.ts`. |

**Modelo de datos** (`prisma/schema.prisma`): identidad — `User`, `UserRole`,
`PasswordResetToken`; dominio de viajes — `Destino`, `TemporadaDestino`, `Atraccion`, `Viaje`,
`AtraccionViaje`, `PlanDeAhorro`, `RegistroDeAhorro`, `HabitoRecorte`.

**El corazón del producto** es `src/libs/domain/projection/` (`proyectarCosto`).

> El backlog operativo vive en **MeisterTask**, proyecto `Coti` (id `9209433`).
