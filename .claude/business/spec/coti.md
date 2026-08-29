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

### Flujo base — ocho pasos

Tal como los dibujó la diseñadora. El detalle de cada pantalla y **las diferencias contra el
modelo de datos** están en [`../mockups/README.md`](../mockups/README.md); los mockups en sí,
en `../mockups/coti-flujo.html` (móvil) y `coti-flujo-desktop.html`.

1. **Define tu viaje** — destino, fechas y número de personas, todo en una pantalla.
2. **Tu estilo de viaje** — ocho etiquetas de selección múltiple (mochilero, foodie,
   cultura…) que ajustan el rango. *Opcional.*
3. **Tus atracciones** — buscador y clasificación *Must go* / *Would be nice*.
   Las "Must go" pesan más en el rango. *Opcional.*
4. **Tu proyección** — el rango estimado (mínimo–máximo) con su desglose por concepto.
5. **Tu plan de ahorro** — se elige la meta entre tres niveles (**Mínimo** = piso del rango ·
   **Cómodo** = punto medio, por defecto · **Sin límites** = techo), la frecuencia
   (semanal / quincenal / mensual) y el monto por aporte. La pantalla responde en vivo si
   **sí llegas** a la fecha de salida con ese ritmo.
6. **Tu punto de partida** — monto ya ahorrado, si existe. Se puede empezar desde cero.
7. **Activa tu ahorro** — resumen y preferencia de recordatorio (día y canal).
8. **Mi cajita de ahorro** — la pantalla de retorno: avance, hitos, racha de aportes,
   historial y el botón de registrar.

El flujo es **reanudable**: se puede guardar y salir en cualquier paso
(`EstadoViaje.BORRADOR`).

### Injerto B — "¿a dónde me alcanza?"

Bifurcación en la pantalla de inicio. En vez de pedir destino primero, se pide **capacidad de
ahorro y ventana de tiempo**, y se devuelven los destinos alcanzables. Invierte la pregunta y
ataca de frente la creencia de "esto no es para mí".

### Injerto C — sliders de hábitos

Convertir hábitos cotidianos en tiempo de viaje. Mover un slider recorre la fecha de salida en
vivo. Es el cierre del pitch.

> ⚠️ **Ninguno de los dos injertos está dibujado.** Los mockups cubren sólo el camino directo
> —ya sé a dónde voy—. El modelo sí los contempla (`HabitoRecorte` existe para el injerto C).
> Hay que dibujarlos o decidir que se construyen sin mockup.
> Ver [`../mockups/README.md`](../mockups/README.md).

### La cajita de ahorro

Es el momento de mayor valor emocional del producto y merece tiempo de **diseño**, no sólo de
ingeniería: progreso visual, micro-celebraciones en los hitos (25 / 50 / 75 / 100 %) y un
mensaje de refuerzo al registrar un aporte.

Al lado del avance van tres cifras que sostienen el hábito: **cuánto falta**, **cuántos meses
quedan** y la **racha de aportes seguidos**.

---

## 4. Fuera de alcance — decidido, no olvidado

| Qué | Por qué |
|---|---|
| Precios en vivo de vuelos, hoteles o Airbnb | Contradice el principio rector. Se usan **rangos curados**: 18 destinos en `src/data/destinos.ts`. Hay que decirlo explícitamente en el pitch. |
| Reservación, checkout y pagos | Proyecta, no reserva. |
| Multi-moneda en tiempo real | Fase futura. |
| Ahorro grupal entre varias cuentas | El "número de personas" sólo dimensiona el costo; no hay split entre cuentas distintas. **Es la fase 3**, ver sección 6. |
| Recordatorios por email / push | Se guarda la preferencia, no se envía nada. Un recordatorio no se puede demostrar en un pitch de tres minutos. |

Sobre los datos de precio: una API comercial de tarifas exige partnership o tiene tiers
gratuitos muy limitados (Amadeus Self-Service, Skyscanner Partners). El catálogo curado por
destino y temporada es suficiente para proyectar — y es más honesto con lo que el producto
promete.

---

## 5. Modelo de negocio

Definido en el pitch ([`../pitch/README.md`](../pitch/README.md)), tres capas:

| Capa | Qué incluye |
|---|---|
| **Gratis** | Un viaje completo: proyección, plan de ahorro y cajita. Es el producto. |
| **Coti Plus** | Varios viajes a la vez · escenarios comparados · exportar el plan. |
| **Alianzas** | Recomendación de destinos y experiencias de socios. |

Está marcado en el propio deck como **hipótesis a validar con los primeros usuarios**, no como
plan cerrado. Dos features de Plus —escenarios comparados y exportar el plan— no tienen
definición todavía.

**Coti nunca reserva ni cobra dentro del producto.** La capa de alianzas es el borde más
delgado: recomendar es proyectar, pero un enlace de reserva o una comisión por conversión
cruzarían la línea. Si esa capa avanza, va con decisión escrita en `../decisiones/`.

No se cobra desde el día uno a propósito: primero hay que probar que el producto cambia el
comportamiento de ahorro.

> El **ajuste por temporada** aparece en el deck como feature de Plus, pero ya está construido
> y se aplica para todos (`TemporadaDestino.multiplicador` en `proyectarCosto`). Cobrarlo sería
> quitarle precisión a la capa gratuita. Ver [`../pitch/README.md`](../pitch/README.md).

## 6. Fases

| Fase | Qué |
|---|---|
| **1 · agosto 2026** | El MVP de este workshop — lo descrito en la sección 3. |
| **2** | Base de rangos ampliada por temporada · varios planes en paralelo · **app móvil**. |
| **3** | **Ahorro compartido** — viajes en grupo con metas comunes — y alianzas con marcas de viaje. |

Lo que **no aparece en ninguna fase**: reservación, checkout y pagos. No es un olvido, es la
línea que el producto decidió no cruzar.

---

## 7. Cómo quedó implementado

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

### Lo que falta reconciliar

La base, el seed y la proyección están construidos; las pantallas del flujo **no**. Al
contrastar los mockups contra el modelo salieron **ocho diferencias** que hay que resolver
antes de escribirlas —la mayor: el estilo de viaje son ocho etiquetas en el diseño y tres ejes
de tres niveles en la base—. Están inventariadas, con su costo, en
[`../mockups/README.md`](../mockups/README.md#dónde-el-mockup-y-el-modelo-no-coinciden).

> El backlog operativo vive en **MeisterTask**, proyecto `Coti` (id `9209433`).
