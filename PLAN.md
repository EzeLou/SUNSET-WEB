# Plan de Migración: SUNSET-WEB v2.0
## Estructura Feature-Based (Sin .htaccess)

---

## Resumen de Decisiones

| Decisión | Elección |
|----------|----------|
| Hosting | Hostinger (Apache) |
| URLs antiguas | Mantener con redirects HTML |
| Escalabilidad | Preparado para múltiples páginas |
| .htaccess | NO - evitado |
| Accesibilidad | Fase separada después de migración |

---

## Estructura Final Objetivo

```
sunset-web/
├── index.html                      # Landing page (HOME)
├── manifest.json                   # PWA manifest
├── sw.js                           # Service Worker
├── favicon.ico                     # Favicon
├── robots.txt                      # SEO
├── README.md                       # Documentación
│
├── tickets/
│   └── index.html                  # Página de entradas
│
├── legal/
│   └── index.html                  # Términos y condiciones
│
├── Entradas/                       # LEGACY - redirect
│   └── index.html                  # Redirect → /tickets/
│
├── tyc-sorteo/                     # LEGACY - redirect
│   └── index.html                  # Redirect → /legal/
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   │   └── logo-512.png
│   │   ├── events/
│   │   │   ├── caroya/
│   │   │   │   ├── 01.webp
│   │   │   │   ├── 02.webp
│   │   │   │   ├── 03.webp
│   │   │   │   ├── 04.webp
│   │   │   │   └── 05.webp
│   │   │   ├── embalse/
│   │   │   │   ├── rally.webp
│   │   │   │   ├── ferrari.webp
│   │   │   │   ├── avioneta.webp
│   │   │   │   ├── expo.webp
│   │   │   │   └── clio.webp
│   │   │   ├── caravana-solidaria/
│   │   │   │   ├── 01.webp
│   │   │   │   ├── 02.webp
│   │   │   │   ├── 03.webp
│   │   │   │   ├── 04.webp
│   │   │   │   └── 05.webp
│   │   │   ├── express/
│   │   │   │   ├── panoramica.webp
│   │   │   │   ├── autos-izquierda.webp
│   │   │   │   ├── autos-costado.webp
│   │   │   │   ├── cabeza.webp
│   │   │   │   └── safety-bmw.webp
│   │   │   └── 6ta-edicion/
│   │   │       ├── avioneta.webp
│   │   │       ├── auto-negro.webp
│   │   │       ├── autos-izquierda.webp
│   │   │       ├── auto-rojo.webp
│   │   │       └── autos-derecha.webp
│   │   ├── sponsors/
│   │   │   ├── can-am.webp
│   │   │   ├── ff-performance.webp
│   │   │   ├── autocity.webp
│   │   │   ├── glabs.webp
│   │   │   ├── michelin.png
│   │   │   ├── todo-suspension.webp
│   │   │   ├── detail-industry.webp
│   │   │   ├── hfi-performance.webp
│   │   │   ├── astus.webp
│   │   │   ├── el-hornito.webp
│   │   │   ├── sunset-media.webp
│   │   │   ├── monster.webp
│   │   │   ├── banquis.webp
│   │   │   └── bolgan.webp
│   │   └── about/
│   │       └── team.webp
│   └── videos/
│       └── hero-background.webm
│
├── css/
│   ├── main.css                    # Importa todos los CSS
│   ├── base/
│   │   ├── reset.css               # Reset CSS
│   │   ├── variables.css           # Variables (colores, fuentes)
│   │   └── typography.css          # Tipografía global
│   └── components/
│       ├── navbar.css
│       ├── footer.css
│       ├── buttons.css
│       ├── gallery.css
│       ├── carousel.css
│       ├── faq.css
│       ├── sponsors.css
│       └── video-header.css
│
├── js/
│   ├── main.js                     # Punto de entrada principal
│   ├── components/
│   │   ├── navbar.js               # Navbar + menú hamburguesa
│   │   ├── footer.js               # Generador de footer
│   │   ├── gallery.js              # Galería de eventos
│   │   ├── carousel.js             # EventosAnterioresCarousel
│   │   ├── faq.js                  # Preguntas frecuentes
│   │   └── video-header.js         # Animación logo header
│   └── utils/
│       ├── throttle.js
│       ├── debounce.js
│       └── scroll.js
│
└── data/
    ├── events.json                 # Datos de eventos
    └── sponsors.json               # Datos de sponsors
```

