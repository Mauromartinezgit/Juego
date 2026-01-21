/**
 * WELCOME PAGE - PÁGINA DE BIENVENIDA
 * Primera página que ve el usuario al abrir el juego
 */

import { PageController } from '../types';
import { Button } from '../components/Button';

/**
 * Clase WelcomePage
 * Controlador de la página de bienvenida
 */
export class WelcomePage implements PageController {
  /**
   * Renderizar la página de bienvenida
   * Este método se ejecuta cuando el usuario llega a esta página
   */
  async render(): Promise<void> {
    // Obtener el elemento contenedor principal de la aplicación
    const app = document.getElementById('app');
    if (!app) return; // Si no existe, salir

    /**
     * Establecer el contenido HTML de la página
     * Incluye:
     * - Título del juego
     * - Botón "Empezar" que navega a las instrucciones
     * - Imágenes decorativas de las manos (piedra, papel, tijera)
     */
    app.innerHTML = `
<div class="page-welcome">
    <div class="container page-welcome">
        <div class="container-title">
        <h1 class="title">Piedra,<br>Papel o <br>Tijera</h1>
        </div>
        <div class="container-button">
        <button class="button" data-page="instructions">Empezar</button>
        </div>
        <div class="container-hands">
            <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera">
            <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra">
            <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel">
        </div>
    </div>
</div>
    `;

    // Mensaje de confirmación en consola
    console.log('✅ WelcomePage rendered');

    // Configurar los botones de navegación (el botón "Empezar")
    Button.setupNavigationButtons();
  }
}
