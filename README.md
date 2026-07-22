# 📱 Gestor de Plantillas para WhatsApp (Lab 14)

Aplicación web interactiva desarrollada con **JavaScript ES6+** y **Tailwind CSS** para crear, organizar, editar, eliminar y personalizar plantillas de mensajes rápidas con reemplazo dinámico de variables, filtrado en tiempo real y estadísticas sincronizadas.

---

## 🏗️ Estructura de la Clase `Template`

La aplicación utiliza la clase **`Template`** (ubicada en `js/models/Template.js`) para modelar las plantillas del sistema.

### Propiedades:

- **`id`**: Identificador único generado con `crypto.randomUUID()` para operaciones inmutables.
- **`titulo`**: Nombre descriptivo de la plantilla.
- **`mensaje`**: El cuerpo del mensaje que incluye variables como `{nombre}` y `{producto}`.
- **`hashtag`**: Etiqueta de categorización limpia y normalizada.
- **`fecha`**: Objeto `Date` generado automáticamente al instanciar la plantilla.

---

## 🛠️ Métodos de `String` Utilizados

Para cumplir con la limpieza y procesamiento dinámico de datos, se aplicaron los siguientes métodos nativos de `String`:

1. **`trim()`**: Elimina los espacios en blanco innecesarios al inicio y final de los campos de texto (`titulo`, `mensaje`, `hashtag`, `nombre`, `producto`).
2. **`toLowerCase()`**: Convierte textos y hashtags a minúsculas para mantener consistencia y facilitar el filtrado.
3. **`startsWith("#")`**: Verifica si el hashtag ya inicia con el carácter `#`. Si no es así, lo concatena.
4. **`endsWith("#")`**: Detecta y remueve caracteres numerales agregados por error al final del hashtag.
5. **`replaceAll()`**: Realiza la sustitución masiva y exacta de las variables dinámicas `{nombre}` y `{producto}` por los valores reales ingresados por el usuario.
6. **`slice()`**: Utilizado tanto para la limpieza fina de cadenas como para recortar mensajes extensos en las tarjetas a un máximo de 60 caracteres (`.slice(0, 60) + "…"`).
7. **`includes()`**: Utilizado en la función de filtrado para evaluar si la búsqueda coincide con el hashtag, título o mensaje de una plantilla.

---

## ⚙️ Conceptos Clave de Implementación (Lab 14)

### 1. Delegación de Eventos

Para la gestión de las acciones **Editar** y **Eliminar** en las tarjetas, se aplicó la técnica de **Delegación de Eventos**:

- En lugar de adjuntar un listener de evento `click` a cada botón individual de cada tarjeta (lo cual recargaría la memoria y se perdería al redibujar el DOM con `render()`), se asignó un **único evento `click` al elemento padre contenedor** (`<ul id="listaPlantillas">`).
- Usando `evento.target.classList.contains(...)` se detecta qué botón interno fue presionado (`.btn-eliminar` o `.btn-editar`).
- Mediante el atributo `data-id="${plantilla.id}"` del elemento clicado, recuperamos el ID exacto para ejecutar la operación correspondiente en el estado central.

### 2. Función `contarPorHashtag`

La función pura `contarPorHashtag(plantillas)` recibe un arreglo de plantillas y retorna un objeto de frecuencias donde las llaves son los hashtags y los valores representan cuántas veces se repite cada uno (ej. `{ "#ventas": 2, "#soporte": 1 }`).

**¿Para qué sirve?**
Sirve como motor lógico para el **Panel de Estadísticas (HU3)**. Permite agrupar dinámicamente el conteo total por etiquetas sin acoplarse al DOM. Posteriormente, la función `renderStats()` transforma este objeto en etiquetas visuales sincronizadas con la lista principal.

---

## ✨ Historias de Usuario y Logros Adicionales

- **HU1 (Eliminar):** Eliminación inmutable de plantillas de la lista mediante filtrado por ID.
- **HU2 (Editar):** Carga los datos de una plantilla en el formulario para modificarla y actualizar el estado central.
- **HU3 (Estadísticas):** Muestra el total global de plantillas y el desglose de conteo por hashtag.
- **HU4 (Buscador):** Filtra en tiempo real las plantillas visibles.
- **Logro Adicional 1 (Feedback al eliminar):** Muestra un diálogo de confirmación (`confirm`) antes de eliminar una plantilla para prevenir borrados accidentales.
- **Logro Adicional 2 (Feedback visual al editar):** Cambia dinámicamente el texto del botón ("💾 Actualizar plantilla") y resalta el formulario con un borde azul distintivo mientras se edita.
- **Logro Adicional 3 (Buscador flexible):** Búsqueda global extendida que evalúa coincidencias en `#hashtag`, `título` y `mensaje`.

---

## 🚀 Despliegue y Enlaces

- **Repositorio en GitHub:** `https://github.com/Yael123R/whatsapp-templates`
- **Sitio Desplegado (GitHub Pages):** `https://yael123r.github.io/whatsapp-templates/`