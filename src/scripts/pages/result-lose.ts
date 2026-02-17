import { PageController } from '../types';
import { state } from '../state';
import { router } from '../router';

export class LosePage implements PageController {
  async render(): Promise<void> {
    const gameState = state.getState();
    const playerName = gameState.playerName || 'Jugador';
    const opponentName = gameState.opponentName || 'Oponente';
    const playerMatches = gameState.playerMatchesWon;
    const opponentMatches = gameState.opponentMatchesWon;

    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
<div class="result-page lose-page">
  <div class="result-header">
    <h2 class="result-header-title">Resultado Final</h2>
  </div>

  <div class="result-container">
    <div class="result-star">
      <div class="star-shape"></div>
      <div class="result-star-text">¡${opponentName} Ganó!</div>
    </div>

    <div class="score-card">
      <h2 class="score-card-title">Partidas</h2>
      <div class="score-display">
        <div class="score-row">
          <span class="score-label">${playerName}:</span>
          <span class="score-number">${playerMatches}</span>
        </div>
        <div class="score-row">
          <span class="score-label">${opponentName}:</span>
          <span class="score-number">${opponentMatches}</span>
        </div>
      </div>
    </div>

    <div class="result-actions">
      <button class="btn btn-primary" id="play-again-lose">Volver a Jugar</button>
    </div>
  </div>
</div>
    `;

    this.setupButtons();
  }

  private setupButtons(): void {
    const playAgainBtn = document.getElementById('play-again-lose');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        state.resetScore();
        state.resetMatches(); // ← Resetea el contador de partidas
        void router.navigate('welcome');
      });
    }
  }
}