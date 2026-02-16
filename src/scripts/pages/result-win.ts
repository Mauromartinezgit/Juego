import { PageController } from '../types';
import { state } from '../state';
import { Button } from '../components/Button';
import { router } from '../router';

export class WinPage implements PageController {
  async render(): Promise<void> {
    const gameState = state.getState();
    const playerName = gameState.playerName || 'Jugador';
    const opponentName = gameState.opponentName || 'Oponente';

    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
<div class="result-page win-page">
  <div class="result-header">
    <h2 class="result-header-title">Resultado</h2>
  </div>

  <div class="result-container">
    <div class="result-star">
      <div class="star-shape"></div>
      <div class="result-star-text">¡${playerName} Ganó!</div>
    </div>

    <div class="score-card">
      <h2 class="score-card-title">Score</h2>
      <div class="score-display">
        <div class="score-row">
          <span class="score-label">${playerName}:</span>
          <span class="score-number" id="final-player-score">5</span>
        </div>
        <div class="score-row">
          <span class="score-label">${opponentName}:</span>
          <span class="score-number" id="final-computer-score">3</span>
        </div>
      </div>
    </div>

    <div class="result-actions">
      <button class="btn btn-primary" data-page="instructions" id="play-again-win">Volver a Jugar</button>
    </div>
  </div>
</div>
    `;

    this.displayFinalScore(gameState.playerScore, gameState.computerScore);
    this.setupButtons();
  }

  private displayFinalScore(playerScore: number, computerScore: number): void {
    const playerScoreEl = document.getElementById('final-player-score');
    const computerScoreEl = document.getElementById('final-computer-score');

    if (playerScoreEl) {
      playerScoreEl.textContent = playerScore.toString();
    }

    if (computerScoreEl) {
      computerScoreEl.textContent = computerScore.toString();
    }
  }

private setupButtons(): void {
    const playAgainBtn = document.getElementById('play-again-win');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        state.resetScore();
        void router.navigate('welcome');
      });
    }

    
  }
}