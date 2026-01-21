/**
 * CSS INJECTOR - INYECTOR DE ESTILOS CSS
 * Función utilitaria para cargar archivos CSS dinámicamente
 */

/**
 * Inyectar un archivo CSS en la página
 * Esta función verifica si el CSS ya está cargado antes de agregarlo
 * para evitar duplicados
 * 
 * @param cssPath - Ruta del archivo CSS a cargar (ej: './styles/welcome.css')
 */
export function injectCSS(cssPath: string): void {
    // Verificar si el CSS ya está cargado buscando un elemento <link> con esa ruta
    if (!document.querySelector(`link[href="${cssPath}"]`)) {
        // Si no está cargado, crear un nuevo elemento <link>
        const link = document.createElement('link');
        link.rel = 'stylesheet';  // Indicar que es una hoja de estilos
        link.href = cssPath;       // Establecer la ruta del archivo CSS

        // Agregar el <link> al <head> del documento para cargar el CSS
        document.head.appendChild(link);

        // Mostrar mensaje en consola confirmando la carga
        console.log('💅 CSS injected:', cssPath);
    } else {
        // Si ya está cargado, solo mostrar mensaje informativo
        console.log('💅 CSS already loaded:', cssPath);
    }
}
