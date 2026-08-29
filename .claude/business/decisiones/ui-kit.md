# Decisión — Kit de UI

> **Fecha:** 2026-08-29 · **Estado:** cerrada

## Decisión

Coti se construye sobre **[`@dannydanzka/sovereignty-ui`](https://github.com/dannydanzka/sovereignty-ui)**
(v0.7.0). **No se adopta shadcn/ui.**

## Por qué

shadcn/ui no es una librería de componentes: es un generador que copia componentes
basados en **Tailwind** al proyecto. Tailwind es un requisito duro.

Coti corre sobre **styled-components 6.1.14** y no tiene Tailwind instalado. Adoptar
shadcn obligaría a una de dos cosas, ambas inviables en un hackatón:

- meter Tailwind a convivir con styled-components — dos sistemas de estilos compitiendo
  por la misma UI; o
- migrar todo fuera de styled-components.

Además, `sovereignty-ui` ya aporta **95 componentes** y **theming en runtime por CSS custom
properties** (`injectSuiTokens`, sin `ThemeProvider`), así que rebrandear a la paleta de
Coti es una sola llamada en vez de una migración.

## Lo que la propuesta de shadcn sí acertó

El inventario de `sovereignty-ui` tiene tres huecos, y los tres importan para Coti:

| Falta | Para qué |
|---|---|
| **Slider** | Sliders de hábitos — injerto C, el cierre del pitch |
| **Combobox** | Búsqueda de destinos (el componente que mandó la diseñadora) |
| **Date picker** | Fechas del viaje |

## Cómo se resuelven

**shadcn = primitivas headless + estilos de Tailwind.** Las primitivas (Base UI, Radix) son
*sin estilo* y funcionan con styled-components. Se toma la mitad útil y se descarta la que
exige Tailwind.

1. Base: `sovereignty-ui` retemeada con los tokens de Coti.
2. Los tres huecos: primitivas headless vestidas con styled-components.
   El Slider ni siquiera la necesita — un `<input type="range">` estilizado basta y ya es accesible.
3. La documentación de shadcn se usa como **spec de interacción** (estados, accesibilidad,
   teclado, foco), no como dependencia.

## Cuándo reconsiderar

Si después del hackatón se decide dejar styled-components, o al arrancar un producto nuevo
desde cero. shadcn es una elección excelente ahí — pero es una decisión de arquitectura de
meses, no de fin de semana.
