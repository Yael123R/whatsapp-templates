export const state = {
  plantillas: [],
  editandoId: null,
  filtro: "",
  orden: "recientes", // HU4: Estado por defecto del ordenamiento
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

// HU4: Función pura de ordenamiento (con copia inmutable)
function ordenar(plantillas) {
  const copia = [...plantillas]; // .sort() muta, por eso copiamos con [...]
  return state.orden === "antiguas"
    ? copia.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)) // más antiguas primero
    : copia.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // más recientes primero
}

export function plantillasVisibles() {
  const filtroTexto = (state.filtro ?? "").toLowerCase();

  // 1. Filtrar
  const filtradas =
    filtroTexto === ""
      ? state.plantillas
      : state.plantillas.filter(
          (plantilla) =>
            plantilla.hashtag.toLowerCase().includes(filtroTexto) ||
            plantilla.titulo.toLowerCase().includes(filtroTexto) ||
            plantilla.mensaje.toLowerCase().includes(filtroTexto),
        );

  // 2. HU4: Primero filtra, luego ordena
  return ordenar(filtradas);
}