---

## Fase 0: Preparación y Backup
**Tiempo estimado: 10 minutos**

### Paso 0.1: Crear Backup
```bash
cp -r SUNSET-WEB SUNSET-WEB-backup-$(date +%Y%m%d)
```

### Paso 0.2: Crear Rama de Trabajo
```bash
git checkout -b feature/restructure-project
```

### Paso 0.3: Verificar Estado Actual
- [ ] Confirmar que no hay cambios sin commitear
- [ ] Documentar archivos existentes

---

## Fase 1: Crear Estructura de Carpetas
**Tiempo estimado: 5 minutos**

### Paso 1.1: Crear Carpetas Principales
```bash
mkdir -p tickets
mkdir -p legal
mkdir -p assets/images/logo
mkdir -p assets/images/events/caroya
mkdir -p assets/images/events/embalse
mkdir -p assets/images/events/caravana-solidaria
mkdir -p assets/images/events/express
mkdir -p assets/images/events/6ta-edicion
mkdir -p assets/images/sponsors
mkdir -p assets/images/about
mkdir -p assets/videos
mkdir -p css/base
mkdir -p css/components
mkdir -p js/components
mkdir -p js/utils
mkdir -p data
```

---

## Fase 2: Migrar Assets
**Tiempo estimado: 15 minutos**

### Paso 2.1: Migrar Archivos Root
| Origen | Destino |
|--------|---------|
| `Media/favicon.ico` | `favicon.ico` |
| `Media/LogoSunSet-512x512.png` | `assets/images/logo/logo-512.png` |

### Paso 2.2: Migrar Video
| Origen | Destino |
|--------|---------|
| `Media/VideoHeader.webm` | `assets/videos/hero-background.webm` |

### Paso 2.3: Migrar Imágenes de Eventos

**Caroya (Cartelera 3):**
| Origen | Destino |
|--------|---------|
| `Media/Cartelera 3/sunset-caroya-01.webp` | `assets/images/events/caroya/01.webp` |
| `Media/Cartelera 3/sunset-caroya-02.webp` | `assets/images/events/caroya/02.webp` |
| `Media/Cartelera 3/sunset-caroya-03.webp` | `assets/images/events/caroya/03.webp` |
| `Media/Cartelera 3/sunset-caroya-04.webp` | `assets/images/events/caroya/04.webp` |
| `Media/Cartelera 3/sunset-caroya-05.webp` | `assets/images/events/caroya/05.webp` |

**Embalse:**
| Origen | Destino |
|--------|---------|
| `Media/Cartelera MotorShow Embalse/Rally.webp` | `assets/images/events/embalse/rally.webp` |
| `Media/Cartelera MotorShow Embalse/Ferrari.webp` | `assets/images/events/embalse/ferrari.webp` |
| `Media/Cartelera MotorShow Embalse/Avioneta.webp` | `assets/images/events/embalse/avioneta.webp` |
| `Media/Cartelera MotorShow Embalse/Expo.webp` | `assets/images/events/embalse/expo.webp` |
| `Media/Cartelera MotorShow Embalse/Clio.webp` | `assets/images/events/embalse/clio.webp` |

**Caravana Solidaria:**
| Origen | Destino |
|--------|---------|
| `Media/Cartelera Caravana Solidaria/ph_caravana (1)@0,5x.webp` | `assets/images/events/caravana-solidaria/01.webp` |
| `Media/Cartelera Caravana Solidaria/ph_caravana (2)@0,5x.webp` | `assets/images/events/caravana-solidaria/02.webp` |
| `Media/Cartelera Caravana Solidaria/ph_caravana (5)@0,5x.webp` | `assets/images/events/caravana-solidaria/03.webp` |
| `Media/Cartelera Caravana Solidaria/ph_caravana (6)@0,5x.webp` | `assets/images/events/caravana-solidaria/04.webp` |
| `Media/Cartelera Caravana Solidaria/ph_caravana (9)@0,5x.webp` | `assets/images/events/caravana-solidaria/05.webp` |

