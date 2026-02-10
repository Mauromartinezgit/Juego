import { PageController } from '../types';
import { Button } from '../components/Button';
import { state } from '../state';
import { router } from '../router';

export class MultiplayerInstructionsPage implements PageController {
    async render(): Promise<void> {
        const app = document.getElementById('app');
        if (!app) return;

        const currentState = state.getState();
        const playerName = currentState.playerName || 'Jugador 1';
        const opponentName = currentState.opponentName || 'Contrincante';
        const roomCode = currentState.roomCode || '---';

        app.innerHTML = `
<div class="multiplayer-instructions-page">
    <div class="scoreboard-multiplayer">
        <div class="score-item">
            <span class="player-name">${playerName}:</span>
            <span class="score-value">0</span>
        </div>
        <div class="room-code">
            <span class="room-label">Sala</span>
            <span class="room-value">${roomCode}</span>
        </div>
        <div class="score-item">
            <span class="player-name">${opponentName}:</span>
            <span class="score-value">0</span>
        </div>
    </div>

    <div class="instructions-content">
        <p class="instructions-text">
            Presioná jugar<br>
            y elegí: piedra,<br>
            papel o tijera<br>
            antes de que pasen<br>
            los 3 segundos.
        </p>

        <button class="button-play" id="multi-play-btn">¡Jugar!</button>
    </div>

    <div class="hand-icons-container">
        <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="hand-icon" alt="tijera">
        <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="hand-icon" alt="piedra">
        <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="hand-icon" alt="papel">
    </div>
</div>
        `;

        app.querySelector('#multi-play-btn')?.addEventListener('click', () => {
            void router.navigate('waiting-player');
        });

        // Configurar botón de jugar
        Button.setupNavigationButtons();

        console.log('Mostrando instrucciones multijugador');
    }
}