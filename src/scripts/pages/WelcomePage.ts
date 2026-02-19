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
            <button class="button" id="create-room-btn" style="margin-top: 10px;">Crear Sala</button>
            <button class="button" id="join-room-btn" style="margin-top: 10px;">Unirse a Sala</button>
        </div>
        <div class="container-hands">
            <img src="https://i.postimg.cc/RVBNKXfK/tijera.png" class="img-hands" alt="tijera">
            <img src="https://i.postimg.cc/bwd8tt65/piedra.png" class="img-hands" alt="piedra">
            <img src="https://i.postimg.cc/nzGN5FRm/papel.png" class="img-hands" alt="papel">
        </div>
    </div>
</div>
    `;

    // Botón JUGAR SOLO
    app.querySelector('#solo-btn')?.addEventListener('click', () => {
      state.setIsHost(false);
      void router.navigate('instructions');
    });

    // Botón CREAR SALA (multijugador)
    app.querySelector('#create-room-btn')?.addEventListener('click', () => {
      state.setIsHost(true);
      void router.navigate('empezar');
    });

    // Botón UNIRSE A SALA (multijugador)
    app.querySelector('#join-room-btn')?.addEventListener('click', () => {
      state.setIsHost(false);
      void router.navigate('empezar');
    });
  }
}