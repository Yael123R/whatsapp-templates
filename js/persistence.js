const CLAVE = "whatsapp-templates";

/**
 * Serializa y guarda el listado de plantillas en localStorage.
 * Si no hay plantillas, elimina la clave. Actualiza el indicador de estado.
 */
function guardar() {
  // Si no hay plantillas, borra la clave; si hay, las guarda en JSON
  state.plantillas.length === 0
    ? localStorage.removeItem(CLAVE)
    : localStorage.setItem(CLAVE, JSON.stringify(state.plantillas));

  // Actualiza el indicador visual de estado en el DOM
  const elEstado = document.getElementById("estado");
  if (elEstado) {
    elEstado.textContent = state.plantillas.length > 0 ? "Guardado ✓" : "Vacío";
  }
}

/**
 * Recupera el texto de localStorage y lo deserializa con JSON.parse.
 * Protege la aplicación usando try/catch si los datos guardados están corruptos.
 */
function cargar() {
  const guardado = localStorage.getItem(CLAVE);

  if (!guardado) return [];

  try {
    return JSON.parse(guardado);
  } catch (error) {
    console.warn(
      "Datos corruptos en localStorage, se reinicia la lista:",
      error,
    );
    return [];
  }
}