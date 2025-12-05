// ========================================
// FUNCIONES DE OPTIMIZACIÓN
// ========================================

// Evita que los JS se ejecuten demasiadas veces
function throttle(func, limit) {
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

// ========================================
// LOGO HEADER ANIMATION
// ========================================

// Función para actualizar la visibilidad del logo del navbar
function updateNavbarLogoVisibility() {
  const logoContainer = document.getElementById('logo-container');
  const navbarLogo = document.querySelector('.nav-logo-img');
  const navbar = document.querySelector('.navbar');
  
  if (!logoContainer || !navbarLogo || !navbar) return;

  // Obtener la posición del logo principal
  const logoRect = logoContainer.getBoundingClientRect();
  const logoBottom = logoRect.bottom; // Distancia desde el top de la ventana hasta el bottom del logo
  const isMobile = window.innerWidth <= 768;

  // Cambio de logo en el header - cuando el logo sale de la pantalla
  if (logoBottom < 0) { /* Cuando el logo está completamente fuera de la pantalla */
    logoContainer.classList.add('shrink');
    if (isMobile) {
      // En móviles usamos la clase para mejor control
      navbarLogo.classList.add('visible');
    } else {
      navbarLogo.style.opacity = '1';
      navbarLogo.style.visibility = 'visible';
    }
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
  } else {
    logoContainer.classList.remove('shrink');
    if (isMobile) {
      // En móviles usamos la clase para mejor control
      navbarLogo.classList.remove('visible');
    } else {
      navbarLogo.style.opacity = '0';
      navbarLogo.style.visibility = 'hidden';
    }
    navbar.style.background = 'rgba(0, 0, 0, 0.1)';
  }
}

// Ejecutar inmediatamente al cargar para establecer el estado correcto
// Esto evita que se vean ambos logos en la carga inicial en móviles
document.addEventListener('DOMContentLoaded', function() {
  updateNavbarLogoVisibility();
});

// También ejecutar cuando la página está completamente cargada (por si acaso)
window.addEventListener('load', function() {
  updateNavbarLogoVisibility();
});

// Optimizar scroll listener para el logo
window.addEventListener('scroll', throttle(updateNavbarLogoVisibility, 16)); // limita cada 16ms para que no se ejecute demasiadas veces la animación del logo





// ========================================
// PREGUNTAS FRECUENTES
// ========================================

// Función para inicializar las preguntas frecuentes
function initPreguntasFrecuentes() {
  const questions = document.querySelectorAll('.Pregunta');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;

      // Cierra otras preguntas activas
      document.querySelectorAll('.Caja_Pregunta').forEach(el => {
        if (el !== item) {
          el.classList.remove('active');
        }
      });

      // Alterna la clase active
      item.classList.toggle('active');
    });
  });
}

// ========================================
// RESPONSIVE HANDLERS
// ========================================

