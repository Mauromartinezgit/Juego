import { PageController } from '../types';
import { state } from '../state';
import { router } from '../router';

export class InstructionsSoloPage implements PageController {
  async render(): Promise<void> {
    state.resetScore();

    const app = document.getElementById('app');
    if (!app) return;

    const currentState = state.getState();
    const playerMatches = currentState.playerMatchesWon;
    const opponentMatches = currentState.opponentMatchesWon;

    app.innerHTML = `
<div class="page-instructions">
    <div class="container">
        <div class="container-title">
            <h1 class="title">Presioná jugar<br>y elegí: piedra,<br>papel o tijera<br>antes de que pasen<br>los 3 segundos.</h1>
            <p class="matches-counter" style="font-size: 24px; color: #009048; margin-top: 20px;">Partidas: ${playerMatches} - ${opponentMatches}</p>
        </div>
        <div class="container-button">
            <button class="button" id="play-btn">¡Jugar!</button>
        </div>
        <div class="container-hands">
            <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera">
            <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra">
            <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel">
        </div>
    </div>
</div>
    `;

    app.querySelector('#play-btn')?.addEventListener('click', () => {
      state.setSoloMode(true);
      void router.navigate('game-playing3');
    });
  }
}