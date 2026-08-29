# El pitch

> Workshop de Claude Code · Wizeline · agosto 2026
>
> | Archivo | Qué es |
> |---|---|
> | [`coti-pitch-presentacion.pptx`](coti-pitch-presentacion.pptx) | **El deck** — 11 slides, con notas del orador (versión de ~5 min) |
> | [`coti-guion-presentacion.pdf`](coti-guion-presentacion.pdf) | **El guion largo** — el mismo arco contado como TED talk, con anécdota de apertura y acotaciones de escena |
>
> Son dos guiones distintos del mismo deck: las notas del pptx van al grano; el PDF abre con
> *«llevo tres años diciendo que este es el año en que por fin voy a Japón»* y cierra con el
> callback. Si se edita uno, editar el otro.
>
> Este README extrae **lo que el pitch compromete como producto** —cosas que la spec no tenía
> escritas— y, al final, **lo que hoy no se sostiene**. Eso último es lo importante.

---

## El arco

| # | Slide | Qué dice |
|---|---|---|
| 1 | Portada | *«Proyecta tu viaje. Ahorra con Coti.»* |
| 2 | El problema | *«Conocer el mundo no es para mí. No a esta edad, no con lo que gano.»* → **«Nadie le ha puesto un número al viaje que quiere. Sin número no hay meta, y sin meta no hay ahorro.»** |
| 3 | Qué es Coti | Tres verbos: **Proyecta · Planea · Acompaña**, y el principio rector. |
| 4 | Flujo del usuario | Cuatro momentos: definir · quiz · ver la proyección · abrir la cajita. *«Valor antes que datos: el rango se ve antes de pedir información financiera.»* |
| 5 | Así se ve Coti (1/2) | Definir el viaje · Quiz de estilo · Atracciones · La proyección |
| 6 | Así se ve Coti (2/2) | Plan de ahorro · Punto de partida · Activar el ahorro · La cajita |
| 7 | La cajita de ahorro | El seguimiento visual sostiene el hábito. Hitos y micro-celebraciones. |
| 8 | Modelo de negocio | Ver abajo. |
| 9 | Fases | Ver abajo. |
| 10 | Equipo | Los siete, con nombre y oficio. |
| 11 | Cierre | **«El mundo sí es para ti.»** *«Nosotros hacemos las cuentas. Tú pones la meta.»* |

### La línea que ordena todo

> **No competimos contra un buscador de vuelos. Competimos contra una creencia.**

De ahí el rebote a la pregunta obvia (Skyscanner/Kayak): *«ellos venden el vuelo; nosotros
ayudamos a que la persona llegue a tener con qué comprarlo. Son dos negocios distintos que, con
suerte, se dan la mano seis meses antes del viaje.»*

---

## Modelo de negocio — tres capas

*«Tres capas, sin tocar el dinero del usuario.»* Marcado en el propio deck como
**hipótesis de monetización a validar con los primeros usuarios** — no como plan cerrado.

| Capa | Qué incluye |
|---|---|
| **Gratis** | Un viaje, completo: proyección, plan de ahorro, cajita y recordatorios. Suficiente para llegar. |
| **Coti Plus** (suscripción) | Varios viajes a la vez · ajuste por temporada · escenarios comparados · exportar el plan. |
| **Alianzas** | Destinos y experiencias de socios, **presentados sin reservar ni cobrar dentro de Coti**. |

No se cobra desde el día uno a propósito: primero hay que probar que el producto cambia el
comportamiento de ahorro. *«Si eso funciona, la suscripción se vende prácticamente sola.»*

> ⚠️ Las alianzas son el borde más delgado del producto. Recomendar es proyectar; un enlace de
> reserva o una comisión por conversión ya no. Si esa capa avanza, va con decisión escrita.

## Fases

| Fase | Qué |
|---|---|
| **1 · agosto 2026** | MVP del workshop: web app con proyección por rangos, plan de ahorro, cajita y recordatorios por correo. |
| **2** | Base de rangos ampliada por temporada, **varios planes en paralelo** y **app móvil**. |
| **3** | **Ahorro compartido**: viajes en grupo con metas comunes, y alianzas con marcas de viaje. |

Y el remate, dicho sin humor a propósito: **reservación, checkout y pagos quedan fuera del
mapa**. No es un olvido — es una línea que se decidió no cruzar.

## Rebotes preparados