**Express (Cartelera 1):**
| Origen | Destino |
|--------|---------|
| `Media/Cartelera 1/Panoramica cierras.webp` | `assets/images/events/express/panoramica.webp` |
| `Media/Cartelera 1/Autos por la izquierda.webp` | `assets/images/events/express/autos-izquierda.webp` |
| `Media/Cartelera 1/Autos de costado.webp` | `assets/images/events/express/autos-costado.webp` |
| `Media/Cartelera 1/Sacando la cabeza.webp` | `assets/images/events/express/cabeza.webp` |
| `Media/Cartelera 1/SafetyBMW.webp` | `assets/images/events/express/safety-bmw.webp` |

**6ta Edición (Cartelera 2):**
| Origen | Destino |
|--------|---------|
| `Media/Cartelera 2/Avioneta.webp` | `assets/images/events/6ta-edicion/avioneta.webp` |
| `Media/Cartelera 2/Auto negro.webp` | `assets/images/events/6ta-edicion/auto-negro.webp` |
| `Media/Cartelera 2/Autos por la izquierda.webp` | `assets/images/events/6ta-edicion/autos-izquierda.webp` |
| `Media/Cartelera 2/Auto rojo.webp` | `assets/images/events/6ta-edicion/auto-rojo.webp` |
| `Media/Cartelera 2/Autos por la derecha.webp` | `assets/images/events/6ta-edicion/autos-derecha.webp` |

**About:**
| Origen | Destino |
|--------|---------|
| `Media/Sobre nosotros/IMG_5671.webp` | `assets/images/about/team.webp` |

### Paso 2.4: Migrar Sponsors (con nombres limpios)
| Origen | Destino |
|--------|---------|
| `Media/Sponsors/Can am.webp` | `assets/images/sponsors/can-am.webp` |
| `Media/Sponsors/FF Perfomance.webp` | `assets/images/sponsors/ff-performance.webp` |
| `Media/Sponsors/Autocity logotipo-negro (2).webp` | `assets/images/sponsors/autocity.webp` |
| `Media/Sponsors/Glabs.webp` | `assets/images/sponsors/glabs.webp` |
| `Media/Sponsors/Michelin 2.png` | `assets/images/sponsors/michelin.png` |
| `Media/Sponsors/Todo Suspencion.webp` | `assets/images/sponsors/todo-suspension.webp` |
| `Media/Sponsors/Detail industry.webp` | `assets/images/sponsors/detail-industry.webp` |
| `Media/Sponsors/HFI Perfomance.webp` | `assets/images/sponsors/hfi-performance.webp` |
| `Media/Sponsors/Astus.webp` | `assets/images/sponsors/astus.webp` |
| `Media/Sponsors/El Hornito.webp` | `assets/images/sponsors/el-hornito.webp` |
| `Media/Sponsors/Sunset media.webp` | `assets/images/sponsors/sunset-media.webp` |
| `Media/Sponsors/Monster.webp` | `assets/images/sponsors/monster.webp` |
| `Media/Sponsors/Banquis.webp` | `assets/images/sponsors/banquis.webp` |
| `Media/Sponsors/bolgan png.webp` | `assets/images/sponsors/bolgan.webp` |

---

## Fase 3: Modularizar CSS
**Tiempo estimado: 45 minutos**

### Paso 3.1: Crear `css/base/variables.css`
Extraer de `style.css`:
```css
:root {
  /* Colores */
  --color-primary: #e38228;
  --color-primary-hover: rgba(227, 130, 40, 0.1);
  --color-black: #000000;
  --color-white: #ffffff;
  --color-blue: #0086e8;
  --color-red: #ff0f0e;
  
  /* Fuentes */
  --font-primary: "futura-pt", sans-serif;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  /* Breakpoints */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  --breakpoint-desktop: 1200px;
  
  /* Espaciados */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 40px;
  --spacing-xl: 60px;
  
  /* Transiciones */
  --transition-fast: 0.3s ease;
  --transition-normal: 0.5s ease;
}
```

