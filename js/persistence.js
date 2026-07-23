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
 * Si no hay nada guardado, retorna un arreglo vacío.
 */
function cargar() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado ? JSON.parse(guardado) : [];
}