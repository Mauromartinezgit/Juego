import { PageController } from '../types';
import { state } from '../state';
import { router } from '../router';

export class WelcomePage implements PageController {
  async render(): Promise<void> {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
<div class="page-welcome">
    <div class="container page-welcome">
        <div class="container-title">
            <h1 class="title">Piedra,<br>Papel o <br>Tijera</h1>
        </div>
        <div class="container-button">
            <button class="button" id="solo-btn">Jugar Solo</button>
        </div>
        <div class="container-button">
            <button class="button" id="new-game">Jugar Multijugador</button>
        </div>
        <div class="container-button">
            <button class="button" id="join-room">Ingresar a una sala Multijuador </button>
        </div>
        <div class="container-hands">
            <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera">
            <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra">
            <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel">
        </div>
    </div>
</div>
    `;

    // Botón JUGAR SOLO (contra la máquina)
    app.querySelector('#solo-btn')?.addEventListener('click', () => {
      void router.navigate('instructions-solo');
    });

    // Botón NUEVO JUEGO (crear sala multijugador)
    app.querySelector('#new-game')?.addEventListener('click', () => {
      state.setIsHost(true);
      void router.navigate('empezar');
    });

    // Botón INGRESAR A UNA SALA (unirse multijugador)
    app.querySelector('#join-room')?.addEventListener('click', () => {
      state.setIsHost(false);
      void router.navigate('empezar');
    });
  }
}