### Paso 3.2: Crear `css/base/reset.css`
Estilos de reset básicos y fuente global.

### Paso 3.3: Crear `css/base/typography.css`
Extraer `.titulo-estandar`, `.descripcion-estandar` y estilos de texto.

### Paso 3.4: Crear Componentes CSS

**`css/components/navbar.css`** - Extraer líneas ~42-230 de style.css:
- `.navbar`
- `.nav-container`
- `.nav-link`
- `.hamburger-btn`
- `.mobile-nav-menu`

**`css/components/footer.css`** - Estilos del footer (actualmente en Tailwind inline).

**`css/components/buttons.css`** - Extraer estilos de botones:
- `.evento-button`
- `.EventoCartelera-button`

**`css/components/gallery.css`** - Extraer estilos de galería:
- `.EventoCartelera-container`
- `.EventoCartelera-gallery`

**`css/components/carousel.css`** - Extraer estilos del carousel:
- `.EventosAnteriores-section`
- `.eventos-carousel-*`
- `.eventos-bullet`

**`css/components/faq.css`** - Extraer estilos de FAQ:
- `.Seccion_Preguntas`
- `.Caja_Pregunta`
- `.Pregunta`
- `.Respuesta`

**`css/components/sponsors.css`** - Extraer estilos de sponsors:
- `.Seccion_Patrocinadores`
- `.Carrusel`
- `.Caballos`

**`css/components/video-header.css`** - Extraer estilos del header:
- `.video-header`
- `.video-overlay`
- `.video-content`
- `.logo-container`

### Paso 3.5: Crear `css/main.css`
```css
/* Base */
@import 'base/variables.css';
@import 'base/reset.css';
@import 'base/typography.css';

/* Components */
@import 'components/navbar.css';
@import 'components/footer.css';
@import 'components/buttons.css';
@import 'components/gallery.css';
@import 'components/carousel.css';
@import 'components/faq.css';
@import 'components/sponsors.css';
@import 'components/video-header.css';
```

---

## Fase 4: Modularizar JavaScript
**Tiempo estimado: 60 minutos**

### Paso 4.1: Crear Utilidades

**`js/utils/throttle.js`**
```javascript
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
```

