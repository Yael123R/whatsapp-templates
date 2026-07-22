// Estado Central
const state = { plantillas: [] };

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

// HU3: Función para normalizar hashtags
function normalizarHashtag(texto) {
  let limpio = texto.trim().toLowerCase().replaceAll(" ", "");
  if (limpio.endsWith("#") && limpio.length > 1) {
    limpio = limpio.slice(0, -1);
  }
  if (limpio.length === 0) return "#general";
  return limpio.startsWith("#") ? limpio : "#" + limpio;
}

// Logro 3: Soporta {nombre} y {producto} encadenando reemplazos
function generarMensajeFinal(plantilla, valorNombre, valorProducto) {
  return plantilla.mensaje
    .replaceAll("{nombre}", valorNombre)
    .replaceAll("{producto}", valorProducto);
}

function agregarPlantilla(titulo, mensaje, hashtag) {
  const nueva = new Template(titulo, mensaje, hashtag);
  state.plantillas.push(nueva);
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

    // Logro 2: Recortar texto si supera los 60 caracteres
    const mensajeRecortado =
      plantilla.mensaje.length > 60
        ? plantilla.mensaje.slice(0, 60) + "…"
        : plantilla.mensaje;

    const li = document.createElement("li");
    li.className =
      "bg-white p-4 rounded-lg shadow flex flex-col justify-between";

    li.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-2">
          <strong class="text-slate-800">${plantilla.titulo}</strong>
          <span class="text-xs text-slate-400 shrink-0">${fechaTexto}</span>
        </div>
        <p class="text-sm text-slate-600 mt-1">${mensajeRecortado}</p>
      </div>
      
      <div class="flex items-center justify-between mt-3 text-xs text-slate-500 border-t pt-2 border-slate-100">
        <span class="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">${plantilla.hashtag}</span>
        <!-- Logro 1: Contador de caracteres -->
        <span>${plantilla.mensaje.length} caracteres</span>
      </div>
    `;

    lista.appendChild(li);
  });

  renderSelector();
}

// Conectar al formulario
form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const tituloTexto = inputTitulo.value.trim();
  const mensajeTexto = inputMensaje.value.trim();

  if (tituloTexto.length === 0 || mensajeTexto.length === 0) {
    alert("Título y mensaje son obligatorios");
    return;
  }

  agregarPlantilla(
    tituloTexto,
    mensajeTexto,
    normalizarHashtag(inputHashtag.value),
  );
  render();

  form.reset();
});

// Evento para generar el mensaje dinámico (Logro 3)
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