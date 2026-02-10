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
    playerScore: 0,        // Puntos del jugador
    computerScore: 0,      // Puntos de la computadora
    currentPage: 'welcome', // Página actual
    playerChoice: null,    // Última elección del jugador (piedra, papel o tijera)
    computerChoice: null,  // Última elección de la computadora
    roundResult: null,     // Resultado de la última ronda (win, lose, draw)
    maxScore: 5,            // Puntos necesarios para ganar el juego
    players: [],           // Lista de jugadores en la sala
  };

  /**
   * Lista de funciones que se ejecutan cuando el estado cambia
   * Permite que otras partes del código reaccionen a cambios en el estado
   */
  private listeners: Array<(state: GameState) => void> = [];

  /**
   * Obtener una copia del estado actual
   * @returns Copia del estado del juego
   */
  getState(): GameState {
    return { ...this.state };
  }

  /**
   * Actualizar el estado del juego
   * @param newState - Objeto con las propiedades a actualizar
   */
  setState(newState: Partial<GameState>): void {
    // Combinar el estado actual con los nuevos valores
    this.state = { ...this.state, ...newState };
    // Notificar a todos los listeners que el estado cambió
    this.notifyListeners();
  }

  /**
   * Suscribirse a cambios en el estado
   * @param listener - Función que se ejecutará cuando el estado cambie
   * @returns Función para cancelar la suscripción
   */
  subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    // Retornar función para desuscribirse
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notificar a todos los listeners que el estado cambió
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  /**
   * Reiniciar los puntos y elecciones
   * Se usa cuando empieza un nuevo juego
   */
  resetScore(): void {
    this.setState({
      playerScore: 0,
      computerScore: 0,
      playerChoice: null,
      computerChoice: null,
      roundResult: null
    });
  }

  /**
   * Incrementar el puntaje del jugador en 1
   */
  incrementPlayerScore(): void {
    this.setState({
      playerScore: this.state.playerScore + 1
    });
  }

  /**
   * Incrementar el puntaje de la computadora en 1
   */
  incrementComputerScore(): void {
    this.setState({
      computerScore: this.state.computerScore + 1
    });
  }

  /**
   * Guardar las elecciones de la ronda actual
   * @param playerChoice - Lo que eligió el jugador
   * @param computerChoice - Lo que eligió la computadora
   */
  setRoundChoices(playerChoice: Choice, computerChoice: Choice): void {
    this.setState({
      playerChoice,
      computerChoice
    });
  }

  /**
   * Guardar el resultado de la ronda actual
   * @param result - Resultado (win, lose o draw)
   */
  setRoundResult(result: RoundResult): void {
    this.setState({
      roundResult: result
    });
  }

  /**
   * Actualizar la página actual
   * @param page - Nombre de la página
   */
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

  /**
   * Verificar si alguien ganó el juego
   * @returns 'player' si ganó el jugador, 'computer' si ganó la computadora, null si nadie ganó aún
   */
  checkWinner(): 'player' | 'computer' | null {
    // Si el jugador llegó a 5 puntos, ganó
    if (this.state.playerScore >= this.state.maxScore) {
      return 'player';
    }
    // Si la computadora llegó a 5 puntos, ganó
    if (this.state.computerScore >= this.state.maxScore) {
      return 'computer';
    }
    // Si nadie llegó a 5 puntos, el juego continúa
    return null;
  }

  // ==========================================
  // MÉTODOS PARA CONECTAR CON EL BACKEND
  // ==========================================

  /**
   * Crear una nueva sala de juego multijugador
   * @param playerName - Nombre del jugador que crea la sala
   * @returns Código de la sala creada
   */
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
      
      // Guardar información en el estado
      this.setPlayerName(playerName);
      this.setRoomCode(data.roomId);
      this.setIsHost(true);
      
      return data.roomId;
    } catch (error) {
      console.error('Error al crear la sala:', error);
      throw error;
    }
  }

  /**
   * Unirse a una sala existente
   * @param roomCode - Código de la sala
   * @param playerName - Nombre del jugador que se une
   */
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
      
      // Guardar información en el estado
      this.setPlayerName(playerName);
      this.setRoomCode(roomCode);
      this.setIsHost(false);
      
    } catch (error) {
      console.error('Error al unirse a la sala:', error);
      throw error;
    }
  }

  /**
   * Enviar la jugada del jugador al backend
   * @param choice - Elección del jugador (piedra, papel o tijera)
   */
  async sendPlay(choice: Choice): Promise<void> {
    try {
      const { roomCode, playerName } = this.state;
      
      const response = await fetch(`${API_URL}/rooms/${roomCode}/play`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          playerName,
          play: choice 
        }),
      });

      const data = await response.json();
      
    } catch (error) {
      console.error('Error al enviar la jugada:', error);
      throw error;
    }
  }

  /**
   * Obtener el estado actual de la sala
   * @returns Estado de la sala
   */
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

  /**
   * Hacer petición GET al backend
   * @param endpoint - Ruta del endpoint
   */
  async get(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error('Error en GET:', error);
      throw error;
    }
  }

  /**
   * Hacer petición POST al backend
   * @param endpoint - Ruta del endpoint
   * @param data - Datos a enviar
   */
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
}

// Exportar una instancia única del estado para usar en toda la aplicación
export const state = new State();

// Exportar la constante API_URL para que pueda ser utilizada en otros archivos
export { API_URL };