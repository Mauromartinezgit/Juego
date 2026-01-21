/**
 * CHOICE BUTTON COMPONENT - COMPONENTE DE BOTONES DE ELECCIÓN
 * Maneja la lógica del juego: determinar ganador, elección de la computadora, etc.
 */

import { Choice, RoundResult } from '../types';

/**
 * Clase ChoiceButton
 * Contiene métodos estáticos para la lógica del juego de Piedra, Papel o Tijera
 */
export class ChoiceButton {
  /**
   * Determinar el ganador de una ronda
   * @param playerChoice - Elección del jugador (piedra, papel o tijera)
   * @param computerChoice - Elección de la computadora (piedra, papel o tijera)
   * @returns 'win' si gana el jugador, 'lose' si gana la computadora, 'draw' si empatan
   */
  static determineWinner(playerChoice: Choice, computerChoice: Choice): RoundResult {
    // Si ambos eligieron lo mismo, es empate
    if (playerChoice === computerChoice) {
      return 'draw';
    }

    /**
     * Condiciones de victoria
     * Cada elección vence a una específica:
     * - Piedra vence a Tijera
     * - Papel vence a Piedra
     * - Tijera vence a Papel
     */
    const winConditions: Record<Choice, Choice> = {
      piedra: 'tijera',   // Piedra rompe Tijera
      papel: 'piedra',    // Papel envuelve Piedra
      tijera: 'papel'     // Tijera corta Papel
    };

    // Verificar si la elección del jugador vence a la de la computadora
    return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
  }

  /**
   * Obtener una elección aleatoria para la computadora
   * @returns Una elección aleatoria: 'piedra', 'papel' o 'tijera'
   */
  static getComputerChoice(): Choice {
    // Array con todas las opciones posibles
    const choices: Choice[] = ['piedra', 'papel', 'tijera'];

    // Generar un índice aleatorio entre 0 y 2
    const randomIndex = Math.floor(Math.random() * choices.length);

    // Retornar la elección en ese índice
    return choices[randomIndex];
  }
}