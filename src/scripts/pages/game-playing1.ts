import { PageController, Choice } from '../types';
import { router } from '../router';
import { state } from '../state';
import { ChoiceButton } from '../components/ChoiceButton';

export class GamePlayingPage1 implements PageController {
  private hasSelected: boolean = false;

  async render(): Promise<void> {
    const app = document.getElementById('app');
    if (!app) return;

    // Cargar el HTML
    app.innerHTML = `
<div class="game-playing-page">
  <div class="container">
    <div class="countdown-display">
      <h1 class="countdown-number">1</h1>
    </div>
    
    <div class="container-hands">
      <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera" data-choice="tijera">
      <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra" data-choice="piedra">
      <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel" data-choice="papel">
    </div>
  </div>
</div>
    `;

    this.setupChoiceButtons();

    // Después de 1 segundo, si no eligió, elegir automáticamente
    setTimeout(() => {
      if (!this.hasSelected) {
        console.log('⏰ Tiempo agotado! Eligiendo automáticamente...');
        const randomChoice = ChoiceButton.getComputerChoice();
        this.handleChoice(randomChoice);
      }
    }, 1000);
  }

  private setupChoiceButtons(): void {
    const images = document.querySelectorAll<HTMLImageElement>('[data-choice]');

    images.forEach(img => {
      img.addEventListener('click', () => {
        if (this.hasSelected) return;

        const choice = img.getAttribute('data-choice') as Choice;
        if (choice) {
          this.hasSelected = true;
          this.handleChoice(choice);
        }
      });
    });
  }

  private handleChoice(playerChoice: Choice): void {
    const computerChoice = ChoiceButton.getComputerChoice();
    const result = ChoiceButton.determineWinner(playerChoice, computerChoice);

    state.setRoundChoices(playerChoice, computerChoice);
    state.setRoundResult(result);

    if (result === 'win') {
      state.incrementPlayerScore();
    } else if (result === 'lose') {
      state.incrementComputerScore();
    }

    router.navigate('game-round-result');
  }
}