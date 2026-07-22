# 📱 Gestor de Plantillas para WhatsApp (Lab 13)

Aplicación web interactiva desarrollada con **JavaScript ES6+** y **Tailwind CSS** para crear, organizar y personalizar plantillas de mensajes rápidas con reemplazo dinámico de variables y copia directa al portapapeles.

---

## 🏗️ Estructura de la Clase `Template`

La aplicación utiliza la clase **`Template`** (ubicada en `js/models/Template.js`) para modelar las plantillas del sistema.

### Propiedades:

- **`titulo`**: Nombre descriptivo de la plantilla.
- **`mensaje`**: El cuerpo del mensaje que incluye variables como `{nombre}` y `{producto}`.
- **`hashtag`**: Etiqueta de categorización limpia y normalizada.
- **`fecha`**: Objeto `Date` generado automáticamente al instanciar la plantilla.

---

## 🛠️ Métodos de `String` Utilizados

Para cumplir con la limpieza y procesamiento dinámico de datos, se aplicaron los siguientes métodos nativos de `String`:

1. **`trim()`**: Elimina los espacios en blanco innecesarios al inicio y final de los campos de texto (`titulo`, `mensaje`, `hashtag`, `nombre`, `producto`).
2. **`toLowerCase()`**: Convierte los hashtags a minúsculas para mantener consistencia y formato uniforme.
3. **`startsWith("#")`**: Verifica si el hashtag ya inicia con el carácter `#`. Si no es así, lo concatena.
4. **`endsWith("#")`**: Detecta y remueve caracteres numerales agregados por error al final del hashtag.
5. **`replaceAll()`**: Realiza la sustitución masiva y exacta de las variables dinámicas `{nombre}` y `{producto}` por los valores reales ingresados por el usuario.
6. **`slice()`**: Utilizado tanto para la limpieza fina de cadenas como para recortar mensajes extensos en las tarjetas a un máximo de 60 caracteres (`.slice(0, 60) + "…"`).

---

## ✨ Logros Adicionales Implementados

- **Contador de caracteres:** Muestra `mensaje.length` en cada tarjeta.
- **Recorte de tarjetas:** Mantiene una cuadrícula limpia mediante `.slice()`.
- **Soporte multivariable:** Reemplazo encadenado de `{nombre}` y `{producto}`.

---

## 🚀 Despliegue y Enlaces

- **Repositorio en GitHub:** `https://github.com/Yael123R/whatsapp-templates`
- **Sitio Desplegado (GitHub Pages):** `https://yael123r.github.io/whatsapp-templates/`