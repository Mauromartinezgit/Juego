// Tipos de opciones del juego
export type Choice = 'piedra' | 'papel' | 'tijera';

// Resultado de una ronda
export type RoundResult = 'win' | 'lose' | 'draw';

// Páginas de la aplicación
export type Page =
  | 'welcome'
  | 'instructions'
  | 'empezar'
  | 'share-room'
  | 'multiplayer-instructions'
  | 'waiting-player'
  | 'game-playing3'
  | 'game-playing2'
  | 'game-playing1'
  | 'game-round-result'
  | 'win'
  | 'lose';

// Estado del juego
export interface GameState {
  playerScore: number;
  computerScore: number;
  playerName?: string;
  opponentName?: string;
  roomCode?: string;
  isHost?: boolean;
  currentPage: Page;
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  roundResult: RoundResult | null;
  maxScore: number;
}

// Interface para páginas
export interface PageController {
  render(): Promise<void>;
  destroy?(): void;
}