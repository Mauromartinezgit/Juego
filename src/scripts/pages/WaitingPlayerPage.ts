import { PageController } from '../types';
import { router } from '../router';
import { state } from '../state';

export class WaitingPlayerPage implements PageController {
    private checkInterval: number | null = null;
    private timeoutId: any = null;

    async render(): Promise<void> {
        const app = document.getElementById('app');
        if (!app) return;

        const currentState = state.getState();
        const playerName = currentState.playerName || 'Jugador 1';
        const opponentName = currentState.opponentName || 'Paula';
        const roomCode = currentState.roomCode || '---';

        app.innerHTML = `
<div class="waiting-player-page">
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

    <div class="waiting-content">
        <p class="waiting-text">
            Esperando a que<br>
            <span class="player-name-highlight">${opponentName}</span> presione<br>
            ¡Jugar!...
        </p>

        <div class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    </div>

    <div class="hand-icons-container">
        <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="hand-icon" alt="tijera">
        <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="hand-icon" alt="piedra">
        <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="hand-icon" alt="papel">
    </div>
</div>
        `;

        console.log('Esperando a que el otro jugador presione jugar...');

        // Simular espera (en producción, esto sería una conexión WebSocket/Firebase)
        this.startWaitingSimulation();
    }

    private startWaitingSimulation(): void {
        // Simular que después de 3 segundos el otro jugador presiona jugar
        this.timeoutId = setTimeout(() => {
            console.log('El otro jugador está listo!');
            // Navegar a la pantalla de juego
            void router.navigate('game-playing3');
        }, 3000);
    }

    destroy(): void {
        // Limpiar el timeout si existe
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}