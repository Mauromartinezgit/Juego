/**
 * STATE - ESTADO GLOBAL DEL JUEGO
 * Este archivo maneja toda la información del juego (puntos, elecciones, etc.)
 */

import { GameState, Choice, RoundResult, Page } from './types';

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
    maxScore: 5            // Puntos necesarios para ganar el juego
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
}

// Exportar una instancia única del estado para usar en toda la aplicación
export const state = new State();