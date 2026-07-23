const CLAVE = "whatsapp-templates";
const CLAVE_FILTRO = "whatsapp-templates-filtro"; // HU5: Clave para el filtro

/**
 * Serializa y guarda las plantillas y el filtro actual en localStorage.
 */
function guardar() {
  // Guardar o eliminar plantillas según si hay datos
  state.plantillas.length === 0
    ? localStorage.removeItem(CLAVE)
    : localStorage.setItem(CLAVE, JSON.stringify(state.plantillas));

  // HU5: Guardar el filtro directamente como texto (sin stringify)
  localStorage.setItem(CLAVE_FILTRO, state.filtro ?? "");

  // Indicador de estado visual (HU4)
  const elEstado = document.getElementById("estado");
  if (elEstado) {
    elEstado.textContent = state.plantillas.length > 0 ? "Guardado ✓" : "Vacío";
  }
}

/**
 * Recupera las plantillas de localStorage.
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