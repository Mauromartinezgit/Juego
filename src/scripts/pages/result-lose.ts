import { PageController } from '../types';
import { state } from '../state';
import { Button } from '../components/Button';

export class LosePage implements PageController {
  async render(): Promise<void> {
    const gameState = state.getState();

    const app = document.getElementById('app');
    if (!app) return;

    // Set HTML content directly
    app.innerHTML = `
<div class="result-page lose-page">
  <div class="result-header">
    <h2 class="result-header-title">Resultado</h2>
  </div>

  <div class="result-container">
    <div class="result-star">
      <div class="star-shape"></div>
      <div class="result-star-text">Perdiste</div>
    </div>

    <div class="score-card">
      <h2 class="score-card-title">Score</h2>
      <div class="score-display">
        <div class="score-row">
          <span class="score-label">Vos:</span>
          <span class="score-number" id="final-player-score-lose">3</span>
        </div>
        <div class="score-row">
          <span class="score-label">Máquina:</span>
          <span class="score-number" id="final-computer-score-lose">5</span>
        </div>
      </div>
    </div>

    <div class="result-actions">
      <button class="btn btn-primary" data-page="instructions" id="play-again-lose">Volver a Jugar</button>
    </div>
  </div>
</div>
    `;

    // Update scores
    this.displayFinalScore(gameState.playerScore, gameState.computerScore);

    // Configurar botones
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
    // Botón de jugar de nuevo
    const playAgainBtn = document.getElementById('play-again-lose');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        state.resetScore();
      });
    }

    // Configurar botones de navegación
    Button.setupNavigationButtons();
  }
}
