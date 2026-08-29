# Especificación Técnica — Herramienta de Planificación Financiera para Viajes

**Estado:** Fase de concepto → Prep para workshop de Claude Code
**Última actualización:** Agosto 2026

---

## 1. Principio rector del producto

> **Esta herramienta proyecta, no reserva.**

Todo lo que se construya debe reforzar esto. No es un motor de búsqueda de vuelos, no es una agencia de viajes, no procesa pagos ni reservaciones. Es una herramienta de **proyección financiera y motivación de ahorro**. Cuando surja la tentación (propia o de Claude Code sugiriendo features) de agregar reservación, checkout, o integración de pago con proveedores de viaje, la respuesta por defecto es no — eso pertenece a una fase futura completamente distinta, si es que llega a existir.

Esta distinción es lo que hace que el rango estimado de precio ("este viaje te puede costar entre $X–$Y MXN") sea suficiente y hasta preferible a un precio exacto: el objetivo es que el usuario visualice la meta y se sienta motivado a ahorrar, no que compare vuelos.

---

## 2. Contexto y objetivo

**Problema:** Viajar en 2026 se siente inalcanzable para adultos jóvenes independientes, que deben balancear el ahorro para viajes con otras responsabilidades financieras, en un contexto económico fluctuante.

**Objetivo del producto:** Una web app que ayude a proyectar cuánto necesita ahorrar una persona para un viaje específico, y le dé seguimiento visual a su progreso de ahorro, para combatir la creencia de que conocer el mundo no es accesible a esta edad.

**Usuario objetivo:** Jóvenes adultos independientes (aunque abierto a cualquier persona) que quieren viajar pero no tienen un plan financiero claro para lograrlo.

---

## 3. Alcance — Fase 1 (MVP)

### Dentro de alcance

- Proyección de costo estimado de viaje basada en **rangos** (no precios en tiempo real de proveedores).
- Configuración de viaje: destino, fechas, atracciones, duración de estancia, número de personas.
- Quiz de preferencias con clasificación de atracciones (**Must go** / **Would be nice**).
- Definición de plan de ahorro: periodo total, frecuencia (semanal, mensual, trimestral), ingreso disponible destinado al ahorro.
- Registro de monto inicial de ahorro (si ya existe).
- **"Cajita de ahorro"**: seguimiento visual de avance de ahorro en el tiempo, actualizable por el usuario.
- Sistema de recordatorios/notificaciones para actualizar el ahorro.

### Fuera de alcance (Fase 1)

- Precios en tiempo real de vuelos, hoteles o Airbnbs vía scraping o APIs comerciales de venta.
- Reservación o checkout de cualquier tipo.
- Procesamiento de pagos.
- Multi-moneda / conversión de divisas en tiempo real (evaluar en fase futura).
- Cuentas colaborativas o viajes grupales con ahorro compartido entre varios usuarios (el "número de personas" en fase 1 es solo para dimensionar el costo del viaje, no para split de gastos entre cuentas distintas).

### Nota sobre datos de precios

En lugar de una API de precios de venta en tiempo real (que típicamente requiere partnership comercial, aprobación de negocio, o tiene tiers gratuitos muy limitados — ej. Amadeus Self-Service, Skyscanner Partners), la Fase 1 puede construirse con:

- Una base de datos propia de **rangos estimados por destino y temporada** (dato curado manualmente o generado con ayuda de investigación — suficiente para un MVP y para el propósito de proyección).
- Opcionalmente, una API gratuita/freemium de datos de aviación con límite de llamadas bajo (ej. AeroDataBox, aviationstack) si se quiere enriquecer con algo de dato real, sabiendo que esto es un "nice to have" y no el corazón del producto.

Este enfoque es más honesto con el objetivo del producto: proyectar y motivar, no cotizar.

---

## 4. Flujo de usuario (Fase 1)