**`js/utils/debounce.js`**
```javascript
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

**`js/utils/scroll.js`**
```javascript
export function initSmoothScrolling() {
  // Extraer de script.js líneas 142-164
}
```

### Paso 4.2: Crear Componentes JS

**`js/components/navbar.js`** - Extraer de script.js:
- `updateNavbarLogoVisibility()` (líneas 24-58)
- `initMobileMenu()` (líneas 300-328)
- `initNavbarLogoHome()` (líneas 203-229)

**`js/components/footer.js`** - Mover de footer.js:
- `createFooter()`
- `createFooterWithRelativePaths()`

**`js/components/gallery.js`** - Extraer de script.js:
- `initGalleryClicks()` (líneas 171-200)

**`js/components/carousel.js`** - Extraer de script.js:
- Clase `EventosAnterioresCarousel` (líneas 617-1221)
- `eventosAnterioresData` → mover a `data/events.json`

**`js/components/faq.js`** - Extraer de script.js:
- `initPreguntasFrecuentes()` (líneas 83-101)

**`js/components/video-header.js`** - Extraer de script.js:
- Lógica de animación del logo header
- Efectos de expansión de eventos (líneas 362-550)

### Paso 4.3: Crear `js/main.js`
```javascript
// Imports
import { throttle } from './utils/throttle.js';
import { debounce } from './utils/debounce.js';
import { initSmoothScrolling } from './utils/scroll.js';
import { initNavbar, initMobileMenu } from './components/navbar.js';
import { initFooter } from './components/footer.js';
import { initGallery } from './components/gallery.js';
import { EventosAnterioresCarousel } from './components/carousel.js';
import { initFAQ } from './components/faq.js';
import { initVideoHeader } from './components/video-header.js';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScrolling();
  initGallery();
  initFAQ();
  initVideoHeader();
  initFooter();
  
  // Carousel de eventos anteriores
  window.eventosCarousel = new EventosAnterioresCarousel('eventos-carousel-container');
});

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registrado:', registration.scope))
      .catch(error => console.log('SW falló:', error));
  });
}
```

---

## Fase 5: Crear Archivos de Datos
**Tiempo estimado: 15 minutos**

### Paso 5.1: Crear `data/events.json`
```json
{
  "eventos": [
    {
      "id": "sunset-express",
      "title": "SunSet Drive Express",
      "description": "Esta edición privada comenzó con un desayuno exclusivo en Autocity...",
      "stats": [
        { "number": "60+", "label": "Autos" },
        { "number": "150+", "label": "Personas" },
        { "number": "8h", "label": "Duración" }
      ],
      "images": {
        "center": "/assets/images/events/express/panoramica.webp",
        "topLeft": "/assets/images/events/express/autos-izquierda.webp",
        "bottomLeft": "/assets/images/events/express/autos-costado.webp",
        "bottomRight": "/assets/images/events/express/cabeza.webp",
        "topRight": "/assets/images/events/express/safety-bmw.webp"
      }
    },
    {
      "id": "sunset-drive-6ta",
      "title": "Sunset Drive - 6ta Edición",
      "description": "El pasado 14 de diciembre de 2024 celebramos...",
      "videoUrl": "https://youtu.be/M5jQ1I8E7U8",
      "stats": [
        { "number": "100+", "label": "Autos" },
        { "number": "500+", "label": "Personas" },
        { "number": "10h", "label": "Duración" }
      ],
      "images": {
        "center": "/assets/images/events/6ta-edicion/avioneta.webp",
        "topLeft": "/assets/images/events/6ta-edicion/auto-negro.webp",
        "bottomLeft": "/assets/images/events/6ta-edicion/autos-izquierda.webp",
        "bottomRight": "/assets/images/events/6ta-edicion/auto-rojo.webp",
        "topRight": "/assets/images/events/6ta-edicion/autos-derecha.webp"
      }
    }
  ]
}
```

### Paso 5.2: Crear `data/sponsors.json`
```json
{
  "sponsors": [
    { "name": "Can-Am", "logo": "/assets/images/sponsors/can-am.webp" },
    { "name": "FF Performance", "logo": "/assets/images/sponsors/ff-performance.webp" },
    { "name": "Autocity", "logo": "/assets/images/sponsors/autocity.webp" },
    { "name": "GLABS", "logo": "/assets/images/sponsors/glabs.webp" },
    { "name": "Michelin", "logo": "/assets/images/sponsors/michelin.png" },
    { "name": "Todo Suspensión", "logo": "/assets/images/sponsors/todo-suspension.webp" },
    { "name": "Detail Industry", "logo": "/assets/images/sponsors/detail-industry.webp" },
    { "name": "HFI Performance", "logo": "/assets/images/sponsors/hfi-performance.webp" },
    { "name": "Astus", "logo": "/assets/images/sponsors/astus.webp" },
    { "name": "El Hornito", "logo": "/assets/images/sponsors/el-hornito.webp" },
    { "name": "Sunset Media", "logo": "/assets/images/sponsors/sunset-media.webp" },
    { "name": "Monster", "logo": "/assets/images/sponsors/monster.webp" },
    { "name": "Banquis", "logo": "/assets/images/sponsors/banquis.webp" },
    { "name": "Bolgan", "logo": "/assets/images/sponsors/bolgan.webp" }
  ]
}
```

---

## Fase 6: Migrar Páginas HTML
**Tiempo estimado: 30 minutos**

### Paso 6.1: Actualizar `index.html` (Home)

**Cambios en `<head>`:**
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sunset Drive</title>
  <meta name="description" content="..." />
  
  <!-- Fuentes -->
  <link rel="stylesheet" href="https://use.typekit.net/nle2uql.css" />
  
  <!-- CSS Principal -->
  <link rel="stylesheet" href="/css/main.css" />
  
  <!-- Tailwind (temporal - eliminar progresivamente) -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- PWA -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#e38228" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="SunSet" />
</head>
```

