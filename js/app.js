// Estado Central
// --- LAB 14 HU2: Se agrega editandoId al estado para controlar si creamos o editamos ---
const state = { plantillas: [], editandoId: null };

// Referencias del DOM para la lista y formulario
const lista = document.getElementById("listaPlantillas");
const form = document.getElementById("form-plantilla");
const inputTitulo = document.getElementById("titulo");
const inputHashtag = document.getElementById("hashtag");
const inputMensaje = document.getElementById("mensaje");

// Referencias del DOM para el generador
const selector = document.getElementById("selector");
const salida = document.getElementById("mensaje-final");
const btnGenerar = document.getElementById("btn-generar");
const btnCopiar = document.getElementById("btn-copiar");

// LAB 13 HU3: Función para normalizar hashtags
function normalizarHashtag(texto) {
  let limpio = texto.trim().toLowerCase().replaceAll(" ", "");
  if (limpio.endsWith("#") && limpio.length > 1) {
    limpio = limpio.slice(0, -1);
  }
  if (limpio.length === 0) return "#general";
  return limpio.startsWith("#") ? limpio : "#" + limpio;
}

// LAB 13 Logro 3: Soporta {nombre} y {producto} encadenando reemplazos
function generarMensajeFinal(plantilla, valorNombre, valorProducto) {
  return plantilla.mensaje
    .replaceAll("{nombre}", valorNombre)
    .replaceAll("{producto}", valorProducto);
}

function agregarPlantilla(titulo, mensaje, hashtag) {
  const nueva = new Template(titulo, mensaje, hashtag);
  state.plantillas.push(nueva);
}

// --- LAB 14 HU1: Eliminar plantilla del estado de forma inmutable ---
function eliminarPlantilla(id) {
  state.plantillas = state.plantillas.filter(
    (plantilla) => plantilla.id !== id,
  );
  render();
}

// --- LAB 14 HU2: Cargar datos de la plantilla seleccionada en el formulario ---
function cargarEnFormulario(id) {
  const plantilla = state.plantillas.find((p) => p.id === id);
  if (!plantilla) return;

  inputTitulo.value = plantilla.titulo;
  inputMensaje.value = plantilla.mensaje;
  inputHashtag.value = plantilla.hashtag;
  state.editandoId = id; // Guardamos la referencia de la plantilla que se está editando
}

