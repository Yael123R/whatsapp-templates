export const state = {
  plantillas: [],
  editandoId: null,
  filtro: "",
  orden: "recientes",
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

// Función pura de ordenamiento con copia inmutable (Logro 2 incluido)
function ordenar(plantillas) {
  const copia = [...plantillas];

  if (state.orden === "antiguas") {
    return copia.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }

  if (state.orden === "alfabetico") {
    // Logro 2: localeCompare ordenando A-Z respetando español
    return copia.sort((a, b) =>
      a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" }),
    );
  }

  // Por defecto "recientes"
  return copia.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

export function plantillasVisibles() {
  const filtroTexto = (state.filtro ?? "").toLowerCase();

  const filtradas =
    filtroTexto === ""
      ? state.plantillas
      : state.plantillas.filter(
          (plantilla) =>
            plantilla.hashtag.toLowerCase().includes(filtroTexto) ||
            plantilla.titulo.toLowerCase().includes(filtroTexto) ||
            plantilla.mensaje.toLowerCase().includes(filtroTexto),
        );

  return ordenar(filtradas);
}