**Actualizar rutas de imágenes:**
- `Media/LogoSunSet-512x512.png` → `/assets/images/logo/logo-512.png`
- `Media/VideoHeader.webm` → `/assets/videos/hero-background.webm`
- `Media/Cartelera 3/*` → `/assets/images/events/caroya/*`
- (etc. según tabla de migración de assets)

**Actualizar scripts al final:**
```html
<script type="module" src="/js/main.js"></script>
```

### Paso 6.2: Crear `tickets/index.html`

Mover contenido de `Entradas/IndexEntrada.html` con rutas actualizadas:
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- ... meta tags ... -->
  <link rel="stylesheet" href="/css/main.css" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="manifest" href="/manifest.json" />
</head>
<body>
  <!-- Navbar con rutas absolutas -->
  <!-- Contenido del iframe -->
  <script type="module" src="/js/main.js"></script>
</body>
</html>
```

### Paso 6.3: Crear `legal/index.html`

Mover contenido de `tyc-sorteo/indexSorteo.html` con rutas actualizadas.

### Paso 6.4: Crear Redirects Legacy

**`Entradas/index.html`:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=/tickets/">
  <link rel="canonical" href="/tickets/">
  <title>Redirigiendo a Entradas...</title>
</head>
<body>
  <p>Redirigiendo a <a href="/tickets/">entradas</a>...</p>
</body>
</html>
```

**`tyc-sorteo/index.html`:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=/legal/">
  <link rel="canonical" href="/legal/">
  <title>Redirigiendo a Términos...</title>
</head>
<body>
  <p>Redirigiendo a <a href="/legal/">términos y condiciones</a>...</p>
