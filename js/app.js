// Estado Central
const state = { plantillas: [] };

// Referencias del DOM para la lista y formulario
const lista = document.getElementById("listaPlantillas");
const form = document.getElementById("form-plantilla");
const inputTitulo = document.getElementById("titulo");
const inputHashtag = document.getElementById("hashtag");
const inputMensaje = document.getElementById("mensaje");

// Referencias del DOM para el generador (HU4)
const selector = document.getElementById("selector");
const salida = document.getElementById("mensaje-final");
const btnGenerar = document.getElementById("btn-generar");
const btnCopiar = document.getElementById("btn-copiar");

// HU3: Función para normalizar hashtags con métodos de String
function normalizarHashtag(texto) {
  let limpio = texto.trim().toLowerCase().replaceAll(" ", "");
  if (limpio.endsWith("#") && limpio.length > 1) {
    limpio = limpio.slice(0, -1);
  }
  if (limpio.length === 0) return "#general";
  return limpio.startsWith("#") ? limpio : "#" + limpio;
}

// HU4: Reemplazar la variable {nombre} (flexible a mayúsculas/espacios)
function generarMensajeFinal(plantilla, valorNombre) {
  // Expresión regular que atrapa {nombre}, {Nombre}, { nombre }, etc.
  const patron = /\{\s*nombre\s*\}/gi;
  return plantilla.mensaje.replace(patron, valorNombre);
}

function agregarPlantilla(titulo, mensaje, hashtag) {
  const nueva = new Template(titulo, mensaje, hashtag);
  state.plantillas.push(nueva);
}

// HU4: Mantiene actualizado el selector de opciones con las plantillas del estado
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

  // HU4: Se actualiza el selector en cada render
  renderSelector();
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

// HU4: Evento para generar el mensaje dinámico
btnGenerar.addEventListener("click", function () {
  if (state.plantillas.length === 0) return;

  const plantilla = state.plantillas[Number(selector.value)];
  const nombreInput = document.getElementById("valorNombre").value.trim();

  // Si no escribió un nombre, le ponemos un aviso para que se dé cuenta
  if (nombreInput.length === 0) {
    alert("Por favor ingresa un nombre real en el campo.");
    return;
  }

  salida.textContent = generarMensajeFinal(plantilla, nombreInput);
});

// HU4: Evento para copiar el mensaje al portapapeles
btnCopiar.addEventListener("click", function () {
  const texto = salida.textContent.trim();
  if (!texto) return;

  // Intenta copiar usando la API del portapapeles
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(texto)
      .then(function () {
        mostrarFeedbackCopiado();
      })
      .catch(function () {
        copiarAlMetodoAntiguo(texto);
      });
  } else {
    copiarAlMetodoAntiguo(texto);
  }
});

// Función para cambiar el texto del botón temporalmente
function mostrarFeedbackCopiado() {
  const textoOriginal = btnCopiar.textContent;
  btnCopiar.textContent = "✅ Copiado";
  setTimeout(function () {
    btnCopiar.textContent = textoOriginal;
  }, 1500);
}

// Método alternativo por si el navegador bloquea navigator.clipboard
function copiarAlMetodoAntiguo(texto) {
  const areaAuxiliar = document.createElement("textarea");
  areaAuxiliar.value = texto;
  document.body.appendChild(areaAuxiliar);
  areaAuxiliar.select();
  document.execCommand("copy");
  document.body.removeChild(areaAuxiliar);
  mostrarFeedbackCopiado();
}