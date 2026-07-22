// Estado Central
const state = { plantillas: [] };

// Referencias del DOM
const lista = document.getElementById("listaPlantillas");
const form = document.getElementById("form-plantilla");
const inputTitulo = document.getElementById("titulo");
const inputHashtag = document.getElementById("hashtag");
const inputMensaje = document.getElementById("mensaje");

// HU3: Función para normalizar hashtags con métodos de String
function normalizarHashtag(texto) {
  const limpio = texto.trim().toLowerCase();
  if (limpio.length === 0) return "#general";
  return limpio.startsWith("#") ? limpio : "#" + limpio;
}

function agregarPlantilla(titulo, mensaje, hashtag) {
  const nueva = new Template(titulo, mensaje, hashtag);
  state.plantillas.push(nueva);
}

// Patrón render
function render() {
  lista.innerHTML = "";

  state.plantillas.forEach(function (plantilla) {
    const fechaTexto = plantilla.fecha.toLocaleDateString("es-PE");

    const li = document.createElement("li");
    li.className = "bg-white p-4 rounded-lg shadow";

    li.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <strong class="text-slate-800">${plantilla.titulo}</strong>
        <span class="text-xs text-slate-400 shrink-0">${fechaTexto}</span>
      </div>
      <p class="text-sm text-slate-600 mt-1">${plantilla.mensaje}</p>
      <span class="inline-block text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full mt-2">${plantilla.hashtag}</span>
    `;

    lista.appendChild(li);
  });
}

// Conectar al formulario
form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // HU3: Limpieza de espacios sobrantes en título y mensaje
  const tituloTexto = inputTitulo.value.trim();
  const mensajeTexto = inputMensaje.value.trim();

  // HU3: Validación - evitar guardar con título o mensaje vacíos
  if (tituloTexto.length === 0 || mensajeTexto.length === 0) {
    alert("Título y mensaje son obligatorios");
    return;
  }

  // HU3: Guardamos usando la función normalizarHashtag()
  agregarPlantilla(
    tituloTexto,
    mensajeTexto,
    normalizarHashtag(inputHashtag.value),
  );
  render();

  form.reset();
});