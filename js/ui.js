import { Template } from "./models/Template.js";
import {
  state,
  normalizarHashtag,
  contarPorHashtag,
  plantillasVisibles,
} from "./state.js";
import { guardar } from "./storage.js";

// Referencias del DOM
const lista = document.getElementById("listaPlantillas");
const form = document.getElementById("form-plantilla");
const inputTitulo = document.getElementById("titulo");
const inputHashtag = document.getElementById("hashtag");
const inputMensaje = document.getElementById("mensaje");
const btnSubmit = document.getElementById("btn-submit");

const selector = document.getElementById("selector");
const salida = document.getElementById("mensaje-final");
const btnGenerar = document.getElementById("btn-generar");
const btnCopiar = document.getElementById("btn-copiar");

// Modal de confirmación
const modal = document.getElementById("modal");
let accionPendiente = null;

function pedirConfirmacion(mensaje, accion) {
  document.getElementById("modal-texto").textContent = mensaje;
  accionPendiente = accion;
  modal.classList.remove("hidden");
}

document
  .getElementById("modal-cancelar")
  .addEventListener("click", function () {
    modal.classList.add("hidden");
    accionPendiente = null;
  });

document
  .getElementById("modal-confirmar")
  .addEventListener("click", function () {
    if (accionPendiente) accionPendiente();
    modal.classList.add("hidden");
    accionPendiente = null;
  });

function agregarPlantilla(titulo, mensaje, hashtag) {
  const nueva = new Template(titulo, mensaje, hashtag);
  state.plantillas.push(nueva);
}

function eliminarPlantilla(id) {
  const plantilla = state.plantillas.find((p) => p.id === id);
  const titulo = plantilla ? ` "${plantilla.titulo}"` : "";

  pedirConfirmacion(`¿Eliminar esta plantilla${titulo}?`, function () {
    state.plantillas = state.plantillas.filter(
      (plantilla) => plantilla.id !== id,
    );
    render();
  });
}

function cargarEnFormulario(id) {
  const plantilla = state.plantillas.find((p) => p.id === id);
  if (!plantilla) return;

  inputTitulo.value = plantilla.titulo;
  inputMensaje.value = plantilla.mensaje;
  inputHashtag.value = plantilla.hashtag;
  state.editandoId = id;

  btnSubmit.textContent = "💾 Actualizar plantilla";
  btnSubmit.className =
    "bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition cursor-pointer";
  form.classList.add("ring-2", "ring-blue-500");
}

function resetearFormulario() {
  form.reset();
  state.editandoId = null;
  btnSubmit.textContent = "Agregar plantilla";
  btnSubmit.className =
    "bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-medium transition cursor-pointer";
  form.classList.remove("ring-2", "ring-blue-500");
}

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

function renderSelector() {
  selector.innerHTML = state.plantillas
    .map(
      (plantilla, indice) =>
        `<option value="${indice}">${plantilla.titulo}</option>`,
    )
    .join("");
}

function generarMensajeFinal(plantilla, valorNombre, valorProducto) {
  return plantilla.mensaje
    .replaceAll("{nombre}", valorNombre)
    .replaceAll("{producto}", valorProducto);
}

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

export function render() {
  const visibles = plantillasVisibles();
  lista.innerHTML = "";

  if (visibles.length === 0) {
    const mensajeVacio =
      state.plantillas.length === 0
        ? "Aún no tienes plantillas. ¡Crea la primera!"
        : "No se encontraron plantillas con ese filtro.";

    lista.innerHTML = `
      <li class="col-span-full text-center text-slate-400 py-10">
        <div class="text-4xl mb-2">📭</div>
        <p class="text-sm text-slate-500">${mensajeVacio}</p>
      </li>
    `;
  } else {
    visibles.forEach(function (plantilla) {
      const fechaTexto = new Date(plantilla.fecha).toLocaleDateString("es-PE");
      const textoEdicion = plantilla.editadaEl ? " (editado)" : "";

      const mensajeRecortado =
        plantilla.mensaje.length > 60
          ? plantilla.mensaje.slice(0, 60) + "…"
          : plantilla.mensaje;

      const li = document.createElement("li");
      li.className =
        "bg-white p-4 rounded-lg shadow flex flex-col justify-between border border-slate-100";

      li.innerHTML = `
        <div>
          <div class="flex items-start justify-between gap-2">
            <strong class="text-slate-800">${plantilla.titulo}</strong>
            <span class="text-xs text-slate-400 shrink-0">${fechaTexto}${textoEdicion}</span>
          </div>
          <p class="text-sm text-slate-600 mt-1">${mensajeRecortado}</p>
        </div>

        <div>
          <div class="flex items-center justify-between mt-3 text-xs text-slate-500 border-t pt-2 border-slate-100">
            <span class="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">${plantilla.hashtag}</span>
            <span>${plantilla.mensaje.length} caracteres</span>
          </div>

          <div class="flex gap-2 mt-3 pt-2 border-t border-slate-100">
            <button class="btn-editar text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer" data-id="${plantilla.id}">Editar</button>
            <button class="btn-eliminar text-xs px-2.5 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer" data-id="${plantilla.id}">Eliminar</button>
          </div>
        </div>
      `;

      lista.appendChild(li);
    });
  }

  renderSelector();
  renderStats();
  guardar();
}

// Event Listeners
document
  .getElementById("buscador")
  .addEventListener("input", function (evento) {
    state.filtro = evento.target.value;
    render();
  });

lista.addEventListener("click", function (evento) {
  const id = evento.target.dataset.id;
  if (evento.target.classList.contains("btn-eliminar")) eliminarPlantilla(id);
  if (evento.target.classList.contains("btn-editar")) cargarEnFormulario(id);
});

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const tituloTexto = inputTitulo.value.trim();
  const mensajeTexto = inputMensaje.value.trim();

  if (tituloTexto.length === 0 || mensajeTexto.length === 0) {
    alert("Título y mensaje son obligatorios");
    return;
  }

  if (state.editandoId) {
    state.plantillas = state.plantillas.map((plantilla) =>
      plantilla.id === state.editandoId
        ? {
            ...plantilla,
            titulo: tituloTexto,
            mensaje: mensajeTexto,
            hashtag: normalizarHashtag(inputHashtag.value),
            editadaEl: new Date(),
          }
        : plantilla,
    );
  } else {
    agregarPlantilla(
      tituloTexto,
      mensajeTexto,
      normalizarHashtag(inputHashtag.value),
    );
  }

  render();
  resetearFormulario();
});

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

document.getElementById("btn-vaciar").addEventListener("click", function () {
  pedirConfirmacion(
    "Esto borrará TODAS tus plantillas. ¿Continuar?",
    function () {
      state.plantillas = [];
      render();
    },
  );
});