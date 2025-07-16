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
  const stickyLogo = document.getElementById('sticky-header-logo');

  // Obtener la posición del logo principal
  const logoRect = logoContainer.getBoundingClientRect();
  const logoBottom = logoRect.bottom; // Distancia desde el top de la ventana hasta el bottom del logo

  // Cambio de logo en el header - cuando el logo sale de la pantalla
  if (logoBottom < 0) { /* Cuando el logo está completamente fuera de la pantalla */
    logoContainer.classList.add('shrink');
    stickyLogo.style.width = '7.8125rem'; // Logo esquina
    stickyLogo.style.opacity = '1';
  } else {
    logoContainer.classList.remove('shrink');
    stickyLogo.style.width = '0'; // Valor 0 para desaparecer el logo
    stickyLogo.style.opacity = '0';
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
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar todos los componentes
  initPreguntasFrecuentes();
  initSmoothScrolling();
  
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