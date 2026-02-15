import { PageController } from '../types';
import { router } from '../router';
import { state } from '../state';
import { API_URL } from "../state";

export class WaitingPlayerPage implements PageController {
    private checkInterval: number | null = null;
    private timeoutId: any = null;
    private pollingIntervalId: ReturnType<typeof setInterval> | null = null;

    async render(): Promise<void> {
        const app = document.getElementById('app');
        if (!app) return;

        const currentState = state.getState();
        const playerName = currentState.playerName || 'Jugador 1';
        const opponentName = currentState.opponentName || 'Esperando al oponente...';
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
        this.startWaitingSimulation();
    }

    private startWaitingSimulation(): void {
        this.pollRoomStatus();
    }

    private pollRoomStatus(): void {
        const { roomCode } = state.getState();

        this.pollingIntervalId = setInterval(async () => {
            try {
                const response = await fetch(`${API_URL}/rooms/${roomCode}/status`);
                const data = await response.json();

                console.log('📊 Estado de la sala:', data);

                const players = data.players;

                if (Array.isArray(players) && players.length === 2 && data.isReady) {
                    console.log('✅ Ambos jugadores están listos!');
                    
                    if (this.pollingIntervalId) {
                        clearInterval(this.pollingIntervalId);
                        this.pollingIntervalId = null;
                    }

                    const currentState = state.getState();
                    const opponentName = players.find((player: any) => player.name !== currentState.playerName)?.name;
                    
                    if (opponentName) {
                        state.setOpponentName(opponentName);
                    }

                    void router.navigate('game-playing3');
                } else {
                    console.log('👥 Jugadores en sala:', players.length);
                    
                    const app = document.getElementById('app');
                    if (app && Array.isArray(players)) {
                        const currentState = state.getState();
                        const opponentName = players.find((player: any) => player.name !== currentState.playerName)?.name || 'Esperando al oponente...';
                        
                        console.log('Oponente detectado:', opponentName);
                        
                        const nameElement = app.querySelector('.player-name-highlight');
                        if (nameElement) {
                            nameElement.textContent = opponentName;
                        }
                        
                        const scoreItems = app.querySelectorAll('.score-item .player-name');
                        if (scoreItems.length >= 2) {
                            scoreItems[1].textContent = opponentName + ':';
                        }
                    }
                }
            } catch (error) {
                console.error('Error al verificar el estado de la sala:', error);
            }
        }, 3000);
    }

    destroy(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        if (this.pollingIntervalId) {
            clearInterval(this.pollingIntervalId);
            this.pollingIntervalId = null;
        }
    }

    connectedCallback(): void {
        this.pollRoomStatus();
    }
}