| Pregunta | Respuesta |
|---|---|
| ¿Por qué no compiten con Skyscanner/Kayak? | Dos negocios distintos: ellos venden el vuelo, nosotros ayudamos a tener con qué comprarlo. |
| ¿Qué pasa si el usuario deja de ahorrar? | Recordatorios y micro-celebraciones. *«No resolvemos el dinero de nadie, resolvemos la constancia.»* |
| ¿Por qué no cobran desde el día uno? | Primero probar que cambia el comportamiento de ahorro. |
| ¿No es sólo un Excel bonito? | *«Un Excel muy pocas veces te manda un mensaje felicitándote por llegar al 50%.»* |
| ¿Esto ya funciona o son sólo pantallas? | **Ver abajo — esta respuesta hoy es incorrecta.** |

---

## Lo que el pitch afirma y hoy no se sostiene

En tres minutos nadie revisa nada. En cuanto alguien pide el enlace, sí.

### 1. Los recordatorios por correo — el problema más repetido

**No hay proveedor de correo.** Resend se eliminó del proyecto; `/forgot-password` genera el
token pero no envía nada. La spec lo tiene como **fuera de alcance**, decidido.

El deck los vende en cinco lugares:

- Slide 3 — *«te recuerda volver»*
- Slide 7 — *«recordatorios **por correo**»*
- Slide 8 — la capa gratis los incluye
- Slide 9 — fase 1 los da por entregados: *«…cajita y recordatorios por correo»*
- Notas de la 9 — *«web app, rangos curados, **correo**»*

Es la afirmación más repetida del deck y es la que no existe. Dos salidas: quitar la palabra
correo de esos cinco lugares —las **micro-celebraciones sí son reales** y sostienen solas el
rebote sobre el abandono—, o elegir proveedor y cargar la llave. Lo segundo es media tarde de
trabajo; lo primero, cinco ediciones de texto.

### 2. El estado del producto, al revés — *el riesgo de credibilidad*

El rebote preparado en el PDF dice: *«son las pantallas reales del flujo completo, construidas
en este mismo workshop; lo que sigue es conectarlas de punta a punta con el backend»*, y la
slide 5 del guion largo remata *«esto ya no es un boceto — es la app real»*.

**Es exactamente al revés.** Lo construido es el backend —schema, seed de 18 destinos,
`proyectarCosto`, autenticación, roles, panel de administración— y lo que **no existe** son las
pantallas del flujo: la cajita muestra el estado vacío. Lo que se proyecta en las slides 5 y 6
son los mockups de la diseñadora.

Versión honesta y igual de fuerte: *«el motor está construido y corriendo —la base, el catálogo
de destinos y la matemática de proyección—; el flujo está diseñado a detalle y es lo que
sigue.»*

El deck en sí no comete el error: sólo dice *«Así se ve Coti»*. La corrección es en el PDF.

### 3. Coti Plus cobra por algo que ya es gratis

Plus incluye **«ajuste por temporada»** — pero `TemporadaDestino.multiplicador` ya está en la
base y `proyectarCosto` lo aplica **para todos**. Ponerlo detrás del muro sería quitarle
precisión a la capa gratuita, no agregarle valor a la de pago.

De paso: **escenarios comparados** y **exportar el plan** no están especificados en ninguna
parte. Si Plus va en serio, esos dos necesitan definición.

### 4. Frecuencias que no coinciden con el diseño

La slide 3 ofrece guardar *«por semana, mes o trimestre»*. Los mockups ofrecen
**semanal · quincenal · mensual**: sin trimestre, y con quincenal, que en México es la
frecuencia de nómina más común. El enum de la base tiene las cuatro, así que el código aguanta
cualquiera — pero el deck y el diseño no dicen lo mismo. **Gana el diseño.**

### 5. El flujo son cuatro momentos o son ocho pasos

La slide 4 resume el flujo a **cuatro momentos** y mete el quiz de estilo y las atracciones en
uno solo. La slide 5 del mismo deck las lista **separadas**, igual que los mockups. La 4 es un
resumen legítimo, pero el paso 2 mezclado es el flujo viejo, no el que dibujó la diseñadora.

### 6. Multi-viaje: ¿fase 2 o Coti Plus?

La slide 9 pone *«varios planes en paralelo»* en la fase 2 y la 8 pone *«varios viajes a la
vez»* en Coti Plus. Probablemente ambas —se construye en la fase 2, se monetiza con Plus— pero
dicho así parece contradicción. Vale una frase que lo aclare.

### Y la ausencia, por tercera vez

**Ni el injerto B («¿a dónde me alcanza?») ni el C (sliders de hábitos) aparecen en el deck.**
Tampoco en el guion largo, tampoco en los mockups. La spec los define como *el momento
demostrable del pitch*, y ya van tres entregables seguidos sin ellos. A estas alturas parece
una decisión que nadie escribió: conviene tomarla explícitamente en un sentido o en el otro.
