import { PageController } from '../types';
import { state } from '../state';
import { router } from '../router';

export class LosePage implements PageController {
  async render(): Promise<void> {
    const gameState = state.getState();
    const playerName = gameState.playerName || 'Jugador';
    const opponentName = gameState.opponentName || 'Oponente';

    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
<div class="result-page lose-page">
  <div class="result-header">
    <h2 class="result-header-title">Resultado</h2>
  </div>

  <div class="result-container">
    <div class="result-star">
      <div class="star-shape"></div>
      <div class="result-star-text">¡${opponentName} Ganó!</div>
    </div>

    <div class="score-card">
      <h2 class="score-card-title">Score</h2>
      <div class="score-display">
        <div class="score-row">
          <span class="score-label">${playerName}:</span>
          <span class="score-number" id="final-player-score-lose">3</span>
        </div>
        <div class="score-row">
          <span class="score-label">${opponentName}:</span>
          <span class="score-number" id="final-computer-score-lose">5</span>
        </div>
      </div>
    </div>

    <div class="result-actions">
      <button class="btn btn-primary" id="play-again-lose">Volver a Jugar</button>
    </div>
  </div>
</div>
    `;

    this.displayFinalScore(gameState.playerScore, gameState.computerScore);
    this.setupButtons();
  }

  private displayFinalScore(playerScore: number, computerScore: number): void {
    const playerScoreEl = document.getElementById('final-player-score-lose');
    const computerScoreEl = document.getElementById('final-computer-score-lose');

    if (playerScoreEl) {
      playerScoreEl.textContent = playerScore.toString();
    }

    if (computerScoreEl) {
      computerScoreEl.textContent = computerScore.toString();
    }
  }

  private setupButtons(): void {
    const playAgainBtn = document.getElementById('play-again-lose');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        state.resetScore();
        void router.navigate('welcome');
      });
    }
  }
}