1. **Definir viaje** — destino(s) y fechas.
2. **Quiz de preferencias** — estilo de viaje, con espacio para agregar atracciones clasificadas como "Must go" o "Would be nice".
3. **Configurar detalles** — duración de estancia, número de personas.
4. **Ver proyección** — rango estimado de costo total del viaje (mínimo–máximo).
5. **Definir plan de ahorro** — periodo total disponible, frecuencia de aportación (semanal/mensual/trimestral), ingreso disponible para destinar al ahorro.
6. **Registrar punto de partida** — monto inicial de ahorro, si existe.
7. **Activar "Ahorrar para mi viaje"** — esto dispara el sistema de recordatorios periódicos.
8. **Seguimiento continuo** — el usuario regresa a actualizar su "cajita de ahorro" y visualizar avance.

---

## 5. Consideraciones técnicas clave para resolver antes/durante el workshop

### 5.1 Stack sugerido

- **Frontend:** Next.js + shadcn/ui + Tailwind CSS — buena combinación con Claude Code porque los componentes de shadcn se copian al proyecto (no son dependencia externa), lo que le permite a Claude Code leerlos y adaptarlos como código propio.
- **Backend/DB:** por definir en el workshop — depende de si se aloja en Vercel (Next.js API routes + una DB como Supabase/Postgres es una combinación común y sencilla de manejar con Claude Code).

### 5.2 Notificaciones — decisión pendiente

Esta es una de las preguntas más importantes a resolver, porque cambia la arquitectura:

- **Web push notifications** (nativas del navegador): gratis, pero requieren que el usuario mantenga permisos activos y tienen soporte inconsistente entre navegadores/dispositivos (particularmente limitado en iOS Safari).
- **Email:** más confiable y sencillo de implementar (ej. con Resend o similar), pero es un canal distinto al de la web app en sí.
- **WhatsApp/SMS:** mayor efectividad de recordatorio pero implica costos por mensaje y una integración más compleja (ej. Twilio).

**Recomendación para Fase 1:** empezar con email — es el más simple de implementar bien y no depende de que el usuario tenga la app abierta o permisos de navegador activos.

### 5.3 Modelo de datos (borrador inicial)

Entidades principales a modelar:

- `Usuario`
- `Viaje` (destino, fechas, número de personas, estancia, rango de costo estimado)
- `Atracción` (asociada a un viaje, con flag Must go / Would be nice)
- `PlanDeAhorro` (viaje asociado, periodo, frecuencia, ingreso disponible, monto inicial)
- `RegistroDeAhorro` (histórico de aportaciones — esto alimenta la "cajita de ahorro" y su visualización de progreso)

### 5.4 La "cajita de ahorro" — momento de mayor valor emocional del producto

Vale la pena invertir tiempo de diseño aquí, no solo de ingeniería. Ideas a explorar en el workshop:

- Visualización de progreso (barra, ilustración que se va "completando", etc.)
- Micro-celebraciones al alcanzar hitos (25%, 50%, 75%, 100%)
- Mensaje de refuerzo motivacional al actualizar el ahorro

---

## 6. Preguntas abiertas para llevar al workshop

- ¿Qué tan lejos vale la pena llevar la personalización del quiz de preferencias en el MVP, o conviene simplificarlo para la primera versión?
- ¿Autenticación de usuario desde el día uno, o empezar sin cuentas (guardado local) para probar el concepto más rápido?
- ¿Vale la pena permitir múltiples viajes/planes de ahorro simultáneos en Fase 1, o limitarlo a uno solo para simplificar?
- ¿Qué tan curada necesita estar la base de datos de rangos de precio por destino para que la proyección se sienta creíble sin ser precisa al centavo?
- ¿Deploy en Vercel + Supabase, o alguna otra combinación que Claude Code maneje particularmente bien?

---

## 7. Notas de marca/tono (para cuando se defina UI)

- Minimalista, moderno (consistente con las preferencias de diseño ya establecidas).
- El tono debe sentirse motivador y cercano, no financiero-corporativo — el enemigo a vencer es la creencia de "esto no es para mí", así que la app debe sentirse como una aliada, no como una hoja de cálculo con otro nombre.
