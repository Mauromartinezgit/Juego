import { PageController } from '../types';
import { Button } from '../components/Button';
import { state } from '../state';
import { router } from '../router';

export class InstructionsPage implements PageController {
  async render(): Promise<void> {
    console.debug('Instructions.render called');
    state.resetScore();

    const app = document.getElementById('app');
    if (!app) return;

    // Set HTML content directly
    app.innerHTML = `
<div class="page-instructions">
    <div class="container">
        <div class="container-title">
        <h1 class="title">Presioná jugar <br>
y elegí: piedra,<br> papel o tijera  <br>antes de que pasen los 3 segundos.</h1>
        </div>
        <div class="container-button">
        <button class="button" data-page="game-playing3">¡Jugar!</button>
        </div>
        <div class="container-hands">
            <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera">
            <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra">
            <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel">
        </div>
    </div>
</div>
    `;

    Button.setupNavigationButtons();

    // Fallback: attach a direct click listener to the specific play button
    const playBtn = document.querySelector('.page-instructions [data-page="game-playing3"]') as HTMLElement | null;
    console.debug('Instructions: playBtn found?', !!playBtn, playBtn);
    if (playBtn) {
      if (!(playBtn as any).__play_fallback_attached) {
        (playBtn as any).__play_fallback_attached = true;
        console.debug('Instructions: attaching fallback listener to playBtn');
        playBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          console.debug('[Fallback] play button clicked - navigating to game-playing3');
          void router.navigate('game-playing3');
        });
      }
    }
  }
}
