# El pitch — guion de presentación

> **Fuente:** [`coti-guion-presentacion.pdf`](coti-guion-presentacion.pdf) · 11 slides ·
> tono formal-cálido, estilo TED · workshop de Claude Code, Wizeline, agosto 2026
>
> El PDF trae el guion palabra por palabra y las acotaciones de escena. Este README extrae
> **lo que el pitch compromete como producto** —y que la spec no tenía escrito— más lo que
> hoy **no es cierto** y hay que arreglar antes de subir al escenario.

---

## El arco, en una línea por slide

| # | Slide | Qué hace |
|---|---|---|
| — | Apertura | Anécdota: *«llevo tres años diciendo que este es el año en que por fin voy a Japón»*. El gancho personal. |
| 1 | Portada | *«No compite en decirte cuál vuelo es más barato — compite en decirte cuánto necesitas guardar tú.»* |
| 2 | El problema | *«Conocer el mundo no es para mí. No a esta edad, no con lo que gano.»* → **«No competimos contra un buscador de vuelos. Competimos contra una creencia.»** |
| 3 | Qué es Coti | Tres cosas: proyecta un rango creíble · arma el plan · te acompaña. Y el principio rector. |
| 4 | Flujo del usuario | El recorrido contado como historia. Remate: *«decidimos ganarnos la confianza antes de pedir el número de tu cuenta»*. |
| 5 | Así se ve Coti (1/2) | Definir y proyectar — Tokio, 2 personas, `$58,400–$76,900` desglosado. Slide de credibilidad. |
| 6 | Así se ve Coti (2/2) | Ahorrar y llegar — $3,200 al mes, 18 meses, la cajita de Paola al 40%. |
| 7 | La cajita de ahorro | El corazón. *«Ahorrar para un viaje no debería sentirse como pagar el internet. Debería sentirse un poquito como ya estar de vacaciones.»* |
| 8 | Modelo de negocio | Ver abajo — **contenido nuevo, no estaba en la spec.** |
| 9 | Fases | Ver abajo — **contenido nuevo.** |
| 10 | Equipo | Siete personas, siete oficios. |
| 11 | Cierre | *«Nosotros hacemos las cuentas. Tú pones la meta.»* + callback a Japón. |

---

## Posicionamiento

La línea que ordena todo el pitch y que conviene defender en cualquier decisión de producto:

> **No competimos contra un buscador de vuelos. Competimos contra una creencia.**

De ahí se sigue el rebote a la pregunta obvia: *«Skyscanner vende el vuelo. Nosotros ayudamos
a que la persona llegue a tener con qué comprarlo. Son dos negocios distintos que, con suerte,
se dan la mano seis meses antes del viaje.»*

---

## Modelo de negocio — tres capas

**Esto no existía en ninguna parte del contexto de negocio hasta ahora.**

| Capa | Qué es |
|---|---|
| **Gratis** | El viaje completo. Suficiente para lograr una meta de principio a fin. |
| **Coti Plus** | Suscripción para quien quiere ahorrar para **varios viajes a la vez**. |
| **Alianzas** | Recomendación de destinos y experiencias de socios. |

La frase que mantiene esto compatible con el principio rector, y que hay que decir tal cual:
**«nunca reservamos ni cobramos dentro de Coti — sólo somos buenos recomendando»**.

> ⚠️ Las alianzas son el borde más delgado del producto. Recomendar es proyectar; en el momento
> en que se agregue un enlace de reserva o una comisión por conversión, Coti dejó de proyectar
> y empezó a reservar. Si esa capa avanza, merece su propia decisión escrita.

## Fases

| Fase | Qué |
|---|---|
| **1 — hoy** | El MVP del workshop. |
| **2** | Más destinos + **app móvil**. |
| **3** | **Ahorro compartido**: viajes en grupo con metas en común. |

Y el cierre de la slide, dicho sin humor a propósito: *«hay algo que no van a ver en ningún
cuadro de este roadmap, ni en el uno ni en el tres: reservación, checkout o pagos. No es que
se nos haya olvidado — es una línea que decidimos no cruzar.»*

> El ahorro compartido está en la spec como **fuera de alcance**, lo cual sigue siendo correcto
> para el MVP; ahora además tiene destino: fase 3. La **app móvil** es nueva del todo.

---

## Rebotes preparados para preguntas

| Pregunta | Respuesta |
|---|---|
| ¿Por qué no compiten con Skyscanner/Kayak? | Ellos venden el vuelo; nosotros ayudamos a tener con qué comprarlo. Dos negocios distintos. |
| ¿Qué pasa si el usuario deja de ahorrar? | Ahí entran los recordatorios y las micro-celebraciones. *«No resolvemos el dinero de nadie, resolvemos la constancia.»* |
| ¿Por qué no cobran desde el día uno? | Primero probar que el producto cambia el comportamiento de ahorro. *«Si eso funciona, la suscripción se vende prácticamente sola.»* |
| ¿No es sólo un Excel bonito? | *«Un Excel muy pocas veces te manda un mensaje felicitándote por llegar al 50%.»* |
| ¿Esto ya funciona o son sólo pantallas? | **Ver la advertencia de abajo — esta respuesta hoy es incorrecta.** |

---

## Lo que el guion afirma y hoy no se sostiene

Tres afirmaciones del guion chocan con el estado real del repo. En un pitch de tres minutos
nadie las revisa; en cuanto alguien pide el enlace, sí.

### 1. El estado del producto está al revés — *el riesgo real*

El rebote preparado dice: *«Son las pantallas reales del flujo completo, construidas en este
mismo workshop. Lo que sigue es conectarlas de punta a punta con el backend.»*

**Es exactamente al revés.** Lo que está construido es el backend —schema, seed de 18 destinos,
`proyectarCosto`, autenticación, roles, panel de administración— y lo que **no existe** son las
pantallas del flujo: la cajita muestra el estado vacío. Las ocho pantallas de las slides 5 y 6
son los mockups de la diseñadora, no la app.

La versión honesta y igual de fuerte: *«el motor está construido y corriendo —la base, el
catálogo de destinos y la matemática de proyección—; el flujo está diseñado a detalle y es lo
que sigue.»* Dice lo mismo del avance sin afirmar algo que se cae al primer clic.

### 2. Slide 5 — «esto ya no es un boceto, es la app real»

Mismo problema, dicho señalando la pantalla. Si se proyectan los mockups, es un boceto de alta
fidelidad. Si se proyecta la app desplegada, hoy no muestra eso.

### 3. Los recordatorios se venden como respuesta al abandono

El rebote de *«¿qué pasa si el usuario deja de ahorrar?»* se apoya en los recordatorios. Hoy
**no hay proveedor de correo**: la preferencia se guarda y no se envía nada — decidido, está en
la spec como fuera de alcance. Las **micro-celebraciones sí** son reales y sostienen la
respuesta solas.

### Y una ausencia

**Ni el injerto B («¿a dónde me alcanza?») ni el C (sliders de hábitos) aparecen en el guion.**
Tampoco están en los mockups. La spec los define como *el momento demostrable del pitch* — y
ya van dos entregables seguidos donde no existen. Conviene volverlos a meter o quitarlos de la
spec, pero no dejarlos a medias.
