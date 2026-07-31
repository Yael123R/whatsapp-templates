export const state = {
  plantillas: [],
  editandoId: null,
  filtro: "",
};

export function normalizarHashtag(texto) {
  let limpio = texto.trim().toLowerCase().replaceAll(" ", "");
  if (limpio.endsWith("#") && limpio.length > 1) {
    limpio = limpio.slice(0, -1);
  }
  if (limpio.length === 0) return "#general";
  return limpio.startsWith("#") ? limpio : "#" + limpio;
}

export function contarPorHashtag(plantillas) {
  const conteo = {};
  plantillas.forEach(function (plantilla) {
    const elHashtag = plantilla.hashtag;
    if (conteo[elHashtag]) {
      conteo[elHashtag] = conteo[elHashtag] + 1;
    } else {
      conteo[elHashtag] = 1;
    }
  });
  return conteo;
}

export function plantillasVisibles() {
  const filtroTexto = (state.filtro ?? "").toLowerCase();
  if (filtroTexto === "") return state.plantillas;

  return state.plantillas.filter(
    (plantilla) =>
      plantilla.hashtag.toLowerCase().includes(filtroTexto) ||
      plantilla.titulo.toLowerCase().includes(filtroTexto) ||
      plantilla.mensaje.toLowerCase().includes(filtroTexto),
  );
}