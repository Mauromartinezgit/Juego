/**
 * WELCOME PAGE - PÁGINA DE BIENVENIDA
 * Primera página que ve el usuario al abrir el juego
 */

import { PageController } from '../types';
import { Button } from '../components/Button';
import { state } from '../state';

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
     */
    app.innerHTML = `
<div class="page-welcome">
    <div class="container page-welcome">
        <div class="container-title">
        <h1 class="title">Piedra,<br>Papel o <br>Tijera</h1>
        </div>
        <div class="container-button">
        <button class="button" data-page="empezar" id="new-game">Nuevo Juego</button>
        </div>
        <div class="container-button">
        <button class="button" data-page="empezar" id="join-room">Ingresar a una sala</button>
        </div>
        <div class="container-hands">
            <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera">
            <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra">
            <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel">
        </div>
    </div>
</div>
    `;

    // Configurar el estado según el botón presionado
    app.querySelector('#new-game')?.addEventListener('click', () => {
      state.setIsHost(true);
    });

    app.querySelector('#join-room')?.addEventListener('click', () => {
      state.setIsHost(false);
    });

    // Configurar los botones de navegación
    Button.setupNavigationButtons();
  }
}
