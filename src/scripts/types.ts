// Tipos de opciones del juego
export type Choice = 'piedra' | 'papel' | 'tijera';

// Resultado de una ronda
export type RoundResult = 'win' | 'lose' | 'draw';



// Estado del juego
export type Page =
  | 'welcome'
  | 'instructions'
  | 'empezar'
  | 'join-room'
  | 'share-room'
  | 'multiplayer-instructions'
  | 'waiting-player'
  | 'game-playing3'
  | 'game-playing2'
  | 'game-playing1'
  | 'game-round-result'
  | 'win'
  | 'lose';

// Interface para páginas
export interface PageController {
  render(): Promise<void>;
  destroy?(): void;
}