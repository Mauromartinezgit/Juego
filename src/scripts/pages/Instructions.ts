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
        <div class="container-button" style="display: flex; flex-direction: column;">
            <input class="input-code" type="text" placeholder="código" id="room-code-input">
            <button class="button" id="join-btn">Ingresar a la sala</button>
        </div>
        <div class="container-hands">
            <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera">
            <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra">
            <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel">
        </div>
    </div>
</div>
    `;

    const joinBtn = app.querySelector('#join-btn');
    const codeInput = app.querySelector('#room-code-input') as HTMLInputElement;

    joinBtn?.addEventListener('click', () => {
      const code = codeInput.value.trim();
      if (!code) {
        alert('Por favor ingresa un código de sala');
        return;
      }

      state.setRoomCode(code);
      console.debug('Uniendo a sala:', code);
      void router.navigate('multiplayer-instructions');
    });

    Button.setupNavigationButtons();
  }
}
