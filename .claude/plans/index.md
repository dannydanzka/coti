# Plans

> **PURPOSE**: Planes de trabajo vigentes y decisiones de alcance tomadas
> **SCOPE**: Este proyecto — no es backlog operativo

El backlog operativo del hackatón vive en **MeisterTask**, proyecto `Coti` (id `9209433`),
con secciones `Open` / `In Progress` / `Done`. Aquí solo van los planes que necesitan
explicación más larga que una tarea.

## Alcance acordado — MVP

Idea ganadora: **proyección financiera y ahorro para viajes** (idea #4 del banco).

Se construye el flujo de la spec **más dos injertos** que le dan el momento demostrable:

- **Injerto B — "¿a dónde me alcanza?"**: bifurcación en la pantalla de inicio. En lugar de
  pedir destino primero, se pide capacidad de ahorro y ventana de tiempo, y se devuelven
  destinos alcanzables. Invierte la pregunta y ataca de frente la creencia de "esto no es para mí".
- **Injerto C — sliders de hábitos**: convertir hábitos cotidianos en tiempo de viaje.
  Mover un slider recorre la fecha de salida en vivo.

## Fuera de alcance (decidido, no olvidado)

- Precios en vivo de vuelos u hoteles. Se usan **rangos curados** — 18 destinos en
  `src/data/destinos.ts`. Decirlo explícitamente en el pitch.
- Reservación, checkout y pagos. El principio rector es: **proyecta, no reserva**.
- Multi-moneda en tiempo real.
- Ahorro grupal entre varias cuentas.
- Recordatorios por email/push: se guarda la preferencia, no se envía nada.
  Un recordatorio no se puede demostrar en un pitch de tres minutos.
