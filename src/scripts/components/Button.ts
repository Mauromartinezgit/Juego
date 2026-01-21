/**
 * BUTTON COMPONENT - COMPONENTE DE BOTONES
 * Maneja la navegación mediante botones con el atributo data-page
 */

import { Page } from '../types';
import { router } from '../router';

/**
 * Clase Button
 * Configura la navegación mediante delegación de eventos
 */
export class Button {
  /**
   * Configurar los botones de navegación
   * Usa delegación de eventos para manejar clics en elementos con `data-page`
   * Esto previene problemas cuando los elementos se re-renderizan o están cubiertos por overlays
   */
  static setupNavigationButtons(): void {
    // Marcador para evitar agregar el listener múltiples veces
    const marker = '__nav_delegation_attached';

    // Si ya se configuró la delegación, no hacer nada
    if ((document as any)[marker]) return;

    // Marcar que ya se configuró
    (document as any)[marker] = true;

    console.debug('[Nav] delegation attached to document');

    /**
     * Agregar un listener de clics a todo el documento
     * Esto captura clics en cualquier elemento con data-page
     */
    document.addEventListener('click', (e) => {
      // Asegurar que el objetivo del evento es un Element (no un nodo de texto)
      const target = e.target as EventTarget | null;
      if (!(target instanceof Element)) return;

      // Buscar el elemento más cercano con el atributo data-page
      const el = target.closest('[data-page]') as HTMLElement | null;
      if (!el) return;

      // Obtener el nombre de la página del atributo data-page
      const page = el.getAttribute('data-page') as Page | null;
      if (!page) return;

      // Si es un enlace (<a>), prevenir el comportamiento por defecto
      if (el.tagName.toLowerCase() === 'a') e.preventDefault();

      // Debug: registrar el clic para ayudar a diagnosticar problemas
      console.debug('[Nav] click detected on element:', el, ' -> page:', page);

      try {
        // Navegar a la página solicitada
        void router.navigate(page);
      } catch (err) {
        console.warn('Error navigating to', page, err);
      }
    });
  }
}