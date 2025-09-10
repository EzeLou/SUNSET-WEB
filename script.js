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

// Optimizar scroll listener para el logo
window.addEventListener('scroll', throttle(function () {
  const logoContainer = document.getElementById('logo-container');
  const navbarLogo = document.querySelector('.nav-logo-img');
  const navbar = document.querySelector('.navbar');

  // Obtener la posición del logo principal
  const logoRect = logoContainer.getBoundingClientRect();
  const logoBottom = logoRect.bottom; // Distancia desde el top de la ventana hasta el bottom del logo

  // Cambio de logo en el header - cuando el logo sale de la pantalla
  if (logoBottom < 0) { /* Cuando el logo está completamente fuera de la pantalla */
    logoContainer.classList.add('shrink');
    navbarLogo.style.opacity = '1';
    navbarLogo.style.visibility = 'visible';
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
  } else {
    logoContainer.classList.remove('shrink');
    navbarLogo.style.opacity = '0';
    navbarLogo.style.visibility = 'hidden';
    navbar.style.background = 'rgba(0, 0, 0, 0.1)';
  }
}, 16)); // limita cada 16ms para que no se ejecute demasiadas veces la animación del logo





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
  
  // Configurar responsive handlers
  window.addEventListener('resize', debounce(handleEventosResponsive, 250));
  handleEventosResponsive();
});

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