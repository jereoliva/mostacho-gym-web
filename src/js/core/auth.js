document.addEventListener('DOMContentLoaded', () => {
    
    // Capturamos los elementos del DOM de la página de Login
    const loginForm = document.getElementById('admin-login-form');
    const loginError = document.getElementById('login-error');

    // Credenciales maestras temporales para el prototipo (Hardcoded)
    const CREDENCIALES_PROTOTIPO = {
        email: 'admin@mostachogym.com',
        password: 'forja'
    };

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue al enviar el formulario

            const emailIngresado = document.getElementById('email').value;
            const passwordIngresada = document.getElementById('password').value;

            // Verificación de seguridad
            if (emailIngresado === CREDENCIALES_PROTOTIPO.email && passwordIngresada === CREDENCIALES_PROTOTIPO.password) {
                
                // Si es correcto, escondemos errores pasados
                loginError.classList.add('oculto');
                
                // Guardamos la "llave" en la memoria de sesión del navegador
                // sessionStorage se borra automáticamente cuando cierras la pestaña
                sessionStorage.setItem('mostacho_token_acceso', 'autorizado');
                
                // Redirigimos al Cuartel General
                window.location.href = 'admin.html';
                
            } else {
                // Si es incorrecto, mostramos la alerta roja industrial
                loginError.classList.remove('oculto');
                
                // Animación de sacudida (Shake) para dar feedback visual de error
                loginForm.style.transform = 'translateX(-10px)';
                setTimeout(() => loginForm.style.transform = 'translateX(10px)', 50);
                setTimeout(() => loginForm.style.transform = 'translateX(-10px)', 100);
                setTimeout(() => loginForm.style.transform = 'translateX(0)', 150);
            }
        });
    }

});

/* =========================================
   SISTEMA DE LOGOUT (Cierre de Sesión)
   ========================================= */
function cerrarSesion() {
    // Destruimos la llave de seguridad
    sessionStorage.removeItem('mostacho_token_acceso');
    // Expulsamos al usuario a la página pública
    window.location.href = 'index.html';
}