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
    const gameState = state.getState();

    const app = document.getElementById('app');
    if (!app) return;

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

    this.displayResult(gameState.roundResult!);
    this.updateImages(gameState.playerChoice!, gameState.computerChoice!);
    this.setupNextButton();
  }

  private displayResult(result: string): void {
    const messageEl = document.getElementById('round-result-text');

    if (messageEl) {
      const messages: Record<string, string> = {
        win: '¡GANASTE!',
        lose: 'PERDISTE',
        draw: '¡EMPATE!'
      };

      messageEl.setAttribute('alt', messages[result] || '');
    }
  }

  private updateImages(playerChoice: string, computerChoice: string): void {
    const playerImg = document.getElementById('player-choice-img') as HTMLImageElement;
    const computerImg = document.getElementById('computer-choice-img') as HTMLImageElement;

    const imageUrls: Record<string, string> = {
      piedra: 'https://i.postimg.cc/bwd8tt65/piedra.png',
      papel: 'https://i.postimg.cc/nzGN5FRm/papel.png',
      tijera: 'https://i.postimg.cc/RVBNKXfK/tijera.png'
    };

    if (playerImg) {
      playerImg.src = imageUrls[playerChoice];
    }

    if (computerImg) {
      computerImg.src = imageUrls[computerChoice];
    }
  }

  private setupNextButton(): void {
    const nextBtn = document.getElementById('next-round-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const winner = state.checkWinner();

        if (winner === 'player') {
          // Jugador ganó esta partida
          state.incrementPlayerMatches();
          
          // Verificar si ganó el mejor de 3
          const matchWinner = state.checkMatchWinner();
          if (matchWinner === 'player') {
            // Ganó el mejor de 3, ir a victoria final
            router.navigate('win');
          } else {
            // Continuar con siguiente partida
            state.resetScore();
            router.navigate('multiplayer-instructions');
          }
        } else if (winner === 'computer') {
          // Oponente ganó esta partida
          state.incrementOpponentMatches();
          
          // Verificar si ganó el mejor de 3
          const matchWinner = state.checkMatchWinner();
          if (matchWinner === 'opponent') {
            // Ganó el mejor de 3, ir a derrota final
            router.navigate('lose');
          } else {
            // Continuar con siguiente partida
            state.resetScore();
            router.navigate('multiplayer-instructions');
          }
        } else {
          // Nadie llegó a 5 puntos, continuar jugando
          router.navigate('game-playing3');
        }
      });
    }
  }
}