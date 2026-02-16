import { PageController } from '../types';
import { state } from '../state';
import { router } from '../router';

export class JoinRoomPage implements PageController {
    async render(): Promise<void> {
        const app = document.getElementById('app');
        if (!app) return;

        const currentState = state.getState();
        const playerName = currentState.playerName || '';

        app.innerHTML = `
<div class="page-instructions">
    <div class="container">
        <div class="container-title" style="padding-top: 60px;">
            <h1 class="title" style="color: #009048; font-size: 52px;">Unirse a<br>Sala</h1>
        </div>
        <div class="container-button" style="display: flex; flex-direction: column; padding-top: 20px;">
            <label class="label-input">Código de Sala</label>
            <input class="input-code" type="text" placeholder="Ej: B7PL29" id="room-code-input" maxlength="6" style="text-transform: uppercase;">
            
            <p class="error-message" id="error-message" style="display: none; color: red; margin-top: 10px;"></p>
            
            <button class="button" id="join-btn">Unirse</button>
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
        const roomCodeInput = app.querySelector('#room-code-input') as HTMLInputElement;
        const errorMessage = app.querySelector('#error-message') as HTMLElement;

        joinBtn?.addEventListener('click', async () => {
            const roomCode = roomCodeInput.value.trim().toUpperCase();

            if (!roomCode || roomCode.length !== 6) {
                errorMessage.textContent = 'Ingresa un código de 6 caracteres';
                errorMessage.style.display = 'block';
                return;
            }

            try {
                errorMessage.style.display = 'none';
                (joinBtn as HTMLButtonElement).textContent = 'Uniéndose...';
                (joinBtn as HTMLButtonElement).disabled = true;

                await state.joinRoom(roomCode, playerName);

                console.log('✅ playerId guardado:', state.getState().playerId);

                void router.navigate('multiplayer-instructions'); 
            } catch (error) {
                console.error('Error al unirse:', error);
                errorMessage.textContent = 'No se pudo unir a la sala. Verifica el código.';
                errorMessage.style.display = 'block';
                (joinBtn as HTMLButtonElement).textContent = 'Unirse';
                (joinBtn as HTMLButtonElement).disabled = false;
            }
        });

        console.log('Página para unirse a sala cargada');
    }
}