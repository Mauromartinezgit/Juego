/**
 * GAME FINISH PAGE - PÁGINA DE RESULTADO DE RONDA
 * Muestra el resultado de cada ronda (ganaste, perdiste o empate)
 * y las elecciones del jugador y la computadora
 */

import { PageController } from '../types';
import { state } from '../state';
import { router } from '../router';

/**
 * Clase GameRoundResultPage
 * Controlador de la página que muestra el resultado de cada ronda
 */
export class GameRoundResultPage implements PageController {
  /**
   * Renderizar la página de resultado de ronda
   */
  async render(): Promise<void> {
    // Obtener el estado actual del juego
    const gameState = state.getState();

    // Obtener el elemento contenedor principal
    const app = document.getElementById('app');
    if (!app) return;

    /**
     * Establecer el contenido HTML
     * Incluye:
     * - Imagen de resultado (ganaste/perdiste/empate)
     * - Dos imágenes: elección del jugador y elección de la computadora
     * - Botón "Siguiente" para continuar
     */
    app.innerHTML = `
<div class="page-game-finish">
    <div class="container-img2">
        <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img2" id="player-choice-img">
        <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img2" id="computer-choice-img">
    </div>
    <div class="container-button">
        <button class="button" id="next-round-btn">Siguiente</button>
    </div>
</div>
    `;

    // Mostrar el resultado de la ronda (ganaste, perdiste o empate)
    this.displayResult(gameState.roundResult!);

    // Actualizar las imágenes con las elecciones reales
    this.updateImages(gameState.playerChoice!, gameState.computerChoice!);

    // Configurar el botón "Siguiente"
    this.setupNextButton();
  }

  /**
   * Mostrar el resultado de la ronda
   * @param result - Resultado de la ronda ('win', 'lose' o 'draw')
   */
  private displayResult(result: string): void {
    // Obtener el elemento de la imagen de resultado
    const messageEl = document.getElementById('round-result-text');

    if (messageEl) {
      // Mensajes según el resultado
      const messages: Record<string, string> = {
        win: '¡GANASTE!',
        lose: 'PERDISTE',
        draw: '¡EMPATE!'
      };

      // Establecer el texto alternativo de la imagen
      // (Puedes cambiar esto para mostrar diferentes imágenes según el resultado)
      messageEl.setAttribute('alt', messages[result] || '');
    }
  }

  /**
   * Actualizar las imágenes de las elecciones
   * @param playerChoice - Elección del jugador (piedra, papel o tijera)
   * @param computerChoice - Elección de la computadora (piedra, papel o tijera)
   */
  private updateImages(playerChoice: string, computerChoice: string): void {
    // Obtener los elementos de imagen
    const playerImg = document.getElementById('player-choice-img') as HTMLImageElement;
    const computerImg = document.getElementById('computer-choice-img') as HTMLImageElement;

    // URLs de las imágenes para cada elección
    const imageUrls: Record<string, string> = {
      piedra: 'https://i.postimg.cc/bwd8tt65/piedra.png',
      papel: 'https://i.postimg.cc/nzGN5FRm/papel.png',
      tijera: 'https://i.postimg.cc/RVBNKXfK/tijera.png'
    };

    // Actualizar la imagen del jugador
    if (playerImg) {
      playerImg.src = imageUrls[playerChoice];
    }

    // Actualizar la imagen de la computadora
    if (computerImg) {
      computerImg.src = imageUrls[computerChoice];
    }
  }

  /**
   * Configurar el botón "Siguiente"
   * Determina a qué página navegar según el estado del juego
   */
  private setupNextButton(): void {
    const nextBtn = document.getElementById('next-round-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        // Verificar si alguien ganó el juego completo
        const winner = state.checkWinner();

        if (winner === 'player') {
          // Si el jugador llegó a 5 puntos, ir a la página de victoria
          router.navigate('win');
        } else if (winner === 'computer') {
          // Si la computadora llegó a 5 puntos, ir a la página de derrota
          router.navigate('lose');
        } else {
          // Si nadie llegó a 5 puntos, continuar jugando
          router.navigate('game-playing3');
        }
      });
    }
  }
}
