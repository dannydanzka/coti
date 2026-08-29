# Assets de marca servidos por la app

**Estos archivos son copias optimizadas para web. La fuente de verdad es
[`/assets/branding/`](../../assets/branding/)** — ahí vive la guía de marca completa
del diseñador y los originales en alta resolución.

No editar estos PNG a mano: si cambia la marca, se regeneran desde `assets/branding/`.

| Archivo | Origen | Uso |
|---|---|---|
| `logo-horizontal.png` | `coti-logo-horizontal-mascota.png` | Encabezados, landing, presentaciones |
| `logo.png` | `coti-logo-transparent.png` | Logotipo compacto, footer |
| `mascot.png` | `coti-mascot-transparent.png` | Estados vacíos, celebraciones, onboarding |
| `app-icon.png` | `coti-app-icon-v2.png` | Ícono de producto dentro de la UI |
| `scenes/cajita.png` | `coti-scene-cajita.png` | Pantalla de la cajita de ahorro |
| `scenes/piramide.png` | `coti-scene-piramide.png` | Destinos / proyección |
| `scenes/pueblo.png` | `coti-scene-pueblo.png` | Onboarding / bienvenida |
| `hero-atardecer.jpg` | `coti-scene-atardecer-hero.png` | Hero de la landing (paisaje full-bleed, Coti a la derecha) |
| `scenes/sonar.jpg` | `coti-scene-letrero.png` (recorte 4:3) | Landing · "Sueña el destino" |
| `scenes/ahorrar.jpg` | `coti-scene-cajita-v2.png` (recorte 4:3) | Landing · "Ahorra en tu cajita" y cierre |
| `scenes/llegar.jpg` | `coti-scene-pueblo-v2.png` (recorte 4:3) | Landing · "Llega" |

Los íconos de navegador y móvil los toma Next.js automáticamente de
`src/app/` (`icon.png`, `apple-icon.png`, `favicon.ico`), generados también
desde `coti-app-icon-v2.png`.

## Paleta oficial

Tomada de la guía de marca — usar estos valores, no los de ninguna estimación previa.

| Token | Nombre | Hex |
|---|---|---|
| `brand-coral` | Coral | `#E15D3B` |
| `brand-mustard` | Mostaza | `#E39B38` |
| `brand-sand` | Arena | `#DDB16F` |
| `brand-forest` | Verde bosque | `#305233` |
| `brand-brown` | Café | `#503A1C` |
| `brand-cream` | Crema | `#FEFBF3` |

Coral y mostaza son acentos: validar contraste WCAG AA antes de usarlos como texto
pequeño sobre crema.
