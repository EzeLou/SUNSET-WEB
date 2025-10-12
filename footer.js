// ========================================
// FOOTER REUTILIZABLE PARA SUNSET DRIVE
// ========================================

function createFooter() {
  const footerHTML = `
    <footer class="bg-black text-white py-12 px-6 md:px-20">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        <!-- Izquierda: Solo el logo -->
        <div class="space-y-6">
          <div>
            <img src="Media/LogoSunSet-512x512.png" alt="SunSet Logo" class="w-32">
          </div>
        </div>

        <!-- Derecha: Secciones -->
        <div class="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 class="text-[#0086e8] font-semibold mb-3">Nosotros</h3>
            <ul class="space-y-2">
              <li><a href="index.html#Eventos" class="hover:text-[#ff0f0e] cursor-pointer">Eventos anteriores</a></li>
              <li><a href="index.html#QuienesSomos" class="hover:text-[#ff0f0e] cursor-pointer">Sobre nosotros</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-[#0086e8] font-semibold mb-3">Contacto</h3>
            <ul class="space-y-2">
              <li><a href="mailto:info@sunsetdrive.com.ar" class="hover:text-[#ff0f0e] cursor-pointer">info@sunsetdrive.com.ar</a></li>
              <li><a href="https://wa.me/5493516200353" target="_blank" class="hover:text-[#ff0f0e] cursor-pointer">Cel: +54 9 351 620-0353</a></li>
              <li><a href="https://www.instagram.com/sunset_drive_cba/" target="_blank" class="hover:text-[#ff0f0e] cursor-pointer">Instagram</a></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  `;

  // Insertar el footer antes del cierre del body
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Función para crear footer con rutas relativas (para subcarpetas)
function createFooterWithRelativePaths() {
  const footerHTML = `
    <footer class="bg-black text-white py-12 px-6 md:px-20">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        <!-- Izquierda: Solo el logo -->
        <div class="space-y-6">
          <div>
            <img src="../Media/LogoSunSet-512x512.png" alt="SunSet Logo" class="w-32">
          </div>
        </div>

        <!-- Derecha: Secciones -->
        <div class="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 class="text-[#0086e8] font-semibold mb-3">Nosotros</h3>
            <ul class="space-y-2">
              <li><a href="../index.html#Eventos" class="hover:text-[#ff0f0e] cursor-pointer">Eventos anteriores</a></li>
              <li><a href="../index.html#QuienesSomos" class="hover:text-[#ff0f0e] cursor-pointer">Sobre nosotros</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-[#0086e8] font-semibold mb-3">Contacto</h3>
            <ul class="space-y-2">
              <li><a href="mailto:info@sunsetdrive.com.ar" class="hover:text-[#ff0f0e] cursor-pointer">info@sunsetdrive.com.ar</a></li>
              <li><a href="https://wa.me/5493516200353" target="_blank" class="hover:text-[#ff0f0e] cursor-pointer">Cel: +54 9 351 620-0353</a></li>
              <li><a href="https://www.instagram.com/sunset_drive_cba/" target="_blank" class="hover:text-[#ff0f0e] cursor-pointer">Instagram</a></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  `;

  // Insertar el footer antes del cierre del body
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Auto-ejecutar cuando se carga el script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Detectar si estamos en la página principal o en una subcarpeta
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('Caravana Solidaria') || 
                          currentPath.includes('caravana') || 
                          currentPath.split('/').length > 2;
    
    if (isInSubfolder) {
      createFooterWithRelativePaths();
    } else {
      createFooter();
    }
  });
} else {
  // Si el DOM ya está cargado
  const currentPath = window.location.pathname;
  const isInSubfolder = currentPath.includes('Caravana Solidaria') || 
                        currentPath.includes('caravana') || 
                        currentPath.split('/').length > 2;
  
  if (isInSubfolder) {
    createFooterWithRelativePaths();
  } else {
    createFooter();
  }
}
