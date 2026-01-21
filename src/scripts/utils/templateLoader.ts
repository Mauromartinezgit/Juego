/**
 * Utility function to load HTML template and inject CSS
 */
export async function loadTemplate(htmlPath: string, cssPath: string): Promise<string> {
  try {
    console.log('🔄 Loading template:', htmlPath);

    const response = await fetch(htmlPath);
    console.log('📄 Fetch response:', response.status, response.ok);

    if (!response.ok) {
      throw new Error(`Failed to load template: ${htmlPath} (status: ${response.status})`);
    }

    const html = await response.text();
    console.log('✅ HTML loaded, length:', html.length);

    // Inject CSS if not already loaded
    if (!document.querySelector(`link[href="${cssPath}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
      console.log('💅 CSS injected:', cssPath);
    } else {
      console.log('💅 CSS already loaded:', cssPath);
    }

    return html;
  } catch (error) {
    console.error('❌ Error loading template:', error);
    throw error;
  }
}

