/**
 * ARCHIVO PRINCIPAL DE LA APLICACIÓN
 * Este es el punto de entrada del juego de Piedra, Papel o Tijera
 */

// Importar el router que maneja la navegación entre páginas
import { router } from './router';

/**
 * Función de inicialización de la aplicación
 * Se ejecuta cuando la página está lista
 */
async function init() {
    // Mostrar mensaje en consola indicando que el juego está iniciando
    console.log('🎮 Inicializando Piedra, Papel o Tijera...');

    // Navegar a la página de bienvenida (primera página del juego)
    await router.navigate('welcome');
}

/**
 * Esperar a que el DOM (estructura HTML) esté completamente cargado
 * antes de inicializar la aplicación
 */
if (document.readyState === 'loading') {
    // Si la página aún está cargando, esperar al evento DOMContentLoaded
    document.addEventListener('DOMContentLoaded', init);
} else {
    // Si la página ya está cargada, inicializar inmediatamente
    init();
}