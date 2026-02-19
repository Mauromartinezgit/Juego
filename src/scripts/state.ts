/**
 * STATE - ESTADO GLOBAL DEL JUEGO
 * Este archivo maneja toda la información del juego (puntos, elecciones, etc.)
 */

import { GameState, Choice, RoundResult, Page } from './types';

// Configuración del backend
const API_URL = 'https://juego-backend-5uex.onrender.com';

/**
 * Clase State
 * Almacena y gestiona el estado global del juego
 */
class State {
  /**
   * Estado inicial del juego
   * Contiene toda la información necesaria para el funcionamiento del juego
   */
  private state: GameState = {
    playerScore: 0,
    computerScore: 0,
    currentPage: 'welcome',
    playerChoice: null,
    computerChoice: null,
    roundResult: null,
    maxScore: 5,
    players: [],
    playerMatchesWon: 0,
    opponentMatchesWon: 0,
    isSoloMode: false,
  };

  /**
   * Lista de funciones que se ejecutan cuando el estado cambia
   */
  private listeners: Array<(state: GameState) => void> = [];

  getState(): GameState {
    return { ...this.state };
  }

  setState(newState: Partial<GameState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  resetScore(): void {
    this.setState({
      playerScore: 0,
      computerScore: 0,
      playerChoice: null,
      computerChoice: null,
      roundResult: null
    });
  }

  incrementPlayerScore(): void {
    this.setState({
      playerScore: this.state.playerScore + 1
    });
  }

  incrementComputerScore(): void {
    this.setState({
      computerScore: this.state.computerScore + 1
    });
  }

  setRoundChoices(playerChoice: Choice, computerChoice: Choice): void {
    this.setState({
      playerChoice,
      computerChoice
    });
  }

  setRoundResult(result: RoundResult): void {
    this.setState({
      roundResult: result
    });
  }

  setPage(page: Page): void {
    this.setState({
      currentPage: page
    });
  }

  setPlayerName(name: string): void {
    this.setState({ playerName: name });
  }

  setRoomCode(code: string): void {
    this.setState({ roomCode: code });
  }

  setIsHost(isHost: boolean): void {
    this.setState({ isHost });
  }

  setOpponentName(name: string): void {
    this.setState({ opponentName: name });
  }
  setSoloMode(isSolo: boolean): void {
  this.setState({ isSoloMode: isSolo });
}

  checkWinner(): 'player' | 'computer' | null {
    if (this.state.playerScore >= this.state.maxScore) {
      return 'player';
    }
    if (this.state.computerScore >= this.state.maxScore) {
      return 'computer';
    }
    return null;
  }

  /**
   * Incrementar partidas ganadas del jugador
   */
  incrementPlayerMatches(): void {
    this.setState({
      playerMatchesWon: this.state.playerMatchesWon + 1
    });
  }

  /**
   * Incrementar partidas ganadas del oponente
   */
  incrementOpponentMatches(): void {
    this.setState({
      opponentMatchesWon: this.state.opponentMatchesWon + 1
    });
  }

  /**
   * Resetear contadores de partidas
   */
  resetMatches(): void {
    this.setState({
      playerMatchesWon: 0,
      opponentMatchesWon: 0
    });
  }

  /**
   * Verificar si alguien ganó el mejor de 3
   */
  checkMatchWinner(): 'player' | 'opponent' | null {
    if (this.state.playerMatchesWon >= 2) {
      return 'player';
    }
    if (this.state.opponentMatchesWon >= 2) {
      return 'opponent';
    }
    return null;
  }

  // ==========================================
  // MÉTODOS PARA CONECTAR CON EL BACKEND
  // ==========================================

  async createRoom(playerName: string): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName }),
      });

      const data = await response.json();

      this.setPlayerName(playerName);
      this.setRoomCode(data.roomId);
      this.setState({ playerId: data.playerId });
      this.setIsHost(true);

      return data.roomId;
    } catch (error) {
      console.error('Error al crear la sala:', error);
      throw error;
    }
  }

  async joinRoom(roomCode: string, playerName: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/rooms/${roomCode}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName }),
      });

      const data = await response.json();

      this.setPlayerName(playerName);
      this.setRoomCode(roomCode);
      this.setState({ playerId: data.playerId });
      this.setIsHost(false);
    } catch (error) {
      console.error('Error al unirse a la sala:', error);
      throw error;
    }
  }

  async sendPlay(choice: Choice): Promise<void> {
    try {
      const { roomCode, playerName } = this.state;

      await fetch(`${API_URL}/rooms/${roomCode}/play`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          play: choice
        }),
      });
    } catch (error) {
      console.error('Error al enviar la jugada:', error);
      throw error;
    }
  }

  async getRoomState(): Promise<any> {
    try {
      const { roomCode } = this.state;

      const response = await fetch(`${API_URL}/rooms/${roomCode}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error al obtener el estado de la sala:', error);
      throw error;
    }
  }

  async get(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error('Error en GET:', error);
      throw error;
    }
  }

  async post(endpoint: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error en POST:', error);
      throw error;
    }
  }

  /**
   * Marcar jugador como listo para jugar
   */
  async setPlayerReady(roomCode: string, playerId: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/rooms/${roomCode}/ready`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerId }),
      });

      if (!response.ok) {
        throw new Error('Error al marcar como listo');
      }

      const data = await response.json();
      console.log('✅ Jugador marcado como listo:', data);
    } catch (error) {
      console.error('Error al marcar jugador como listo:', error);
      throw error;
    }
  }
}

// Exportar una instancia única del estado para usar en toda la aplicación
export const state = new State();

// Exportar la constante API_URL para que pueda ser utilizada en otros archivos
export { API_URL };