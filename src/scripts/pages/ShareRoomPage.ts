import { PageController } from '../types';
import { state } from '../state';
import { router } from '../router';

export class ShareRoomPage implements PageController {
    async render(): Promise<void> {
        const app = document.getElementById('app');
        if (!app) return;

        const currentState = state.getState();
        const playerName = currentState.playerName || 'Jugador 1';

        // ✅ CREAR SALA EN EL BACKEND (en lugar de generar código local)
        let roomCode = '';
        try {
            const result = await state.createRoom(playerName);
            roomCode = result.roomId;
            state.setRoomCode(roomCode);
        } catch (error) {
            console.error('Error al crear la sala:', error);
            roomCode = 'ERROR';
        }

        app.innerHTML = `
<div class="share-room-page">
    <div class="scoreboard-multiplayer">
        <div class="score-item">
            <span class="player-name">${playerName}:</span>
            <span class="score-value">0</span>
        </div>
        <div class="room-code">
            <span class="room-label">Sala</span>
            <span class="room-value" id="room-code-display">${roomCode}</span>
        </div>
        <div class="score-item">
            <span class="player-name">Contrincante:</span>
            <span class="score-value">0</span>
        </div>
    </div>

    <div class="share-message-container">
        <h2 class="share-title">Compartí el código:</h2>
        <div class="code-display">
            <span class="code-value" id="room-code-share">${roomCode}</span>
        </div>
        <p class="share-subtitle">Con tu contrincante</p>
        <button class="button" id="continue-btn" style="margin-top: 2rem; width: 100%; max-width: 322px;">Continuar</button>
    </div>

    <div class="hand-icons-container">
        <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="hand-icon" alt="tijera">
        <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="hand-icon" alt="piedra">
        <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="hand-icon" alt="papel">
    </div>
</div>
        `;

        app.querySelector('#continue-btn')?.addEventListener('click', () => {
            void router.navigate('multiplayer-instructions');
        });

        console.log('Sala creada en el backend:', roomCode);
    }

    // ❌ Ya no necesitas este método
    // private generateRoomCode(): string { ... }
}