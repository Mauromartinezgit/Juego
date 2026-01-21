/**
 * ROUTER - SISTEMA DE NAVEGACIÓN
 * Este archivo maneja la navegación entre las diferentes páginas del juego
 */

import { Page } from './types';
import { state } from './state';

/**
 * Clase Router
 * Controla qué página se muestra en cada momento y carga los controladores correspondientes
 */
class Router {
  // Almacena el controlador de la página actual
  private currentController: any = null;

  /**
   * Navegar a una nueva página
   * @param page - Nombre de la página a la que queremos ir
   */
  async navigate(page: Page): Promise<void> {
    console.log('🔄 Navegando a:', page);

    // Si hay un controlador anterior activo, destruirlo para limpiar eventos
    if (this.currentController && this.currentController.destroy) {
      this.currentController.destroy();
    }

    // Actualizar el estado global con la página actual
    state.setPage(page);

    try {
      // Cargar el controlador de la nueva página
      await this.loadPageController(page);
    } catch (error) {
      console.error('❌ Error al cargar página:', error);
    }
  }

  /**
   * Cargar el controlador de una página específica
   * @param page - Nombre de la página cuyo controlador queremos cargar
   */
  private async loadPageController(page: Page): Promise<void> {
    try {
      let PageController;

      // Según la página solicitada, importar el controlador correspondiente
      switch (page) {
        case 'welcome':
          // Página de bienvenida (primera pantalla)
          const welcomeMod = await import('./pages/WelcomePage');
          PageController = welcomeMod.WelcomePage;
          break;
        case 'instructions':
          // Página de instrucciones (explica cómo jugar)
          const instructionsMod = await import('./pages/Instructions');
          PageController = instructionsMod.InstructionsPage;
          break;
        case 'game-playing3':
          // Página de countdown: muestra "3"
          const playing3Mod = await import('./pages/game-playing3');
          PageController = playing3Mod.GamePlayingPage3;
          break;
        case 'game-playing2':
          // Página de countdown: muestra "2"
          const playing2Mod = await import('./pages/game-playing2'); 
          PageController = playing2Mod.GamePlayingPage2;
          break;
        case 'game-playing1':
          // Página de countdown: muestra "1"
          const playing1Mod = await import('./pages/game-playing1');
          PageController = playing1Mod.GamePlayingPage1;
          break;
        case 'game-playing2':
          // Página de selección manual (elegir piedra, papel o tijera sin countdown)
          const selectMod = await import('./pages/game-playing2');
          PageController = selectMod.GamePlayingPage2;
          break;
        case 'game-round-result':
          // Página que muestra el resultado de cada ronda
          const finishMod = await import('./pages/game-finish');
          PageController = finishMod.GameRoundResultPage;
          break;
        case 'win':
          // Página de victoria (cuando el jugador gana)
          const winMod = await import('./pages/result-win');
          PageController = winMod.WinPage;
          break;
        case 'lose':
          // Página de derrota (cuando la computadora gana)
          const loseMod = await import('./pages/result-lose');
          PageController = loseMod.LosePage;
          break;
      }

      // Si se cargó un controlador, crear una instancia y renderizar la página
      if (PageController) {
        this.currentController = new PageController();
        if (this.currentController.render) {
          console.log('✅ Ejecutando render de:', page);
          await this.currentController.render();
        }
      }
    } catch (error) {
      console.error('❌ Error al cargar controlador:', error);
    }
  }
}

// Exportar una instancia única del router para usar en toda la aplicación
export const router = new Router();