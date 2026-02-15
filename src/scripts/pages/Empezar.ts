import { PageController } from '../types';
import { Button } from '../components/Button';
import { state } from '../state';
import { router } from '../router';

export class EmpezarPage implements PageController {
    async render(): Promise<void> {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
<div class="page-instructions">
    <div class="container">
        <div class="container-title" style="padding-top: 60px;">
            <h1 class="title" style="color: #009048; font-size: 52px;">Piedra,<br>Papel o <br>Tijera</h1>
        </div>
        <div class="container-button" style="display: flex; flex-direction: column; padding-top: 20px;">
            <label class="label-input">Tu Nombre</label>
            <input class="input-code" type="text" placeholder="nombre" id="player-name-input">
            <button class="button" id="start-btn">Empezar</button>
        </div>
        <div class="container-hands">
            <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera">
            <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra">
            <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel">
        </div>
    </div>
</div>
    `;

        const startBtn = app.querySelector('#start-btn');
        const nameInput = app.querySelector('#player-name-input') as HTMLInputElement;

        startBtn?.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (!name) {
                alert('Por favor ingresa tu nombre');
                return;
            }

            state.setPlayerName(name);

            const currentState = state.getState();
            if (currentState.isHost) {
                void router.navigate('share-room');
            } else {
                void router.navigate('join-room');
            }
        });

        Button.setupNavigationButtons();
    }
}