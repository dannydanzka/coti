# Mockups — el flujo de 8 pantallas

> **Autoría:** Paola Plascencia (Product Designer, Wispok) · **Revisado:** 2026-08-29
> **Qué son:** `coti-flujo.html` (móvil, 390×844) y `coti-flujo-desktop.html` (escritorio).
> Ábrelos en el navegador — son HTML autocontenido, sin dependencias.
>
> Este README existe para no tener que abrirlos: dice qué hay en cada pantalla y,
> abajo, **en qué difieren del modelo de datos que ya está construido**.

La demo canónica de los mockups es **Tokio · 2 personas · 9 noches · marzo 2028 · Paola**,
y el código de la portada la reproduce (`HomeScreen.constants.ts`, `ProductPreview`,
`PhoneFrame`). Si cambia el mockup, cambia esa demo.

---

## Pantalla por pantalla

### 1 · Define tu viaje
`¿A dónde quieres ir?` — «Destino, fechas y con quién vas.»

Destino con selector (`📍 Tokio, Japón`), rango de fechas con calendario mensual —
salida y regreso, con el conteo de noches derivado— y stepper de personas.
Aviso ámbar: *«Más personas suben el total, pero bajan el costo por persona en hospedaje.»*

### 2 · Tu estilo de viaje
`¿Cómo viajas tú?` — «Esto ajusta el rango de tu proyección. Puedes cambiarlo cuando quieras.»

**Ocho etiquetas de selección múltiple**, cada una con emoji:
🎒 Mochilero · 🛏️ Cómodo · ✨ Boutique · 🍜 Foodie · 🌿 Naturaleza · 🏛️ Cultura ·
🪩 Fiesta · 🌊 Relax. En el mockup vienen marcadas Mochilero, Foodie y Cultura.

### 3 · Tus atracciones
`¿Qué quieres hacer allá?` — «Marca lo que no te puedes perder y lo que estaría padre.»

Buscador de atracciones y lista con toggle **Must go / Nice** por renglón, más un contador
vivo (`2 Must go · 4 Would be nice`). Nota al pie: *«Las "Must go" pesan más en el rango
estimado.»*

### 4 · Tu proyección
`Este viaje te puede costar entre $58,400 – $76,900` — el número grande, con el subtítulo
`MXN · 2 personas · 9 noches · marzo 2028` y un recordatorio del destino y el estilo elegido.

Desglose en **cinco renglones**: ✈️ Vuelos (2 pax) · 🏠 Hospedaje (9 noches) ·
🍜 Comida y bebida · 🎟️ Atracciones · 🚇 Transporte local.

Disclaimer explícito: *«Es un rango estimado por temporada y estilo de viaje, no una
cotización. Coti proyecta, no reserva.»* CTA: **Crear mi plan de ahorro**.

### 5 · Tu plan de ahorro
`Define tu meta de ahorro` — «Tú pones el ritmo. Coti hace las cuentas.»

**Tres niveles de meta**, no uno: `Mínimo $58,400` · `Cómodo $64,100` · `Sin límites $76,900`.
Viene preseleccionado **Cómodo**, con la explicación *«Con margen para imprevistos.»*

Frecuencia: **Semanal · Quincenal · Mensual**. Monto por periodo en un campo con máscara.
Y una **validación de factibilidad en verde** — *«✓ Sí llegas. Con $3,200 al mes juntas tu
meta en 18 meses — justo antes de marzo de 2028.»*

### 6 · Tu punto de partida
`¿Ya llevas algo ahorrado?` — «Todo suma. Aunque sea poquito.»

Toggle *«Ya tengo un ahorro para este viaje»*, monto inicial con chips rápidos
($1,000 · $2,500 · $5,000 · $10,000) y un resumen de tres cifras:
Meta `$64,100` → Ya tienes `$6,500` → Te faltan `$57,600`, rematado con
*«Arrancas con 10% de tu meta. Nada mal.»* Salida alterna: **Empiezo desde cero**.

### 7 · Activa tu ahorro
`¡Listo! Tu cajita de ahorro está abierta` — «Tokio te espera el 14 de marzo de 2028.»

Tarjeta de resumen (destino · meta · aportación) y el bloque de **recordatorios**:
día del mes configurable (*«El día 1 de cada mes»*) y elección de canal **Email / Push**
con el correo a la vista. CTA final: **Ahorrar para mi viaje**.

### 8 · Mi cajita de ahorro
La pantalla de retorno, la que se ve cada mes.