// --- LAB 14 HU3: Función pura que cuenta plantillas agrupadas por hashtag ---
function contarPorHashtag(plantillas) {
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

// --- LAB 14 HU3: Renderizado del panel de estadísticas ---
function renderStats() {
  const total = state.plantillas.length;
  const porTag = contarPorHashtag(state.plantillas);
  const etiquetas = Object.entries(porTag)
    .map(
      ([hashtag, cantidad]) =>
        `<span class="text-xs bg-white border border-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded-full">${hashtag} · ${cantidad}</span>`,
    )
    .join("");

  document.getElementById("panel-stats").innerHTML = `
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-sm font-semibold text-slate-800">${total} plantilla(s)</span>
      ${etiquetas}
    </div>`;
}

// Mantiene actualizado el selector
function renderSelector() {
  selector.innerHTML = state.plantillas
    .map(
      (plantilla, indice) =>
        `<option value="${indice}">${plantilla.titulo}</option>`,
    )
    .join("");
}

// Patrón render
function render() {
  lista.innerHTML = "";

  state.plantillas.forEach(function (plantilla) {
    const fechaTexto = plantilla.fecha.toLocaleDateString("es-PE");

    // LAB 13 Logro 2: Recortar texto si supera los 60 caracteres
    const mensajeRecortado =
      plantilla.mensaje.length > 60
        ? plantilla.mensaje.slice(0, 60) + "…"
        : plantilla.mensaje;

    const li = document.createElement("li");
    li.className =
      "bg-white p-4 rounded-lg shadow flex flex-col justify-between";

    // --- LAB 14 HU1 & HU2: Agregamos botones Editar y Eliminar con data-id ---
    li.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-2">
          <strong class="text-slate-800">${plantilla.titulo}</strong>
          <span class="text-xs text-slate-400 shrink-0">${fechaTexto}</span>
        </div>
        <p class="text-sm text-slate-600 mt-1">${mensajeRecortado}</p>
      </div>
      
      <div>
        <div class="flex items-center justify-between mt-3 text-xs text-slate-500 border-t pt-2 border-slate-100">
          <span class="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">${plantilla.hashtag}</span>
          <!-- Logro 1: Contador de caracteres -->
          <span>${plantilla.mensaje.length} caracteres</span>
        </div>

        <div class="flex gap-2 mt-3 pt-2 border-t border-slate-100">
          <!-- LAB 14 HU2: Botón Editar -->
          <button class="btn-editar text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer" data-id="${plantilla.id}">
            Editar
          </button>
          <!-- LAB 14 HU1: Botón Eliminar -->
          <button class="btn-eliminar text-xs px-2.5 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer" data-id="${plantilla.id}">
            Eliminar
          </button>
        </div>
      </div>
    `;

    lista.appendChild(li);
  });

  renderSelector();
  // --- LAB 14 HU3: Renderizar estadísticas sincronizadas al final ---
  renderStats();
}

// --- LAB 14 HU1 & HU2: Delegación de eventos en el elemento contenedor (lista) ---
lista.addEventListener("click", function (evento) {
  const id = evento.target.dataset.id;
  if (evento.target.classList.contains("btn-eliminar")) {
    eliminarPlantilla(id);
  }
  if (evento.target.classList.contains("btn-editar")) {
    cargarEnFormulario(id);
  }
});

// Conectar al formulario
// --- LAB 14 HU2: Decide si actualiza una plantilla existente o agrega una nueva ---
form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const tituloTexto = inputTitulo.value.trim();
  const mensajeTexto = inputMensaje.value.trim();

  if (tituloTexto.length === 0 || mensajeTexto.length === 0) {
    alert("Título y mensaje son obligatorios");
    return;
  }

  if (state.editandoId) {
    // Actualización inmutable
    state.plantillas = state.plantillas.map((plantilla) =>
      plantilla.id === state.editandoId
        ? {
            ...plantilla,
            titulo: tituloTexto,
            mensaje: mensajeTexto,
            hashtag: normalizarHashtag(inputHashtag.value),
          }
        : plantilla,
    );
    state.editandoId = null;
  } else {
    // Creación
    agregarPlantilla(
      tituloTexto,
      mensajeTexto,
      normalizarHashtag(inputHashtag.value),
    );
  }

  render();
  form.reset();
});

// Evento para generar el mensaje dinámico (LAB 13 Logro 3)
btnGenerar.addEventListener("click", function () {
  if (state.plantillas.length === 0) return;

  const plantilla = state.plantillas[Number(selector.value)];
  const nombreInput = document.getElementById("valorNombre").value.trim();
  const productoInput = document.getElementById("valorProducto").value.trim();

  salida.textContent = generarMensajeFinal(
    plantilla,
    nombreInput,
    productoInput,
  );
});

// Evento para copiar el mensaje al portapapeles
btnCopiar.addEventListener("click", function () {
  const texto = salida.textContent.trim();
  if (!texto) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(texto)
      .then(mostrarFeedbackCopiado)
      .catch(() => copiarAlMetodoAntiguo(texto));
  } else {
    copiarAlMetodoAntiguo(texto);
  }
});

function mostrarFeedbackCopiado() {
  const textoOriginal = btnCopiar.textContent;
  btnCopiar.textContent = "✅ Copiado";
  setTimeout(function () {
    btnCopiar.textContent = textoOriginal;
  }, 1500);
}

function copiarAlMetodoAntiguo(texto) {
  const areaAuxiliar = document.createElement("textarea");
  areaAuxiliar.value = texto;
  document.body.appendChild(areaAuxiliar);
  areaAuxiliar.select();
  document.execCommand("copy");
  document.body.removeChild(areaAuxiliar);
  mostrarFeedbackCopiado();
}