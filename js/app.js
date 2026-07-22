const state = { plantillas: [] };          // ← la única fuente de verdad

function agregarPlantilla(titulo, mensaje, hashtag) {
  const nueva = new Template(titulo, mensaje, hashtag);
  state.plantillas.push(nueva);   // agrega la nueva plantilla al estado
}