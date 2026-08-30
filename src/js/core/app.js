/* =========================================
   0. PANTALLA DE CARGA (SPLASH SCREEN)
   ========================================= */
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 500); // Tiempo de fade-out
        }, 800); // Tiempo visible mínimo
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------
       1. LÓGICA DEL MODAL DE RESEÑAS (Google)
       ----------------------------------------- */
    const btnAbrir = document.getElementById('btn-abrir-resenas');
    const modalResenas = document.getElementById('modal-resenas');
    const btnCerrarResenas = document.getElementById('btn-cerrar-modal');

    if (btnAbrir && modalResenas && btnCerrarResenas) {
        btnAbrir.addEventListener('click', () => modalResenas.classList.add('activo'));
        btnCerrarResenas.addEventListener('click', () => modalResenas.classList.remove('activo'));
        modalResenas.addEventListener('click', (e) => { if (e.target === modalResenas) modalResenas.classList.remove('activo'); });
    }

    /* -----------------------------------------
       2. NAVEGACIÓN FLUIDA (SMOOTH SCROLL)
       ----------------------------------------- */
    const enlacesNav = document.querySelectorAll('a[href^="#"]');
    enlacesNav.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); 
            const destinoID = this.getAttribute('href');
            if (destinoID === '#') return;
            const destinoElemento = document.querySelector(destinoID);
            
            if (destinoElemento) {
                const headerOffset = 80; 
                const elementPosition = destinoElemento.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    /* -----------------------------------------
       3. INTERSECTION OBSERVER (ANIMACIONES INFINITAS)
       ----------------------------------------- */
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar-scroll');
            } else {
                entry.target.classList.remove('mostrar-scroll');
            }
        });
    }, observerOptions);

    const elementosOcultos = document.querySelectorAll('.oculto-scroll');
    elementosOcultos.forEach(el => scrollObserver.observe(el));

    /* -----------------------------------------
       4. INTERRUPTOR DE SEDES (HORARIOS)
       ----------------------------------------- */
    const btnYrigoyen = document.getElementById('btn-yrigoyen');
    const btnPanama = document.getElementById('btn-panama');
    const tbodyYrigoyen = document.getElementById('tbody-yrigoyen');
    const tbodyPanama = document.getElementById('tbody-panama');

    if (btnYrigoyen && btnPanama && tbodyYrigoyen && tbodyPanama) {
        btnYrigoyen.addEventListener('click', () => {
            btnYrigoyen.classList.add('activo');
            btnPanama.classList.remove('activo');
            tbodyYrigoyen.style.display = 'table-row-group';
            tbodyPanama.style.display = 'none';
        });

        btnPanama.addEventListener('click', () => {
            btnPanama.classList.add('activo');
            btnYrigoyen.classList.remove('activo');
            tbodyPanama.style.display = 'table-row-group';
            tbodyYrigoyen.style.display = 'none';
        });
    }

    /* -----------------------------------------
       5. MODALES DE DETALLE DE CLASE
       ----------------------------------------- */
    const clases = document.querySelectorAll('.actividad');
    const modalClase = document.getElementById('modal-clase');
    const btnCerrarClase = document.getElementById('btn-cerrar-clase');

    if (clases.length > 0 && modalClase) {
        clases.forEach(clase => {
            clase.addEventListener('click', () => {
                // Leer data attributes inyectados en HTML
                const nombre = clase.textContent.trim();
                const profe = clase.getAttribute('data-profe') || 'Staff Mostacho';
                const intensidad = clase.getAttribute('data-intensidad') || 'Adaptable';

                // Inyectar al modal
                document.getElementById('clase-titulo').textContent = nombre;
                document.getElementById('clase-profe').textContent = profe;
                document.getElementById('clase-intensidad').textContent = intensidad;

                modalClase.classList.add('activo');
            });
        });

        btnCerrarClase.addEventListener('click', () => modalClase.classList.remove('activo'));
        modalClase.addEventListener('click', (e) => { if (e.target === modalClase) modalClase.classList.remove('activo'); });
    }

});