// Debounce function para optimizar resize
function debounce(func, wait) {
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

// Responsive: stack on mobile para eventos anteriores
function handleEventosResponsive() {
  const slides = document.querySelectorAll('.EventoAnteriores-slide');
  if (window.innerWidth < 700) {
    slides.forEach(slide => {
      slide.style.flexDirection = 'column';
      slide.children[0].querySelector('img').style.borderRadius = '0';
      slide.children[1].style.padding = '24px 16px';
    });
  } else {
    slides.forEach(slide => {
      slide.style.flexDirection = 'row';
      slide.children[0].querySelector('img').style.borderRadius = '0';
      slide.children[1].style.padding = '36px 32px';
    });
  }
}

// ========================================
// SMOOTH SCROLLING
// ========================================

// Función para manejar scroll suave en enlaces internos
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Altura de la navbar según el tamaño de pantalla
        const navbarHeight = window.innerWidth <= 768 ? 60 : 70;
        const windowHeight = window.innerHeight;
        const targetHeight = target.offsetHeight;
        
        // Calcular posición para centrar el contenido
        const targetPosition = target.offsetTop - navbarHeight - (windowHeight - targetHeight) / 2;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// GALERÍA DE EVENTOS - CLICK PARA AGRANDAR
// ========================================

// Función para manejar clics en imágenes de la galería
function initGalleryClicks() {
  // Imágenes de la galería principal de eventos
  const galleryImages = document.querySelectorAll('.EventoCartelera-gallery img');
  
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      } else {
        galleryImages.forEach(image => image.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Imágenes de eventos anteriores
  const eventosAnterioresImages = document.querySelectorAll('.EventosAnteriores-slides .slide-image img');
  
  eventosAnterioresImages.forEach(img => {
    img.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      } else {
        // Remover active de todas las imágenes de eventos anteriores
        eventosAnterioresImages.forEach(image => image.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

// Hacer que el logo de la navbar lleve al inicio con scroll suave y centrado
function initNavbarLogoHome() {
  const navbarLogo = document.querySelector('.nav-logo-img');
  if (navbarLogo) {
    navbarLogo.addEventListener('click', function(e) {
      e.preventDefault();
      // Altura de la navbar según el tamaño de pantalla
      const navbarHeight = window.innerWidth <= 768 ? 60 : 70;
      const windowHeight = window.innerHeight;
      // Para centrar el header, tomamos el primer elemento principal
      const header = document.querySelector('header');
      if (header) {
        const targetHeight = header.offsetHeight;
        const targetPosition = header.offsetTop - navbarHeight - (windowHeight - targetHeight) / 2;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        // Si no hay header, scroll al top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
}

// ========================================
// EVENTOS ANTERIORES
// ========================================

// Función para inicializar el carousel de eventos anteriores
function initEventosCarousel() {
  const eventosSlides = document.getElementById('EventosAnterioresSlides');
  const bullets = document.querySelectorAll('.bullet');
  
  if (!eventosSlides || bullets.length === 0) return;
  
  let eventosCurrent = 0;
  const eventosTotal = eventosSlides.children.length;
  let autoplayTimer;

  function updateEventosCarousel() {
    eventosSlides.style.transform = `translateX(-${eventosCurrent * 100}%)`;
    
    // Actualizar bullets y reiniciar animación
    bullets.forEach((bullet, i) => {
      bullet.classList.toggle('active', i === eventosCurrent);
      
      // Reiniciar animación del círculo de progreso
      const progressCircle = bullet.querySelector('.bullet-progress-circle');
      if (progressCircle) {
        progressCircle.style.animation = 'none';
        progressCircle.offsetHeight; // Trigger reflow
        progressCircle.style.animation = i === eventosCurrent ? 'progressAnimation 8s linear forwards' : 'none';
      }
    });
  }

  function nextSlide() {
    eventosCurrent = (eventosCurrent + 1) % eventosTotal;
    updateEventosCarousel();
    startAutoplay();
  }

  function startAutoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = setTimeout(nextSlide, 8000);
  }

  // Configurar clicks en bullets
  bullets.forEach((bullet, i) => {
    bullet.onclick = function() {
      eventosCurrent = i;
      updateEventosCarousel();
      startAutoplay();
    }
  });

  // Iniciar autoplay
  startAutoplay();
}










// ========================================
// MENÚ HAMBURGUESA MÓVIL
// ========================================

// Función para manejar el menú hamburguesa
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function() {
      hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (!hamburgerBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }
}

// ========================================
// INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar todos los componentes
  initPreguntasFrecuentes();
  initSmoothScrolling();
  initGalleryClicks();
  initNavbarLogoHome();
  initMobileMenu();
  initEventosCarousel();
  
  // Inicializar el visor de imágenes de eventos pasados
  console.log('Initializing eventos pasados expansion effect...');
  applyEventosInitialStyles();
  initializeEventosExpansionEffect();
  console.log('Eventos pasados expansion effect initialized successfully!');
  
  // Inicializar el carousel de eventos anteriores estandarizado
  window.eventosCarousel = new EventosAnterioresCarousel('eventos-carousel-container');
  
  // Configurar responsive handlers
  window.addEventListener('resize', debounce(handleEventosResponsive, 250));
  handleEventosResponsive();
});

// ========================================
// VISOR DE IMÁGENES DE EVENTOS PASADOS - EFECTO DE EXPANSIÓN
// ========================================

// Configuración de las secciones del visor de eventos pasados y sus estados de expansión
const eventosSectionConfig = [
  {
    id: "center-eventos",
    defaultWidth: "20%",
    defaultHeight: "20%",
    onHover: {
      "center-eventos": { width: "40%", height: "40%", translate: "-30%, -20%" },
      "topleft-eventos": { width: "28%", height: "72%" },
      "bottomleft-eventos": { width: "68%", height: "28%" },
      "bottomright-eventos": { width: "32%", height: "68%" },
      "topright-eventos": { width: "72%", height: "32%" }
    }
  },
  {
    id: "topleft-eventos",
    defaultWidth: "60%",
    defaultHeight: "40%",
    onHover: {
      "center-eventos": { width: "20%", height: "20%", translate: "50%, 50%" },
      "topleft-eventos": { width: "70%", height: "50%" },
      "bottomleft-eventos": { width: "50%", height: "50%" },
      "bottomright-eventos": { width: "50%", height: "30%" },
      "topright-eventos": { width: "30%", height: "70%" }
    }
  },
  {
    id: "bottomleft-eventos",
    defaultWidth: "40%",
    defaultHeight: "60%",
    onHover: {
      "center-eventos": { width: "20%", height: "20%", translate: "75%, 0%" },
      "topleft-eventos": { width: "75%", height: "40%" },
      "bottomleft-eventos": { width: "55%", height: "60%" },
      "bottomright-eventos": { width: "45%", height: "40%" },
      "topright-eventos": { width: "25%", height: "60%" }
    }
  },
  {
    id: "bottomright-eventos",
    defaultWidth: "60%",
    defaultHeight: "40%",
    onHover: {
      "center-eventos": { width: "20%", height: "20%", translate: "-20%, -80%" },
      "topleft-eventos": { width: "56%", height: "24%" },
      "bottomleft-eventos": { width: "36%", height: "76%" },
      "bottomright-eventos": { width: "64%", height: "56%" },
      "topright-eventos": { width: "44%", height: "44%" }
    }
  },
  {
    id: "topright-eventos",
    defaultWidth: "40%",
    defaultHeight: "60%",
    onHover: {
      "center-eventos": { width: "20%", height: "20%", translate: "-80%, 60%" },
      "topleft-eventos": { width: "44%", height: "52%" },
      "bottomleft-eventos": { width: "24%", height: "48%" },
      "bottomright-eventos": { width: "76%", height: "28%" },
      "topright-eventos": { width: "56%", height: "72%" }
    }
  }
];

// Estado global del visor de eventos pasados
let currentEventosHover = null;

// Función para aplicar estilos a una sección del visor de eventos pasados
function applyEventosSectionStyles(sectionId, config) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  // Aplicar dimensiones
  section.style.width = config.width;
  section.style.height = config.height;

  // Aplicar transformación si existe, pero limitada para no sobresalir
  if (config.translate) {
    const [x, y] = config.translate.split(', ');
    // Limitar las transformaciones para que no sobresalgan de los bordes
    const limitedX = x.includes('%') ? x : '0%';
    const limitedY = y.includes('%') ? y : '0%';
    section.style.transform = `translate3d(${limitedX}, ${limitedY}, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
  } else {
    section.style.transform = 'inherit';
  }

  // Aplicar z-index
  if (sectionId === currentEventosHover) {
    section.style.zIndex = '30';
    section.classList.add('expanding');
    section.classList.remove('contracting');
  } else {
    section.style.zIndex = '1';
    section.classList.add('contracting');
    section.classList.remove('expanding');
  }
}

// Función para manejar el click del visor de eventos pasados
function handleEventosHover(sectionId) {
  // Aplicar click inmediatamente
  currentEventosHover = sectionId;
  
  // Obtener la configuración de la sección que está siendo clickeada
  const clickedSection = eventosSectionConfig.find(section => section.id === sectionId);
  if (!clickedSection) return;

  // Aplicar estilos a todas las secciones según la configuración
  eventosSectionConfig.forEach(section => {
    const config = clickedSection.onHover[section.id];
    if (config) {
      applyEventosSectionStyles(section.id, config);
    }
  });
}

// Función para resetear el visor de eventos pasados a estado del centro
function resetEventosToNormal() {
  currentEventosHover = null;
  
  // Aplicar configuración del centro como estado por defecto
  const centerConfig = eventosSectionConfig.find(section => section.id === "center-eventos");
  if (centerConfig) {
    eventosSectionConfig.forEach(section => {
      const config = centerConfig.onHover[section.id];
      if (config) {
        applyEventosSectionStyles(section.id, config);
      }
    });
  }
}

// Función para inicializar el efecto de expansión del visor de eventos pasados
function initializeEventosExpansionEffect() {
  // Obtener todas las secciones del visor de eventos pasados
  const eventosSections = document.querySelectorAll('.main-container-eventos .section');
  const container = document.querySelector('.main-container-eventos');
  
  eventosSections.forEach(section => {
    // Evento click para activar la expansión
    section.addEventListener('click', (e) => {
      e.stopPropagation();
      const sectionId = section.id;
      handleEventosHover(sectionId);
    });
  });
  
  // Evento click en el contenedor principal para resetear
  if (container) {
    container.addEventListener('click', (e) => {
      // Solo resetear si se hace clic en el contenedor pero no en una sección
      if (e.target === container) {
        e.stopPropagation();
        resetEventosToNormal();
      }
    });
  }
}

// Función para aplicar estilos iniciales del visor de eventos pasados
function applyEventosInitialStyles() {
  // No hacer nada - el CSS ya tiene las posiciones correctas del centro
  // Solo inicializar el estado global
  currentEventosHover = "center-eventos";
}

// Función de utilidad para debug del visor de eventos pasados
function debugEventosExpansionEffect() {
  console.log('Current eventos hover:', currentEventosHover);
  console.log('Eventos section config:', eventosSectionConfig);
  
  eventosSectionConfig.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) {
      console.log(`${section.id}:`, {
        width: element.style.width,
        height: element.style.height,
        transform: element.style.transform,
        zIndex: element.style.zIndex
      });
    }
  });
}

// Exponer funciones para debug en la consola
window.debugEventosExpansionEffect = debugEventosExpansionEffect;
window.resetEventosToNormal = resetEventosToNormal;
window.handleEventosHover = handleEventosHover;

// ========================================
// SERVICE WORKER
// ========================================

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registrado exitosamente:', registration.scope);
      })
      .catch(error => {
        console.log('SW registro falló:', error);
      });
  });
}

// ========================================
// SISTEMA DE EVENTOS ANTERIORES COMPLETAMENTE ESTANDARIZADO
// ========================================

/**
 * Datos de los eventos anteriores - Fácil de mantener y actualizar
 */
const eventosAnterioresData = [
  {
    id: "sunset-express",
    title: "SunSet Drive Express",
    description: "Esta edición privada comenzó con un desayuno exclusivo en Autocity, para luego iniciar la caravana por las mejores rutas serranas de Córdoba hasta Potrerillo Pueblo de Montaña. Disfrutamos de un almuerzo servido a la mesa, una exposición de los vehículos participantes, stands de marcas como Glabs, Detail Industry y HFI, además de sorteos y una premiación especial del concurso de elegancia.",
    stats: [
      { number: "60+", label: "Autos" },
      { number: "150+", label: "Personas" },
      { number: "8h", label: "Duración" }
    ],
    images: {
      center: "Media/Cartelera 1/Panoramica cierras.webp",
      topLeft: "Media/Cartelera 1/Autos por la izquierda.webp",
      bottomLeft: "Media/Cartelera 1/Autos de costado.webp",
      bottomRight: "Media/Cartelera 1/Sacando la cabeza.webp",
      topRight: "Media/Cartelera 1/SafetyBMW.webp"
    }
  },
  {
    id: "sunset-drive-6ta",
    title: "Sunset Drive - 6ta Edición",
    description: "El pasado 14 de diciembre de 2024 celebramos una edición inolvidable de Sunset Drive. Iniciamos la caravana en Polo 52, Córdoba, rumbo a Potrero de Garay. Allí, participantes y público general disfrutaron de una exposición de más de 100 autos, show de acrobacias aéreas sobre el lago, stands de reconocidas marcas como Michelin Neumáticos Belgrano, Can-Am, Todo Suspensión, FF Performance, Hudson Custom Garage, entre otras, además de catering, barra de bebidas y música en vivo al atardecer, en una ubicación inigualable.",
    videoUrl: "https://youtu.be/M5jQ1I8E7U8?si=T-OVR4dpZtXPnf31",
    stats: [
      { number: "100+", label: "Autos" },
      { number: "500+", label: "Personas" },
      { number: "10h", label: "Duración" }
    ],
    images: {
      center: "Media/Cartelera 2/Avioneta.webp",
      topLeft: "Media/Cartelera 2/Auto negro.webp",
      bottomLeft: "Media/Cartelera 2/Autos por la izquierda.webp",
      bottomRight: "Media/Cartelera 2/Auto rojo.webp",
      topRight: "Media/Cartelera 2/Autos por la derecha.webp"
    }
  }
];

/**
 * Clase mejorada para manejar el carousel de eventos anteriores
 */
class EventosAnterioresCarousel {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.slidesContainer = document.getElementById('eventos-carousel-slides');
    this.bulletsContainer = document.getElementById('eventos-bullets');
    
    this.options = {
      autoplay: true,
      autoplayDelay: 14900, // Ligeramente menor que la animación de 15s
      pauseOnHover: false,
      ...options
    };
    
    this.currentIndex = 0;
    this.slides = [];
    this.bullets = [];
    this.autoplayTimer = null;
    this._bulletAnimEndHandler = null;
    this.resumeTimer = null;
    this.isAnimating = false;
    this._touch = { startX: 0, startY: 0, startT: 0, moved: false };
    
    this.init();
  }

  clearResumeTimer() {
    if (this.resumeTimer) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }
  }

  init() {
    if (!this.container || !this.slidesContainer || !this.bulletsContainer) {
      console.error('Contenedores de eventos anteriores no encontrados');
      return;
    }

    this.renderSlides();
    this.renderBullets();
    this.setupEventListeners();
    this.updateCarousel();
    this.startAutoplay();
  }

  renderSlides() {
    const slidesHTML = eventosAnterioresData.map((evento, index) => 
      this.createEventoSlideHTML(evento, index)
    ).join('');
    
    this.slidesContainer.innerHTML = slidesHTML;
    this.slides = this.slidesContainer.querySelectorAll('.evento-slide');
  }

  renderBullets() {
    const bulletsHTML = eventosAnterioresData.map((evento, index) => 
      this.createBulletHTML(evento, index)
    ).join('');
    
    this.bulletsContainer.innerHTML = bulletsHTML;
    this.bullets = this.bulletsContainer.querySelectorAll('.eventos-bullet');
  }

  createEventoSlideHTML(evento, index) {
    // Permitir definir un orden personalizado por evento
    const order = evento.order || {
      center: 'center',
      topLeft: 'topLeft',
      bottomLeft: 'bottomLeft',
      bottomRight: 'bottomRight',
      topRight: 'topRight'
    };

    const imgCenter = evento.images[order.center];
    const imgTopLeft = evento.images[order.topLeft];
    const imgBottomLeft = evento.images[order.bottomLeft];
    const imgBottomRight = evento.images[order.bottomRight];
    const imgTopRight = evento.images[order.topRight];

    return `
      <div class="evento-slide ${index === 0 ? 'active' : ''}" data-event-id="${evento.id}">
        <div class="eventos-anteriores-viewer">
          <div class="eventos-viewer-container">
            <!-- Panel de información -->
            <div class="eventos-info-panel">
              <h3 class="titulo-estandar">${evento.title}</h3>
              <p class="descripcion-estandar">${evento.description}</p>
              <div class="eventos-info-stats">
                ${evento.stats.map(stat => `
                  <div class="stat-item">
                    <span class="stat-number">${stat.number}</span>
                    <span class="stat-label">${stat.label}</span>
                  </div>
                `).join('')}
              </div>
              ${evento.videoUrl ? `<a href="${evento.videoUrl}" class="EventoCartelera-button" target="_blank" rel="noopener noreferrer">MIRA EL VIDEO →</a>` : ''}
            </div>
            
            <!-- Visor de imágenes (desktop 5-panel) -->
            <div class="main-container-eventos" data-event-id="${evento.id}">
              <div class="section center-section-eventos" id="center-${evento.id}">
                <div class="section-content">
                  <img src="${imgCenter}" alt="${evento.title} - Imagen Principal" class="section-image">
                </div>
              </div>
              
              <div class="section topleft-section-eventos" id="topleft-${evento.id}">
                <div class="section-content">
                  <img src="${imgTopLeft}" alt="${evento.title} - Imagen 2" class="section-image">
                </div>
              </div>
              
              <div class="section bottomleft-section-eventos" id="bottomleft-${evento.id}">
                <div class="section-content">
                  <img src="${imgBottomLeft}" alt="${evento.title} - Imagen 3" class="section-image">
                </div>
              </div>
              
              <div class="section bottomright-section-eventos" id="bottomright-${evento.id}">
                <div class="section-content">
                  <img src="${imgBottomRight}" alt="${evento.title} - Imagen 4" class="section-image">
                </div>
              </div>
              
              <div class="section topright-section-eventos" id="topright-${evento.id}">
                <div class="section-content">
                  <img src="${imgTopRight}" alt="${evento.title} - Imagen 5" class="section-image">
                </div>
              </div>
            </div>

            <!-- Mobile viewer: main + thumbs (no interfiere con desktop) -->
            <div class="eventos-mobile-viewer" data-event-id="${evento.id}">
              <img class="mobile-main" src="${imgCenter}" alt="${evento.title} - Imagen Principal">
              <div class="eventos-thumbs">
                <img src="${imgCenter}" alt="${evento.title} - Miniatura principal">
                <img src="${imgTopLeft}" alt="${evento.title} - Miniatura 1">
                <img src="${imgBottomLeft}" alt="${evento.title} - Miniatura 2">
                <img src="${imgBottomRight}" alt="${evento.title} - Miniatura 3">
                <img src="${imgTopRight}" alt="${evento.title} - Miniatura 4">
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  createBulletHTML(evento, index) {
    return `
      <span class="eventos-bullet ${index === 0 ? 'active' : ''}" 
            role="button" 
            aria-label="${evento.title}" 
            tabindex="0"
            data-event-index="${index}">
        <svg width="20" height="20">
          <mask id="eventos-bullet-mask-${index}">
            <circle cx="10" cy="10" r="9" stroke-width="2" stroke="#ffffff" fill="none"></circle>
          </mask>
          <g mask="url(#eventos-bullet-mask-${index})">
            <circle class="eventos-bullet-bg" cx="10" cy="10" r="10" fill="#ffffff"></circle>
            <circle class="eventos-bullet-progress" cx="10" cy="10" r="9" stroke-width="3" fill="none"></circle>
          </g>
        </svg>
      </span>
    `;
  }

  setupEventListeners() {
    // Event listeners para bullets
    this.bullets.forEach((bullet, index) => {
      bullet.addEventListener('click', () => this.goToSlide(index));
      bullet.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.goToSlide(index);
        }
      });
    });

    // Pausar autoplay al hacer hover
    if (this.options.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
      this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    // Inicializar efecto de expansión para el slide activo
    this.initializeExpansionEffect();

    // Swipe/touch gestures (simple)
    this.setupTouchListeners();
  }

  initializeExpansionEffect() {
    // En <=1050px mostramos una sola imagen sin expansión
    if (window.innerWidth <= 1050) return;

    // Aplicar el efecto de expansión solo al slide activo
    const activeSlide = this.slides[this.currentIndex];
    if (activeSlide) {
      const container = activeSlide.querySelector('.main-container-eventos');
      if (container) {
        // Remover listeners anteriores para evitar duplicados
        this.removeExpansionListeners(container);
        this.setupExpansionEffect(container);
      }
    }
  }

  removeExpansionListeners(container) {
    const sections = container.querySelectorAll('.section');
    sections.forEach(section => {
      if (section._expansionClickHandler) {
        section.removeEventListener('click', section._expansionClickHandler);
        delete section._expansionClickHandler;
      }
    });
    if (container._expansionContainerHandler) {
      container.removeEventListener('click', container._expansionContainerHandler);
      delete container._expansionContainerHandler;
    }
  }

  getActiveBulletProgressCircle() {
    const activeBullet = this.bullets[this.currentIndex];
    if (!activeBullet) return null;
    return activeBullet.querySelector('.eventos-bullet-progress');
  }

  pauseBulletAnimation() {
    const progressCircle = this.getActiveBulletProgressCircle();
    if (progressCircle) {
      progressCircle.style.animationPlayState = 'paused';
    }
  }

  resumeBulletAnimation() {
    const progressCircle = this.getActiveBulletProgressCircle();
    if (progressCircle) {
      progressCircle.style.animationPlayState = 'running';
    }
  }

  setupExpansionEffect(container) {
    const sections = container.querySelectorAll('.section');
    
    sections.forEach(section => {
      const clickHandler = (e) => {
        e.stopPropagation();
        const sectionId = section.id;
        this.handleExpansionClick(sectionId, container);
        // Pausar autoplay y animación de bullet al interactuar con imágenes
        this.pauseAutoplay();
        this.pauseBulletAnimation();
        // Reiniciar (limpiar) timer previo y programar reanudación automática en 10s
        this.clearResumeTimer();
        this.resumeTimer = setTimeout(() => {
          this.resetExpansion(container);
          this.resumeBulletAnimation();
          this.startAutoplay();
          this.resumeTimer = null;
        }, 10000);
      };
      section.addEventListener('click', clickHandler);
      section._expansionClickHandler = clickHandler;
    });
    
    const containerClickHandler = (e) => {
      if (e.target === container) {
        e.stopPropagation();
        this.resetExpansion(container);
        // Reanudar autoplay y animación al salir del modo de interacción
        this.resumeBulletAnimation();
        this.startAutoplay();
        this.clearResumeTimer();
      }
    };
    container.addEventListener('click', containerClickHandler);
    container._expansionContainerHandler = containerClickHandler;
  }

  handleExpansionClick(sectionId, container) {
    // Configuración de expansión basada en el ID de la sección
    const eventId = this.getCurrentEventId();
    
    if (sectionId === `center-${eventId}`) {
      this.applyExpansionStyles(container, {
        center: { width: "40%", height: "40%", translate: "-30%, -20%" },
        topleft: { width: "28%", height: "72%" },
        bottomleft: { width: "68%", height: "28%" },
        bottomright: { width: "32%", height: "68%" },
        topright: { width: "72%", height: "32%" }
      });
    } else if (sectionId === `topleft-${eventId}`) {
      this.applyExpansionStyles(container, {
        center: { width: "20%", height: "20%", translate: "50%, 50%" },
        topleft: { width: "70%", height: "50%" },
        bottomleft: { width: "50%", height: "50%" },
        bottomright: { width: "50%", height: "30%" },
        topright: { width: "30%", height: "70%" }
      });
    } else if (sectionId === `bottomleft-${eventId}`) {
      this.applyExpansionStyles(container, {
        center: { width: "20%", height: "20%", translate: "75%, 0%" },
        topleft: { width: "75%", height: "40%" },
        bottomleft: { width: "55%", height: "60%" },
        bottomright: { width: "45%", height: "40%" },
        topright: { width: "25%", height: "60%" }
      });
    } else if (sectionId === `bottomright-${eventId}`) {
      this.applyExpansionStyles(container, {
        center: { width: "20%", height: "20%", translate: "-20%, -80%" },
        topleft: { width: "56%", height: "24%" },
        bottomleft: { width: "36%", height: "76%" },
        bottomright: { width: "64%", height: "56%" },
        topright: { width: "44%", height: "44%" }
      });
    } else if (sectionId === `topright-${eventId}`) {
      this.applyExpansionStyles(container, {
        center: { width: "20%", height: "20%", translate: "-80%, 60%" },
        topleft: { width: "44%", height: "52%" },
        bottomleft: { width: "24%", height: "48%" },
        bottomright: { width: "76%", height: "28%" },
        topright: { width: "56%", height: "72%" }
      });
    }
  }

  applyExpansionStyles(container, config) {
    Object.keys(config).forEach(key => {
      const section = container.querySelector(`.${key}-section-eventos`);
      if (section && config[key]) {
        const style = config[key];
        section.style.width = style.width;
        section.style.height = style.height;
        if (style.translate) {
          section.style.transform = `translate3d(${style.translate}, 0px) scale3d(1, 1, 1)`;
        }
      }
    });
  }

  resetExpansion(container) {
    const sections = container.querySelectorAll('.section');
    sections.forEach(section => {
      section.style.width = '';
      section.style.height = '';
      section.style.transform = '';
    });
  }

  getCurrentEventId() {
    return eventosAnterioresData[this.currentIndex]?.id || '';
  }

  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    if (this.isAnimating || index === this.currentIndex) return;
    const direction = index > this.currentIndex ? 'next' : 'prev';
    this.transitionTo(index, direction);
  }

  nextSlide() {
    if (this.isAnimating) return;
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.transitionTo(nextIndex, 'next');
  }

  prevSlide() {
    if (this.isAnimating) return;
    const prevIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    this.transitionTo(prevIndex, 'prev');
  }

  updateCarousel() {
    // Al cambiar de slide, limpiar cualquier timer de reanudación pendiente
    this.clearResumeTimer();

    // Actualizar slides
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === this.currentIndex) {
        slide.classList.add('active');
      }
    });

    // Actualizar bullets - primero remover active de todos
    this.bullets.forEach((bullet, index) => {
      bullet.classList.remove('active');
      // Resetear animación de todos los bullets
      const progressCircle = bullet.querySelector('.eventos-bullet-progress');
      if (progressCircle) {
        progressCircle.style.animation = 'none';
        progressCircle.style.strokeDashoffset = '56.52';
        // Detach any prior animation handlers
        if (progressCircle._animEndHandler) {
          progressCircle.removeEventListener('animationend', progressCircle._animEndHandler);
          delete progressCircle._animEndHandler;
        }
      }
    });

    // Luego activar solo el bullet actual
    const activeBullet = this.bullets[this.currentIndex];
    if (activeBullet) {
      activeBullet.classList.add('active');
      this.resetBulletAnimation(activeBullet);
      this.attachBulletAdvanceOnAnimationEnd(activeBullet);
    }

    // Reinicializar efecto de expansión para el slide activo (solo desktop)
    this.initializeExpansionEffect();

    // Inicializar viewer móvil independiente (solo mobile)
    this.wireMobileViewer();
  }

  transitionTo(targetIndex, direction) {
    if (!this.slides || this.slides.length === 0) return;
    const currentSlide = this.slides[this.currentIndex];
    const nextSlide = this.slides[targetIndex];
    if (!currentSlide || !nextSlide) return;

    this.isAnimating = true;
    this.pauseAutoplay();
    this.pauseBulletAnimation();

    // Ensure next slide is visible for animation
    nextSlide.classList.add('active');

    // Apply animation classes
    currentSlide.classList.add('is-exiting');
    if (direction === 'next') {
      currentSlide.classList.add('slide-out-left');
      nextSlide.classList.add('slide-in-right');
    } else {
      currentSlide.classList.add('slide-out-right');
      nextSlide.classList.add('slide-in-left');
    }

    const onAnimEnd = () => {
      // Cleanup classes on both slides
      currentSlide.classList.remove('active', 'is-exiting', 'slide-out-left', 'slide-out-right');
      nextSlide.classList.remove('slide-in-right', 'slide-in-left');

      // Update index and state
      this.currentIndex = targetIndex;
      this.isAnimating = false;

      // Update bullets and viewers
      this.updateCarousel();
      this.startAutoplay();
      this.resumeBulletAnimation();

      nextSlide.removeEventListener('animationend', onAnimEnd);
    };

    // Prefer listening to the incoming slide's animation end
    nextSlide.addEventListener('animationend', onAnimEnd, { once: true });

    // Fallback in case animationend doesn't fire
    setTimeout(onAnimEnd, 700);
  }

  setupTouchListeners() {
    const el = this.container;
    if (!el) return;
    const touchStart = (e) => {
      const t = e.touches ? e.touches[0] : e;
      this._touch.startX = t.clientX;
      this._touch.startY = t.clientY;
      this._touch.startT = Date.now();
      this._touch.moved = false;
      this.pauseAutoplay();
      this.pauseBulletAnimation();
    };
    const touchMove = (e) => {
      this._touch.moved = true;
    };
    const touchEnd = (e) => {
      const t = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : e;
      const dx = t.clientX - this._touch.startX;
      const dy = t.clientY - this._touch.startY;
      const dt = Date.now() - this._touch.startT;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const isSwipe = absDx > 50 && absDy < 80 && dt < 600;
      if (isSwipe) {
        if (dx < 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      } else {
        // Resume autoplay if no swipe performed
        this.startAutoplay();
        this.resumeBulletAnimation();
      }
    };

    el.addEventListener('touchstart', touchStart, { passive: true });
    el.addEventListener('touchmove', touchMove, { passive: true });
    el.addEventListener('touchend', touchEnd, { passive: true });

    // Also support mouse drag on desktop (optional lightweight)
    let isDown = false;
    let startX = 0;
    el.addEventListener('mousedown', (e) => { isDown = true; startX = e.clientX; this.pauseAutoplay(); this.pauseBulletAnimation(); });
    el.addEventListener('mouseup', (e) => {
      if (!isDown) return; isDown = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 80) {
        if (dx < 0) this.nextSlide(); else this.prevSlide();
      } else {
        this.startAutoplay(); this.resumeBulletAnimation();
      }
    });
  }

  resetBulletAnimation(bullet) {
    const progressCircle = bullet.querySelector('.eventos-bullet-progress');
    if (progressCircle) {
      // Resetear completamente la animación
      progressCircle.style.animation = 'none';
      progressCircle.style.strokeDashoffset = '56.52';
      progressCircle.offsetHeight; // Trigger reflow
      
      // Reiniciar la animación después de un pequeño delay
      setTimeout(() => {
        progressCircle.style.animation = 'eventosProgressAnimation 15s linear forwards';
      }, 50);
    }
  }

  attachBulletAdvanceOnAnimationEnd(bullet) {
    const progressCircle = bullet.querySelector('.eventos-bullet-progress');
    if (!progressCircle) return;
    const handler = () => {
      // Evitar múltiples disparos
      progressCircle.removeEventListener('animationend', handler);
      delete progressCircle._animEndHandler;
      this.nextSlide();
    };
    // Guardar referencia para limpiar después
    progressCircle._animEndHandler = handler;
    progressCircle.addEventListener('animationend', handler);
  }

  startAutoplay() {
    if (!this.options.autoplay) return;
    
    this.pauseAutoplay();
    this.autoplayTimer = setTimeout(() => {
      this.nextSlide();
    }, this.options.autoplayDelay);
  }

  pauseAutoplay() {
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  destroy() {
    this.pauseAutoplay();
  }

  wireMobileViewer() {
    if (window.innerWidth > 1050) return;
    const activeSlide = this.slides[this.currentIndex];
    if (!activeSlide) return;

    const mobileViewer = activeSlide.querySelector('.eventos-mobile-viewer');
    if (!mobileViewer) return;

    const mainImg = mobileViewer.querySelector('.mobile-main');
    const thumbs = mobileViewer.querySelectorAll('.eventos-thumbs img');
    if (!mainImg || thumbs.length === 0) return;

    // Estado activo
    thumbs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('src') === mainImg.getAttribute('src'));
    });

    thumbs.forEach(t => {
      t.onclick = () => {
        const newSrc = t.getAttribute('src');
        mainImg.setAttribute('src', newSrc);
        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        // Pausar autoplay/bullet 10s sin tocar desktop viewer
        this.pauseAutoplay();
        this.pauseBulletAnimation();
        this.clearResumeTimer();
        this.resumeTimer = setTimeout(() => {
          this.resumeBulletAnimation();
          this.startAutoplay();
          this.resumeTimer = null;
        }, 10000);
      };
    });
  }
}

/**
 * Función para agregar un nuevo evento anterior
 */
function addNewEventoAnterior(eventoData) {
  eventosAnterioresData.push(eventoData);
  // Reinicializar el carousel
  if (window.eventosCarousel) {
    window.eventosCarousel.destroy();
  }
  window.eventosCarousel = new EventosAnterioresCarousel('eventos-carousel-container');
}
