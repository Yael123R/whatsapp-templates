// Clave única para guardar en el almacenamiento local del navegador
const CLAVE = "whatsapp-templates";

/**
 * Serializa y guarda el listado de plantillas en localStorage
 */
function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(state.plantillas));
}