</body>
</html>
```

---

## Fase 7: Actualizar Archivos de Configuración
**Tiempo estimado: 15 minutos**

### Paso 7.1: Actualizar `manifest.json`
```json
{
  "name": "Sunset Drive",
  "short_name": "SunSet",
  "description": "Eventos automotrices en Córdoba",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#e38228",
  "icons": [
    {
      "src": "/assets/images/logo/logo-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Paso 7.2: Actualizar `sw.js`
Actualizar rutas de cache:
```javascript
const CACHE_NAME = 'sunset-v2';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/js/main.js',
  '/assets/images/logo/logo-512.png',
  '/assets/videos/hero-background.webm'
];
```

### Paso 7.3: Crear `robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://sunsetdrive.com.ar/sitemap.xml
```

---

## Fase 8: Limpieza
**Tiempo estimado: 10 minutos**

### Paso 8.1: Eliminar Archivos Obsoletos
```
Eliminar:
├── Media/                          # Ya migrado a assets/
├── style.css                       # Ya dividido en css/
├── style.min.css                   # Regenerar si es necesario
├── script.js                       # Ya dividido en js/
├── footer.js                       # Ya en js/components/
├── Entradas/IndexEntrada.html      # Reemplazado por redirect
├── tyc-sorteo/indexSorteo.html     # Reemplazado por redirect
├── .vite/                          # Cache innecesaria
└── Media/.vite/                    # Cache innecesaria
```

### Paso 8.2: Actualizar `.gitignore`
```gitignore
# Dependencies
node_modules/

# Build
dist/
*.min.css
*.min.js

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

---

## Fase 9: Testing
**Tiempo estimado: 30 minutos**

### Paso 9.1: Verificar Funcionamiento Local
- [ ] Home page carga correctamente
- [ ] Todas las imágenes cargan
- [ ] Video header funciona
- [ ] Navbar funciona en desktop
- [ ] Menú hamburguesa funciona en móvil
- [ ] Smooth scroll funciona
- [ ] FAQ se expande/contrae
- [ ] Carousel de eventos funciona
- [ ] Galería de imágenes funciona
- [ ] Footer aparece correctamente

### Paso 9.2: Verificar Páginas Secundarias
- [ ] `/tickets/` carga correctamente
- [ ] `/legal/` carga correctamente
- [ ] Iframe de tickets funciona

### Paso 9.3: Verificar Redirects
- [ ] `/Entradas/` redirige a `/tickets/`
- [ ] `/Entradas/IndexEntrada.html` redirige a `/tickets/`
- [ ] `/tyc-sorteo/` redirige a `/legal/`
- [ ] `/tyc-sorteo/indexSorteo.html` redirige a `/legal/`

### Paso 9.4: Verificar PWA
- [ ] `manifest.json` es accesible
- [ ] Service Worker se registra
- [ ] Favicon carga

### Paso 9.5: Testing Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Móvil iOS
- [ ] Móvil Android

---

## Fase 10: Deploy
**Tiempo estimado: 20 minutos**

### Paso 10.1: Commit y Push
```bash
git add .
git commit -m "refactor: restructure project to feature-based architecture"
git push origin feature/restructure-project
```

### Paso 10.2: Merge a Main
```bash
git checkout main
git merge feature/restructure-project
git push origin main
```

### Paso 10.3: Deploy a Hostinger
- Subir archivos via FTP/File Manager
- Verificar que todo funciona en producción

### Paso 10.4: Verificar en Producción
- [ ] Todas las URLs funcionan
- [ ] Redirects funcionan
- [ ] SSL funciona
- [ ] Performance aceptable

---

## Fase 11: Documentación
**Tiempo estimado: 15 minutos**

### Paso 11.1: Crear `README.md`
```markdown
# Sunset Drive Website

## Estructura del Proyecto
[Documentar estructura de carpetas]

## Cómo Añadir una Nueva Página
1. Crear carpeta en root: `nueva-pagina/`
2. Crear `nueva-pagina/index.html`
3. Usar rutas absolutas para assets

## Cómo Añadir un Nuevo Evento
1. Añadir imágenes en `assets/images/events/nombre-evento/`
2. Actualizar `data/events.json`

## Cómo Añadir un Nuevo Sponsor
1. Añadir logo en `assets/images/sponsors/`
2. Actualizar `data/sponsors.json`

## Desarrollo Local
Usar cualquier servidor local (Live Server, http-server, etc.)

## Deploy
Subir archivos a Hostinger via FTP
```

---

## Resumen de Tiempos

| Fase | Descripción | Tiempo |
|------|-------------|--------|
| 0 | Preparación y Backup | 10 min |
| 1 | Crear Estructura de Carpetas | 5 min |
| 2 | Migrar Assets | 15 min |
| 3 | Modularizar CSS | 45 min |
| 4 | Modularizar JavaScript | 60 min |
| 5 | Crear Archivos de Datos | 15 min |
| 6 | Migrar Páginas HTML | 30 min |
| 7 | Actualizar Configuración | 15 min |
| 8 | Limpieza | 10 min |
| 9 | Testing | 30 min |
| 10 | Deploy | 20 min |
| 11 | Documentación | 15 min |
| **TOTAL** | | **~4.5 horas** |

---

## Checklist Final

- [ ] Fase 0 completada
- [ ] Fase 1 completada
- [ ] Fase 2 completada
- [ ] Fase 3 completada
- [ ] Fase 4 completada
- [ ] Fase 5 completada
- [ ] Fase 6 completada
- [ ] Fase 7 completada
- [ ] Fase 8 completada
- [ ] Fase 9 completada
- [ ] Fase 10 completada
- [ ] Fase 11 completada

---

## Notas Adicionales

### Fase Futura: Accesibilidad
Después de completar la migración, implementar mejoras de accesibilidad:
- Añadir `aria-label` a botones icon-only
- Implementar manejo de teclado para elementos interactivos
- Añadir `width` y `height` a todas las imágenes
- Respetar `prefers-reduced-motion` en animaciones
- Usar elementos semánticos correctos (`<button>` vs `<div>`)
- Añadir `scroll-margin-top` a anclajes
