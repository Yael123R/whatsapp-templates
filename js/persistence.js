// Clave única para guardar en el almacenamiento local del navegador
const CLAVE = "whatsapp-templates";

/**
 * Serializa y guarda el listado de plantillas en localStorage
 */
function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(state.plantillas));
}

/**
 * Recupera el texto de localStorage y lo deserializa con JSON.parse.
 * Protege la aplicación usando try/catch si los datos guardados están corruptos.
 */
function cargar() {
  const guardado = localStorage.getItem(CLAVE);

  // Si no hay nada guardado, retorna lista vacía
  if (!guardado) return [];

  try {
    return JSON.parse(guardado);
  } catch (error) {
    // Si el JSON está mal formado, captura el error y evita que la app explote
    console.warn(
      "Datos corruptos en localStorage, se reinicia la lista:",
      error,
    );
    return [];
  }
}