Saludo personal (*«Hola, Paola · Te faltan 12 meses para Tokio»*), la cajita ilustrada al
**40%**, `LLEVAS AHORRADO $25,700 de $64,100 MXN`, y una barra de **hitos 25 / 50 / 75 / 100%**
con palomita en los alcanzados. Micro-celebración: *«🎉 ¡Vas 40%! Ya pasaste el primer hito.»*

Tres métricas: `$38,400 te faltan` · `12 meses restantes` · **`6 aportes seguidos`** (racha).
Historial de aportes por mes (sep–feb), el próximo aporte (`1 de marzo · $3,200`) y el botón
**Registrar**.

---

## Navegación

| | Móvil | Escritorio |
|---|---|---|
| Durante el flujo | Barra superior con `‹` y `Paso N de 8` | Barra superior con logo, `Paso N de 8` y **Guardar y salir** |
| Ya con cajita | **Tab bar inferior**: 🏠 Inicio · ✈️ Viaje · 🫙 Cajita · 👤 Perfil | **Sidebar**: Inicio · Mi viaje · Cajita de ahorro · Perfil, con el usuario abajo |

Los pasos **2 y 3 son opcionales**: en móvil ofrecen *«Saltar por ahora»*. El escritorio no
muestra ese enlace, pero sí **Guardar y salir** en todos los pasos — el flujo es reanudable.

---

## Dónde el mockup y el modelo no coinciden

Lo construido hoy es la base de datos, el seed y `proyectarCosto`. Esto es lo que falta
reconciliar antes de escribir las pantallas. **Ninguna decisión está tomada aquí** — es el
inventario de lo que hay que decidir.

| # | Tema | Mockup | Modelo actual | Hueco |
|---|---|---|---|---|
| 1 | **Estilo de viaje** | 8 etiquetas libres, selección múltiple | 3 ejes de 3 niveles: `estiloAlojamiento`, `estiloComida`, `ritmo` | **El más grande.** No mapean 1:1. Hay que traducir las 8 etiquetas a los 3 ejes (Mochilero→alojamiento ECONOMICO, Foodie→comida COMODO, Fiesta+Cultura→ritmo INTENSO…) o cambiar el modelo. La traducción es más barata y no toca la base. |
| 2 | **Meta de ahorro** | 3 niveles a elegir: Mínimo / Cómodo / Sin límites | `PlanDeAhorro.meta` está documentada como «= `costoMax`, congelada» | El campo aguanta cualquier número; sólo hay que dejar de forzar `costoMax` y guardar el nivel elegido. «Cómodo» es el punto medio del rango. |
| 3 | **Desglose de costo** | 5 renglones, con **Comida y bebida** y **Transporte local** separados | `proyectarCosto` emite un solo renglón «Comida y transporte» (`diarioMin/Max`) | El catálogo guarda comida y transporte en un mismo rango diario. Separarlos exige partir el dato en los 18 destinos, o presentarlos juntos y ajustar el mockup. |
| 4 | **Visa y trámites** | no aparece | `Destino.visaCosto` genera un 5.º renglón cuando es > 0 | Con Tokio no se nota porque Japón no cobra visa a México. En un destino que sí, la pantalla muestra un renglón que el mockup no previó. |
| 5 | **Recordatorios** | día del mes + canal Email/Push | `PlanDeAhorro.recordatorios` es un `Boolean` | Faltan `diaDelMes` y `canal`. Y de fondo: **no hay proveedor de correo**, así que la preferencia se guarda pero no se envía nada — decidido, ver la spec. |
| 6 | **Racha de aportes** | «6 aportes seguidos» | `RegistroDeAhorro` guarda monto y fecha | La racha es derivable, no hay que guardarla; falta el cálculo. |
| 7 | **Navegación** | 4 destinos: Inicio · Viaje · Cajita · Perfil | El `AppDrawer` real sólo tiene **Mi cajita** y **Mi perfil** | Faltan Inicio y Viaje cuando existan esas pantallas. |
| 8 | **Frecuencia** | Semanal · Quincenal · Mensual | el enum tiene esas tres **y `TRIMESTRAL`** | Trimestral quedaría muerta en la UI. Sin costo dejarla en el enum. |

### Y los dos injertos no están dibujados

**Ni el injerto B («¿a dónde me alcanza?») ni el C (sliders de hábitos) aparecen en estos
mockups.** El flujo dibujado es el camino directo: ya sé a dónde voy.

Es un hueco real de producto, no un descuido de la entrega: la spec los define como *el
momento demostrable* del pitch, y el modelo ya los contempla —el comentario de `Destino`
menciona el flujo inverso, y `HabitoRecorte` existe sólo para el injerto C—. Hay que
dibujarlos o decidir que se construyen sin mockup.
